import { useEffect, useRef } from 'react';
import AsciiDisplay from './AsciiDisplay';
import OptionButtons from './OptionButtons';
import { useSound } from '../context/SoundContext';

function HealthBar({ health }) {
  const color = health > 60 ? 'var(--color-success)' : health > 30 ? 'var(--color-warning)' : 'var(--color-danger)';
  return (
    <div className="health-bar">
      <span className="stat-label">Health</span>
      <div className="health-track">
        <div className="health-fill" style={{ width: `${health}%`, background: color }} />
      </div>
      <span className="stat-value">{health}%</span>
    </div>
  );
}

function TimerBar({ timeLeft, maxTime }) {
  const pct = (timeLeft / maxTime) * 100;
  const urgent = timeLeft <= 10;
  return (
    <div className={`timer-bar ${urgent ? 'urgent' : ''}`}>
      <span className="stat-label">Time</span>
      <div className="timer-track">
        <div className="timer-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="stat-value timer-value">{timeLeft}s</span>
    </div>
  );
}

function ResultBadge({ type }) {
  const labels = { good: 'Smart Move', neutral: 'Close Call', bad: 'Critical' };
  return <span className={`result-badge result-${type}`}>{labels[type] || type}</span>;
}

export default function GameScreen({
  phase,
  modeConfig,
  scenario,
  round,
  health,
  score,
  combo,
  timeLeft,
  lastResult,
  loading,
  error,
  newRecord,
  onSelectOption,
  onContinue,
  onMenu,
}) {
  const { play } = useSound();
  const prevPhase = useRef(phase);
  const prevScenarioId = useRef(null);

  const isEndless = modeConfig.endless;
  const roundLabel = isEndless
    ? `Round ${round + 1}`
    : `Round ${round + 1}/${modeConfig.maxRounds}`;

  useEffect(() => {
    if (phase === 'result' && lastResult) {
      play(lastResult.resultType === 'good' ? 'good' : lastResult.resultType === 'bad' ? 'bad' : 'neutral');
    }
  }, [phase, lastResult, play]);

  useEffect(() => {
    if (phase === 'gameover' && prevPhase.current !== 'gameover') play('gameover');
    if (phase === 'victory' && prevPhase.current !== 'victory') play('victory');
    prevPhase.current = phase;
  }, [phase, play]);

  useEffect(() => {
    if (scenario?.id && scenario.id !== prevScenarioId.current && phase === 'playing') {
      play('scenario');
      prevScenarioId.current = scenario.id;
    }
  }, [scenario?.id, phase, play]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft <= 10 && timeLeft > 0 && phase === 'playing') {
      play('tick');
    }
  }, [timeLeft, phase, play]);

  useEffect(() => {
    const handler = (e) => {
      if (phase === 'playing' && !loading && scenario) {
        const key = parseInt(e.key, 10);
        if (key >= 1 && key <= 3) {
          play('select');
          onSelectOption(key - 1);
        }
      }
      if (phase === 'result' && e.key === 'Enter') {
        play('continue');
        onContinue();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, loading, scenario, onSelectOption, onContinue, play]);

  if (phase === 'gameover') {
    return (
      <div className="end-screen end-gameover">
        <pre className="end-ascii">{`
   ╔═══════════════════════════╗
   ║                           ║
   ║      GAME OVER            ║
   ║                           ║
   ║         ✝                 ║
   ║                           ║
   ║   Your story ends here.   ║
   ╚═══════════════════════════╝`}</pre>
        <h2>{modeConfig.id === 'horror' ? 'The Darkness Claims You' : 'You Didn\'t Make It'}</h2>
        {newRecord && <span className="new-record-badge">🏆 New High Score!</span>}
        <p className="end-score">Final Score: <strong>{score.toLocaleString()}</strong></p>
        <p className="end-detail">
          {modeConfig.endless
            ? `You survived ${round + 1} scenario${round !== 0 ? 's' : ''} in ${modeConfig.name} mode`
            : `You survived ${round} scenario${round !== 1 ? 's' : ''}`}
          {modeConfig.id === 'arcade' && combo > 0 && ` · Best combo: x${combo}`}
        </p>
        <div className="end-actions">
          <button className="btn btn-primary" onClick={() => { play('click'); onMenu(); }}>Try Again</button>
        </div>
      </div>
    );
  }

  if (phase === 'victory') {
    return (
      <div className="end-screen end-victory">
        <pre className="end-ascii">{`
   ╔═══════════════════════════╗
   ║                           ║
   ║      SURVIVOR             ║
   ║                           ║
   ║         ★                 ║
   ║                           ║
   ║   You made it out alive.  ║
   ╚═══════════════════════════╝`}</pre>
        <h2>{modeConfig.id === 'horror' ? 'You Escaped the Nightmare' : 'You Survived!'}</h2>
        {newRecord && <span className="new-record-badge">🏆 New High Score!</span>}
        <p className="end-score">Final Score: <strong>{score.toLocaleString()}</strong></p>
        <p className="end-detail">
          All {modeConfig.maxRounds} scenarios conquered with {health}% health remaining
        </p>
        <div className="end-actions">
          <button className="btn btn-primary" onClick={() => { play('click'); onMenu(); }}>Play Again</button>
        </div>
      </div>
    );
  }

  const loadingText = modeConfig.id === 'horror'
    ? 'Something stirs in the dark...'
    : 'Generating your next nightmare...';

  return (
    <div className={`game-screen mode-${modeConfig.id}`}>
      <header className="game-header">
        <div className="game-header-left">
          <span className="mode-badge" style={{ borderColor: modeConfig.color, color: modeConfig.color }}>
            {modeConfig.icon} {modeConfig.name}
          </span>
          <span className="round-badge">{roundLabel}</span>
          {scenario?.category && (
            <span className="category-badge">{scenario.category}</span>
          )}
          {scenario?.isCreepy && <span className="creepy-badge">☠️ Nightmare</span>}
          {scenario?.isAi && <span className="ai-badge">AI</span>}
        </div>
        <div className="game-header-right">
          {modeConfig.id === 'arcade' && combo > 0 && (
            <span className="combo-display">Combo x{combo}</span>
          )}
          <span className="score-display">{score.toLocaleString()} pts</span>
        </div>
      </header>

      <HealthBar health={health} />
      {modeConfig.timed && timeLeft !== null && (
        <TimerBar timeLeft={timeLeft} maxTime={modeConfig.timePerRound} />
      )}

      {error && <div className="error-banner">{error}</div>}

      <AsciiDisplay asciiKey={scenario?.asciiKey} loading={loading && !scenario} />

      <main className="game-main">
        {phase === 'result' && lastResult ? (
          <div className="result-panel">
            <ResultBadge type={lastResult.resultType} />
            {lastResult.comboBonus > 0 && (
              <p className="combo-bonus">Combo bonus! x{lastResult.comboBonus + 1} multiplier</p>
            )}
            <p className="result-choice">You chose: <em>"{lastResult.chosenOption}"</em></p>
            <p className="result-outcome">{lastResult.outcome}</p>
            <button
              className="btn btn-primary"
              onClick={() => { play('continue'); onContinue(); }}
              disabled={loading}
            >
              {loading ? 'Loading next scenario...' : 'Continue →'}
            </button>
          </div>
        ) : (
          <>
            <div className={`scenario-panel ${scenario?.isCreepy ? 'creepy' : ''}`}>
              {loading && !scenario ? (
                <p className="scenario-text loading-text">{loadingText}</p>
              ) : (
                <p className="scenario-text">{scenario?.setup}</p>
              )}
            </div>

            {scenario?.options && (
              <div className="options-section">
                <h3 className="options-title">What do you do?</h3>
                <OptionButtons
                  options={scenario.options}
                  onSelect={onSelectOption}
                  disabled={loading || phase === 'resolving'}
                />
              </div>
            )}

            {phase === 'resolving' && (
              <div className="resolving-indicator">
                <span className="pulse-dot" />
                Resolving your fate...
              </div>
            )}
          </>
        )}
      </main>

      <footer className="game-footer">
        <button className="btn btn-ghost" onClick={() => { play('click'); onMenu(); }}>← Main Menu</button>
      </footer>
    </div>
  );
}
