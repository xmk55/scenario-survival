import { pickViewType, buildViewSequence } from '../data/asciiViews';

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function baseScenario(data) {
  const viewType = data.viewType || 'scene';
  const modeType = data.modeType;
  const asciiKey = data.portraitKey || data.asciiKey || 'default';
  return {
    id: `mode-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    isAi: false,
    isModeScenario: true,
    viewType,
    viewSequence: data.viewSequence || buildViewSequence(modeType, viewType, asciiKey),
    fingerprint: data.fingerprint || `mode:${data.modeType}:${data.setup?.slice(0, 60)}`,
    ...data,
  };
}

// ─── QUIZ ───────────────────────────────────────────────────────────────────
const QUIZ_POOL = [
  {
    setup: 'Quick Quiz: Which gas do plants release during photosynthesis?',
    options: ['Carbon dioxide', 'Oxygen', 'Nitrogen'],
    correctIndex: 1,
    outcomes: { good: ['Correct — plants release oxygen.'], bad: ['Wrong — plants release oxygen, not CO2.'] },
  },
  {
    setup: 'Quick Quiz: How many continents are there on Earth?',
    options: ['5', '7', '9'],
    correctIndex: 1,
    outcomes: { good: ['Correct — seven continents.'], bad: ['Wrong — the standard count is seven.'] },
  },
  {
    setup: 'Quick Quiz: What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au'],
    correctIndex: 2,
    outcomes: { good: ['Correct — Au from Latin aurum.'], bad: ['Wrong — gold is Au.'] },
  },
  {
    setup: 'Quick Quiz: Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter'],
    correctIndex: 1,
    outcomes: { good: ['Correct — Mars.'], bad: ['Wrong — Mars is the Red Planet.'] },
  },
  {
    setup: 'Quick Quiz: What year did the Titanic sink?',
    options: ['1905', '1912', '1920'],
    correctIndex: 1,
    outcomes: { good: ['Correct — April 1912.'], bad: ['Wrong — it sank in 1912.'] },
  },
  {
    setup: 'Quick Quiz: Which organ pumps blood through the body?',
    options: ['Brain', 'Heart', 'Lungs'],
    correctIndex: 1,
    outcomes: { good: ['Correct — the heart.'], bad: ['Wrong — the heart pumps blood.'] },
  },
  {
    setup: 'Quick Quiz: What is H2O commonly known as?',
    options: ['Salt', 'Water', 'Hydrogen'],
    correctIndex: 1,
    outcomes: { good: ['Correct — water.'], bad: ['Wrong — H2O is water.'] },
  },
  {
    setup: 'Quick Quiz: Which country invented paper (historically)?',
    options: ['Egypt', 'China', 'Greece'],
    correctIndex: 1,
    outcomes: { good: ['Correct — ancient China.'], bad: ['Wrong — paper originated in China.'] },
  },
];

// ─── INTUITION ──────────────────────────────────────────────────────────────
const INTUITION_POOL = [
  {
    setup: 'A stranger offers you a ride in the rain. Your gut says yes — they seem kind. Logic says wait for the bus.',
    options: ['Trust your gut — get in', 'Wait for the bus', 'Call someone first'],
    intuitionIndex: 0,
    outcomes: {
      good: ['Your instinct was right — they were genuinely helpful.'],
      neutral: ['Safe choice. The bus came. You never knew either way.'],
      bad: ['You ignored a warning feeling. Nothing happened — this time.'],
    },
  },
  {
    setup: 'A deal seems too good. Every rational sign says walk away. Something in your chest says "now or never."',
    options: ['Walk away', 'Take the deal', 'Sleep on it'],
    intuitionIndex: 0,
    outcomes: {
      good: ['Walking away saved you from a scam.'],
      neutral: ['Sleeping on it was wise — the offer expired.'],
      bad: ['You took the bait. Classic too-good-to-be-true.'],
    },
  },
  {
    setup: 'An elevator opens. Empty. Lights flicker. Your body wants to step in. Your mind hesitates.',
    options: ['Step in', 'Take the stairs', 'Wait for the next one'],
    intuitionIndex: 1,
    outcomes: {
      good: ['The stairs were fine. The elevator stalled an hour later.'],
      neutral: ['You waited. It was slow but uneventful.'],
      bad: ['You stepped in. It lurched — you were fine, but shaken.'],
    },
  },
  {
    setup: 'Someone online knows details they shouldn\'t. Your intuition screams "stop talking." Curiosity wants answers.',
    options: ['Stop responding', 'Keep asking questions', 'Report and block'],
    intuitionIndex: 0,
    outcomes: {
      good: ['You cut contact. They were fishing for personal info.'],
      neutral: ['Reporting was the right call.'],
      bad: ['You kept talking. They learned more than you did.'],
    },
  },
];

// ─── WHO TO SAVE ──────────────────────────────────────────────────────────────
const WHO_TO_SAVE_POOL = [
  {
    setup: 'A burning building. You can only guide ONE person out before the floor collapses.',
    asciiKey: 'who_to_save',
    options: ['Save the child on the left', 'Save the elderly person on the right', 'Try both — risk everyone'],
    saveIndex: 0,
    outcomes: {
      good: ['You saved the child. A brutal choice — but you acted.'],
      neutral: ['You saved the elder. Some call it wrong. You call it human.'],
      bad: ['You hesitated trying to save both. The floor gave way.'],
    },
  },
  {
    setup: 'Two rafts, one spot left on yours. A stranger and your injured friend both reach for it.',
    options: ['Pull your friend aboard', 'Help the stranger — they\'re drowning faster', 'Give up your seat'],
    saveIndex: 0,
    outcomes: {
      good: ['Your friend survives. The stranger was rescued later.'],
      neutral: ['You gave up your seat. Heroic — and costly.'],
      bad: ['The wrong call in cold water. You lost them both.'],
    },
  },
  {
    setup: 'Lifeboat holds one more. A doctor and a parent with a baby on shore beg you.',
    options: ['Take the doctor', 'Take the parent', 'Refuse — boat is full'],
    saveIndex: 0,
    outcomes: {
      good: ['The doctor saved others later.'],
      neutral: ['The parent made it. The doctor didn\'t.'],
      bad: ['Refusing both haunted you.'],
    },
  },
];

// ─── LET THEM IN (DOPPELGANGER) ─────────────────────────────────────────────
const LET_THEM_IN_POOL = [
  {
    id: 'roommate_doppel',
    setup: '2:07 AM. A knock. Through the peephole: your roommate — but they\'re on a trip until Friday.',
    portraitKey: 'human_doppel',
    isDoppelganger: true,
    visitorName: 'your roommate',
    questions: [
      { text: 'Ask: "What\'s the wifi password?"', reveal: 'They pause. "...password?" They should know this.', suspicion: 2 },
      { text: 'Ask: "What did we watch Tuesday?"', reveal: 'They name a show you never watched together.', suspicion: 3 },
      { text: 'Ask: "Hum our inside joke"', reveal: 'Wrong melody. Wrong words. Wrong smile.', suspicion: 3 },
    ],
    verdictOptions: ['Let them in', 'Keep the door locked', 'Call the real roommate'],
    correctVerdict: 1,
    outcomes: {
      good: ['You kept the door locked. At dawn, the real roommate texted from the airport.'],
      bad: ['You let it in. The apartment was never quite the same.'],
      neutral: ['You called. No answer until morning — but you were safe.'],
    },
  },
  {
    id: 'neighbor_martin',
    setup: 'Your neighbor Martin forgot his keys — he says. But Martin left town yesterday. You saw him pack.',
    portraitKey: 'human_doppel',
    isDoppelganger: true,
    visitorName: 'Martin',
    questions: [
      { text: 'Ask: "What\'s your dog\'s name?"', reveal: 'They say "Buddy." Martin\'s dog is Rex.', suspicion: 3 },
      { text: 'Ask: "Which apartment is yours?"', reveal: 'They point to 4B. Martin is 4A.', suspicion: 3 },
      { text: 'Ask: "Show your mailbox key"', reveal: 'They don\'t have one. Hands tremble.', suspicion: 2 },
    ],
    verdictOptions: ['Open the door', 'Refuse — call building security', 'Slide a note under the door'],
    correctVerdict: 1,
    outcomes: {
      good: ['Security came. The thing at your door was not Martin.'],
      bad: ['You opened up. Martin — the real one — is still missing.'],
      neutral: ['The note trick worked. It left at 4 AM.'],
    },
  },
  {
    id: 'fake_delivery',
    setup: 'A delivery driver with the right uniform. Normal smile. But the order number is yours — and you didn\'t order anything.',
    portraitKey: 'stranger_wrong',
    isDoppelganger: true,
    visitorName: 'the driver',
    questions: [
      { text: 'Ask: "Who sent this package?"', reveal: 'They blink slowly. "You did."', suspicion: 2 },
      { text: 'Ask: "What company do you work for?"', reveal: 'Wrong logo on the badge. You notice.', suspicion: 3 },
      { text: 'Ask: "Step back from the door"', reveal: 'They don\'t move. Just stares.', suspicion: 3 },
    ],
    verdictOptions: ['Accept the package', 'Reject delivery', 'Open door a crack with chain on'],
    correctVerdict: 1,
    outcomes: {
      good: ['You rejected it. The driver stood there for an hour, then left.'],
      bad: ['You took the package. Whatever was inside found a way in.'],
      neutral: ['Chain on. Nothing got through. Smart.'],
    },
  },
  {
    id: 'partner_early',
    setup: 'Your partner is home early. They travel for work — flight lands tomorrow. They look exactly right.',
    portraitKey: 'human_normal',
    isDoppelganger: false,
    visitorName: 'your partner',
    questions: [
      { text: 'Ask: "What song did we dance to?"', reveal: 'They answer instantly. Correct. Warm laugh.', suspicion: 0 },
      { text: 'Ask: "Where\'s the spare key?"', reveal: 'Under the flowerpot. Right answer.', suspicion: 0 },
      { text: 'Ask: "Why are you early?"', reveal: 'Flight cancelled. Shows you the email.', suspicion: 0 },
    ],
    verdictOptions: ['Let them in', 'Keep door locked', 'Call their phone'],
    correctVerdict: 0,
    outcomes: {
      good: ['It was really them. You almost didn\'t let your own partner in.'],
      bad: ['You locked them out in the rain. They forgave you. Eventually.'],
      neutral: ['The phone call confirmed it. Embarrassing — but safe.'],
    },
  },
];

// ─── LIE DETECTOR ───────────────────────────────────────────────────────────
const LIE_DETECTOR_POOL = [
  {
    setup: 'Two witnesses. One stole the keys. Person A: "I was in the kitchen." Person B: "I never left the garage."',
    asciiKey: 'mystery_box',
    options: ['Person A is lying', 'Person B is lying', 'Both are lying'],
    liarIndex: 1,
    outcomes: {
      good: ['Person B lied — muddy shoes under the table gave them away.'],
      bad: ['Wrong. Person B was telling the truth. The thief was Person A.'],
      neutral: ['Both lied about details — but only one took the keys.'],
    },
  },
  {
    setup: 'Who broke the window? Colleague X: "I was presenting." Colleague Y: "I was getting coffee." Security footage is missing.',
    options: ['Colleague X lied', 'Colleague Y lied', 'Cannot tell'],
    liarIndex: 0,
    outcomes: {
      good: ['X lied — coffee machine logs show Y was there. X had glass on their sleeve.'],
      bad: ['Y was innocent. X planted doubt perfectly.'],
      neutral: ['Ambiguous — but your guess cost you a strike.'],
    },
  },
];

// ─── MORAL DILEMMA ────────────────────────────────────────────────────────────
const MORAL_POOL = [
  {
    setup: 'You find a wallet with $500 and an ID. Nobody is around. Returning it means a long trip. Keeping it means rent is covered.',
    options: ['Return the wallet', 'Keep the cash, drop the wallet', 'Turn it in to police'],
    moralIndex: 0,
    outcomes: {
      good: ['You returned it. The owner cried — it was their rent too.'],
      neutral: ['Police had it by morning. You feel okay about it.'],
      bad: ['You kept it. Guilt follows you for weeks.'],
    },
  },
  {
    setup: 'Your friend cheated on a test. Reporting them ends their scholarship. Staying silent makes you complicit.',
    options: ['Report them', 'Talk to them privately first', 'Do nothing'],
    moralIndex: 1,
    outcomes: {
      good: ['They confessed on their own after your talk.'],
      neutral: ['Nothing happened. You still wonder.'],
      bad: ['They were caught anyway — and said you knew.'],
    },
  },
  {
    setup: 'A self-driving car scenario: swerve and hit one person, or stay course and hit three.',
    options: ['Swerve — save three', 'Stay course — fewer lives at fault?', 'Brake and hope'],
    moralIndex: 0,
    outcomes: {
      good: ['You chose the utilitarian path. The ethics board still debates it.'],
      neutral: ['You braked. Outcome was random — you did your best.'],
      bad: ['Hesitation made the worst outcome real.'],
    },
  },
];

// ─── WITNESS (MEMORY) ───────────────────────────────────────────────────────
const WITNESS_POOL = [
  {
    setup: 'You glanced at a suspect for three seconds. What were they wearing?',
    asciiKey: 'dark_alley',
    viewType: 'detail',
    options: ['Red jacket', 'Blue hoodie', 'Black coat'],
    correctIndex: 2,
    detailHint: 'The suspect wore a black coat — you saw it in the alley POV.',
    outcomes: {
      good: ['Correct — black coat. Your memory held.'],
      bad: ['Wrong. It was a black coat. Doubt creeps in.'],
    },
  },
  {
    setup: 'The intruder carried something in their left hand. What was it?',
    asciiKey: 'stranger_knock',
    viewType: 'pov',
    options: ['A flashlight', 'A toolbox', 'Nothing — empty hands'],
    correctIndex: 2,
    detailHint: 'Through the peephole: empty hands. That was the tell.',
    outcomes: {
      good: ['Right — empty hands. Odd for a "delivery."'],
      bad: ['Wrong. Empty hands. You misremembered.'],
    },
  },
  {
    setup: 'How many knocks did you hear before opening the peephole?',
    asciiKey: 'stranger_knock',
    viewType: 'pov',
    options: ['One', 'Three', 'Seven'],
    correctIndex: 1,
    detailHint: 'Three slow knocks. You wrote it in the ASCII view.',
    outcomes: {
      good: ['Three knocks. You remembered.'],
      bad: ['It was three. Your memory failed you.'],
    },
  },
];

// ─── TRUST FALL ───────────────────────────────────────────────────────────────
const TRUST_POOL = [
  {
    setup: 'Round 1 of Trust Fall: A coworker asks for your login to "fix a report." They seem rushed.',
    options: ['Trust them — share login', 'Refuse — escalate to IT', 'Watch them type it themselves'],
    trustIndex: 1,
    outcomes: {
      good: ['IT confirmed it was a phishing attempt.'],
      bad: ['You shared access. Data leaked.'],
      neutral: ['Awkward — but nothing bad happened.'],
    },
  },
  {
    setup: 'Round 2: A stranger returns your lost phone. They ask you to unlock it "to prove it\'s yours."',
    options: ['Unlock it for them', 'Describe the lock screen instead', 'Meet at a police station'],
    trustIndex: 2,
    outcomes: {
      good: ['Police verified everything. Your phone returned safely.'],
      bad: ['They memorized your passcode pattern.'],
      neutral: ['Describing worked — they were honest.'],
    },
  },
  {
    setup: 'Round 3: Your ex texts from a new number asking for one last meeting "to closure."',
    options: ['Meet them alone', 'Meet in public with a friend nearby', 'Block the number'],
    trustIndex: 1,
    outcomes: {
      good: ['Public meeting was fine. Closure achieved.'],
      bad: ['Alone was a mistake. You knew better.'],
      neutral: ['Blocking was safe. You\'ll never know.'],
    },
  },
];

function resolveQuiz(scenario, optionIndex) {
  const correct = optionIndex === scenario.correctIndex;
  return {
    resultType: correct ? 'good' : 'bad',
    outcome: correct ? scenario.outcomes.good[0] : scenario.outcomes.bad[0],
    scoreDelta: correct ? 150 : 20,
    survived: correct,
    addStrike: !correct,
  };
}

function resolveIntuition(scenario, optionIndex) {
  const matched = optionIndex === scenario.intuitionIndex;
  return {
    resultType: matched ? 'good' : optionIndex === 2 ? 'neutral' : 'bad',
    outcome: scenario.outcomes[matched ? 'good' : optionIndex === 2 ? 'neutral' : 'bad'][0],
    scoreDelta: matched ? 120 : optionIndex === 2 ? 80 : 40,
    survived: true,
    addStrike: false,
  };
}

function resolveWhoToSave(scenario, optionIndex) {
  const good = optionIndex === scenario.saveIndex;
  const neutral = optionIndex === 2;
  return {
    resultType: good ? 'good' : neutral ? 'neutral' : 'bad',
    outcome: scenario.outcomes[good ? 'good' : neutral ? 'neutral' : 'bad'][0],
    scoreDelta: good ? 130 : neutral ? 60 : 10,
    survived: !neutral,
    addStrike: neutral,
  };
}

function resolveLieDetector(scenario, optionIndex) {
  const correct = optionIndex === scenario.liarIndex;
  return {
    resultType: correct ? 'good' : 'bad',
    outcome: correct ? scenario.outcomes.good[0] : scenario.outcomes.bad[0],
    scoreDelta: correct ? 140 : 15,
    survived: correct,
    addStrike: !correct,
  };
}

function resolveMoral(scenario, optionIndex) {
  const best = optionIndex === scenario.moralIndex;
  return {
    resultType: best ? 'good' : optionIndex === 2 ? 'neutral' : 'bad',
    outcome: scenario.outcomes[best ? 'good' : optionIndex === 2 ? 'neutral' : 'bad'][0],
    scoreDelta: best ? 100 : 70,
    survived: true,
    addStrike: false,
  };
}

function resolveWitness(scenario, optionIndex) {
  const correct = optionIndex === scenario.correctIndex;
  return {
    resultType: correct ? 'good' : 'bad',
    outcome: correct ? scenario.outcomes.good[0] : `${scenario.outcomes.bad[0]} ${scenario.detailHint || ''}`,
    scoreDelta: correct ? 160 : 10,
    survived: correct,
    addStrike: !correct,
  };
}

function resolveTrust(scenario, optionIndex) {
  const best = optionIndex === scenario.trustIndex;
  return {
    resultType: best ? 'good' : optionIndex === 2 ? 'neutral' : 'bad',
    outcome: scenario.outcomes[best ? 'good' : optionIndex === 2 ? 'neutral' : 'bad'][0],
    scoreDelta: best ? 110 : optionIndex === 2 ? 70 : 20,
    survived: optionIndex !== 0,
    addStrike: optionIndex === 0,
  };
}

export function resolveLetThemIn(scenario, optionIndex, interviewPhase) {
  if (interviewPhase === 'question') {
    const q = scenario.questions[optionIndex];
    if (!q) return null;
    return {
      resultType: 'neutral',
      outcome: q.reveal,
      scoreDelta: 0,
      survived: true,
      addStrike: false,
      advanceInterview: true,
      suspicionGain: q.suspicion || 1,
      stayOnScenario: true,
    };
  }

  const correct = optionIndex === scenario.correctVerdict;
  const neutral = optionIndex === 2 && scenario.correctVerdict !== 2;
  return {
    resultType: correct ? 'good' : neutral ? 'neutral' : 'bad',
    outcome: scenario.outcomes[correct ? 'good' : neutral ? 'neutral' : 'bad'][0],
    scoreDelta: correct ? 200 : neutral ? 90 : 0,
    survived: correct || neutral,
    addStrike: !correct && !neutral,
  };
}

export function resolveModeChoice(scenario, optionIndex, interviewPhase = 'verdict') {
  if (!scenario?.modeType) return null;
  switch (scenario.modeType) {
    case 'quiz': return resolveQuiz(scenario, optionIndex);
    case 'intuition': return resolveIntuition(scenario, optionIndex);
    case 'who_to_save': return resolveWhoToSave(scenario, optionIndex);
    case 'let_them_in': return resolveLetThemIn(scenario, optionIndex, interviewPhase);
    case 'lie_detector': return resolveLieDetector(scenario, optionIndex);
    case 'moral': return resolveMoral(scenario, optionIndex);
    case 'witness': return resolveWitness(scenario, optionIndex);
    case 'trust': return resolveTrust(scenario, optionIndex);
    default: return null;
  }
}

function buildLetThemInScenario(template, round) {
  const isDoppel = template.isDoppelganger;
  return baseScenario({
    modeType: 'let_them_in',
    category: 'horror',
    tone: 'intense',
    isCreepy: isDoppel,
    asciiKey: 'stranger_knock',
    portraitKey: template.portraitKey,
    viewType: 'portrait',
    viewSequence: ['portrait', 'peephole', 'portrait'],
    setup: template.setup,
    visitorName: template.visitorName,
    isDoppelganger: isDoppel,
    questions: template.questions,
    verdictOptions: template.verdictOptions,
    correctVerdict: template.correctVerdict,
    outcomes: template.outcomes,
    interviewPhase: 'question',
    options: template.questions.map((q) => q.text).concat(['Skip questions — decide now']),
    fingerprint: `let_them_in:${template.id}`,
  });
}

function shuffleOptions(options, correctIndex) {
  const tagged = options.map((text, i) => ({ text, mark: i === correctIndex ? 'correct' : `i${i}` }));
  const shuffled = shuffle(tagged);
  return {
    options: shuffled.map((t) => t.text),
    correctIndex: shuffled.findIndex((t) => t.mark === 'correct'),
  };
}

function shuffleWithKey(options, keyIndex, keyName) {
  const tagged = options.map((text, i) => ({ text, mark: i === keyIndex ? 'key' : `i${i}` }));
  const shuffled = shuffle(tagged);
  return {
    options: shuffled.map((t) => t.text),
    [keyName]: shuffled.findIndex((t) => t.mark === 'key'),
  };
}

function buildFromPool(pool, modeType, round, extra = {}, playedFingerprints = [], allowRepeats = false) {
  let pickPool = pool;
  if (!allowRepeats && playedFingerprints.length) {
    const unplayed = pool.filter((item) => {
      const fp = `${modeType}:${item.id || item.setup.slice(0, 40)}`;
      return !playedFingerprints.includes(fp);
    });
    if (unplayed.length) pickPool = unplayed;
  }

  const item = pickRandom(pickPool);
  let options = item.options;
  let indices = {};

  if (item.correctIndex !== undefined) {
    const s = shuffleOptions(item.options, item.correctIndex);
    options = s.options;
    indices.correctIndex = s.correctIndex;
  } else if (item.saveIndex !== undefined) {
    const s = shuffleWithKey(item.options, item.saveIndex, 'saveIndex');
    options = s.options;
    indices.saveIndex = s.saveIndex;
  } else if (item.liarIndex !== undefined) {
    const s = shuffleWithKey(item.options, item.liarIndex, 'liarIndex');
    options = s.options;
    indices.liarIndex = s.liarIndex;
  } else if (item.intuitionIndex !== undefined) {
    const s = shuffleWithKey(item.options, item.intuitionIndex, 'intuitionIndex');
    options = s.options;
    indices.intuitionIndex = s.intuitionIndex;
  } else if (item.moralIndex !== undefined) {
    const s = shuffleWithKey(item.options, item.moralIndex, 'moralIndex');
    options = s.options;
    indices.moralIndex = s.moralIndex;
  } else if (item.trustIndex !== undefined) {
    const s = shuffleWithKey(item.options, item.trustIndex, 'trustIndex');
    options = s.options;
    indices.trustIndex = s.trustIndex;
  } else {
    options = shuffle(item.options);
  }

  return baseScenario({
    modeType,
    category: extra.category || 'mystery',
    tone: extra.tone || 'intense',
    asciiKey: item.asciiKey || 'default',
    viewType: item.viewType || pickViewType(modeType),
    setup: item.setup,
    options,
    ...item,
    ...indices,
    fingerprint: `${modeType}:${item.id || item.setup.slice(0, 40)}`,
  });
}

export function generateModeScenario(modeType, round = 0, options = {}) {
  const { playedFingerprints = [], allowRepeats = false } = options;

  const builders = {
    quiz: () => buildFromPool(QUIZ_POOL, 'quiz', round, { category: 'everyday', tone: 'everyday' }, playedFingerprints, allowRepeats),
    intuition: () => buildFromPool(INTUITION_POOL, 'intuition', round, {}, playedFingerprints, allowRepeats),
    who_to_save: () => buildFromPool(WHO_TO_SAVE_POOL, 'who_to_save', round, { category: 'survival' }, playedFingerprints, allowRepeats),
    let_them_in: () => buildLetThemInFromPool(round, playedFingerprints, allowRepeats),
    lie_detector: () => buildFromPool(LIE_DETECTOR_POOL, 'lie_detector', round, {}, playedFingerprints, allowRepeats),
    moral: () => buildFromPool(MORAL_POOL, 'moral', round, { category: 'everyday', tone: 'everyday' }, playedFingerprints, allowRepeats),
    witness: () => buildFromPool(WITNESS_POOL, 'witness', round, {}, playedFingerprints, allowRepeats),
    trust: () => buildFromPool(TRUST_POOL, 'trust', round, { category: 'social', tone: 'everyday' }, playedFingerprints, allowRepeats),
  };

  const build = builders[modeType];
  if (!build) return null;
  return build();
}

function buildLetThemInFromPool(round, playedFingerprints, allowRepeats) {
  const pool = LET_THEM_IN_POOL;
  if (!allowRepeats && playedFingerprints.length) {
    const unplayed = pool.filter(
      (t) => !playedFingerprints.includes(`let_them_in:${t.id}`)
    );
    if (unplayed.length) return buildLetThemInScenario(pickRandom(unplayed), round);
    const scenario = buildLetThemInScenario(pickRandom(pool), round);
    scenario.poolRefreshed = true;
    return scenario;
  }
  return buildLetThemInScenario(pickRandom(pool), round);
}

export function getModeScenarioOptions(scenario) {
  if (scenario.modeType !== 'let_them_in') return scenario.options;
  if (scenario.interviewPhase === 'verdict') return scenario.verdictOptions;
  const asked = scenario.askedQuestions || [];
  const remaining = scenario.questions.filter((_, i) => !asked.includes(i));
  return [...remaining.map((q) => q.text), 'Skip questions — decide now'];
}

function getRemainingQuestions(scenario) {
  const asked = scenario.askedQuestions || [];
  return scenario.questions
    .map((q, i) => ({ ...q, index: i }))
    .filter((q) => !asked.includes(q.index));
}

export function applyLetThemInChoice(scenario, optionIndex) {
  if (scenario.interviewPhase === 'verdict') {
    return {
      kind: 'verdict',
      result: resolveLetThemIn(scenario, optionIndex, 'verdict'),
    };
  }

  const remaining = getRemainingQuestions(scenario);

  if (optionIndex >= remaining.length) {
    return {
      kind: 'verdict_phase',
      result: {
        resultType: 'neutral',
        outcome: 'You stop asking questions. Time to decide.',
        scoreDelta: 0,
        survived: true,
        addStrike: false,
      },
      scenario: {
        ...scenario,
        interviewPhase: 'verdict',
        options: scenario.verdictOptions,
        setup: `${scenario.setup}\n\n[No more questions. Decide.]`,
      },
    };
  }

  const q = remaining[optionIndex];
  const asked = [...(scenario.askedQuestions || []), q.index];
  const stillRemaining = getRemainingQuestions({ ...scenario, askedQuestions: asked });
  const toVerdict = stillRemaining.length === 0;
  const nextOptions = [...stillRemaining.map((item) => item.text), 'Skip questions — decide now'];

  return {
    kind: toVerdict ? 'verdict_phase' : 'question',
    result: {
      resultType: 'neutral',
      outcome: q.reveal,
      scoreDelta: 10,
      survived: true,
      addStrike: false,
    },
    scenario: {
      ...scenario,
      askedQuestions: asked,
      suspicion: (scenario.suspicion || 0) + (q.suspicion || 1),
      interviewPhase: toVerdict ? 'verdict' : 'question',
      options: toVerdict ? scenario.verdictOptions : nextOptions,
      setup: toVerdict
        ? `${scenario.setup}\n\n[Final clue: ${q.reveal}]\n\n[Decide now.]`
        : `${scenario.setup}\n\n[Clue: ${q.reveal}]`,
    },
  };
}

export function isModeType(modeId) {
  return ['quiz', 'intuition', 'who_to_save', 'let_them_in', 'lie_detector', 'moral', 'witness', 'trust'].includes(modeId);
}
