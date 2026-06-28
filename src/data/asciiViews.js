import { ASCII_POV, ASCII_DETAIL, ASCII_OVER_SHOULDER } from './asciiPovArt';

const EMOJI_TO_TEXT = {
  '🌙': '[MOON]',
  '🌧': '[RAIN]',
  '☁': '~',
  '🛡️': '[SHLD]',
  '👁️': '[EYE]',
  '⚡': '[!]',
  '🧭': '[N]',
  '😰': '(@_@)',
  '🔥': '[FIRE]',
  '👁': '[eye]',
  '📱': '[PHONE]',
  '📞': '[RING]',
  '😀': '(^_^)',
  '☠️': '[SKULL]',
  '☠': '[SKULL]',
  '✦': '*',
  '🔴': '[!!]',
  '🏆': '[BEST]',
  '✝': '+',
  '★': '*',
  '⚠️': '[!!]',
  '⚠': '[!!]',
  '∞': 'oo',
};

export { ASCII_POV, ASCII_DETAIL };

export const VIEW_LABELS = {
  pov: 'First Person',
  scene: 'Wide Shot',
  detail: 'Close-Up',
  portrait: 'Face to Face',
  hands: 'Your Hands',
  peephole: 'Peephole',
  over_shoulder: 'Over Shoulder',
};

export const ASCII_PORTRAITS = {
  human_normal: `
╔══════════════════════════════════════════════════════════════════╗
║  AT THE DOOR — CHAIN STILL ON                    [RAIN] [RAIN]   ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │                    .-------.                             │    ║
║   │                   /  o   o  \\    familiar face           │    ║
║   │                  |    \\_/    |    tired smile            │    ║
║   │                  |  \\___/  |    wet coat                │    ║
║   │                   \\  ___  /                             │    ║
║   │                    '-----'                             │    ║
║   │         /|\\          "Forgot my keys..."                │    ║
║   └────────────────────────────────────────────────────────┘    ║
║   CHAIN: ON    YOU: eye to peephole    HAND: deadbolt            ║
╚══════════════════════════════════════════════════════════════════╝`,

  human_doppel: `
╔══════════════════════════════════════════════════════════════════╗
║  AT THE DOOR — CHAIN STILL ON                    [RAIN] [RAIN]   ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │                    .-------.                             │    ║
║   │                   /  O   o  \\    eyes uneven             │    ║
║   │                  |    \\_/    |    smile TOO wide         │    ║
║   │                  |  \\___/  |    wrong shoes             │    ║
║   │                   \\  ___  /     voice flat               │    ║
║   │                    '-----'     fingers too long          │    ║
║   │         /|\\          "Forgot my keys..."                │    ║
║   └────────────────────────────────────────────────────────┘    ║
║   CHAIN: ON    YOU: something is WRONG                          ║
╚══════════════════════════════════════════════════════════════════╝`,

  stranger_friendly: `
╔══════════════════════════════════════════════════════════════════╗
║  FRONT DOOR — 2:14 AM                                            ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │       .-------.     grocery bag · name tag "MARTIN"      │    ║
║   │      /  ^   ^  \\    nervous but seems normal             │    ║
║   │     |    \\_/    |                                       │    ║
║   │     |  \\___/  |                                         │    ║
║   │      \\  ___  /                                          │    ║
║   │       '-----'                                           │    ║
║   └────────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════════╝`,

  stranger_wrong: `
╔══════════════════════════════════════════════════════════════════╗
║  FRONT DOOR — 2:14 AM                                            ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │       .-------.     TOO STILL · TOO TALL                  │    ║
║   │      /  -   -  \\    smile frozen · eyes wrong           │    ║
║   │     |    \\_/    |    "Let me in. Let me in."            │    ║
║   │     |  \\___/  |     joints bend backward?               │    ║
║   │      \\  ___  /                                          │    ║
║   │       '-----'                                           │    ║
║   └────────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════════╝`,
};

export function sanitizeAsciiArt(art) {
  if (!art) return art;
  let result = art;
  for (const [emoji, text] of Object.entries(EMOJI_TO_TEXT)) {
    result = result.split(emoji).join(text);
  }
  result = result.replace(/[\u{1F000}-\u{1FFFF}]/gu, '');
  result = result.replace(/[\u2600-\u27BF]/g, (char) => EMOJI_TO_TEXT[char] || '');
  return result;
}

const VIEW_CANDIDATES = {
  let_them_in: ['portrait'],
  who_to_save: ['pov'],
  witness: ['detail', 'pov', 'over_shoulder'],
  standard: ['pov', 'detail', 'hands', 'over_shoulder', 'peephole', 'scene'],
};

export function getAsciiFingerprint(asciiKey, viewType = 'pov', portraitKey) {
  const key = asciiKey || 'default';
  if (viewType === 'portrait') {
    return `ascii:${portraitKey || key}:portrait`;
  }
  return `ascii:${key}:${viewType}`;
}

