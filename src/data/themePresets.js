export const EMOJI_PRESETS = {
  horror: '👻 🩸 🦇 💀 🌙 ⚰️ 🔮 👁️ 🕷️ 🖤',
  cyber: '⚡ 🤖 💾 🔮 ✨ 🎮 👾 💿 🌐 🔋',
  nature: '🌿 🦉 🍃 🌲 🍄 🦌 🌧️ ☁️ 🌸 🐛',
  classic: '📜 ✒️ 🕯️ 📖 🗝️ ☕ 🪶 🏛️ 🕰️ 📰',
  blood: '🌕 🔴 🩸 💀 🦇 ⚰️ 🔥 🗡️ ⛓️ 🖤',
  cute: '✨ 💫 ⭐ 🌟 💖 🎀 🍀 🌈 🫧 🦄',
  gaming: '🎮 👾 🕹️ 💥 🏆 ⚔️ 🛡️ 💎 🪙 🔥',
  space: '🚀 🌌 🪐 👽 🛸 ☄️ 🌟 🔭 🌙 ✨',
  ocean: '🌊 🐙 🦈 ⚓ 🐚 🏝️ 🦑 💧 🐟 🌴',
};

export const DEFAULT_EFFECTS = {
  borderRadius: '12px',
  glowIntensity: '0.6',
  scanlines: true,
  crtFlicker: false,
  floatingEmojis: true,
  emojiSet: EMOJI_PRESETS.horror,
  emojiCount: 14,
  emojiSpeed: 'normal',
  emojiOpacity: 0.12,
  emojiSize: '1.4rem',
  vignette: true,
  noiseOverlay: false,
  backgroundPattern: 'none',
};

export const DEFAULT_THEME = {
  id: 'midnight-horror',
  name: 'Midnight Horror',
  colors: {
    bg: '#0a0a0f',
    bgSecondary: '#12121a',
    bgTertiary: '#1a1a26',
    surface: '#16161f',
    surfaceHover: '#1e1e2a',
    border: '#2a2a3a',
    borderGlow: '#ff336644',
    text: '#e8e6f0',
    textMuted: '#8b8798',
    textDim: '#5c5868',
    accent: '#ff3366',
    accentSecondary: '#ff6b9d',
    accentGlow: '#ff336633',
    success: '#3dd68c',
    danger: '#ff4757',
    warning: '#ffb347',
    ascii: '#7ee8a8',
    asciiGlow: '#7ee8a833',
    optionBg: '#1a1a28',
    optionBorder: '#3a3a50',
    optionHover: '#252538',
    headerGradientStart: '#ff3366',
    headerGradientEnd: '#9933ff',
  },
  fonts: {
    body: "'Outfit', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  effects: {
    ...DEFAULT_EFFECTS,
    emojiSet: EMOJI_PRESETS.horror,
  },
};

export const THEME_PRESETS = [
  DEFAULT_THEME,
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    colors: {
      bg: '#050510',
      bgSecondary: '#0a0a1a',
      bgTertiary: '#101025',
      surface: '#0d0d20',
      surfaceHover: '#151530',
      border: '#00ffff33',
      borderGlow: '#00ffff44',
      text: '#e0f0ff',
      textMuted: '#7090b0',
      textDim: '#405070',
      accent: '#00ffff',
      accentSecondary: '#ff00ff',
      accentGlow: '#00ffff22',
      success: '#00ff88',
      danger: '#ff0055',
      warning: '#ffaa00',
      ascii: '#00ffcc',
      optionBg: '#0a0a20',
      optionBorder: '#00ffff44',
      optionHover: '#151535',
      headerGradientStart: '#00ffff',
      headerGradientEnd: '#ff00ff',
    },
    fonts: {
      body: "'Outfit', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    effects: {
      ...DEFAULT_EFFECTS,
      borderRadius: '4px',
      glowIntensity: '1',
      crtFlicker: true,
      emojiSet: EMOJI_PRESETS.cyber,
      emojiOpacity: 0.18,
      emojiSpeed: 'fast',
      backgroundPattern: 'grid',
    },
  },
  {
    id: 'forest-dusk',
    name: 'Forest Dusk',
    colors: {
      bg: '#0d1410',
      bgSecondary: '#141f18',
      bgTertiary: '#1a2820',
      surface: '#172219',
      surfaceHover: '#1f2e24',
      border: '#3a5a40',
      borderGlow: '#5a8a6044',
      text: '#d8e8d0',
      textMuted: '#8aa890',
      textDim: '#5a7060',
      accent: '#7ec850',
      accentSecondary: '#a8e070',
      accentGlow: '#7ec85033',
      success: '#5adb8a',
      danger: '#e85050',
      warning: '#e8b050',
      ascii: '#90d870',
      optionBg: '#1a2820',
      optionBorder: '#3a5a40',
      optionHover: '#243830',
      headerGradientStart: '#5a8a40',
      headerGradientEnd: '#2a5030',
    },
    fonts: {
      body: "'Outfit', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    effects: {
      ...DEFAULT_EFFECTS,
      borderRadius: '16px',
      glowIntensity: '0.3',
      scanlines: false,
      vignette: false,
      emojiSet: EMOJI_PRESETS.nature,
      emojiSpeed: 'slow',
      emojiOpacity: 0.1,
    },
  },
  {
    id: 'paper-classic',
    name: 'Paper Classic',
    colors: {
      bg: '#f5f0e8',
      bgSecondary: '#ebe5d8',
      bgTertiary: '#e0d8c8',
      surface: '#faf6ef',
      surfaceHover: '#f0ebe0',
      border: '#c8b8a0',
      borderGlow: '#8b735544',
      text: '#2a2218',
      textMuted: '#6a5a48',
      textDim: '#9a8a78',
      accent: '#8b4513',
      accentSecondary: '#a0522d',
      accentGlow: '#8b451322',
      success: '#2e7d4a',
      danger: '#b83232',
      warning: '#c87820',
      ascii: '#4a6741',
      optionBg: '#faf6ef',
      optionBorder: '#c8b8a0',
      optionHover: '#f0ebe0',
      headerGradientStart: '#8b4513',
      headerGradientEnd: '#5a3010',
    },
    fonts: {
      body: "'Outfit', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    effects: {
      ...DEFAULT_EFFECTS,
      borderRadius: '8px',
      glowIntensity: '0',
      scanlines: false,
      floatingEmojis: true,
      emojiSet: EMOJI_PRESETS.classic,
      emojiOpacity: 0.08,
      emojiCount: 10,
      emojiSpeed: 'slow',
      backgroundPattern: 'dots',
    },
  },
  {
    id: 'blood-moon',
    name: 'Blood Moon',
    colors: {
      bg: '#100808',
      bgSecondary: '#1a0e0e',
      bgTertiary: '#241414',
      surface: '#1c1010',
      surfaceHover: '#281818',
      border: '#4a2020',
      borderGlow: '#cc222244',
      text: '#f0d8d8',
      textMuted: '#a08080',
      textDim: '#705050',
      accent: '#cc2222',
      accentSecondary: '#ff4444',
      accentGlow: '#cc222233',
      success: '#44aa66',
      danger: '#ff2222',
      warning: '#cc8844',
      ascii: '#ff6666',
      optionBg: '#1c1010',
      optionBorder: '#4a2020',
      optionHover: '#2a1818',
      headerGradientStart: '#cc2222',
      headerGradientEnd: '#660000',
    },
    fonts: {
      body: "'Outfit', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    effects: {
      ...DEFAULT_EFFECTS,
      borderRadius: '10px',
      glowIntensity: '0.8',
      emojiSet: EMOJI_PRESETS.blood,
      emojiOpacity: 0.15,
      noiseOverlay: true,
    },
  },
];

