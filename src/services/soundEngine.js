let ctx = null;
let masterGain = null;
let ambienceState = null;
let ambienceTimer = null;

function init() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function setMasterVolume(volume) {
  init();
  masterGain.gain.setValueAtTime(volume, ctx.currentTime);
}

function playTone(freq, duration, {
  type = 'square',
  volume = 0.2,
  detune = 0,
  attack = 0.01,
  delay = 0,
  release = null,
} = {}) {
  init();
  const t = ctx.currentTime + delay;
  const rel = release ?? duration * 0.85;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (detune) osc.detune.setValueAtTime(detune, t);
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.linearRampToValueAtTime(volume, t + attack);
  gain.gain.exponentialRampToValueAtTime(0.001, t + rel);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

function playSweep(startFreq, endFreq, duration, {
  type = 'sawtooth',
  volume = 0.12,
  delay = 0,
} = {}) {
  init();
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 20), t + duration);
  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

function playNoise(duration, {
  volume = 0.15,
  filterFreq = 800,
  filterType = 'lowpass',
  delay = 0,
  attack = 0.01,
} = {}) {
  init();
  const t = ctx.currentTime + delay;
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.setValueAtTime(filterFreq, t);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.linearRampToValueAtTime(volume, t + attack);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  source.start(t);
}

function playSequence(notes, gap = 0.08, noteDuration = 0.1, volume = 0.15, type = 'square') {
  init();
  const start = ctx.currentTime;
  notes.forEach((freq, i) => {
    if (freq === 0) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start + i * gap);
    gain.gain.setValueAtTime(volume, start + i * gap);
    gain.gain.exponentialRampToValueAtTime(0.001, start + i * gap + noteDuration);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(start + i * gap);
    osc.stop(start + i * gap + noteDuration + 0.02);
  });
}

function playChord(freqs, duration = 0.3, volume = 0.08, type = 'triangle') {
  freqs.forEach((freq, i) => {
    playTone(freq, duration, { type, volume: volume * 0.7, detune: i * 3, attack: 0.05 });
  });
}

function playImpact({ low = 80, high = 200, volume = 0.15 } = {}) {
  playTone(low, 0.2, { type: 'sawtooth', volume });
  playNoise(0.12, { volume: volume * 0.6, filterFreq: high });
}

