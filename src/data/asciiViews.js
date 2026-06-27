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

export const VIEW_LABELS = {
  scene: 'Scene View',
  pov: 'Your View',
  detail: 'Close Detail',
  portrait: 'Face to Face',
  hands: 'Your Hands',
  peephole: 'Through Peephole',
};

export const ASCII_PORTRAITS = {
  human_normal: `
╔══════════════════════════════════════════════════════════════════╗
║  AT THE DOOR — CHAIN STILL ON                    [RAIN] [RAIN]   ║
║                                                                  ║
║   DOOR FRAME          PEEPHOLE VIEW           HALL LIGHT FLICKER ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │  ┌──────────────────────────────────────────────────┐  │    ║
║   │  │                    .-------.                     │  │    ║
║   │  │                   /  o   o  \\                    │  │    ║
║   │  │                  |    \\_/    |    YOUR ROOMMATE?   │  │    ║
║   │  │                  |  \\___/  |    looks tired      │  │    ║
║   │  │                   \\  ___  /     wet coat           │  │    ║
║   │  │                    '-----'     familiar smile     │  │    ║
║   │  │         /|\\                     hands visible     │  │    ║
║   │  │          |                      no visible teeth  │  │    ║
║   │  └──────────────────────────────────────────────────┘  │    ║
║   │  VOICE: "Hey... forgot my keys. Can I come in?"          │    ║
║   └────────────────────────────────────────────────────────┘    ║
║   CHAIN: ON    DEADBOLT: LOCKED    YOU: HOLDING DOOR SHUT        ║
╚══════════════════════════════════════════════════════════════════╝`,

  human_doppel: `
╔══════════════════════════════════════════════════════════════════╗
║  AT THE DOOR — CHAIN STILL ON                    [RAIN] [RAIN]   ║
║                                                                  ║
║   DOOR FRAME          PEEPHOLE VIEW           HALL LIGHT FLICKER ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │  ┌──────────────────────────────────────────────────┐  │    ║
║   │  │                    .-------.                     │  │    ║
║   │  │                   /  O   o  \\    SLIGHTLY OFF   │  │    ║
║   │  │                  |    \\_/    |    smile too wide  │  │    ║
║   │  │                  |  \\___/  |    eyes don't blink │  │    ║
║   │  │                   \\  ___  /     WRONG SHOES       │  │    ║
║   │  │                    '-----'     voice flat          │  │    ║
║   │  │         /|\\                     fingers too long  │  │    ║
║   │  │          |                      shadow wrong       │  │    ║
║   │  └──────────────────────────────────────────────────┘  │    ║
║   │  VOICE: "Hey... forgot my keys. Can I come in?"          │    ║
║   └────────────────────────────────────────────────────────┘    ║
║   CHAIN: ON    DEADBOLT: LOCKED    YOU: SOMETHING FEELS WRONG    ║
╚══════════════════════════════════════════════════════════════════╝`,

  stranger_friendly: `
╔══════════════════════════════════════════════════════════════════╗
║  FRONT DOOR — 2:14 AM                                            ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │       .-------.          NEIGHBOR? DELIVERY? LOST?       │    ║
║   │      /  ^   ^  \\                                         │    ║
║   │     |    \\_/    |        holding grocery bag             │    ║
║   │     |  \\___/  |         name tag: "MARTIN"               │    ║
║   │      \\  ___  /          breath visible in cold air       │    ║
║   │       '-----'            seems nervous but normal         │    ║
║   │        /|\\                                               │    ║
║   └────────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════════╝`,

  stranger_wrong: `
╔══════════════════════════════════════════════════════════════════╗
║  FRONT DOOR — 2:14 AM                                            ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │       .-------.          TOO STILL. TOO TALL.            │    ║
║   │      /  -   -  \\         eyes reflect light wrong       │    ║
║   │     |    \\_/    |        smile frozen mid-grin           │    ║
║   │     |  \\___/  |         skin grey under porch lamp       │    ║
║   │      \\  ___  /          repeats same phrase...          │    ║
║   │       '-----'            "Let me in. Let me in."         │    ║
║   │        /|\\               joints bend backward?          │    ║
║   └────────────────────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════════╝`,
};

