import { useState } from 'react';
import { useSound } from '../context/SoundContext';
import { MODE_LIST, getHighScores } from '../data/gameModes';

export default function TitleScreen({ onStart, onSettings }) {
  const { play, unlock } = useSound();
  const [selectedMode, setSelectedMode] = useState('survival');
  const highScores = getHighScores();

  const handleStart = () => {
    unlock();
    play('start');
    onStart(selectedMode);
  };

  const handleSettings = () => {
    unlock();
    play('click');
    onSettings();
  };

  const selectMode = (id) => {
    play('click');
    setSelectedMode(id);
  };

  return (
    <div className="title-screen">
      <div className="title-art">
        <pre className="title-ascii">{`
 ███████╗ ██████╗███████╗███╗   ██╗ █████╗ ██████╗ ██╗ ██████╗ 
 ██╔════╝██╔════╝██╔════╝████╗  ██║██╔══██╗██╔══██╗██║██╔═══██╗
 ███████╗██║     █████╗  ██╔██╗ ██║███████║██████╔╝██║██║   ██║
 ╚════██║██║     ██╔══╝  ██║╚██╗██║██╔══██║██╔══██╗██║██║   ██║
 ███████║╚██████╗███████╗██║ ╚████║██║  ██║██║  ██║██║╚██████╔╝
 ╚══════╝ ╚═════╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝ 
███████╗██╗   ██╗██████╗ ██╗   ██╗██╗██╗   ██╗ █████╗ ██╗     
██╔════╝██║   ██║██╔══██╗██║   ██║██║██║   ██║██╔══██╗██║     
███████╗██║   ██║██████╔╝██║   ██║██║██║   ██║███████║██║     
╚════██║██║   ██║██╔══██╗╚██╗ ██╔╝██║╚██╗ ██╔╝██╔══██║██║     
███████║╚██████╔╝██║  ██║ ╚████╔╝ ██║ ╚████╔╝ ██║  ██║███████╗
╚══════╝ ╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝`}</pre>
      </div>

      <div className="title-content">
        <p className="title-tagline">
          AI-powered survival scenarios. Three choices. One chance to live.
        </p>

        <div className="title-features">
          <div className="feature-chip">4 Game Modes</div>
          <div className="feature-chip">ASCII Art</div>
          <div className="feature-chip">Custom Themes</div>
          <div className="feature-chip">8-Bit Sounds</div>
        </div>

        <section className="mode-select-section">
          <h2 className="mode-select-title">Choose Your Mode</h2>
          <div className="mode-grid">
            {MODE_LIST.map((mode) => {
              const hs = highScores[mode.id];
              return (
                <button
                  key={mode.id}
                  type="button"
                  className={`mode-card ${selectedMode === mode.id ? 'selected' : ''}`}
                  onClick={() => selectMode(mode.id)}
                  style={{ '--mode-color': mode.color }}
                >
                  <span className="mode-icon">{mode.icon}</span>
                  <span className="mode-name">{mode.name}</span>
                  <span className="mode-tagline">{mode.tagline}</span>
                  {hs?.score > 0 && (
                    <span className="mode-highscore">Best: {hs.score.toLocaleString()}</span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="mode-description">
            {MODE_LIST.find((m) => m.id === selectedMode)?.description}
          </p>
        </section>

        <div className="title-actions">
          <button className="btn btn-primary btn-large" onClick={handleStart}>
            {selectedMode === 'horror' ? 'Enter the Nightmare' : 'Begin Survival'}
          </button>
          <button className="btn btn-secondary" onClick={handleSettings}>
            Settings & Themes
          </button>
        </div>

        <p className="title-hint">Press 1, 2, or 3 during gameplay to choose quickly</p>
      </div>
    </div>
  );
}
