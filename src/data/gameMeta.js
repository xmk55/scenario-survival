export const SCENE_NAMES = {
  bedroom_killer: 'Under the Bed',
  dark_alley: 'Dark Alley',
  elevator: 'Stalled Elevator',
  forest: 'Lost in the Woods',
  phone_call: 'Midnight Call',
  car_breakdown: 'Roadside Trouble',
  haunted_house: 'Haunted House',
  stranger_knock: 'Knock at the Door',
  survival_camp: 'Camping Alone',
  hostage: 'Hostage Situation',
  zombie: 'Zombie Outbreak',
  mystery_box: 'Mystery Package',
  mirror_horror: 'Mirror Horror',
  sleep_paralysis: 'Sleep Paralysis',
  doll_room: 'The Doll Room',
  crawlspace: 'The Crawlspace',
  basement_whispers: 'Basement Whispers',
  party_invite: 'Party Invite',
  car_repair: 'Car Trouble',
  job_interview: 'Job Interview',
  awkward_moment: 'Awkward Moment',
  morning_rush: 'Morning Rush',
  text_message: 'Urgent Text',
  grocery_store: 'Grocery Store',
  roommate_issue: 'Roommate Drama',
  work_deadline: 'Work Crisis',
  default: 'Unknown Scene',
};

export function getSceneName(asciiKey) {
  return SCENE_NAMES[asciiKey] || SCENE_NAMES.default;
}

export const DEATH_CAUSE_INFO = {
  timeout: {
    title: 'Ran Out of Time',
    explanation: 'You hesitated too long. In Arcade mode, the clock doesn\'t wait for anyone.',
  },
  strikes_out: {
    title: 'Three Strikes',
    explanation: 'Too many wrong calls. The run ends when you hit the strike limit.',
  },
  health_depleted: {
    title: 'Wellbeing Collapsed',
    explanation: 'Too many setbacks stacked up.',
  },
  fatal_choice: {
    title: 'Fatal Decision',
    explanation: 'The choice you made had consequences you couldn\'t recover from.',
  },
};

export function buildDeathSummary(deathInfo) {
  if (!deathInfo) return null;
  const cause = DEATH_CAUSE_INFO[deathInfo.cause] || DEATH_CAUSE_INFO.fatal_choice;
  return {
    ...cause,
    choice: deathInfo.choice,
    outcome: deathInfo.outcome,
    scenarioSetup: deathInfo.scenarioSetup,
    asciiKey: deathInfo.asciiKey,
    category: deathInfo.category,
  };
}