export const ASCII_POV = {
  default: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR EYES — FIRST PERSON                                          ║
║                                                                  ║
║              . . . . . . . . . . . . . . . . .                   ║
║           . '   EDGE OF VISION — BLURRED PERIPHERY   ' .         ║
║        . '                                               ' .      ║
║      . '     YOU ARE HERE. SOMETHING IS IN FRONT OF YOU.    ' .   ║
║     '                                                         '  ║
║    '    ┌─────────────────────────────────────────────┐        ' ║
║   '     │  >>>>>>>>>>  FOCUS  <<<<<<<<<<              │         '║
║   '     │         (direct line of sight)              │         '║
║   '     │    hands gripping edge of something...      │         '║
║   '     └─────────────────────────────────────────────┘         ' ║
║    '    heartbeat loud in ears... breath shallow...           '  ║
║     '                                                         '  ║
║      ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' '   ║
║                                                                  ║
║   [ blink ]   [ step back ]   [ lean closer ]                    ║
╚══════════════════════════════════════════════════════════════════╝`,

  bedroom_killer: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR VIEW — LYING IN BED, EYES SLIGHTLY OPEN                      ║
║                                                                  ║
║   CEILING CRACKS         GLOW OF PHONE: 3:17 AM                   ║
║   ─────────────────────────────────────────────────────────────  ║
║   edge of blanket ════════════════════════ edge of mattress      ║
║                                                                  ║
║        you can see without moving your head:                     ║
║        closet door...   ajar.   darker than it should be.        ║
║                                                                  ║
║   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║   ▓  UNDER BED — from your angle you see FINGERS on floor    ▓  ║
║   ▓  not yours.   too many joints.   not moving. yet.        ▓  ║
║   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║   VOICE (under bed): "Are you asleep?"                           ║
╚══════════════════════════════════════════════════════════════════╝`,

  dark_alley: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR VIEW — LOOKING DOWN THE ALLEY                                 ║
║                                                                  ║
║   YOUR HANDS: keys between fingers, knuckles white               ║
║        |\\___/|                                                   ║
║        |     |     puddle reflects streetlamp *                   ║
║   ─────┴─────┴───────────────────────────────────────────────   ║
║   alley stretches ahead — brick walls closing in                 ║
║   SHADOW on left wall... longer than yours... moving?            ║
║   FOOTSTEPS behind:  step... step... step...                     ║
║   dead end ahead.   fire escape to the right.   run or hide?     ║
╚══════════════════════════════════════════════════════════════════╝`,

  stranger_knock: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR VIEW — THROUGH THE PEEPHOLE                                 ║
║                                                                  ║
║   ┌─────────────────────────────────────────┐                   ║
║   │  ( circular fisheye distortion )         │                   ║
║   │         figure on porch                    │                   ║
║   │           .-----.                          │                   ║
║   │          /  o o  \\   face too close to door  │                   ║
║   │         |   \\_/   |  knocking again         │                   ║
║   │          \\  ---  /   three slow knocks      │                   ║
║   │           '-----'                           │                   ║
║   │  porch light buzzes — shadow jumps          │                   ║
║   └─────────────────────────────────────────┘                   ║
║   YOUR EYE at peephole    CHAIN: latched    HAND on deadbolt     ║
╚══════════════════════════════════════════════════════════════════╝`,

  elevator: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR VIEW — STUCK ELEVATOR, LOOKING AT REFLECTION                 ║
║                                                                  ║
║   mirror wall shows YOU and the doors behind you                 ║
║   ┌──────────────────────────────────────────────┐              ║
║   │  YOU          REFLECTION          DOORS       │              ║
║   │  (o_o)        (o_o)  ...wait     [||] [||]   │              ║
║   │  /|\\          /|\\   reflection  seams gap   │              ║
║   │   |            |    delayed?     scrape ^   │              ║
║   └──────────────────────────────────────────────┘              ║
║   ceiling panel: something shifts above you                      ║
╚══════════════════════════════════════════════════════════════════╝`,

  haunted_house: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR VIEW — FLASHLIGHT BEAM IN DARK HALL                          ║
║                                                                  ║
║   >>>>>>>>>>>>>>>>>>>> BEAM >>>>>>>>>>>>>>>>>>>>>>>>             ║
║   dust particles swirl in the cone of light                      ║
║   wallpaper peeling    portrait eyes seem to track you           ║
║   floorboard ahead: one board raised — something underneath?     ║
║   YOUR BREATH visible in cold air                                ║
╚══════════════════════════════════════════════════════════════════╝`,

  mirror_horror: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR VIEW — BATHROOM MIRROR, 3 AM                                 ║
║                                                                  ║
║   you stare at your reflection                                     ║
║   ┌──────────────────────────────────────────────┐              ║
║   │  REAL YOU          MIRROR                       │              ║
║   │  hand raised         hand raised...             │              ║
║   │  blink                 ...hasn't blinked yet    │              ║
║   │  scared                smiling?                 │              ║
║   └──────────────────────────────────────────────┘              ║
║   fog on glass clears from YOUR breath only on one side           ║
╚══════════════════════════════════════════════════════════════════╝`,

  who_to_save: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR VIEW — TWO PEOPLE, ONE ROPE, TEN SECONDS                     ║
║                                                                  ║
║   LEFT PLATFORM          YOU (center)         RIGHT PLATFORM     ║
║   ┌─────────────┐         /|\\               ┌─────────────┐    ║
║   │  PERSON A   │          |                 │  PERSON B   │    ║
║   │  holding    │    knife at YOUR throat     │  holding    │    ║
║   │  rope end   │                          │  rope end   │    ║
║   └─────────────┘                          └─────────────┘    ║
║   "SAVE THEM!"                              "SAVE ME!"           ║
║   YOU CAN ONLY CUT ONE ROPE                                        ║
╚══════════════════════════════════════════════════════════════════╝`,

  hands: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR HANDS — FIRST PERSON                                           ║
║                                                                  ║
║                    .---.     .---.                               ║
║                   /     \\   /     \\                              ║
║                  |  YOU  | |  YOU  |                             ║
║                   \\     /   \\     /                              ║
║                    '--+-----+--'                                 ║
║                       |     |                                    ║
║              trembling /     \\ gripping                         ║
║                       |     |                                    ║
║   sweat on palms · white knuckles · something wet on fingers     ║
║   breath fogging the edge of your vision                         ║
╚══════════════════════════════════════════════════════════════════╝`,

  peephole: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR VIEW — THROUGH THE PEEPHOLE (FISHEYE)                          ║
║                                                                  ║
║              . . . . . . . . . . . . . . .                         ║
║          . '   circular distortion ring   ' .                    ║
║        . '    ┌─────────────────────┐    ' .                     ║
║       '      │   FIGURE AT DOOR    │      '                      ║
║      '       │      .-----.        │       '                     ║
║     '        │     /  o o  \\       │        '                    ║
║    '         │    |   \\_/   |      │         '                   ║
║   '          │     \\  ---  /       │          '                  ║
║    '         └─────────────────────┘         '                   ║
║     '   porch light · long shadow · too still  '                 ║
║      ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' '                  ║
╚══════════════════════════════════════════════════════════════════╝`,
};