const SOUNDS = {
  // ── UI ──
  click: () => playTone(1200, 0.06, { volume: 0.12 }),
  hover: () => playTone(600, 0.04, { volume: 0.06, type: 'triangle' }),
  select: () => playSequence([523, 659, 784], 0.07, 0.09, 0.14),
  blip: () => playTone(800, 0.05, { volume: 0.08 }),
  back: () => playSequence([440, 330], 0.06, 0.07, 0.1),
  toggle: () => playSequence([660, 880], 0.05, 0.06, 0.1),
  open: () => playSequence([330, 440, 554, 659], 0.06, 0.07, 0.11),
  close: () => playSequence([659, 554, 440, 330], 0.05, 0.06, 0.1),
  confirm: () => playSequence([392, 523, 659], 0.07, 0.08, 0.12),
  cancel: () => playSequence([523, 440, 349], 0.07, 0.08, 0.1),
  scroll: () => playTone(500, 0.03, { volume: 0.04, type: 'triangle' }),
  tab: () => playSequence([440, 523], 0.05, 0.05, 0.08),
  swipe: () => {
    playSweep(900, 300, 0.12, { volume: 0.08, type: 'triangle' });
    playNoise(0.08, { volume: 0.04, filterFreq: 1200 });
  },
  whoosh: () => playSweep(400, 1200, 0.15, { volume: 0.1, type: 'sine' }),

  // ── Menu & flow ──
  start: () => playSequence([262, 330, 392, 523, 659], 0.1, 0.1, 0.13),
  continue: () => playSequence([440, 554, 659], 0.08, 0.08, 0.12),
  loading: () => {
    playSequence([220, 262, 294], 0.15, 0.08, 0.07, 'triangle');
    playNoise(0.2, { volume: 0.03, filterFreq: 500 });
  },
  unlock: () => playSequence([1047, 1319, 1568], 0.06, 0.08, 0.1),
  poof: () => {
    playNoise(0.18, { volume: 0.1, filterFreq: 600 });
    playTone(200, 0.15, { volume: 0.08, type: 'sawtooth' });
  },
  sparkle: () => playSequence([784, 988, 1175, 1568], 0.05, 0.06, 0.09, 'triangle'),

  // ── Scenarios ──
  scenario: () => {
    playNoise(0.25, { volume: 0.07, filterFreq: 400 });
    playSequence([220, 330, 440], 0.1, 0.12, 0.1);
  },
  everydayReveal: () => {
    playSequence([349, 440, 523], 0.09, 0.1, 0.1, 'triangle');
    playTone(880, 0.08, { volume: 0.05, type: 'sine', delay: 0.2 });
  },
  suspense: () => {
    playTone(110, 0.5, { volume: 0.06, type: 'sawtooth' });
    playNoise(0.3, { volume: 0.04, filterFreq: 250, delay: 0.1 });
  },
  reveal: () => {
    playSweep(200, 600, 0.2, { volume: 0.1 });
    playSequence([330, 392, 440], 0.08, 0.1, 0.09);
  },
  mystery: () => {
    playSequence([220, 0, 277, 0, 330], 0.12, 0.1, 0.09);
    playNoise(0.15, { volume: 0.05, filterFreq: 350 });
  },

  // ── Results ──
  good: () => playSequence([523, 659, 784, 1047], 0.09, 0.1, 0.13),
  neutral: () => playSequence([440, 392], 0.12, 0.12, 0.11),
  bad: () => {
    playSequence([392, 330, 262, 196], 0.1, 0.14, 0.14);
    playNoise(0.2, { volume: 0.06, filterFreq: 300 });
  },
  critical: () => {
    playSequence([196, 165, 131, 98], 0.12, 0.15, 0.14);
    playImpact({ low: 60, volume: 0.12 });
  },
  relief: () => playSequence([392, 440, 494, 523], 0.1, 0.12, 0.1, 'triangle'),
  damage: () => {
    playSweep(300, 80, 0.15, { volume: 0.12, type: 'sawtooth' });
    playNoise(0.1, { volume: 0.08, filterFreq: 200 });
  },
  heal: () => playSequence([523, 659, 784], 0.08, 0.1, 0.1, 'triangle'),
  coin: () => playSequence([988, 1319], 0.05, 0.07, 0.1),
  powerup: () => playSequence([392, 523, 659, 784, 1047], 0.07, 0.08, 0.12),
  levelup: () => {
    playSequence([523, 659, 784, 1047], 0.08, 0.1, 0.13);
    playChord([523, 659, 784], 0.4, 0.06);
  },

  // ── Arcade ──
  tick: () => playTone(900, 0.03, { volume: 0.05 }),
  tickUrgent: () => {
    playTone(1100, 0.04, { volume: 0.09 });
    playTone(880, 0.03, { volume: 0.06, delay: 0.04 });
  },
  comboUp: () => playSequence([659, 784, 988, 1175], 0.05, 0.06, 0.11),
  comboBreak: () => playSequence([440, 349, 262], 0.08, 0.1, 0.1),
  arcadeHit: () => {
    playTone(1200, 0.05, { volume: 0.14 });
    playSequence([784, 988], 0.04, 0.05, 0.1);
  },

  // ── End screens ──
  victory: () => playSequence([523, 659, 784, 1047, 1319], 0.1, 0.12, 0.14),
  gameover: () => {
    playSequence([392, 349, 294, 262, 196], 0.15, 0.18, 0.13);
    playNoise(0.4, { volume: 0.05, filterFreq: 200 });
  },
  fanfare: () => {
    playSequence([392, 523, 659, 784, 1047], 0.12, 0.14, 0.13);
    playChord([392, 494, 587, 784], 0.6, 0.07);
  },
  record: () => {
    playSequence([784, 988, 1175, 1568], 0.08, 0.1, 0.12);
    playSequence([1175, 1319, 1568], 0.04, 0.05, 0.08, 'triangle');
  },

  // ── Everyday flavor ──
  phoneBuzz: () => {
    playTone(180, 0.08, { volume: 0.1, type: 'square' });
    playTone(220, 0.08, { volume: 0.08, type: 'square', delay: 0.1 });
  },
  carHorn: () => playSequence([220, 0, 220, 0, 165], 0.1, 0.12, 0.12),
  sigh: () => playSweep(400, 250, 0.3, { volume: 0.08, type: 'triangle' }),
  awkward: () => playSequence([349, 330, 311], 0.15, 0.12, 0.09, 'triangle'),
  workStress: () => {
    playSequence([440, 415, 392], 0.1, 0.1, 0.09);
    playTone(880, 0.15, { volume: 0.04, type: 'square', delay: 0.25 });
  },

  // ── Horror one-shots ──
  horrorStart: () => {
    playSweep(80, 40, 0.6, { volume: 0.14, type: 'sawtooth' });
    playSequence([98, 0, 73, 0, 49], 0.2, 0.2, 0.1);
    playNoise(0.35, { volume: 0.06, filterFreq: 180 });
  },
  horrorSelect: () => {
    playTone(55, 0.2, { volume: 0.1, type: 'sawtooth' });
    playNoise(0.1, { volume: 0.05, filterFreq: 120 });
  },
  horrorReveal: () => {
    playSweep(200, 55, 0.35, { volume: 0.12, type: 'sawtooth' });
    playNoise(0.3, { volume: 0.08, filterFreq: 220 });
    playTone(73, 0.4, { volume: 0.08, type: 'square', delay: 0.15 });
  },
  horrorSting: () => {
    playSequence([196, 0, 147, 0, 98], 0.08, 0.12, 0.14);
    playNoise(0.15, { volume: 0.1, filterFreq: 400, delay: 0.1 });
  },
  horrorBad: () => {
    playSequence([147, 123, 98, 73], 0.14, 0.18, 0.14);
    playSweep(300, 40, 0.3, { volume: 0.1, type: 'sawtooth' });
    playNoise(0.35, { volume: 0.08, filterFreq: 150 });
  },
  horrorGood: () => {
    playSequence([196, 247, 294], 0.12, 0.14, 0.09);
    playTone(98, 0.3, { volume: 0.05, type: 'triangle', delay: 0.2 });
  },
  horrorGameover: () => {
    playSequence([98, 73, 55, 41, 31], 0.2, 0.22, 0.13);
    playNoise(0.6, { volume: 0.08, filterFreq: 100 });
    playTone(31, 0.8, { volume: 0.1, type: 'sawtooth', delay: 0.5 });
  },
  horrorVictory: () => {
    playSequence([196, 247, 294, 349], 0.15, 0.16, 0.1);
    playTone(55, 0.5, { volume: 0.04, type: 'sine', delay: 0.4 });
  },
  dread: () => {
    playTone(65, 0.6, { volume: 0.09, type: 'sawtooth' });
    playNoise(0.25, { volume: 0.05, filterFreq: 200, delay: 0.1 });
  },
  heartbeat: () => {
    playTone(60, 0.08, { volume: 0.14, type: 'sine' });
    playTone(45, 0.12, { volume: 0.1, type: 'sine', delay: 0.12 });
  },
  whisper: () => {
    playNoise(0.4, { volume: 0.04, filterFreq: 900, filterType: 'bandpass' });
    playSweep(800, 400, 0.3, { volume: 0.03, type: 'triangle' });
  },
  creak: () => {
    playSweep(180, 90, 0.25, { volume: 0.08, type: 'sawtooth' });
    playNoise(0.15, { volume: 0.04, filterFreq: 300 });
  },
  static: () => playNoise(0.2, { volume: 0.06, filterFreq: 2000, filterType: 'highpass' }),
  distantScream: () => {
    playSweep(600, 200, 0.4, { volume: 0.06, type: 'sawtooth' });
    playNoise(0.3, { volume: 0.04, filterFreq: 600, filterType: 'bandpass' });
  },
  boneChatter: () => playSequence([800, 950, 1100, 950, 800], 0.04, 0.04, 0.06, 'square'),
  nightmareWhoosh: () => {
    playSweep(1200, 60, 0.35, { volume: 0.1, type: 'sawtooth' });
    playNoise(0.25, { volume: 0.06, filterFreq: 350 });
  },
  shadowShift: () => {
    playTone(40, 0.3, { volume: 0.08, type: 'sine' });
    playNoise(0.2, { volume: 0.03, filterFreq: 150, delay: 0.05 });
  },
  voidHum: () => playTone(50, 0.5, { volume: 0.07, type: 'sawtooth' }),
  horrorImpact: () => {
    playImpact({ low: 45, high: 120, volume: 0.16 });
    playTone(31, 0.25, { volume: 0.1, type: 'square', delay: 0.05 });
  },
  horrorHover: () => playTone(80, 0.06, { volume: 0.07, type: 'sawtooth' }),
  horrorSelectChoice: () => {
    playSequence([98, 73, 55], 0.09, 0.1, 0.11);
    playNoise(0.1, { volume: 0.05, filterFreq: 200, delay: 0.15 });
  },
  lowHealth: () => {
    playSequence([330, 0, 262], 0.1, 0.08, 0.09);
    playTone(196, 0.15, { volume: 0.08, type: 'square', delay: 0.15 });
  },
  horrorLowHealth: () => {
    playTone(60, 0.08, { volume: 0.14, type: 'sine' });
    playTone(45, 0.12, { volume: 0.1, type: 'sine', delay: 0.12 });
    playTone(49, 0.2, { volume: 0.06, type: 'sawtooth', delay: 0.2 });
  },
};

