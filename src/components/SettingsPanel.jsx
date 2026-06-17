import { useState } from 'react';
import ThemeEditor from './ThemeEditor';
import { createCustomTheme } from '../data/themePresets';
import { useSound } from '../context/SoundContext';
import { playSound, unlockAudio } from '../services/soundEngine';
import { getAvailableScenarioCount } from '../services/scenarioGenerator';

export default function SettingsPanel({
  theme,
  allThemes,
  applyTheme,
  saveCustomTheme,
  updateCustomTheme,
  deleteCustomTheme,
  apiKey,
  useAi,
  allowRepeats,
  saveApiSettings,
  onClose,
}) {
  const { enabled: soundEnabled, volume, play, saveSoundSettings, soundCatalog } = useSound();
  const [editingTheme, setEditingTheme] = useState(null);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localUseAi, setLocalUseAi] = useState(useAi);
  const [localAllowRepeats, setLocalAllowRepeats] = useState(allowRepeats);
  const [localSoundEnabled, setLocalSoundEnabled] = useState(soundEnabled);
  const [localVolume, setLocalVolume] = useState(volume);

  const handleSaveTheme = (themeData) => {
    if (themeData.id.startsWith('custom-')) {
      updateCustomTheme(themeData);
    } else {
      saveCustomTheme(themeData.name, themeData);
    }
    setEditingTheme(null);
    play('poof');
  };

  const handleCreateTheme = () => {
    setEditingTheme(createCustomTheme('My Custom Theme', theme));
    play('click');
  };

  const handleSaveSettings = () => {
    saveApiSettings(localApiKey, localUseAi, localAllowRepeats);
    saveSoundSettings(localSoundEnabled, localVolume);
    play('continue');
    onClose();
  };

  const testSound = (name) => {
    if (!localSoundEnabled) return;
    unlockAudio();
    playSound(name, localVolume);
  };

  return (
    <>
      <div className="settings-overlay" onClick={onClose}>
        <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
          <div className="settings-header">
            <h2>Settings</h2>
            <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>

          <div className="settings-body">
            <section className="settings-section">
              <h3>Sound Effects</h3>
              <p className="settings-desc">
                60+ 8-bit sounds across UI, gameplay, arcade, everyday life, and horror — plus ambient dread in Horror mode.
              </p>
              <label className="toggle-field">
                <input
                  type="checkbox"
                  checked={localSoundEnabled}
                  onChange={(e) => setLocalSoundEnabled(e.target.checked)}
                />
                Enable 8-bit sound effects
              </label>
              <label className="field-label">
                Volume ({Math.round(localVolume * 100)}%)
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={localVolume}
                  onChange={(e) => setLocalVolume(parseFloat(e.target.value))}
                />
              </label>
              <div className="sound-catalog">
                {Object.entries(soundCatalog).map(([category, sounds]) => (
                  <div key={category} className="sound-catalog-group">
                    <h4 className="sound-catalog-label">{category}</h4>
                    <div className="sound-test-row">
                      {sounds.map((name) => (
                        <button
                          key={name}
                          type="button"
                          className={`btn btn-secondary small-btn sound-test-btn ${category === 'horror' ? 'horror-sound-btn' : ''}`}
                          onClick={() => testSound(name)}
                          title={name}
                        >
                          {name.replace(/([A-Z])/g, ' $1').trim()}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="settings-section">
              <h3>Themes</h3>
              <p className="settings-desc">Choose a preset or create your own custom theme.</p>
              <div className="theme-list">
                {allThemes.map((t) => (
                  <div key={t.id} className={`theme-card ${theme.id === t.id ? 'active' : ''}`}>
                    <button
                      className="theme-card-main"
                      onClick={() => { applyTheme(t); play('click'); }}
                    >
                      <div className="theme-swatch">
                        <span style={{ background: t.colors.bg }} />
                        <span style={{ background: t.colors.accent }} />
                        <span style={{ background: t.colors.ascii }} />
                        <span style={{ background: t.colors.surface }} />
                      </div>
                      <span className="theme-name">{t.name}</span>
                      {t.effects?.floatingEmojis && (
                        <span className="theme-emoji-hint" title="Floating emojis enabled">
                          {(t.effects.emojiSet || '').split(' ').slice(0, 2).join('')}
                        </span>
                      )}
                      {theme.id === t.id && <span className="theme-active-badge">Active</span>}
                    </button>
                    {t.id.startsWith('custom-') && (
                      <div className="theme-card-actions">
                        <button className="icon-btn small" onClick={() => setEditingTheme({ ...t })} title="Edit">✎</button>
                        <button className="icon-btn small danger" onClick={() => deleteCustomTheme(t.id)} title="Delete">🗑</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="btn btn-secondary full-width" onClick={handleCreateTheme}>
                + Create Custom Theme
              </button>
            </section>

            <section className="settings-section">
              <h3>Gameplay</h3>
              <p className="settings-desc">
                Each run tracks scenarios you have already seen. With repeats off, you get a fresh scenario every round until the pool runs out ({getAvailableScenarioCount('survival')} unique local variants across all modes).
              </p>
              <label className="toggle-field">
                <input
                  type="checkbox"
                  checked={localAllowRepeats}
                  onChange={(e) => setLocalAllowRepeats(e.target.checked)}
                />
                Allow repeat scenarios
              </label>
              <p className="settings-note">
                {localAllowRepeats
                  ? 'Scenarios you have already played may appear again during a run.'
                  : 'You will not see the same scenario twice in one run (pool refreshes after all unique scenarios are used).'}
              </p>
            </section>

            <section className="settings-section">
              <h3>AI Scenarios</h3>
              <p className="settings-desc">
                Enable AI-generated scenarios using OpenAI. Without an API key, the game uses a built-in scenario engine.
              </p>
              <label className="toggle-field">
                <input
                  type="checkbox"
                  checked={localUseAi}
                  onChange={(e) => setLocalUseAi(e.target.checked)}
                />
                Use AI-generated scenarios
              </label>
              <label className="field-label">
                OpenAI API Key
                <input
                  type="password"
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="text-input"
                />
              </label>
              <p className="settings-note">Your API key is stored locally in your browser only.</p>
            </section>
          </div>

          <div className="settings-footer">
            <button className="btn btn-primary full-width" onClick={handleSaveSettings}>
              Save Settings
            </button>
          </div>
        </div>
      </div>

      {editingTheme && (
        <ThemeEditor
          theme={editingTheme}
          onChange={setEditingTheme}
          onSave={handleSaveTheme}
          onClose={() => setEditingTheme(null)}
        />
      )}
    </>
  );
}
