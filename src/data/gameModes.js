export const GAME_MODES = {
  survival: {
    id: 'survival',
    name: 'Survival',
    icon: '[S]',
    tagline: '10 rounds. One life. Can you make it out?',
    description: 'The classic mix — real-life dilemmas and intense scenarios across 10 rounds.',
    maxRounds: 10,
    endless: false,
    timed: false,
    horrorOnly: false,
    modeType: 'standard',
    maxStrikes: 3,
    color: 'var(--color-accent)',
  },
  endless: {
    id: 'endless',
    name: 'Endless',
    icon: 'oo',
    tagline: 'No escape. How long can you last?',
    description: 'Life keeps coming — parties, flat tires, awkward moments, and worse. How far can you go?',
    maxRounds: null,
    endless: true,
    timed: false,
    horrorOnly: false,
    modeType: 'standard',
    maxStrikes: 3,
    color: 'var(--color-warning)',
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade',
    icon: '[!]',
    tagline: 'Beat the clock. Build combos. Chase the high score.',
    description: '45 seconds per choice. Fast decisions earn combo multipliers and bonus points.',
    maxRounds: null,
    endless: true,
    timed: true,
    timePerRound: 45,
    horrorOnly: false,
    modeType: 'standard',
    maxStrikes: 3,
    color: 'var(--color-success)',
  },
  horror: {
    id: 'horror',
    name: 'Horror Only',
    icon: '[EYE]',
    tagline: 'Pure nightmare fuel. The creepiest scenarios we have.',
    description: 'Only the most disturbing horror scenarios. Three strikes and the darkness wins.',
    maxRounds: 12,
    endless: false,
    timed: false,
    horrorOnly: true,
    modeType: 'standard',
    maxStrikes: 3,
    color: 'var(--color-danger)',
  },
  quiz: {
    id: 'quiz',
    name: 'Quick Quiz',
    icon: '[?]',
    tagline: '10 questions. No fluff. How smart are you under pressure?',
    description: 'Answer trivia correctly. Wrong answers cost a strike — three strikes ends the run.',
    maxRounds: 10,
    endless: false,
    timed: false,
    modeType: 'quiz',
    maxStrikes: 3,
    color: '#5b9bd5',
  },
  intuition: {
    id: 'intuition',
    name: 'Intuition Test',
    icon: '[~]',
    tagline: 'Trust your gut — or regret it.',
    description: 'Scenarios with no clear "right" answer. Score reflects how well you read the moment.',
    maxRounds: 8,
    endless: false,
    timed: false,
    modeType: 'intuition',
    maxStrikes: 3,
    color: '#9b59b6',
  },
  who_to_save: {
    id: 'who_to_save',
    name: 'Who Will You Save',
    icon: '[+]',
    tagline: 'Two lives. One choice. No clean answer.',
    description: 'Impossible rescue dilemmas — pick who survives and live with the weight of it.',
    maxRounds: 6,
    endless: false,
    timed: false,
    modeType: 'who_to_save',
    maxStrikes: 3,
    color: '#e67e22',
  },
  let_them_in: {
    id: 'let_them_in',
    name: 'Let \'Em In?',
    icon: '[D]',
    tagline: 'Human or doppelganger? Ask questions. Decide.',
    description: 'Someone knocks. ASCII portrait at the door. Interview them, then choose — let them in or not.',
    maxRounds: 5,
    endless: false,
    timed: false,
    modeType: 'let_them_in',
    maxStrikes: 3,
    color: 'var(--color-danger)',
  },
  lie_detector: {
    id: 'lie_detector',
    name: 'Spot the Liar',
    icon: '[L]',
    tagline: 'Two stories. One lie. Find it.',
    description: 'Read witness statements and identify who is lying before you run out of strikes.',
    maxRounds: 6,
    endless: false,
    timed: false,
    modeType: 'lie_detector',
    maxStrikes: 3,
    color: '#3498db',
  },
  moral: {
    id: 'moral',
    name: 'Moral Matrix',
    icon: '[M]',
    tagline: 'Ethics with no perfect outcome.',
    description: 'Heavy moral dilemmas — there is rarely a clean answer, but some choices haunt less.',
    maxRounds: 6,
    endless: false,
    timed: false,
    modeType: 'moral',
    maxStrikes: 3,
    color: '#1abc9c',
  },
  witness: {
    id: 'witness',
    name: 'What Did You See?',
    icon: '[W]',
    tagline: 'Memory test. Details matter.',
    description: 'Study the ASCII view — POV or close detail — then answer what you remember.',
    maxRounds: 8,
    endless: false,
    timed: false,
    modeType: 'witness',
    maxStrikes: 3,
    color: '#f39c12',
  },
  trust: {
    id: 'trust',
    name: 'Trust Fall',
    icon: '[T]',
    tagline: 'Trust, verify, or refuse — chain of judgment calls.',
    description: 'Sequential trust scenarios. One bad trust call can end everything.',
    maxRounds: 6,
    endless: false,
    timed: false,
    modeType: 'trust',
    maxStrikes: 3,
    color: '#2ecc71',
  },
};

export const MODE_LIST = Object.values(GAME_MODES);

export const STANDARD_MODES = MODE_LIST.filter((m) => m.modeType === 'standard');
export const SPECIAL_MODES = MODE_LIST.filter((m) => m.modeType !== 'standard');

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

export function getModeType(modeId) {
  return GAME_MODES[modeId]?.modeType || 'standard';
}