function playSparkle() {
  playSequence([1175, 1319, 1568], 0.04, 0.05, 0.08, 'triangle');
}

const HORROR_AMBIENCE_ONE_SHOTS = [
  'whisper', 'creak', 'static', 'distantScream', 'shadowShift',
  'voidHum', 'boneChatter', 'dread', 'horrorSting',
];

const SOUND_CATALOG = {
  ui: ['click', 'hover', 'select', 'blip', 'back', 'toggle', 'open', 'close', 'confirm', 'cancel', 'scroll', 'tab', 'swipe', 'whoosh'],
  flow: ['start', 'continue', 'loading', 'unlock', 'poof', 'sparkle', 'scenario', 'everydayReveal', 'suspense', 'reveal', 'mystery'],
  results: ['good', 'neutral', 'bad', 'critical', 'relief', 'damage', 'heal', 'coin', 'powerup', 'levelup'],
  arcade: ['tick', 'tickUrgent', 'comboUp', 'comboBreak', 'arcadeHit'],
  end: ['victory', 'gameover', 'fanfare', 'record'],
  everyday: ['phoneBuzz', 'carHorn', 'sigh', 'awkward', 'workStress'],
  horror: [
    'horrorStart', 'horrorSelect', 'horrorReveal', 'horrorSting', 'horrorBad', 'horrorGood',
    'horrorGameover', 'horrorVictory', 'dread', 'heartbeat', 'whisper', 'creak', 'static',
    'distantScream', 'boneChatter', 'nightmareWhoosh', 'shadowShift', 'voidHum', 'horrorImpact',
    'horrorHover', 'horrorSelectChoice', 'lowHealth', 'horrorLowHealth',
  ],
};

