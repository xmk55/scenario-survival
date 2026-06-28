import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { isCloudConfigured } from '../lib/supabase';
import { saveHighScore } from '../data/gameModes';
import { ACHIEVEMENTS } from '../data/achievements';

const AuthContext = createContext(null);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const API_BASE = import.meta.env.VITE_API_BASE || '';

async function callUserApi(payload) {
  const res = await fetch(`${API_BASE}/api/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function AuthInner({ children }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [newAchievements, setNewAchievements] = useState([]);
  const [credential, setCredential] = useState(null);

  const isConfigured = isCloudConfigured && Boolean(GOOGLE_CLIENT_ID);

  const applyProgressToLocal = useCallback((cloudProgress) => {
    if (!cloudProgress?.scores) return;
    Object.entries(cloudProgress.scores).forEach(([modeId, data]) => {
      saveHighScore(modeId, data.score || 0, { rounds: data.rounds, combo: data.combo });
    });
  }, []);

  const completeSignIn = useCallback((data, token) => {
    setUser({
      id: data.user.id,
      googleId: data.user.googleId,
      email: data.user.email,
      displayName: data.user.displayName,
      photoURL: data.user.photoURL,
    });
    setCredential(token);
    setProgress(data.progress);
    applyProgressToLocal(data.progress);
    localStorage.setItem('scenario-survival-auth', JSON.stringify({
      credential: token,
      user: data.user,
    }));
  }, [applyProgressToLocal]);

  const signInWithGoogleToken = useCallback(async (idToken) => {
    if (!idToken) return null;
    setLoading(true);
    setAuthError(null);
    try {
      const data = await callUserApi({ action: 'signin', credential: idToken });
      completeSignIn(data, idToken);
      return data.user;
    } catch (err) {
      setAuthError(err.message || 'Sign-in failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, [completeSignIn]);

  useEffect(() => {
    const raw = localStorage.getItem('scenario-survival-auth');
    if (!raw || !GOOGLE_CLIENT_ID) return;
    try {
      const saved = JSON.parse(raw);
      if (saved.credential) {
        signInWithGoogleToken(saved.credential).catch(() => {
          localStorage.removeItem('scenario-survival-auth');
        });
      }
    } catch {
      localStorage.removeItem('scenario-survival-auth');
    }
  }, [signInWithGoogleToken]);

  const signOut = useCallback(() => {
    setUser(null);
    setProgress(null);
    setCredential(null);
    setNewAchievements([]);
    localStorage.removeItem('scenario-survival-auth');
  }, []);

  const applyRunResult = useCallback((result) => {
    if (result?.progress) {
      setProgress(result.progress);
      applyProgressToLocal(result.progress);
    }
    if (result?.newlyUnlocked?.length) {
      setNewAchievements((prev) => [...new Set([...prev, ...result.newlyUnlocked])]);
    }
  }, [applyProgressToLocal]);

  const saveRunToCloud = useCallback(async (runPayload) => {
    if (!user || !credential) {
      saveHighScore(runPayload.modeId, runPayload.score, { rounds: runPayload.rounds, combo: runPayload.combo });
      return { newlyUnlocked: [], progress: null };
    }
    try {
      const data = await callUserApi({ action: 'save_run', credential, ...runPayload });
      applyRunResult(data);
      return data;
    } catch {
      saveHighScore(runPayload.modeId, runPayload.score, { rounds: runPayload.rounds, combo: runPayload.combo });
      return { newlyUnlocked: [], progress: null };
    }
  }, [user, credential, applyRunResult]);

  const clearNewAchievements = useCallback(() => setNewAchievements([]), []);

  const unlockedAchievements = useMemo(() => {
    const ids = new Set(progress?.achievements || []);
    return ACHIEVEMENTS.map((a) => ({ ...a, unlocked: ids.has(a.id) }));
  }, [progress]);

  const value = useMemo(() => ({
    user,
    progress,
    loading,
    authError,
    isConfigured,
    isFirebaseConfigured: isConfigured,
    googleClientId: GOOGLE_CLIENT_ID,
    signInWithGoogleToken,
    signOut,
    applyRunResult,
    saveRunToCloud,
    unlockedAchievements,
    newAchievements,
    clearNewAchievements,
  }), [
    user, progress, loading, authError, isConfigured,
    signInWithGoogleToken, signOut, applyRunResult, saveRunToCloud,
    unlockedAchievements, newAchievements, clearNewAchievements,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }) {
  if (!GOOGLE_CLIENT_ID) {
    return <AuthInner>{children}</AuthInner>;
  }
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthInner>{children}</AuthInner>
    </GoogleOAuthProvider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
