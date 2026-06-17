import { useEffect, useRef } from 'react';
import AsciiDisplay from './AsciiDisplay';
import OptionButtons from './OptionButtons';
import { useSound } from '../context/SoundContext';
import { buildDeathSummary } from '../data/gameMeta';

const CATEGORY_LABELS = {
  horror: 'Horror',
  thriller: 'Thriller',
  survival: 'Survival',
  mystery: 'Mystery',
  everyday: 'Everyday Life',
  social: 'Social',
  work: 'Work',
};

const LOADING_TEXTS = {
  horror: 'Something stirs in the dark...',
  everyday: 'Life throws another curveball...',
  social: 'An awkward moment approaches...',
  work: 'Another day, another dilemma...',
  default: 'Preparing your next scenario...',
};

function HealthBar({ health, isEveryday }) {
  const color = health > 60 ? 'var(--color-success)' : health > 30 ? 'var(--color-warning)' : 'var(--color-danger)';
  return (
    <div className="health-bar">
      <span className="stat-label">{isEveryday ? 'Wellbeing' : 'Health'}</span>
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

function RunStatsBar({ stats }) {
  const total = stats.good + stats.neutral + stats.bad;
  if (total === 0) return null;
  return (
    <div className="run-stats-bar">
      <span className="run-stat run-stat-good">✓ {stats.good}</span>
      <span className="run-stat run-stat-neutral">~ {stats.neutral}</span>
      <span className="run-stat run-stat-bad">✗ {stats.bad}</span>
    </div>
  );
}

function ResultBadge({ type, isEveryday }) {
  const labels = isEveryday
    ? { good: 'Nice One', neutral: 'Could Be Worse', bad: 'Rough Call' }
    : { good: 'Smart Move', neutral: 'Close Call', bad: 'Critical' };
  return <span className={`result-badge result-${type}`}>{labels[type] || type}</span>;
}

function DeathRecap({ deathInfo, runStats }) {
  const summary = buildDeathSummary(deathInfo);
  if (!summary) return null;

  return (
    <div className="death-recap">
      <h3 className="death-recap-title">Why You Died</h3>
      <div className="death-cause-badge">{summary.title}</div>
      <p className="death-cause-explanation">{summary.explanation}</p>

      {summary.asciiKey && (
        <AsciiDisplay
          asciiKey={summary.asciiKey}
          category={summary.category}
          isCreepy={deathInfo?.tone !== 'everyday'}
          size="large"
          showLabel
        />
      )}

      {summary.scenarioSetup && (
        <p className="death-scenario-setup">"{summary.scenarioSetup}"</p>
      )}

      <div className="death-detail-box">
        <p><strong>Your choice:</strong> <em>"{summary.choice}"</em></p>
        <p><strong>What happened:</strong> {summary.outcome}</p>
      </div>

      <RunStatsBar stats={runStats} />
    </div>
  );
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
  deathInfo,
  runStats,
  onSelectOption,
  onContinue,
  onMenu,
  onRetry,
}) {
  const { play, beginHorrorAmbience, endHorrorAmbience } = useSound();
  const prevPhase = useRef(phase);
  const prevScenarioId = useRef(null);
  const prevCombo = useRef(0);
  const prevHealth = useRef(health);
  const isHorrorMode = modeConfig.id === 'horror';
  const isEveryday = scenario?.tone === 'everyday';

  const isEndless = modeConfig.endless;
  const roundLabel = isEndless
    ? `Round ${round + 1}`
    : `Round ${round + 1}/${modeConfig.maxRounds}`;

  useEffect(() => {
    if (phase === 'result' && lastResult) {
      const creepy = scenario?.isCreepy || isHorrorMode;
      if (isHorrorMode || creepy) {
        if (lastResult.resultType === 'good') play('horrorGood');
        else if (lastResult.resultType === 'bad') play('horrorBad');
        else play('dread');
      } else if (lastResult.resultType === 'good') {
        play(isEveryday ? 'relief' : 'good');
      } else if (lastResult.resultType === 'bad') {
        play(health <= 20 ? 'critical' : 'bad');
      } else {
        play('neutral');
      }
    }
  }, [phase, lastResult, play, isHorrorMode, scenario?.isCreepy, health, isEveryday]);

  useEffect(() => {
    const prev = prevPhase.current;

    if (phase === 'gameover' && prev !== 'gameover') {
      endHorrorAmbience();
      play(isHorrorMode ? 'horrorGameover' : 'gameover');
      if (newRecord) setTimeout(() => play('record'), 600);
    }
    if (phase === 'victory' && prev !== 'victory') {
      endHorrorAmbience();
      play(isHorrorMode ? 'horrorVictory' : 'victory');
      if (newRecord) setTimeout(() => play('record'), 500);
    }
    if (phase === 'resolving' && prev === 'playing') {
      play(isHorrorMode ? 'dread' : 'suspense');
    }

    prevPhase.current = phase;
  }, [phase, play, isHorrorMode, newRecord, endHorrorAmbience]);

  useEffect(() => {
    if (isHorrorMode && (phase === 'playing' || phase === 'result' || phase === 'resolving')) {
      beginHorrorAmbience();
    } else {
      endHorrorAmbience();
    }
    return () => endHorrorAmbience();
  }, [isHorrorMode, phase, beginHorrorAmbience, endHorrorAmbience]);

  useEffect(() => {
    if (scenario?.id && scenario.id !== prevScenarioId.current && phase === 'playing') {
      const creepy = scenario.isCreepy || isHorrorMode;
      if (isHorrorMode || creepy) play('horrorReveal');
      else if (scenario.tone === 'everyday') {
        const everydaySounds = ['everydayReveal', 'phoneBuzz', 'awkward', 'workStress', 'sigh'];
        play(everydaySounds[Math.floor(Math.random() * everydaySounds.length)]);
      } else if (scenario.category === 'mystery') play('mystery');
      else play('scenario');
      prevScenarioId.current = scenario.id;
    }
  }, [scenario?.id, scenario?.isCreepy, scenario?.tone, scenario?.category, phase, play, isHorrorMode]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft <= 10 && timeLeft > 0 && phase === 'playing') {
      play(modeConfig.timed ? 'tickUrgent' : 'tick');
    }
  }, [timeLeft, phase, play, modeConfig.timed]);

  useEffect(() => {
    if (modeConfig.id === 'arcade' && combo > prevCombo.current && combo > 0) {
      play('comboUp');
    }
    if (modeConfig.id === 'arcade' && combo === 0 && prevCombo.current > 0) {
      play('comboBreak');
    }
    prevCombo.current = combo;
  }, [combo, modeConfig.id, play]);

  useEffect(() => {
    if (health < prevHealth.current && phase === 'playing') {
      if (isHorrorMode && health <= 30) play('horrorLowHealth');
      else if (health <= 25) play('lowHealth');
      else play('damage');
    }
    prevHealth.current = health;
  }, [health, phase, play, isHorrorMode]);

  useEffect(() => {
    const handler = (e) => {
      if (phase === 'playing' && !loading && scenario) {
        const key = parseInt(e.key, 10);
        if (key >= 1 && key <= 3) {
          play(isHorrorMode || scenario?.isCreepy ? 'horrorSelectChoice' : 'select');
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
   ║       GAME OVER           ║
   ║                           ║
   ║          ✝                ║
   ║                           ║
   ╚═══════════════════════════╝`}</pre>
        <h2>{modeConfig.id === 'horror' ? 'The Darkness Claims You' : 'Run Over'}</h2>
        {newRecord && <span className="new-record-badge">🏆 New High Score!</span>}

        <DeathRecap deathInfo={deathInfo} runStats={runStats} />

        <p className="end-score">Final Score: <strong>{score.toLocaleString()}</strong></p>
        <p className="end-detail">
          {modeConfig.endless
            ? `Lasted ${round + 1} round${round !== 0 ? 's' : ''} in ${modeConfig.name}`
            : `Reached round ${round + 1}`}
          {modeConfig.id === 'arcade' && combo > 0 && ` · Final combo: x${combo}`}
        </p>
        <div className="end-actions">
          <button className="btn btn-primary" onClick={() => { play('start'); onRetry(); }}>
            Retry {modeConfig.name}
          </button>
          <button className="btn btn-secondary" onClick={() => { play('click'); onMenu(); }}>
            Main Menu
          </button>
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
   ║       SURVIVOR            ║
   ║                           ║
   ║          ★                ║
   ║                           ║
   ╚═══════════════════════════╝`}</pre>
        <h2>{modeConfig.id === 'horror' ? 'You Escaped the Nightmare' : 'You Made It!'}</h2>
        {newRecord && <span className="new-record-badge">🏆 New High Score!</span>}
        <p className="end-score">Final Score: <strong>{score.toLocaleString()}</strong></p>
        <p className="end-detail">
          All {modeConfig.maxRounds} scenarios with {health}% remaining
        </p>
        <RunStatsBar stats={runStats} />
        <div className="end-actions">
          <button className="btn btn-primary" onClick={() => { play('start'); onRetry(); }}>
            Play Again
          </button>
          <button className="btn btn-secondary" onClick={() => { play('click'); onMenu(); }}>
            Main Menu
          </button>
        </div>
      </div>
    );
  }

  const categoryLabel = CATEGORY_LABELS[scenario?.category] || scenario?.category;
  const loadingText = modeConfig.id === 'horror'
    ? LOADING_TEXTS.horror
    : LOADING_TEXTS[scenario?.category] || LOADING_TEXTS.default;

  return (
    <div className={`game-screen mode-${modeConfig.id}`}>
      <header className="game-header">
        <div className="game-header-left">
          <span className="mode-badge" style={{ borderColor: modeConfig.color, color: modeConfig.color }}>
            {modeConfig.icon} {modeConfig.name}
          </span>
          <span className="round-badge">{roundLabel}</span>
          {scenario?.category && (
            <span className={`category-badge cat-${scenario.category}`}>{categoryLabel}</span>
          )}
          {scenario?.isCreepy && <span className="creepy-badge">☠️ Nightmare</span>}
          {scenario?.isAi && <span className="ai-badge">AI</span>}
        </div>
        <div className="game-header-right">
          <RunStatsBar stats={runStats} />
          {modeConfig.id === 'arcade' && combo > 0 && (
            <span className="combo-display">Combo x{combo}</span>
          )}
          <span className="score-display">{score.toLocaleString()} pts</span>
        </div>
      </header>

      <HealthBar health={health} isEveryday={isEveryday} />
      {modeConfig.timed && timeLeft !== null && (
        <TimerBar timeLeft={timeLeft} maxTime={modeConfig.timePerRound} />
      )}

      {error && <div className="error-banner">{error}</div>}
      {scenario?.poolRefreshed && (
        <div className="info-banner">You have seen every scenario — the pool has been refreshed.</div>
      )}

      <AsciiDisplay
        asciiKey={scenario?.asciiKey}
        loading={loading && !scenario}
        category={scenario?.category}
        isCreepy={scenario?.isCreepy}
        size="hero"
      />

      <main className="game-main">
        {phase === 'result' && lastResult ? (
          <div className="result-panel">
            <ResultBadge type={lastResult.resultType} isEveryday={isEveryday} />
            {lastResult.comboBonus > 0 && (
              <p className="combo-bonus">Combo bonus! x{lastResult.comboBonus + 1} multiplier</p>
            )}
            <p className="result-choice">You chose: <em>"{lastResult.chosenOption}"</em></p>
            <p className="result-outcome">{lastResult.outcome}</p>
            {lastResult.resultType === 'bad' && health <= 20 && (
              <p className="result-warning">⚠️ Your wellbeing is critically low!</p>
            )}
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
            <div className={`scenario-panel ${scenario?.isCreepy ? 'creepy' : ''} ${isEveryday ? 'everyday' : ''}`}>
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
                  isHorror={isHorrorMode}
                  isCreepy={scenario?.isCreepy}
                />
              </div>
            )}

            {phase === 'resolving' && (
              <div className="resolving-indicator">
                <span className="pulse-dot" />
                Resolving...
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