export function getScenarioAsciiFingerprint(scenario) {
  if (!scenario) return '';
  return getAsciiFingerprint(
    scenario.asciiKey,
    scenario.viewType || 'pov',
    scenario.portraitKey
  );
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** One view per scenario — pick a type that has not been shown this run when possible */
export function pickViewType(modeType = 'standard', options = {}) {
  const {
    asciiKey = 'default',
    portraitKey,
    playedAsciiFingerprints = [],
    allowRepeats = false,
  } = options;

  const playedSet = new Set(playedAsciiFingerprints);
  let candidates = VIEW_CANDIDATES[modeType] || VIEW_CANDIDATES.standard;

  if (modeType === 'witness') {
    candidates = Math.random() < 0.6
      ? ['detail', 'pov', 'over_shoulder']
      : ['pov', 'detail', 'over_shoulder'];
  }

  const fresh = candidates.filter(
    (view) => !playedSet.has(getAsciiFingerprint(asciiKey, view, portraitKey))
  );

  if (!allowRepeats && fresh.length) {
    return pickRandom(fresh);
  }

  return pickRandom(candidates);
}

export function getViewCandidates(modeType = 'standard') {
  return VIEW_CANDIDATES[modeType] || VIEW_CANDIDATES.standard;
}

export function hasFreshAsciiView(asciiKey, modeType, playedAsciiFingerprints, portraitKey) {
  if (!playedAsciiFingerprints?.length) return true;
  const playedSet = new Set(playedAsciiFingerprints);
  const candidates = getViewCandidates(modeType);
  return candidates.some(
    (view) => !playedSet.has(getAsciiFingerprint(asciiKey, view, portraitKey))
  );
}

export function getAsciiView(key, viewType = 'pov', sceneArt, sceneKey) {
  const sk = sceneKey || key;
  let raw;

  switch (viewType) {
    case 'portrait':
      raw = ASCII_PORTRAITS[key] || ASCII_PORTRAITS.human_normal;
      break;
    case 'pov':
      raw = ASCII_POV[sk] || buildCategoryPov(sk, sceneArt);
      break;
    case 'detail':
      raw = ASCII_DETAIL[sk] || ASCII_DETAIL.default;
      break;
    case 'hands':
      raw = ASCII_POV.hands;
      break;
    case 'peephole':
      raw = ASCII_POV.peephole || ASCII_POV.stranger_knock;
      break;
    case 'over_shoulder':
      raw = ASCII_OVER_SHOULDER[sk] || buildOverShoulder(sk);
      break;
    case 'scene':
    default:
      raw = sceneArt;
      break;
  }

  return sanitizeAsciiArt(raw);
}

function buildCategoryPov(sceneKey, sceneArt) {
  if (ASCII_POV[sceneKey]) return ASCII_POV[sceneKey];

  const everyday = ['party_invite', 'car_repair', 'job_interview', 'awkward_moment',
    'morning_rush', 'text_message', 'grocery_store', 'roommate_issue', 'work_deadline'];
  const isEveryday = everyday.includes(sceneKey);

  const title = sceneKey.replace(/_/g, ' ').toUpperCase();

  if (isEveryday) {
    return `
╔══════════════════════════════════════════════════════════════════╗
║  POV — ${title.slice(0, 52).padEnd(52)}║
║ .::''::..::''::..::''::..::''::..::''::..::''::..::''::..::''::. ║
║ '   normal room · daylight · real life pressure               ' ║
║ .  ════════════════════ your view ahead ═══════════════════════  . ║
║ '   the situation fills your vision · no one else can decide  ' ║
║ .  YOUR HANDS visible at bottom of frame · hesitating          . ║
║ ' :'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'': ' ║
╚══════════════════════════════════════════════════════════════════╝`;
  }

  return `
╔══════════════════════════════════════════════════════════════════╗
║  POV — ${title.slice(0, 52).padEnd(52)}║
║ .::''::..::''::..::''::..::''::..::''::..::''::..::''::..::''::. ║
║ '   darkness at edges · heart loud · eyes locked forward        ' ║
║ .  ═══════════════════ HORIZON ═══════════════════════════════  . ║
║ '              danger · choice · no time                        ' ║
║ .  YOUR HANDS (foreground) · trembling · decide NOW            . ║
║ ' :'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'': ' ║
╚══════════════════════════════════════════════════════════════════╝`;
}

function buildOverShoulder(sceneKey) {
  const title = sceneKey.replace(/_/g, ' ').toUpperCase();
  return `
╔══════════════════════════════════════════════════════════════════╗
║  OVER SHOULDER — ${title.slice(0, 45).padEnd(45)}║
║ .::''::..::''::..::''::..::''::..::''::..::''::..::''::..::''::. ║
║ '                    scene ahead of you                       ' ║
║ .     \\___                                                      . ║
║ '      \\__  YOU (from behind) · watching · deciding            ' ║
║ .       \\___ shoulder in frame · moment frozen               . ║
║ ' :'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'':.:'': ' ║
╚══════════════════════════════════════════════════════════════════╝`;
}

export function getViewLabel(viewType) {
  return VIEW_LABELS[viewType] || VIEW_LABELS.pov;
}

export function isImmersiveView(viewType) {
  return viewType !== 'scene';
}
