const SCENARIO_TEMPLATES = [
  {
    category: 'horror',
    asciiKey: 'bedroom_killer',
    setups: [
      'There\'s something under your bed. You hear breathing. A voice whispers: "Are you asleep?"',
      'You wake at 3 AM. A cold hand reaches from under the mattress and taps your shoulder.',
      'The figure beneath your bed slowly pulls on your blanket. "I know you\'re awake," it says.',
    ],
    optionPatterns: [
      ['Pretend to be asleep and stay completely still', 'Sit up and confront whatever is under there', 'Slowly reach for your phone to call for help'],
      ['Hold your breath and don\'t move a muscle', 'Kick wildly and scramble out of bed', 'Whisper back: "Who are you?"'],
      ['Close your eyes tight and count to ten', 'Leap off the bed and flip on the lights', 'Grab the baseball bat under your pillow'],
    ],
    outcomes: {
      good: ['Your stillness works. After an agonizing minute, the presence retreats.', 'You catch them off guard. They flee through the window before you can see their face.'],
      neutral: ['They linger, but eventually leave. You don\'t sleep for the rest of the night.', 'You survive, but something feels different about your room now.'],
      bad: ['They know you\'re faking. Cold fingers wrap around your ankle.', 'A sudden lunge from beneath the bed — you barely escape with your life.'],
    },
  },
  {
    category: 'thriller',
    asciiKey: 'dark_alley',
    setups: [
      'You\'re walking through a dark alley at midnight. Footsteps echo behind you, matching your pace exactly.',
      'A figure blocks the alley ahead. Another appears behind you. You\'re trapped between them.',
      'Your phone dies. The streetlight above flickers out. Someone is definitely following you.',
    ],
    optionPatterns: [
      ['Keep walking at a normal pace — don\'t show fear', 'Spin around and confront the follower', 'Break into a sprint toward the main street'],
      ['Duck into a doorway and hide in the shadows', 'Pull out your keys as a makeshift weapon', 'Call out: "I can see you!"'],
      ['Drop your wallet and run the opposite direction', 'Turn and walk directly toward them', 'Pretend to answer a phone call loudly'],
    ],
    outcomes: {
      good: ['The footsteps stop. Whoever it was, they weren\'t expecting your confidence.', 'Your sprint pays off — you burst onto a crowded street, safe.'],
      neutral: ['You make it home, but you\'ll never take this alley again.', 'They were just a drunk pedestrian. Your heart is still pounding.'],
      bad: ['The footsteps accelerate. You feel a hand on your shoulder.', 'You trip in the dark. By the time you recover, they\'re right in front of you.'],
    },
  },
  {
    category: 'survival',
    asciiKey: 'elevator',
    setups: [
      'The elevator jolts to a halt between floors. The lights flicker. A scratchy intercom crackles: "Do not panic."',
      'You\'re alone in a stalled elevator. The emergency phone is dead. Something thumps on the roof.',
      'The elevator drops suddenly, then stops. The floor indicator shows a floor that doesn\'t exist: "B?"',
    ],
    optionPatterns: [
      ['Press the emergency alarm button repeatedly', 'Try to pry open the doors with your fingers', 'Sit down and wait calmly for rescue'],
      ['Climb up through the ceiling hatch', 'Use your phone flashlight to inspect the panel', 'Yell for help through the door crack'],
      ['Press every floor button at once', 'Check if the intercom still works', 'Brace yourself — it might drop again'],
    ],
    outcomes: {
      good: ['Maintenance hears the alarm. The elevator resumes within minutes.', 'Your calm approach keeps you clear-headed when help arrives.'],
      neutral: ['Twenty minutes of waiting. They get you out through the doors.', 'The thumping stops. You never find out what it was.'],
      bad: ['The elevator lurches downward. You slam into the ceiling.', 'Something on the roof starts pushing the hatch open.'],
    },
  },
  {
    category: 'mystery',
    asciiKey: 'phone_call',
    setups: [
      'Your phone rings at 2:47 AM. Unknown number. It\'s the fifth call tonight from the same number.',
      'You answer. Heavy breathing. Then a voice: "I\'m outside your house. Look out the window."',
      'The caller ID shows your own phone number. When you answer, you hear yourself on the other end.',
    ],
    optionPatterns: [
      ['Answer the call and demand who this is', 'Ignore it and turn off your phone', 'Look out the window before deciding'],
      ['Record the call and trace the number', 'Answer but stay completely silent', 'Call the police and keep the line open'],
      ['Block the number immediately', 'Answer and play along: "I\'ve been expecting you"', 'Throw your phone in a drawer and ignore it'],
    ],
    outcomes: {
      good: ['It was a wrong number — a confused elderly person. Crisis averted.', 'Police trace the call to a burner phone miles away. You\'re safe.'],
      neutral: ['The calls stop after you block the number. You never learn who it was.', 'Silence on the line, then a click. The calls end.'],
      bad: ['"Good," the voice says. "Now I know you\'re awake." A car pulls into your driveway.', 'Your own voice on the phone says: "Don\'t look behind you."'],
    },
  },
  {
    category: 'survival',
    asciiKey: 'car_breakdown',
    setups: [
      'Your car dies on a deserted highway at night. No signal. Headlights appear in your rearview mirror.',
      'A flat tire strands you. As you change it, you notice someone watching from the tree line.',
      'The engine won\'t start. A figure approaches your window and taps on the glass.',
    ],
    optionPatterns: [
      ['Lock the doors and wait inside the car', 'Get out and try to flag down the approaching vehicle', 'Start walking toward the last town you passed'],
      ['Pop the hood and pretend you know what you\'re doing', 'Honk the horn repeatedly', 'Hide in the back seat and stay quiet'],
      ['Offer the stranger a ride if they can help', 'Drive on the rim to the nearest gas station', 'Call out: "I have a gun in here!"'],
    ],
    outcomes: {
      good: ['The approaching car is a tow truck. The driver offers you a ride to town.', 'Your bluff works — the watcher retreats into the trees.'],
      neutral: ['A kind stranger helps with the tire. You\'re back on the road in thirty minutes.', 'You walk two miles before finding a gas station. Exhausted but alive.'],
      bad: ['The figure at your window doesn\'t respond to your shouts. The door handle jiggles.', 'Walking alone on the highway, headlights approach — but they don\'t slow down.'],
    },
  },
  {
    category: 'horror',
    asciiKey: 'haunted_house',
    setups: [
      'You enter an abandoned house seeking shelter from the storm. The door slams shut behind you.',
      'A ouija board sits on a dusty table. The planchette moves on its own, spelling: "BEHIND YOU."',
      'Every mirror in the house shows a figure standing behind you — but nothing is there when you turn.',
    ],
    optionPatterns: [
      ['Search for another exit immediately', 'Investigate the ouija board — push the planchette to "GOODBYE"', 'Break a window and climb out'],
      ['Shout into the darkness: "Show yourself!"', 'Find a room and barricade the door', 'Follow the planchette\'s message and turn around slowly'],
      ['Light a match and explore the basement', 'Take a mirror and smash it', 'Sit at the table and ask the spirit what it wants'],
    ],
    outcomes: {
      good: ['You find a back door unlocked. Rain washes over you as you escape.', 'Pushing to "GOODBYE" works — the house goes quiet. You leave unharmed.'],
      neutral: ['You barricade yourself until dawn. The storm passes. So do the whispers.', 'The basement is empty. Just old furniture and dust.'],
      bad: ['The door won\'t budge. Something cold breathes down your neck.', 'You turn around. The figure from the mirror is now in the room with you.'],
    },
  },
  {
    category: 'thriller',
    asciiKey: 'stranger_knock',
    setups: [
      'Someone knocks on your door at 3 AM. Through the peephole: a person in a delivery uniform, but no truck outside.',
      'Three sharp knocks. A voice: "Open up. We know you\'re in there." No police badge. No ID.',
      'Your doorbell rings repeatedly. The security camera shows someone standing perfectly still, staring at the camera.',
    ],
    optionPatterns: [
      ['Open the door a crack with the chain lock on', 'Don\'t respond — stay silent and turn off lights', 'Yell through the door: "Go away or I\'m calling 911"'],
      ['Check through the peephole and assess the situation', 'Arm yourself with a kitchen knife and open the door', 'Call 911 and keep them on the line'],
      ['Pretend you\'re not home', 'Open the door wide — maybe they need help', 'Turn on every light and make noise to seem awake'],
    ],
    outcomes: {
      good: ['They leave after no response. Police patrol the area after your call.', 'Through the chain lock, you see it\'s a confused neighbor. False alarm.'],
      neutral: ['They knock for ten more minutes, then leave. You never find out who it was.', 'Your yelling scares them off. Quiet returns to the night.'],
      bad: ['The chain lock breaks with one shove. You stumble backward.', 'Opening the door wide was a mistake. They weren\'t asking for help.'],
    },
  },
  {
    category: 'survival',
    asciiKey: 'survival_camp',
    setups: [
      'Camping alone in the wilderness. At midnight, branches snap around your tent. Something large is circling.',
      'You hear growling outside. Your food cache has been ransacked. Paw prints surround the tent.',
      'A guttural howl echoes through the forest. Your campfire has died. You\'re in total darkness.',
    ],
    optionPatterns: [
      ['Stay in the tent and make yourself small', 'Unzip the tent and shine your flashlight outside', 'Bang pots together to scare it off'],
      ['Climb a tree nearby for safety', 'Play dead and hold your breath', 'Start a fire with your emergency matches'],
      ['Whisper a prayer and stay still', 'Run toward your car fifty yards away', 'Record the sounds — maybe it\'s just a deer'],
    ],
    outcomes: {
      good: ['The banging works. Whatever it was retreats into the forest.', 'Your fire roars back to life. The animal keeps its distance.'],
      neutral: ['It circles for an hour, then leaves. Dawn reveals bear tracks.', 'Just a deer. Your heart rate takes longer to recover than the scare.'],
      bad: ['The tent wall bulges inward. Claws tear through the fabric.', 'Running in the dark, you trip on a root. Something is right behind you.'],
    },
  },
  {
    category: 'thriller',
    asciiKey: 'hostage',
    setups: [
      'A bank robbery goes wrong. You\'re now a hostage. The robber points a gun at you: "You. Phone. Now."',
      'Gunshots outside. The robber locks the door and looks at the hostages: "Nobody heroes. Understood?"',
      'The robber\'s mask slips. You recognize them — it\'s someone from your neighborhood.',
    ],
    optionPatterns: [
      ['Hand over your phone without resistance', 'Refuse and try to reason with them', 'Slowly reach for your phone while scanning for exits'],
      ['Create a distraction — knock over a display', 'Make eye contact and try to humanize yourself', 'Pretend to faint to buy time'],
      ['Comply but leave your phone unlocked for tracking', 'Whisper to another hostage to coordinate', 'Lunge for the gun — it\'s now or never'],
    ],
    outcomes: {
      good: ['Your compliance keeps everyone calm. Police negotiate a peaceful end.', 'The distraction works. Hostages escape through the back exit.'],
      neutral: ['You hand over the phone. The standoff lasts hours but ends without casualties.', 'They accept your reasoning. Tension drops a notch.'],
      bad: ['"Bad choice," they say. The gun swings toward you.', 'Your lunge fails. Everything happens in slow motion.'],
    },
  },
  {
    category: 'horror',
    asciiKey: 'zombie',
    setups: [
      'The outbreak reached your block. Through the window, you see them shambling toward your house.',
      'You\'re cornered in a grocery store. Three exits, each blocked by infected.',
      'Your friend was bitten an hour ago. Their eyes are changing. They reach for you: "Help me..."',
    ],
    optionPatterns: [
      ['Barricade the windows and stay quiet', 'Make a run for the nearest exit', 'Arm yourself with whatever you can find'],
      ['Try to reason with your changing friend', 'Climb to the roof and wait for rescue', 'Create a diversion and slip past them'],
      ['Hide in a closet and hope they pass', 'Fight your way through the weakest point', 'Call out to other survivors for help'],
    ],
    outcomes: {
      good: ['Your barricade holds. By morning, they\'ve wandered off.', 'The diversion works. You slip through unnoticed.'],
      neutral: ['You hold out until military evacuation. Bruised but alive.', 'Your friend fights the infection long enough for you to restrain them.'],
      bad: ['The barricade cracks. Hands reach through the gaps.', 'Your friend\'s grip is stronger than you expected.'],
    },
  },
  {
    category: 'mystery',
    asciiKey: 'mystery_box',
    setups: [
      'A package arrives with no return address. Inside: a single key and a note — "You know which door."',
      'You find a locked box in your attic. Your name is carved into the lid. You don\'t remember putting it there.',
      'A stranger hands you a sealed envelope: "Don\'t open it until midnight." It\'s 11:58 PM.',
    ],
    optionPatterns: [
      ['Open it immediately — curiosity wins', 'Wait until midnight as instructed', 'Take it to the police without opening'],
      ['Search the house for a matching lock', 'Burn it unopened', 'Call everyone you know to ask if they sent it'],
      ['Shake it and listen carefully', 'Open it with gloves — treat it as evidence', 'Ignore it completely and throw it away'],
    ],
    outcomes: {
      good: ['Inside: old family photos you thought were lost. A bittersweet reunion with the past.', 'The key opens a lockbox with documents that clear up a years-old mystery.'],
      neutral: ['It\'s empty. Just a cruel prank. Or was something already taken?', 'Midnight passes. The envelope dissolves into ash when opened.'],
      bad: ['A cloud of powder bursts out. Your eyes burn. Was that... poison?', 'The box contains something that shouldn\'t exist. You wish you\'d burned it.'],
    },
  },
  {
    category: 'survival',
    asciiKey: 'forest',
    setups: [
      'Hiking alone, you realize the trail ended an hour ago. The sun sets in twenty minutes.',
      'You hear a child crying in the woods. Following the sound leads you deeper off-trail.',
      'Your compass spins wildly. Every direction looks the same. Your water is almost gone.',
    ],
    optionPatterns: [
      ['Head downhill — water flows down', 'Climb the tallest tree to spot landmarks', 'Follow the crying voice — someone needs help'],
      ['Stay put and build a signal fire', 'Retrace your steps using broken branches as markers', 'Keep walking straight — you\'ll hit a road eventually'],
      ['Drink from a stream you find', 'Set up camp and wait for morning', 'Fire three shots from your emergency flare gun'],
    ],
    outcomes: {
      good: ['Downhill leads to a stream, then a road. A ranger picks you up.', 'From the treetop, you spot your car\'s roof glinting in the distance.'],
      neutral: ['Your signal fire works. Searchers find you at dawn.', 'The crying stops. You never find the source, but you find the trail.'],
      bad: ['The stream makes you sick. Now you\'re lost AND ill.', 'The crying was a recording. You\'re now hopelessly deep in the woods.'],
    },
  },
];