export const ASCII_DETAIL = {
  default: `
╔══════════════════════════════════════════════════════════════════╗
║  CLOSE DETAIL — SOMETHING SPECIFIC                                 ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │  >>> zoomed in <<<                                      │    ║
║   │  a scratch. a note. a stain. a key detail.              │    ║
║   │  the thing you'd miss if you looked at the whole room.  │    ║
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

export function pickViewType(modeType) {
  if (modeType === 'let_them_in') return 'portrait';
  if (modeType === 'who_to_save') return Math.random() < 0.55 ? 'pov' : 'scene';
  if (modeType === 'witness') return Math.random() < 0.45 ? 'detail' : 'pov';
  const roll = Math.random();
  if (roll < 0.32) return 'scene';
  if (roll < 0.52) return 'pov';
  if (roll < 0.72) return 'detail';
  if (roll < 0.86) return 'hands';
  return 'peephole';
}

/** Ordered camera cuts for one scenario — cycles for a cinematic feel */
export function buildViewSequence(modeType, initialView, asciiKey) {
  if (modeType === 'let_them_in') {
    return ['portrait', 'peephole', 'detail', 'portrait', 'pov'];
  }

  const hasPov = ASCII_POV[asciiKey] || asciiKey === 'stranger_knock';
  const cuts = [initialView];

  const add = (view) => {
    if (cuts[cuts.length - 1] !== view) cuts.push(view);
  };

  if (initialView !== 'pov' && (hasPov || true)) add('pov');
  if (initialView !== 'detail') add('detail');
  if (initialView !== 'scene') add('scene');
  add('hands');
  if (asciiKey === 'stranger_knock') add('peephole');
  else if (Math.random() < 0.35) add('peephole');
  add('pov');
  add('detail');

  return cuts.slice(0, 6);
}

export function getViewAtBeat(sequence, beat) {
  if (!sequence?.length) return 'scene';
  return sequence[Math.min(beat, sequence.length - 1)] ?? sequence[0];
}

export function getPhaseViewBeat(phase) {
  if (phase === 'resolving') return 1;
  if (phase === 'result') return 2;
  return 0;
}

export function getAsciiView(key, viewType = 'scene', sceneArt) {
  let raw;
  if (viewType === 'portrait') {
    raw = ASCII_PORTRAITS[key] || ASCII_PORTRAITS.human_normal;
  } else if (viewType === 'pov') {
    raw = ASCII_POV[key] || ASCII_POV.default;
  } else if (viewType === 'detail') {
    raw = ASCII_DETAIL[key] || ASCII_DETAIL.default;
  } else if (viewType === 'hands') {
    raw = ASCII_POV.hands || ASCII_POV[key] || ASCII_POV.default;
  } else if (viewType === 'peephole') {
    raw = ASCII_POV.peephole || ASCII_POV.stranger_knock || ASCII_POV[key] || ASCII_POV.default;
  } else {
    raw = sceneArt;
  }
  return sanitizeAsciiArt(raw);
}

export function getViewLabel(viewType) {
  return VIEW_LABELS[viewType] || VIEW_LABELS.scene;
}
