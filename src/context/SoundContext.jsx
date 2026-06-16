import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { playSound, unlockAudio } from '../services/soundEngine';

const SoundContext = createContext(null);

const STORAGE_ENABLED = 'scenario-survival-sound-enabled';
const STORAGE_VOLUME = 'scenario-survival-sound-volume';

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(() => localStorage.getItem(STORAGE_ENABLED) !== 'false');
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem(STORAGE_VOLUME);
    return saved ? parseFloat(saved) : 0.5;
  });

  const play = useCallback((name) => {
    if (!enabled) return;
    playSound(name, volume);
  }, [enabled, volume]);

  const saveSoundSettings = useCallback((newEnabled, newVolume) => {
    setEnabled(newEnabled);
    setVolume(newVolume);
    localStorage.setItem(STORAGE_ENABLED, String(newEnabled));
    localStorage.setItem(STORAGE_VOLUME, String(newVolume));
  }, []);

  const unlock = useCallback(() => unlockAudio(), []);

  useEffect(() => {
    const handler = () => unlockAudio();
    window.addEventListener('click', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('keydown', handler);
    };
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, volume, play, saveSoundSettings, unlock }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
