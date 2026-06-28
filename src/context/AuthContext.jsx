import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../lib/firebase';
import { loadUserProgress, syncUserProfile } from '../services/userProgressService';
import { ACHIEVEMENTS } from '../data/achievements';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [authError, setAuthError] = useState(null);
  const [newAchievements, setNewAchievements] = useState([]);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthError(null);
      if (firebaseUser) {
        try {
          await syncUserProfile(firebaseUser.uid, {
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            email: firebaseUser.email,
          });
          const data = await loadUserProgress(firebaseUser.uid);
          setProgress(data);
        } catch (err) {
          setAuthError(err.message || 'Failed to load profile');
        }
      } else {
        setProgress(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured) {
      setAuthError('Cloud save is not configured. Add Firebase keys to enable sign-in.');
      return null;
    }
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Sign-in failed');
      }
      return null;
    }
  }, []);

  const signOut = useCallback(async () => {
    if (!isFirebaseConfigured) return;
    await firebaseSignOut(auth);
    setProgress(null);
    setNewAchievements([]);
  }, []);

  const refreshProgress = useCallback(async () => {
    if (!user) return;
    const data = await loadUserProgress(user.uid);
    setProgress(data);
  }, [user]);

  const applyRunResult = useCallback((result) => {
    if (result?.progress) {
      setProgress(result.progress);
    }
    if (result?.newlyUnlocked?.length) {
      setNewAchievements((prev) => [...new Set([...prev, ...result.newlyUnlocked])]);
    }
  }, []);

  const clearNewAchievements = useCallback(() => {
    setNewAchievements([]);
  }, []);

  const unlockedAchievements = useMemo(() => {
    const ids = new Set(progress?.achievements || []);
    return ACHIEVEMENTS.map((a) => ({ ...a, unlocked: ids.has(a.id) }));
  }, [progress]);

  const value = useMemo(() => ({
    user,
    progress,
    loading,
    authError,
    isFirebaseConfigured,
    signInWithGoogle,
    signOut,
    refreshProgress,
    applyRunResult,
    unlockedAchievements,
    newAchievements,
    clearNewAchievements,
  }), [
    user,
    progress,
    loading,
    authError,
    signInWithGoogle,
    signOut,
    refreshProgress,
    applyRunResult,
    unlockedAchievements,
    newAchievements,
    clearNewAchievements,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