export function getSoundCatalog() {
  return SOUND_CATALOG;
}

export function playSound(name, volume = 0.5) {
  const fn = SOUNDS[name];
  if (!fn) return;
  try {
    setMasterVolume(volume);
    fn();
  } catch {
    /* audio blocked until user gesture */
  }
}

export function playRandomSound(names, volume = 0.5) {
  if (!names?.length) return;
  const name = names[Math.floor(Math.random() * names.length)];
  playSound(name, volume);
}

function scheduleHorrorAmbienceEvent(volume) {
  if (!ambienceState?.active) return;
  const delay = 6000 + Math.random() * 18000;
  ambienceTimer = setTimeout(() => {
    if (!ambienceState?.active) return;
    playRandomSound(HORROR_AMBIENCE_ONE_SHOTS, volume * 0.35);
    scheduleHorrorAmbienceEvent(volume);
  }, delay);
}

export function startHorrorAmbience(volume = 0.5) {
  stopHorrorAmbience();
  try {
    init();
    const t = ctx.currentTime;

    const droneOsc = ctx.createOscillator();
    droneOsc.type = 'sawtooth';
    droneOsc.frequency.setValueAtTime(52, t);

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.001, t);
    droneGain.gain.linearRampToValueAtTime(volume * 0.04, t + 2);

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(120, t);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.15, t);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(8, t);
    lfo.connect(lfoGain);
    lfoGain.connect(droneOsc.frequency);

    droneOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);
    droneOsc.start(t);
    lfo.start(t);

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1;

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(280, t);
    noiseFilter.Q.setValueAtTime(2, t);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 0.012, t);
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseSource.start(t);

    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(26, t);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(volume * 0.03, t);
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(t);

    ambienceState = {
      active: true,
      nodes: [droneOsc, lfo, noiseSource, subOsc],
      gains: [droneGain, noiseGain, subGain],
    };

    setMasterVolume(volume);
    scheduleHorrorAmbienceEvent(volume);
  } catch {
    ambienceState = null;
  }
}

export function stopHorrorAmbience() {
  if (ambienceTimer) {
    clearTimeout(ambienceTimer);
    ambienceTimer = null;
  }
  if (!ambienceState) return;
  try {
    const t = ctx.currentTime;
    ambienceState.gains?.forEach((gain) => {
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.linearRampToValueAtTime(0.001, t + 0.8);
    });
    ambienceState.nodes?.forEach((node) => {
      try { node.stop(t + 0.9); } catch { /* already stopped */ }
    });
  } catch { /* ignore */ }
  ambienceState = { active: false };
  setTimeout(() => { ambienceState = null; }, 1000);
}

export function unlockAudio() {
  init();
}