export const BACKGROUND_PATTERNS = [
  { id: 'none', label: 'None' },
  { id: 'dots', label: 'Dots' },
  { id: 'grid', label: 'Grid' },
  { id: 'diagonal', label: 'Diagonal Lines' },
  { id: 'stars', label: 'Star Field' },
];

export const EMOJI_SPEED_OPTIONS = [
  { id: 'slow', label: 'Slow Drift' },
  { id: 'normal', label: 'Normal' },
  { id: 'fast', label: 'Fast Float' },
];

export const THEME_COLOR_KEYS = [
  { key: 'bg', label: 'Background' },
  { key: 'bgSecondary', label: 'Background Secondary' },
  { key: 'bgTertiary', label: 'Background Tertiary' },
  { key: 'surface', label: 'Surface' },
  { key: 'surfaceHover', label: 'Surface Hover' },
  { key: 'border', label: 'Border' },
  { key: 'borderGlow', label: 'Border Glow' },
  { key: 'text', label: 'Text' },
  { key: 'textMuted', label: 'Text Muted' },
  { key: 'textDim', label: 'Text Dim' },
  { key: 'accent', label: 'Accent' },
  { key: 'accentSecondary', label: 'Accent Secondary' },
  { key: 'accentGlow', label: 'Accent Glow' },
  { key: 'success', label: 'Success' },
  { key: 'danger', label: 'Danger' },
  { key: 'warning', label: 'Warning' },
  { key: 'ascii', label: 'ASCII Art' },
  { key: 'asciiGlow', label: 'ASCII Glow' },
  { key: 'optionBg', label: 'Option Background' },
  { key: 'optionBorder', label: 'Option Border' },
  { key: 'optionHover', label: 'Option Hover' },
  { key: 'headerGradientStart', label: 'Header Gradient Start' },
  { key: 'headerGradientEnd', label: 'Header Gradient End' },
];

export function normalizeTheme(theme) {
  if (!theme) return DEFAULT_THEME;
  return {
    ...DEFAULT_THEME,
    ...theme,
    colors: { ...DEFAULT_THEME.colors, ...theme.colors },
    fonts: { ...DEFAULT_THEME.fonts, ...theme.fonts },
    effects: { ...DEFAULT_EFFECTS, ...theme.effects },
  };
}

export function themeToCssVars(theme) {
  const normalized = normalizeTheme(theme);
  const vars = {};
  for (const [key, value] of Object.entries(normalized.colors)) {
    vars[`--color-${key}`] = value;
  }
  vars['--font-body'] = normalized.fonts.body;
  vars['--font-mono'] = normalized.fonts.mono;
  vars['--border-radius'] = normalized.effects.borderRadius;
  vars['--glow-intensity'] = normalized.effects.glowIntensity;
  vars['--emoji-opacity'] = normalized.effects.emojiOpacity;
  vars['--emoji-size'] = normalized.effects.emojiSize;
  vars['--color-asciiGlow'] = normalized.colors.asciiGlow || colorMixAsciiGlow(normalized.colors.ascii);
  return vars;
}

function colorMixAsciiGlow(asciiColor) {
  return `${asciiColor}44`;
}

export function createCustomTheme(name, baseTheme = DEFAULT_THEME) {
  return normalizeTheme({
    ...structuredClone(baseTheme),
    id: `custom-${Date.now()}`,
    name: name || 'Custom Theme',
  });
}
