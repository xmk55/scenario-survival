import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import {
  playSound,
  unlockAudio,
  startHorrorAmbience,
  stopHorrorAmbience,
  playRandomSound,
  getSoundCatalog,
} from '../services/soundEngine';

const SoundContext = createContext(null);

const STORAGE_ENABLED = 'scenario-survival-sound-enabled';
const STORAGE_VOLUME = 'scenario-survival-sound-volume';

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(() => localStorage.getItem(STORAGE_ENABLED) !== 'false');
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem(STORAGE_VOLUME);
    return saved ? parseFloat(saved) : 0.5;
  });
  const ambienceActive = useRef(false);

  const play = useCallback((name) => {
    if (!enabled) return;
    playSound(name, volume);
  }, [enabled, volume]);

  const playRandom = useCallback((names) => {
    if (!enabled) return;
    playRandomSound(names, volume);
  }, [enabled, volume]);

  const beginHorrorAmbience = useCallback(() => {
    if (!enabled || ambienceActive.current) return;
    ambienceActive.current = true;
    startHorrorAmbience(volume * 0.85);
  }, [enabled, volume]);

  const endHorrorAmbience = useCallback(() => {
    if (!ambienceActive.current) return;
    ambienceActive.current = false;
    stopHorrorAmbience();
  }, []);

  const saveSoundSettings = useCallback((newEnabled, newVolume) => {
    setEnabled(newEnabled);
    setVolume(newVolume);
    localStorage.setItem(STORAGE_ENABLED, String(newEnabled));
    localStorage.setItem(STORAGE_VOLUME, String(newVolume));
    if (!newEnabled) {
      ambienceActive.current = false;
      stopHorrorAmbience();
    }
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

  useEffect(() => () => {
    ambienceActive.current = false;
    stopHorrorAmbience();
  }, []);

  return (
    <SoundContext.Provider value={{
      enabled,
      volume,
      play,
      playRandom,
      beginHorrorAmbience,
      endHorrorAmbience,
      saveSoundSettings,
      unlock,
      soundCatalog: getSoundCatalog(),
    }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