const HORROR_EXCLUSIVE_TEMPLATES = [
  {
    category: 'horror',
    asciiKey: 'sleep_paralysis',
    creepiness: 10,
    setups: [
      'You wake but your body won\'t move. A dark figure sits on your chest, face inches from yours, whispering your name over and over.',
      'Sleep paralysis grips you. The shadow in the corner hasn\'t moved for an hour — but it\'s getting closer without walking.',
      'You\'re frozen in bed. Wet breathing fills your ear. Something says: "I\'ve been watching you sleep for weeks."',
    ],
    optionPatterns: [
      ['Try to scream — force any sound out', 'Close your eyes and pray it goes away', 'Focus every thought on moving one finger'],
      ['Wiggle your toes — start small', 'Stare it down — don\'t break eye contact', 'Stop breathing so it thinks you\'re dead'],
      ['Let it happen — surrender to the paralysis', 'Bite your tongue hard to jolt awake', 'Whisper: "You\'re not real"'],
    ],
    outcomes: {
      good: ['Your finger twitches. Sensation floods back. The figure dissolves like smoke.', 'A scream rips free. You bolt upright, alone, drenched in sweat.'],
      neutral: ['Dawn breaks through the window. The weight lifts. You\'re still not sure what was real.', 'You survive the night, but every time you drift off, you feel it returning.'],
      bad: ['The whispering stops. Then teeth press against your neck. You can\'t even flinch.', 'When you finally move, something moves with you — still on your chest.'],
    },
  },
  {
    category: 'horror',
    asciiKey: 'mirror_horror',
    creepiness: 9,
    setups: [
      'Your bathroom mirror shows a figure standing behind you. You\'re alone. When you turn — nothing. Look back at the mirror: it\'s still there, closer now.',
      'Every mirror in the house shows you with a wide, unblinking smile — but your face feels normal. The reflection raises a hand you didn\'t lift.',
      'You notice your reflection blinks a half-second after you do. Then it stops mimicking you entirely and just... watches.',
    ],
    optionPatterns: [
      ['Smash every mirror in the house', 'Talk to your reflection', 'Cover all mirrors with sheets and leave'],
      ['Stand perfectly still and match its movements', 'Run to a room with no mirrors', 'Take a photo of the mirror with your phone'],
      ['Ask it what it wants', 'Break the bathroom mirror only and flee', 'Pretend you don\'t notice and walk away calmly'],
    ],
    outcomes: {
      good: ['Glass shatters. In every fragment, the figure screams silently — then vanishes.', 'Your phone shows a normal photo. Maybe it only lives in reflected light.'],
      neutral: ['Covered mirrors buy you time. But you hear glass cracking in another room.', 'It doesn\'t follow you outside. You never install another mirror.'],
      bad: ['When the glass breaks, something crawls out of the largest shard.', 'Your reflection smiles wider. Then it steps out of the mirror behind you.'],
    },
  },
  {
    category: 'horror',
    asciiKey: 'doll_room',
    creepiness: 9,
    setups: [
      'You inherit your grandmother\'s house. The attic is full of antique dolls. One is in your bedroom now — you didn\'t put it there.',
      'Every doll in the room has turned to face you. Their painted eyes catch the moonlight. One doll\'s mouth is open — it was closed yesterday.',
      'You hear tiny footsteps above the ceiling. In the nursery, all the dolls are arranged in a circle around your sleeping bag.',
    ],
    optionPatterns: [
      ['Burn them all in the backyard', 'Pack every doll back in the attic and seal the door', 'Take one apart to see what\'s inside'],
      ['Ask the dolls who moved them', 'Sleep in a different room with the lights on', 'Place them all facing the wall'],
      ['Leave the house immediately', 'Hold the nearest doll and tell it you\'re not afraid', 'Lock the nursery and nail it shut'],
    ],
    outcomes: {
      good: ['The fire takes them. The footsteps stop. For the first time, the house feels quiet.', 'Facing them to the wall works — until morning. You leave before sunset.'],
      neutral: ['The attic door seals. Something scratches behind it every night, but it doesn\'t come out.', 'A different room buys you sleep. The dolls don\'t leave the nursery.'],
      bad: ['The one you opened is hollow — and something small crawls out of its chest cavity.', 'When you speak to them, every head turns in perfect unison.'],
    },
  },
  {
    category: 'horror',
    asciiKey: 'crawlspace',
    creepiness: 10,
    setups: [
      'Scratching from inside the walls. The crawlspace hatch in your closet is open — something dragged bedding inside.',
      'You hear a child\'s voice from the crawlspace: "Can you help me find my eyes?" The voice is directly beneath your floorboards.',
      'Every night, something crawls through the vents. Tonight you found fingernail marks on the inside of the crawlspace door — scratching to get out.',
    ],
    optionPatterns: [
      ['Crawl in with a flashlight to investigate', 'Seal the hatch with screws and furniture', 'Call an exterminator — pretend it\'s animals'],
      ['Lower a phone on a string to record inside', 'Yell into the crawlspace: "Who are you?"', 'Leave the house and stay at a hotel'],
      ['Set a trap at the entrance', 'Ignore it — some things are better unknown', 'Spray pepper spray into the opening'],
    ],
    outcomes: {
      good: ['The recording shows empty space. You seal it shut. The scratching stops forever.', 'The hotel is peaceful. You never go back to that house.'],
      neutral: ['The screws hold. The scratching continues, but it can\'t get through. You learn to sleep with noise.', 'Exterminators find nothing. The scratching stops for a week, then returns.'],
      bad: ['In the dark, something grabs your wrist and pulls. It\'s cold and wet.', 'It answers your yell: "I\'m already in the room with you."'],
    },
  },
  {
    category: 'horror',
    asciiKey: 'basement_whispers',
    creepiness: 10,
    setups: [
      'The basement door unlocks itself every night. From below: voices calling your name in voices of people who died years ago.',
      'You find old photographs in the basement — every picture includes you, dated decades before you were born.',
      'The whispers know things only you would know. They describe what you did today, in detail, before you even came downstairs.',
    ],
    optionPatterns: [
      ['Go down the stairs to confront them', 'Pour cement over the basement door', 'Record the whispers and play them back'],
      ['Ask them what they want from you', 'Move out before the next sunset', 'Recite every name of the dead and demand they leave'],
      ['Turn on every light and descend slowly', 'Board up the door and salt the threshold', 'Whisper back: "I\'m not afraid of dead things"'],
    ],
    outcomes: {
      good: ['The cement holds. The voices fade to silence over days. You start to heal.', 'Moving out saves you. The new owners report nothing. You don\'t ask questions.'],
      neutral: ['Playing the recording back makes them angry — but they stop speaking to you directly.', 'The salt buys a month of peace. You use that month to leave.'],
      bad: ['Halfway down the stairs, the lights die. Hands that aren\'t hands close around your ankles.', 'They answer: "We want to wear your skin. Come closer."'],
    },
  },
  {
    category: 'horror',
    asciiKey: 'haunted_house',
    creepiness: 8,
    setups: [
      'The family photo on the mantle has changed — a stranger now stands behind your parents, face blurred, hand on your shoulder as a child.',
      'Your childhood home calls you at work. Caller ID shows the landline that was disconnected ten years ago. A child version of you is crying on the line.',
      'You return to your old bedroom. The wallpaper is different — it shows your current face aging in real time, rotting slowly from the edges.',
    ],
    optionPatterns: [
      ['Rip down the wallpaper with your bare hands', 'Answer the phone and speak to your younger self', 'Burn the photograph'],
      ['Leave and never come back', 'Dig up the backyard — you don\'t know why, but you feel you must', 'Sleep one last night to say goodbye'],
    ],
    outcomes: {
      good: ['The photo burns without heat. The blurred face screams silently and is gone.', 'Tearing the wallpaper reveals normal plaster underneath. It was only on the surface.'],
      neutral: ['You leave. The house stands empty. Sometimes you dream of the blurred face.', 'The phone goes dead mid-cry. You block the number that doesn\'t exist.'],
      bad: ['Under the wallpaper: thousands of eyes, all yours, all blinking.', 'Your younger self on the phone says: "Why did you leave me here alone?"'],
    },
  },
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function evaluateChoice(optionIndex, round, mode = 'survival') {
  const difficultyBoost = mode === 'endless' ? round * 0.04 : mode === 'horror' ? 0.15 : mode === 'arcade' ? 0.05 : 0;
  const roll = Math.random() + (round * 0.02) + difficultyBoost;
  if (optionIndex === 0) return roll > 0.35 ? 'good' : roll > 0.15 ? 'neutral' : 'bad';
  if (optionIndex === 1) return roll > 0.45 ? 'neutral' : roll > 0.2 ? 'good' : 'bad';
  return roll > 0.4 ? 'bad' : roll > 0.2 ? 'neutral' : 'good';
}

function getTemplatePool(mode, usedCategories) {
  if (mode === 'horror') {
    const horrorBase = SCENARIO_TEMPLATES.filter((t) => t.category === 'horror');
    return [...HORROR_EXCLUSIVE_TEMPLATES, ...horrorBase];
  }

  const available = SCENARIO_TEMPLATES.filter(
    (t) => !usedCategories.includes(t.category) || usedCategories.length > 3
  );
  return available.length ? available : SCENARIO_TEMPLATES;
}

export function generateLocalScenario(round = 0, usedCategories = [], options = {}) {
  const { mode = 'survival' } = options;
  const pool = getTemplatePool(mode, usedCategories);

  let template;
  if (mode === 'horror') {
    const exclusive = HORROR_EXCLUSIVE_TEMPLATES;
    const pickExclusive = Math.random() < 0.55;
    template = pickExclusive
      ? pickRandom(exclusive)
      : pickRandom(pool);
  } else {
    template = pickRandom(pool);
  }

  const setupIndex = Math.floor(Math.random() * template.setups.length);
  const optionSetIndex = Math.floor(Math.random() * template.optionPatterns.length);

  return {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    category: template.category,
    asciiKey: template.asciiKey,
    setup: template.setups[setupIndex],
    options: shuffleArray(template.optionPatterns[optionSetIndex]),
    template,
    setupIndex,
    optionSetIndex,
    isAi: false,
    isCreepy: template.creepiness >= 8,
  };
}

export function resolveChoice(scenario, optionIndex, round, mode = 'survival', combo = 0) {
  const resultType = evaluateChoice(optionIndex, round, mode);
  const outcomes = scenario.template.outcomes[resultType];
  const outcome = pickRandom(outcomes);

  let healthDelta = resultType === 'good' ? 0 : resultType === 'neutral' ? -10 : -25;
  let scoreDelta = resultType === 'good' ? 100 : resultType === 'neutral' ? 50 : 10;

  if (mode === 'horror') {
    healthDelta = resultType === 'good' ? -5 : resultType === 'neutral' ? -18 : -35;
    scoreDelta = resultType === 'good' ? 120 : resultType === 'neutral' ? 40 : 5;
  }

  if (mode === 'endless') {
    healthDelta = Math.round(healthDelta * (1 + round * 0.08));
    scoreDelta = Math.round(scoreDelta * (1 + round * 0.05));
  }

  if (mode === 'arcade') {
    const multiplier = 1 + combo * 0.25;
    scoreDelta = Math.round(scoreDelta * multiplier);
    if (resultType === 'good') scoreDelta += 50 * combo;
  }

  let survived = resultType !== 'bad' || Math.random() > 0.3;
  if (mode === 'horror') survived = resultType !== 'bad' || Math.random() > 0.12;
  if (mode === 'endless' && resultType === 'bad') survived = Math.random() > 0.15 + round * 0.02;

  return {
    resultType,
    outcome,
    healthDelta,
    scoreDelta,
    survived,
    comboBonus: mode === 'arcade' && resultType === 'good' ? combo : 0,
  };
}

export async function generateAiScenario(apiKey, round, previousChoices = [], options = {}) {
  const { mode = 'survival' } = options;
  const context = previousChoices.length
    ? `Previous player choices: ${previousChoices.join('; ')}. Build on this story.`
    : 'Start a new survival horror story.';

  const modeHint = mode === 'horror'
    ? 'This is HORROR ONLY mode. Make it deeply disturbing, psychologically terrifying, and viscerally creepy. Use body horror, the uncanny, and dread.'
    : mode === 'endless'
      ? `Endless mode round ${round + 1}. Escalate tension — this has been going on a long time.`
      : mode === 'arcade'
        ? 'Arcade mode — punchy, fast-paced, high-stakes scenario.'
        : '';

  const prompt = `You are a text adventure game engine. Generate a tense, immersive survival scenario.

${context}
${modeHint}

Round: ${round + 1}

Respond ONLY with valid JSON in this exact format:
{
  "setup": "2-3 sentence scenario description with dialogue if appropriate",
  "options": ["option 1", "option 2", "option 3"],
  "asciiKey": "one of: bedroom_killer, dark_alley, elevator, forest, phone_call, car_breakdown, haunted_house, stranger_knock, survival_camp, hostage, zombie, mystery_box, mirror_horror, sleep_paralysis, doll_room, crawlspace, basement_whispers",
  "category": "horror|thriller|survival|mystery"
}

Make options meaningfully different — risky, cautious, and clever. Be creative and vivid.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You generate JSON-only survival game scenarios. No markdown.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();
  const jsonStr = content.replace(/```json\n?|\n?```/g, '');
  const parsed = JSON.parse(jsonStr);

  return {
    id: `ai-${Date.now()}`,
    category: parsed.category || 'mystery',
    asciiKey: parsed.asciiKey || 'default',
    setup: parsed.setup,
    options: parsed.options.slice(0, 3),
    isAi: true,
  };
}

export async function resolveAiChoice(apiKey, scenario, optionText, round) {
  const prompt = `Scenario: ${scenario.setup}
Player chose: "${optionText}"
Round: ${round + 1}

Respond ONLY with valid JSON:
{
  "outcome": "2-3 sentence result of the choice",
  "resultType": "good|neutral|bad",
  "healthDelta": number between -30 and 0,
  "scoreDelta": number between 0 and 150,
  "survived": true or false
}

Be dramatic but fair. "bad" should not always mean death — only set survived:false for truly fatal choices on later rounds.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You resolve game choices. JSON only.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to resolve choice');
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();
  const jsonStr = content.replace(/```json\n?|\n?```/g, '');
  return JSON.parse(jsonStr);
}
