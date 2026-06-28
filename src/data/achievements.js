export const ACHIEVEMENTS = [
  {
    id: 'first_round',
    title: 'First Step',
    description: 'Complete your first scenario.',
    icon: '[1]',
    check: (ctx) => (ctx.scenariosCompleted || 0) >= 1 || (ctx.totalRounds || 0) >= 1,
  },
  {
    id: 'survivor',
    title: 'Survivor',
    description: 'Clear a full Survival run.',
    icon: '[S]',
    check: (ctx) => ctx.victories?.survival >= 1,
  },
  {
    id: 'horror_escaped',
    title: 'Nightmare Escape',
    description: 'Survive Horror Only mode.',
    icon: '[EYE]',
    check: (ctx) => ctx.victories?.horror >= 1,
  },
  {
    id: 'quiz_ace',
    title: 'Quiz Ace',
    description: 'Finish Quick Quiz without losing.',
    icon: '[?]',
    check: (ctx) => ctx.victories?.quiz >= 1,
  },
  {
    id: 'door_master',
    title: 'Door Master',
    description: 'Complete Let \'Em In mode.',
    icon: '[D]',
    check: (ctx) => ctx.victories?.let_them_in >= 1,
  },
  {
    id: 'combo_king',
    title: 'Combo King',
    description: 'Reach a x5 combo in Arcade mode.',
    icon: '[!]',
    check: (ctx) => (ctx.bestCombo?.arcade || 0) >= 5,
  },
  {
    id: 'high_scorer',
    title: 'High Scorer',
    description: 'Score 1,000+ points in a single run.',
    icon: '[*]',
    check: (ctx) => ctx.bestRunScore >= 1000,
  },
  {
    id: 'mode_explorer',
    title: 'Mode Explorer',
    description: 'Play at least 6 different game modes.',
    icon: '[6]',
    check: (ctx) => (ctx.modesPlayed?.length || 0) >= 6,
  },
  {
    id: 'endless_10',
    title: 'Still Standing',
    description: 'Reach round 10 in Endless mode.',
    icon: '[oo]',
    check: (ctx) => (ctx.bestRounds?.endless || 0) >= 10,
  },
  {
    id: 'perfect_run',
    title: 'Flawless',
    description: 'Win any mode with zero strikes used.',
    icon: '[+]',
    check: (ctx) => ctx.perfectWins >= 1,
  },
];

export function getAchievementById(id) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

export function evaluateNewAchievements(progress, runContext) {
  const unlocked = new Set(progress.achievements || []);
  const newlyUnlocked = [];

  for (const achievement of ACHIEVEMENTS) {
    if (unlocked.has(achievement.id)) continue;
    if (achievement.check(runContext)) {
      newlyUnlocked.push(achievement.id);
      unlocked.add(achievement.id);
    }
  }

  return { achievements: [...unlocked], newlyUnlocked };
}
