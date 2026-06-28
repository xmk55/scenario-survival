import { useState } from 'react';
import { useSound } from '../context/SoundContext';
import { STANDARD_MODES, SPECIAL_MODES, getHighScores } from '../data/gameModes';

export default function TitleScreen({ onStart, onSettings, onSignIn, user }) {
  const { play, unlock } = useSound();
  const [selectedMode, setSelectedMode] = useState('survival');
  const highScores = getHighScores();

  const handleStart = () => {
    unlock();
    const horrorModes = ['horror', 'let_them_in'];
    play(horrorModes.includes(selectedMode) ? 'horrorStart' : 'start');
    onStart(selectedMode);
  };

  const handleSettings = () => {
    unlock();
    play('open');
    onSettings();
  };

  const selectMode = (id) => {
    play(['horror', 'let_them_in'].includes(id) ? 'horrorSelect' : 'click');
    setSelectedMode(id);
  };

  const selected = [...STANDARD_MODES, ...SPECIAL_MODES].find((m) => m.id === selectedMode);

  const renderModeCard = (mode) => {
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
          Real-life dilemmas, impossible choices, quiz modes, and doppelgangers at the door — all in ASCII.
        </p>

        <div className="title-features">
          <div className="feature-chip">12 Game Modes</div>
          <div className="feature-chip">POV + Scene Views</div>
          <div className="feature-chip">Custom Themes</div>
          <div className="feature-chip">8-Bit Sounds</div>
        </div>

        <section className="mode-select-section">
          <h2 className="mode-select-title">Classic Modes</h2>
          <div className="mode-grid mode-grid-classic">
            {STANDARD_MODES.map(renderModeCard)}
          </div>

          <h2 className="mode-select-title mode-select-subtitle">Special Modes</h2>
          <div className="mode-grid mode-grid-special">
            {SPECIAL_MODES.map(renderModeCard)}
          </div>

          <p className="mode-description">{selected?.description}</p>
        </section>

        <div className="title-actions">
          <button className="btn btn-primary btn-large" onClick={handleStart}>
            {['horror', 'let_them_in'].includes(selectedMode) ? 'Enter the Nightmare' : 'Start Playing'}
          </button>
          <button className="btn btn-secondary" onClick={handleSettings}>
            Settings & Themes
          </button>
          <button type="button" className="btn btn-secondary btn-account" onClick={() => { unlock(); play('open'); onSignIn?.(); }}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="title-user-avatar" referrerPolicy="no-referrer" />
            ) : null}
            {user ? 'Account & Achievements' : 'Sign In / Save Scores'}
          </button>
        </div>

        <p className="title-hint">Press 1, 2, or 3 during gameplay · 3 strikes ends most runs</p>
      </div>
    </div>
  );
}
