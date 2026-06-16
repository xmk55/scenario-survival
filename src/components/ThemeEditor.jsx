import {
  THEME_COLOR_KEYS,
  EMOJI_PRESETS,
  EMOJI_SPEED_OPTIONS,
  BACKGROUND_PATTERNS,
} from '../data/themePresets';

const QUICK_EMOJIS = ['✨', '👻', '💀', '🌙', '⚡', '🔥', '💎', '🎮', '👾', '🌿', '💖', '🌊', '🚀', '⭐', '🩸', '🦇'];

export default function ThemeEditor({ theme, onChange, onSave, onClose }) {
  const effects = theme.effects || {};

  const updateColor = (key, value) => {
    onChange({
      ...theme,
      colors: { ...theme.colors, [key]: value },
    });
  };

  const updateEffect = (key, value) => {
    onChange({
      ...theme,
      effects: { ...theme.effects, [key]: value },
    });
  };

  const updateName = (name) => {
    onChange({ ...theme, name });
  };

  const applyEmojiPreset = (presetKey) => {
    updateEffect('emojiSet', EMOJI_PRESETS[presetKey]);
  };

  const addEmoji = (emoji) => {
    const current = effects.emojiSet || '';
    if (current.includes(emoji)) return;
    updateEffect('emojiSet', `${current} ${emoji}`.trim());
  };

  const removeEmoji = (emoji) => {
    const next = (effects.emojiSet || '').split(/\s+/).filter((e) => e !== emoji).join(' ');
    updateEffect('emojiSet', next);
  };

  const activeEmojis = (effects.emojiSet || '').split(/\s+/).filter(Boolean);

  return (
    <div className="theme-editor-overlay" onClick={onClose}>
      <div className="theme-editor" onClick={(e) => e.stopPropagation()}>
        <div className="theme-editor-header">
          <h2>Theme Editor</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="theme-editor-body">
          <label className="field-label">
            Theme Name
            <input
              type="text"
              value={theme.name}
              onChange={(e) => updateName(e.target.value)}
              className="text-input"
            />
          </label>

          <div className="color-grid">
            {THEME_COLOR_KEYS.map(({ key, label }) => (
              <label key={key} className="color-field">
                <span>{label}</span>
                <div className="color-input-row">
                  <input
                    type="color"
                    value={theme.colors[key]?.slice(0, 7) || '#000000'}
                    onChange={(e) => updateColor(key, e.target.value)}
                  />
                  <input
                    type="text"
                    value={theme.colors[key] || ''}
                    onChange={(e) => updateColor(key, e.target.value)}
                    className="color-text-input"
                  />
                </div>
              </label>
            ))}
          </div>

          <div className="effects-section">
            <h3>Visual Effects</h3>
            <label className="toggle-field">
              <input
                type="checkbox"
                checked={effects.scanlines}
                onChange={(e) => updateEffect('scanlines', e.target.checked)}
              />
              Scanlines
            </label>
            <label className="toggle-field">
              <input
                type="checkbox"
                checked={effects.crtFlicker}
                onChange={(e) => updateEffect('crtFlicker', e.target.checked)}
              />
              CRT Flicker
            </label>
            <label className="toggle-field">
              <input
                type="checkbox"
                checked={effects.vignette}
                onChange={(e) => updateEffect('vignette', e.target.checked)}
              />
              Vignette Overlay
            </label>
            <label className="toggle-field">
              <input
                type="checkbox"
                checked={effects.noiseOverlay}
                onChange={(e) => updateEffect('noiseOverlay', e.target.checked)}
              />
              Film Noise
            </label>
            <label className="field-label">
              Border Radius
              <input
                type="text"
                value={effects.borderRadius}
                onChange={(e) => updateEffect('borderRadius', e.target.value)}
                className="text-input"
              />
            </label>
            <label className="field-label">
              Glow Intensity (0-1)
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={effects.glowIntensity}
                onChange={(e) => updateEffect('glowIntensity', e.target.value)}
              />
            </label>
            <label className="field-label">
              Background Pattern
              <select
                className="text-input"
                value={effects.backgroundPattern || 'none'}
                onChange={(e) => updateEffect('backgroundPattern', e.target.value)}
              >
                {BACKGROUND_PATTERNS.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="effects-section emoji-section">
            <h3>Floating Emojis</h3>
            <p className="settings-desc">Emojis drift in the background to match your theme vibe.</p>
            <label className="toggle-field">
              <input
                type="checkbox"
                checked={effects.floatingEmojis}
                onChange={(e) => updateEffect('floatingEmojis', e.target.checked)}
              />
              Enable Floating Emojis
            </label>

            <label className="field-label">
              Emoji Presets
              <div className="emoji-preset-row">
                {Object.entries(EMOJI_PRESETS).map(([key, emojis]) => (
                  <button
                    key={key}
                    type="button"
                    className="emoji-preset-btn"
                    onClick={() => applyEmojiPreset(key)}
                    title={key}
                  >
                    {emojis.split(' ').slice(0, 3).join(' ')}
                  </button>
                ))}
              </div>
            </label>

            <label className="field-label">
              Active Emojis
              <div className="emoji-chip-list">
                {activeEmojis.map((emoji) => (
                  <span key={emoji} className="emoji-chip">
                    {emoji}
                    <button type="button" onClick={() => removeEmoji(emoji)} aria-label={`Remove ${emoji}`}>×</button>
                  </span>
                ))}
                {activeEmojis.length === 0 && <span className="settings-note">No emojis selected</span>}
              </div>
            </label>

            <label className="field-label">
              Add Emojis
              <div className="emoji-picker-row">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="emoji-pick-btn"
                    onClick={() => addEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={effects.emojiSet || ''}
                onChange={(e) => updateEffect('emojiSet', e.target.value)}
                placeholder="Or type emojis separated by spaces"
                className="text-input"
              />
            </label>

            <label className="field-label">
              Emoji Count ({effects.emojiCount})
              <input
                type="range"
                min="4"
                max="30"
                step="1"
                value={effects.emojiCount ?? 14}
                onChange={(e) => updateEffect('emojiCount', parseInt(e.target.value, 10))}
              />
            </label>
            <label className="field-label">
              Float Speed
              <select
                className="text-input"
                value={effects.emojiSpeed || 'normal'}
                onChange={(e) => updateEffect('emojiSpeed', e.target.value)}
              >
                {EMOJI_SPEED_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Emoji Opacity ({effects.emojiOpacity})
              <input
                type="range"
                min="0.03"
                max="0.4"
                step="0.01"
                value={effects.emojiOpacity ?? 0.12}
                onChange={(e) => updateEffect('emojiOpacity', parseFloat(e.target.value))}
              />
            </label>
            <label className="field-label">
              Emoji Size
              <input
                type="text"
                value={effects.emojiSize || '1.4rem'}
                onChange={(e) => updateEffect('emojiSize', e.target.value)}
                className="text-input"
                placeholder="e.g. 1.4rem"
              />
            </label>
          </div>

          <div className="theme-preview">
            <h3>Preview</h3>
            <div className="preview-card">
              <div className="preview-header">Scenario Survival</div>
              <div className="preview-body">
                <p className="preview-text">The shadows move on their own...</p>
                <div className="preview-option">Option one</div>
                <div className="preview-option">Option two</div>
                {effects.floatingEmojis && activeEmojis.length > 0 && (
                  <div className="preview-emojis">
                    {activeEmojis.slice(0, 4).map((e) => (
                      <span key={e} style={{ opacity: effects.emojiOpacity }}>{e}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="theme-editor-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSave(theme)}>Save Theme</button>
        </div>
      </div>
    </div>
  );
}
