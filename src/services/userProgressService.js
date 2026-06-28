import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { getHighScores, saveHighScore } from '../data/gameModes';
import { evaluateNewAchievements } from '../data/achievements';

const DEFAULT_PROGRESS = {
  scores: {},
  achievements: [],
  stats: {
    totalRuns: 0,
    totalRounds: 0,
    perfectWins: 0,
    modesPlayed: [],
    victories: {},
    bestRounds: {},
    bestCombo: {},
    bestRunScore: 0,
  },
};

function mergeScores(local, remote) {
  const merged = { ...remote };
  for (const [modeId, localScore] of Object.entries(local)) {
    const remoteScore = merged[modeId];
    if (!remoteScore || (localScore.score || 0) > (remoteScore.score || 0)) {
      merged[modeId] = localScore;
    }
  }
  return merged;
}

export async function loadUserProgress(uid) {
  if (!isFirebaseConfigured || !uid) return null;

  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  const localScores = getHighScores();

  if (!snap.exists()) {
    const initial = {
      ...DEFAULT_PROGRESS,
      scores: localScores,
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, initial);
    return initial;
  }

  const remote = snap.data();
  const mergedScores = mergeScores(localScores, remote.scores || {});
  Object.entries(mergedScores).forEach(([modeId, data]) => {
    saveHighScore(modeId, data.score || 0, { rounds: data.rounds, combo: data.combo });
  });

  return {
    scores: mergedScores,
    achievements: remote.achievements || [],
    stats: { ...DEFAULT_PROGRESS.stats, ...remote.stats },
  };
}

export async function saveRunProgress(uid, {
  modeId,
  score,
  rounds,
  combo,
  strikes,
  maxStrikes,
  won,
  runStats,
  scenariosCompleted = 0,
}) {
  if (!isFirebaseConfigured || !uid) {
    saveHighScore(modeId, score, { rounds, combo });
    return { newlyUnlocked: [], progress: null };
  }

  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  const existing = snap.exists()
    ? snap.data()
    : { ...DEFAULT_PROGRESS, scores: getHighScores() };

  const stats = { ...DEFAULT_PROGRESS.stats, ...existing.stats };
  stats.totalRuns += 1;
  stats.totalRounds += rounds;
  stats.bestRunScore = Math.max(stats.bestRunScore || 0, score);
  stats.modesPlayed = [...new Set([...(stats.modesPlayed || []), modeId])];
  stats.bestRounds = {
    ...stats.bestRounds,
    [modeId]: Math.max(stats.bestRounds?.[modeId] || 0, rounds),
  };
  stats.bestCombo = {
    ...stats.bestCombo,
    [modeId]: Math.max(stats.bestCombo?.[modeId] || 0, combo || 0),
  };

  if (won) {
    stats.victories = { ...stats.victories, [modeId]: (stats.victories?.[modeId] || 0) + 1 };
    if (strikes === 0) stats.perfectWins = (stats.perfectWins || 0) + 1;
  }

  const scores = { ...existing.scores, ...getHighScores() };
  const current = scores[modeId] || { score: 0, rounds: 0, combo: 0 };
  if (score > (current.score || 0)) {
    scores[modeId] = {
      score,
      rounds,
      combo: combo || 0,
      date: new Date().toISOString(),
    };
    saveHighScore(modeId, score, { rounds, combo });
  }

  const runContext = {
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
  };

  const { achievements, newlyUnlocked } = evaluateNewAchievements(
    { achievements: existing.achievements || [] },
    runContext
  );

  const payload = {
    scores,
    achievements,
    stats,
    displayName: existing.displayName,
    photoURL: existing.photoURL,
    updatedAt: serverTimestamp(),
  };

  await setDoc(ref, payload, { merge: true });
  return { newlyUnlocked, progress: payload };
}

export async function syncUserProfile(uid, profile) {
  if (!isFirebaseConfigured || !uid) return;
  const ref = doc(db, 'users', uid);
  await setDoc(ref, {
    displayName: profile.displayName || '',
    photoURL: profile.photoURL || '',
    email: profile.email || '',
    updatedAt: serverTimestamp(),
  }, { merge: true });
}
