export const GAME_MODES = {
  survival: {
    id: 'survival',
    name: 'Survival',
    icon: '🛡️',
    tagline: '10 rounds. One life. Can you make it out?',
    description: 'The classic experience — survive 10 escalating scenarios with your health intact.',
    maxRounds: 10,
    endless: false,
    timed: false,
    horrorOnly: false,
    startingHealth: 100,
    color: 'var(--color-accent)',
  },
  endless: {
    id: 'endless',
    name: 'Endless',
    icon: '∞',
    tagline: 'No escape. How long can you last?',
    description: 'Scenarios never stop. Difficulty ramps every round until you fall.',
    maxRounds: null,
    endless: true,
    timed: false,
    horrorOnly: false,
    startingHealth: 100,
    color: 'var(--color-warning)',
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade',
    icon: '⚡',
    tagline: 'Beat the clock. Build combos. Chase the high score.',
    description: '45 seconds per choice. Fast decisions earn combo multipliers and bonus points.',
    maxRounds: null,
    endless: true,
    timed: true,
    timePerRound: 45,
    horrorOnly: false,
    startingHealth: 100,
    color: 'var(--color-success)',
  },
  horror: {
    id: 'horror',
    name: 'Horror Only',
    icon: '👁️',
    tagline: 'Pure nightmare fuel. The creepiest scenarios we have.',
    description: 'Only the most disturbing horror scenarios. Mistakes are far more deadly.',
    maxRounds: 12,
    endless: false,
    timed: false,
    horrorOnly: true,
    startingHealth: 80,
    color: 'var(--color-danger)',
  },
};

export const MODE_LIST = Object.values(GAME_MODES);

const HIGH_SCORE_KEY = 'scenario-survival-highscores';

export function getHighScores() {
  try {
    return JSON.parse(localStorage.getItem(HIGH_SCORE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveHighScore(modeId, score, extras = {}) {
  const all = getHighScores();
  const current = all[modeId] || { score: 0, rounds: 0, combo: 0 };
  const isNewScore = score > current.score;

  all[modeId] = {
    score: Math.max(current.score, score),
    rounds: Math.max(current.rounds, extras.rounds || 0),
    combo: Math.max(current.combo || 0, extras.combo || 0),
    date: new Date().toISOString(),
  };
  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(all));
  return isNewScore;
}

export function isNewHighScore(modeId, score) {
  const all = getHighScores();
  return score > (all[modeId]?.score || 0);
}
