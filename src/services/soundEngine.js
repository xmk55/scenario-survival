let ctx = null;
let masterGain = null;

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

function playTone(freq, duration, { type = 'square', volume = 0.2, detune = 0, attack = 0.01 } = {}) {
  init();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (detune) osc.detune.setValueAtTime(detune, ctx.currentTime);
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + attack);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration + 0.05);
}

function playNoise(duration, { volume = 0.15, filterFreq = 800 } = {}) {
  init();
  const bufferSize = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(filterFreq, ctx.currentTime);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  source.start();
}

function playSequence(notes, gap = 0.08, noteDuration = 0.1, volume = 0.15) {
  init();
  const start = ctx.currentTime;
  notes.forEach((freq, i) => {
    if (freq === 0) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, start + i * gap);
    gain.gain.setValueAtTime(volume, start + i * gap);
    gain.gain.exponentialRampToValueAtTime(0.001, start + i * gap + noteDuration);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(start + i * gap);
    osc.stop(start + i * gap + noteDuration + 0.02);
  });
}

const SOUNDS = {
  click: () => playTone(1200, 0.06, { volume: 0.12, type: 'square' }),

  hover: () => playTone(600, 0.04, { volume: 0.06, type: 'triangle' }),

  select: () => playSequence([523, 659, 784], 0.07, 0.09, 0.14),

  poof: () => {
    playNoise(0.18, { volume: 0.1, filterFreq: 600 });
    playTone(200, 0.15, { volume: 0.08, type: 'sawtooth' });
  },

  scenario: () => {
    playNoise(0.25, { volume: 0.07, filterFreq: 400 });
    playSequence([220, 330, 440], 0.1, 0.12, 0.1);
  },

  good: () => playSequence([523, 659, 784, 1047], 0.09, 0.1, 0.13),

  neutral: () => playSequence([440, 392], 0.12, 0.12, 0.11),

  bad: () => {
    playSequence([392, 330, 262, 196], 0.1, 0.14, 0.14);
    playNoise(0.2, { volume: 0.06, filterFreq: 300 });
  },

  continue: () => playSequence([440, 554, 659], 0.08, 0.08, 0.12),

  victory: () => playSequence([523, 659, 784, 1047, 1319], 0.1, 0.12, 0.14),

  gameover: () => {
    playSequence([392, 349, 294, 262, 196], 0.15, 0.18, 0.13);
    playNoise(0.4, { volume: 0.05, filterFreq: 200 });
  },

  start: () => playSequence([262, 330, 392, 523, 659], 0.1, 0.1, 0.13),

  tick: () => playTone(900, 0.03, { volume: 0.05, type: 'square' }),

  blip: () => playTone(800, 0.05, { volume: 0.08, type: 'square' }),
};

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

export function unlockAudio() {
  init();
}
