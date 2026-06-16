import { useState, useEffect, useCallback } from 'react';
import { THEME_PRESETS, DEFAULT_THEME, themeToCssVars, createCustomTheme, normalizeTheme } from '../data/themePresets';

const STORAGE_KEY = 'scenario-survival-theme';
const CUSTOM_THEMES_KEY = 'scenario-survival-custom-themes';

export function useTheme() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [customThemes, setCustomThemes] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedCustom = localStorage.getItem(CUSTOM_THEMES_KEY);
      if (savedCustom) setCustomThemes(JSON.parse(savedCustom));
      if (saved) {
        const parsed = JSON.parse(saved);
        const all = [...THEME_PRESETS, ...(savedCustom ? JSON.parse(savedCustom) : [])];
        const found = all.find((t) => t.id === parsed.id);
        if (found) setTheme(normalizeTheme(found));
      }
    } catch {
      /* use default */
    }
  }, []);

  useEffect(() => {
    const vars = themeToCssVars(theme);
    const root = document.documentElement;
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
    root.setAttribute('data-scanlines', String(theme.effects.scanlines));
    root.setAttribute('data-crt', String(theme.effects.crtFlicker));
    root.setAttribute('data-vignette', String(theme.effects.vignette));
    root.setAttribute('data-noise', String(theme.effects.noiseOverlay));
    root.setAttribute('data-bg-pattern', theme.effects.backgroundPattern || 'none');
  }, [theme]);

  const applyTheme = useCallback((newTheme) => {
    const normalized = normalizeTheme(newTheme);
    setTheme(normalized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: normalized.id }));
  }, []);

  const saveCustomTheme = useCallback((name, themeData) => {
    const custom = createCustomTheme(name, themeData);
    setCustomThemes((prev) => {
      const updated = [...prev.filter((t) => t.id !== custom.id), custom];
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(updated));
      return updated;
    });
    applyTheme(custom);
    return custom;
  }, [applyTheme]);

  const updateCustomTheme = useCallback((updated) => {
    const normalized = normalizeTheme(updated);
    setCustomThemes((prev) => {
      const next = prev.map((t) => (t.id === normalized.id ? normalized : t));
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(next));
      return next;
    });
    setTheme(normalized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: normalized.id }));
  }, []);

  const deleteCustomTheme = useCallback((id) => {
    setCustomThemes((prev) => {
      const next = prev.filter((t) => t.id !== id);
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(next));
      return next;
    });
    if (theme.id === id) applyTheme(DEFAULT_THEME);
  }, [theme.id, applyTheme]);

  const allThemes = [...THEME_PRESETS, ...customThemes];

  return {
    theme,
    customThemes,
    allThemes,
    applyTheme,
    saveCustomTheme,
    updateCustomTheme,
    deleteCustomTheme,
  };
}
