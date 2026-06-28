import { OAuth2Client } from 'google-auth-library';
import pg from 'pg';
import { evaluateNewAchievements } from '../src/data/achievements.js';

const { Pool } = pg;

function getPool() {
  const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  if (!connectionString) throw new Error('Database not configured');
  return new Pool({
    connectionString,
    ssl: process.env.POSTGRES_HOST?.includes('supabase') ? { rejectUnauthorized: false } : undefined,
  });
}

async function ensureSchema(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.user_profiles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      google_id TEXT UNIQUE NOT NULL,
      email TEXT,
      display_name TEXT,
      photo_url TEXT,
      achievements JSONB NOT NULL DEFAULT '[]'::jsonb,
      stats JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS public.user_scores (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
      mode_id TEXT NOT NULL,
      score INTEGER NOT NULL DEFAULT 0,
      rounds INTEGER NOT NULL DEFAULT 0,
      combo INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (user_id, mode_id)
    );
  `);
}

async function verifyGoogleToken(credential) {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) throw new Error('Google OAuth not configured');
  const client = new OAuth2Client(clientId);
  const ticket = await client.verifyIdToken({ idToken: credential, audience: clientId });
  const payload = ticket.getPayload();
  if (!payload?.sub) throw new Error('Invalid Google token');
  return {
    googleId: payload.sub,
    email: payload.email,
    displayName: payload.name,
    photoUrl: payload.picture,
  };
}

async function upsertProfile(pool, profile) {
  const existing = await pool.query(
    'SELECT id, email, display_name, photo_url, achievements, stats FROM user_profiles WHERE google_id = $1',
    [profile.googleId]
  );

  if (existing.rows.length) {
    await pool.query(
      'UPDATE user_profiles SET email=$1, display_name=$2, photo_url=$3, updated_at=now() WHERE google_id=$4',
      [profile.email, profile.displayName, profile.photoUrl, profile.googleId]
    );
    return existing.rows[0];
  }

  const inserted = await pool.query(
    `INSERT INTO user_profiles (google_id, email, display_name, photo_url)
     VALUES ($1,$2,$3,$4) RETURNING id, email, display_name, photo_url, achievements, stats`,
    [profile.googleId, profile.email, profile.displayName, profile.photoUrl]
  );
  return inserted.rows[0];
}

async function getUserScores(pool, userId) {
  const scores = await pool.query(
    'SELECT mode_id, score, rounds, combo, updated_at FROM user_scores WHERE user_id = $1',
    [userId]
  );
  return Object.fromEntries(
    scores.rows.map((r) => [r.mode_id, { score: r.score, rounds: r.rounds, combo: r.combo, date: r.updated_at }])
  );
}

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const pool = getPool();
  try {
    await ensureSchema(pool);
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const {
      action,
      credential,
      modeId,
      score,
      rounds,
      combo,
      strikes,
      won,
      runStats,
      scenariosCompleted,
    } = body;

    if (action === 'signin') {
      const profile = await verifyGoogleToken(credential);
      const user = await upsertProfile(pool, profile);
      const scores = await getUserScores(pool, user.id);

      return json(res, 200, {
        user: {
          id: user.id,
          googleId: profile.googleId,
          email: profile.email || user.email,
          displayName: profile.displayName || user.display_name,
          photoURL: profile.photoUrl || user.photo_url,
        },
        progress: {
          achievements: user.achievements || [],
          stats: user.stats || {},
          scores,
        },
      });
    }

    if (action === 'save_run') {
      const profile = await verifyGoogleToken(credential);
      const user = await upsertProfile(pool, profile);

      const stats = { ...(user.stats || {}) };
      stats.totalRuns = (stats.totalRuns || 0) + 1;
      stats.totalRounds = (stats.totalRounds || 0) + (rounds || 0);
      stats.bestRunScore = Math.max(stats.bestRunScore || 0, score || 0);
      stats.modesPlayed = [...new Set([...(stats.modesPlayed || []), modeId])];
      stats.bestRounds = { ...(stats.bestRounds || {}), [modeId]: Math.max(stats.bestRounds?.[modeId] || 0, rounds || 0) };
      stats.bestCombo = { ...(stats.bestCombo || {}), [modeId]: Math.max(stats.bestCombo?.[modeId] || 0, combo || 0) };
      if (won) {
        stats.victories = { ...(stats.victories || {}), [modeId]: (stats.victories?.[modeId] || 0) + 1 };
        if (strikes === 0) stats.perfectWins = (stats.perfectWins || 0) + 1;
      }

      const { achievements, newlyUnlocked } = evaluateNewAchievements(
        { achievements: user.achievements || [] },
        {
          totalRounds: stats.totalRounds,
          scenariosCompleted,
          victories: stats.victories,
          bestCombo: stats.bestCombo,
          bestRunScore: stats.bestRunScore,
          modesPlayed: stats.modesPlayed,
          perfectWins: stats.perfectWins,
          bestRounds: stats.bestRounds,
          runStats,
          won,
          modeId,
        }
      );

      await pool.query(
        'UPDATE user_profiles SET achievements=$1, stats=$2, updated_at=now() WHERE id=$3',
        [JSON.stringify(achievements), JSON.stringify(stats), user.id]
      );

      await pool.query(
        `INSERT INTO user_scores (user_id, mode_id, score, rounds, combo, updated_at)
         VALUES ($1,$2,$3,$4,$5,now())
         ON CONFLICT (user_id, mode_id)
         DO UPDATE SET
           score = GREATEST(user_scores.score, EXCLUDED.score),
           rounds = GREATEST(user_scores.rounds, EXCLUDED.rounds),
           combo = GREATEST(user_scores.combo, EXCLUDED.combo),
           updated_at = now()`,
        [user.id, modeId, score || 0, rounds || 0, combo || 0]
      );

      const scores = await getUserScores(pool, user.id);
      return json(res, 200, { newlyUnlocked, progress: { achievements, stats, scores } });
    }

    return json(res, 400, { error: 'Unknown action' });
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: err.message || 'Server error' });
  } finally {
    await pool.end();
  }
}
