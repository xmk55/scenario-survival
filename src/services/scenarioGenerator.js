import { pickViewType, buildViewSequence } from '../data/asciiViews';

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

const REAL_LIFE_TEMPLATES = [
  {
    category: 'everyday',
    tone: 'everyday',
    asciiKey: 'party_invite',
    setups: [
      'Your friends are throwing a party tonight and everyone expects you there. You\'re exhausted and really don\'t want to go — but they\'ll notice if you skip.',
      'Group chat is blowing up about tonight\'s party. Someone texts you directly: "You\'re coming right??" You\'d rather stay in with a book.',
      'The party starts in an hour. You\'ve had a brutal week and the thought of small talk makes you want to scream. But your best friend is hosting.',
    ],
    optionPatterns: [
      ['Be honest — text that you\'re not feeling up to it', 'Force yourself to go for an hour then leave early', 'Make up an excuse about being sick'],
      ['Go but bring a friend as a buffer', 'Suggest hanging out one-on-one another day instead', 'Ignore the texts and hope they forget'],
      ['Go all in — might actually have fun', 'Reply "maybe" and see how you feel later', 'Turn off your phone and stay home guilt-free'],
    ],
    outcomes: {
      good: ['Your friends appreciate the honesty. One says "same honestly" and stays in too. Group video call instead.', 'You go for an hour, catch up with your best friend, and leave feeling glad you showed up.'],
      neutral: ['The excuse works but you feel a little guilty. They post fun photos and you wonder if you missed out.', 'You stay home. It\'s peaceful. The group chat is quiet toward you for a day.'],
      bad: ['They see through the excuse. Someone replies: "You never come anymore."', 'You ignore everything. Monday at work/school is awkward — they heard you were online gaming.'],
    },
  },
  {
    category: 'everyday',
    tone: 'everyday',
    asciiKey: 'car_repair',
    setups: [
      'Your tire goes flat on the way to work. You\'ve changed a tire before but it was years ago. You\'re on a busy roadside with cars whipping past.',
      'A weird clunking sound starts under your hood. You pull over — the engine is smoking slightly. You\'re 20 minutes from the nearest town.',
      'Your car won\'t start in the grocery store parking lot. Battery? Starter? You have jumper cables but no one around looks approachable.',
    ],
    optionPatterns: [
      ['Change the tire yourself using the spare', 'Call roadside assistance and wait', 'Flag down a driver and ask for help'],
      ['Pop the hood and try to identify the problem', 'Call a friend who knows cars', 'Risk driving slowly to the nearest gas station'],
      ['Ask someone in the parking lot for a jump', 'Google the symptoms and troubleshoot', 'Call an Uber and deal with the car tomorrow'],
    ],
    outcomes: {
      good: ['Forty sweaty minutes later, the spare is on. You make it to work — late, but proud.', 'Roadside assistance shows up in 25 minutes. Expensive, but you\'re back on the road.'],
      neutral: ['A stranger helps with the jump. Your car starts. You buy them coffee as thanks.', 'You Uber home. The mechanic bill tomorrow stings, but tonight you\'re safe.'],
      bad: ['The jack slips. You skin your knuckles and still need to call for help anyway.', 'Driving on the flat destroys the rim. Now it\'s a tow truck and a much bigger bill.'],
    },
  },
  {
    category: 'social',
    tone: 'everyday',
    asciiKey: 'awkward_moment',
    setups: [
      'You walk into a coffee shop and lock eyes with your ex at the counter. They haven\'t seen you yet. Your order is already half-placed.',
      'You wave at someone across the street who was waving at someone behind you. They look confused. It\'s someone from your class.',
      'Your friend introduces you to their new partner — it\'s someone you went on a terrible date with last year. Everyone is waiting for you to speak.',
    ],
    optionPatterns: [
      ['Walk up and say hi like an adult', 'Pretend you didn\'t see them and order to-go', 'Leave and go to a different coffee shop'],
      ['Laugh it off: "Wrong person, sorry!"', 'Pretend to get an urgent phone call and walk away', 'Go over and make awkward small talk anyway'],
      ['Send a friendly text later instead of dealing with this now', 'Use the moment to apologize for how things ended', 'Hide behind the menu board until they leave'],
    ],
    outcomes: {
      good: ['It\'s briefly awkward, then surprisingly normal. "Take care," they say. You exhale.', 'You laugh at yourself. The stranger laughs too. Human moment restored.'],
      neutral: ['You escape to-go. Through the window you see them notice you leaving. Whatever.', 'Small talk is painful but survivable. You leave with your dignity mostly intact.'],
      bad: ['You hide poorly. They definitely saw you. Eye contact through the menu board. Worse than saying hi.', 'Your apology opens old wounds. The conversation goes sideways in front of everyone.'],
    },
  },
  {
    category: 'work',
    tone: 'everyday',
    asciiKey: 'job_interview',
    setups: [
      'Job interview in five minutes. Your resume has a gap you haven\'t explained well. The interviewer calls your name.',
      'Your manager asks you to present your project to the whole team tomorrow. You\'re not ready and hate public speaking.',
      'Performance review today. You know you\'ve been slacking on one metric. Your boss closes the office door.',
    ],
    optionPatterns: [
      ['Be upfront about the resume gap with a prepared explanation', 'Deflect and emphasize your strengths instead', 'Oversell and hope they don\'t dig deeper'],
      ['Stay late tonight to prep the presentation', 'Ask a colleague to co-present with you', 'Be honest that you need one more day'],
      ['Own the metric slip and present a plan to fix it', 'Blame external factors outside your control', 'Counter with everything you did do well'],
    ],
    outcomes: {
      good: ['They nod. "Honesty matters here." The interview actually goes well after that.', 'Your colleague agrees to help. The presentation lands. Your manager is impressed.'],
      neutral: ['They don\'t love the deflection but don\'t push. You\'re a "maybe."', 'Buying a day works, but you pull an all-nighter. Exhausting.'],
      bad: ['They ask follow-up questions you can\'t answer. The oversell crumbles.', 'Blaming others makes your boss lose respect. The review goes poorly.'],
    },
  },
  {
    category: 'everyday',
    tone: 'everyday',
    asciiKey: 'morning_rush',
    setups: [
      'Your alarm didn\'t go off. Class starts in 13 minutes and you\'re still in bed. Your hair looks terrible and you haven\'t eaten.',
      'You overslept before a job interview. Shower, outfit, or breakfast — pick two, maybe.',
      'The bus just left without you. Next one is in 20 minutes but your exam starts in 15.',
    ],
    optionPatterns: [
      ['Skip breakfast and sprint to get there', 'Text your professor you\'re running late', 'Accept defeat and go back to sleep'],
      ['Shower in 3 minutes, grab whatever\'s clean, run', 'Call in and reschedule the interview', 'Run after the bus — it\'s worth a shot'],
      ['Bike there — faster than waiting for the next bus', 'Go in looking rough but on time', 'Email a friend for their notes and miss today'],
    ],
    outcomes: {
      good: ['You arrive breathless but on time. Nobody knows about the chaos.', 'The professor replies "thanks for letting me know." You make it with a minute to spare.'],
      neutral: ['You\'re 8 minutes late. Awkward entrance, but you\'re there.', 'Rescheduling works. Relief — but now you have more days to stress.'],
      bad: ['You trip running. Scraped knee AND late. Worst of both worlds.', 'Going back to sleep feels great until you check your grade later.'],
    },
  },
  {
    category: 'social',
    tone: 'everyday',
    asciiKey: 'text_message',
    setups: [
      'Your mom texts "We need to talk." Your phone is at 1% battery. You\'re on the bus and forgot your charger.',
      'Your crush replies after three days: "hey, about Saturday..." Your phone is dying and you can\'t think straight.',
      'Your boss texts on Sunday: "Can you come in today?" Battery at 2%. Weekend mode activated.',
    ],
    optionPatterns: [
      ['Fire off a quick reply before the phone dies', 'Call them instead of texting back', 'Let it die and deal with it when you\'re home'],
      ['Reply honestly about how you feel', 'Send a vague "sure, what\'s up?"', 'Panic-type something and hit send'],
      ['Politely decline the Sunday request', 'Say yes to avoid conflict', 'Ignore until Monday morning'],
    ],
    outcomes: {
      good: ['Your reply sends just before the screen goes black. Their response can wait — you handled it.', 'The call clears everything up in two minutes. Should\'ve called first.'],
      neutral: ['Phone dies. They text again Monday. "Everything okay?" Minor worry caused.', 'Vague reply buys time. The conversation continues tomorrow.'],
      bad: ['Autocorrect turns your text into nonsense. They send "???" and now you look weird.', 'Saying yes ruins your Sunday. Resentment builds all day.'],
    },
  },
  {
    category: 'everyday',
    tone: 'everyday',
    asciiKey: 'grocery_store',
    setups: [
      'You reach for the last carton of milk at the same time as another person. You both hesitate. This is stupidly awkward.',
      'The self-checkout keeps saying "unexpected item in bagging area." A line is forming behind you.',
      'You realize at checkout you forgot your wallet. Your phone wallet app might work — maybe.',
    ],
    optionPatterns: [
      ['Offer them the milk — you can come back later', 'Joke about it and suggest splitting somehow', 'Grab it quickly and walk away fast'],
      ['Call for an employee to reset the machine', 'Start over at a different kiosk', 'Apologize to the line and bag slowly'],
      ['Try the phone payment and hope it works', 'Run to your car for the wallet', 'Ask the person behind you to cover you'],
    ],
    outcomes: {
      good: ['They appreciate the gesture. "You\'re sweet." Small kindness, good mood.', 'Employee fixes it in 30 seconds. Crisis over.'],
      neutral: ['The joke lands okay. You both laugh. Neither gets the milk. Fine.', 'Phone payment works. Close call. You\'ll check next time.'],
      bad: ['Grabbing it fast makes you the villain of aisle 7.', 'Asking a stranger to pay you back is as awkward as you feared.'],
    },
  },
  {
    category: 'everyday',
    tone: 'everyday',
    asciiKey: 'roommate_issue',
    setups: [
      'Your roommate hasn\'t done dishes in three weeks. The sink smells. They\'re gaming in the living room like nothing\'s wrong.',
      'Your roommate keeps having loud calls at 2 AM. You have an exam tomorrow. This is the third time this week.',
      'Someone ate your labeled food from the fridge. You know who it was. The sticky note said "DO NOT TOUCH."',
    ],
    optionPatterns: [
      ['Have a direct conversation about the dishes', 'Clean them yourself but leave a pointed note', 'Stop cleaning entirely and let it escalate'],
      ['Knock and ask them to keep it down', 'Put in earbuds and tough it out', 'Text the group chat about quiet hours'],
      ['Confront them about the food calmly', 'Replace it and say nothing', 'Leave a passive-aggressive note on the fridge'],
    ],
    outcomes: {
      good: ['They blush, apologize, and do the dishes. "Been in a funk, sorry." Problem solved.', 'They lower their voice immediately. "My bad, good luck tomorrow."'],
      neutral: ['They do the dishes but act cold for a few days. At least it\'s clean.', 'Earbuds work. You pass the exam. Sleep debt remains.'],
      bad: ['Letting it escalate turns into a screaming match about respect.', 'The passive-aggressive note starts a fridge war that lasts all month.'],
    },
  },
  {
    category: 'work',
    tone: 'everyday',
    asciiKey: 'work_deadline',
    setups: [
      'Friday 4:58 PM. Your boss drops a project due Monday. Your weekend plans are already booked — concert tickets, non-refundable.',
      'A coworker asks you to cover their shift tomorrow. You already told your family you\'d visit. They look desperate.',
      'You accidentally replied-all to an email with a complaint about your manager. Panic sets in.',
    ],
    optionPatterns: [
      ['Negotiate for a Tuesday deadline with a good reason', 'Cancel your plans and get it done', 'Do a rushed half-job and hope it\'s enough'],
      ['Cover the shift but ask them to return the favor', 'Say no — you have commitments too', 'Offer to help find someone else instead'],
      ['Send a follow-up "please disregard" immediately', 'Own it and apologize to your manager directly', 'Pretend it didn\'t happen and hide'],
    ],
    outcomes: {
      good: ['Boss respects the pushback. "Tuesday works. Enjoy the concert."', 'Your coworker covers for you next month. Fair trade.'],
      neutral: ['Rushed work gets mild feedback Monday. You keep the weekend but pay for it.', 'Disregard email mostly works. One person definitely saw it though.'],
      bad: ['Half-job gets you called into a meeting. Weekend ruined anyway.', 'Reply-all reaches your manager. Monday is very uncomfortable.'],
    },
  },
  {
    category: 'social',
    tone: 'everyday',
    asciiKey: 'party_invite',
    setups: [
      'You completely forgot your friend\'s birthday was today. It\'s 9 PM. Their story shows a party you weren\'t invited to — or forgot to RSVP.',
      'A coworker\'s baby shower is tomorrow. You didn\'t buy a gift. The store closes in 30 minutes.',
      'Your anniversary is today. Your partner hinted all week and you blanked. They\'re waiting at home.',
    ],
    optionPatterns: [
      ['Call with a sincere apology and plan a belated celebration', 'Rush to buy a gift and show up first thing tomorrow', 'Pretend you planned a surprise for the weekend'],
      ['Drive to the store now for a last-minute gift', 'Send money digitally with a heartfelt message', 'Admit you forgot and ask what they\'d like'],
      ['Stop at a florist and a bakery on the way home', 'Be honest that you lost track of the date', 'Book a restaurant for tonight as emergency damage control'],
    ],
    outcomes: {
      good: ['They\'re hurt but appreciate the honesty. Belated dinner next week heals it.', 'The emergency flowers work. "I can\'t stay mad." Crisis averted.'],
      neutral: ['Weekend surprise is thin but they play along. Note to self: use a calendar.', 'Digital gift feels impersonal but acceptable.'],
      bad: ['They knew you forgot. The pretend surprise makes it worse.', 'Honesty without a plan lands like an afterthought. Cold shoulder for days.'],
    },
  },
  {
    category: 'everyday',
    tone: 'everyday',
    asciiKey: 'car_repair',
    setups: [
      'Check engine light came on. You\'re broke until payday. The car still drives fine — probably fine?',
      'Parking ticket on your windshield. $75. You were only gone 12 minutes. The meter definitely said 15 left.',
      'Your landlord texts: rent is going up $200 next month. Your lease renews in two weeks.',
    ],
    optionPatterns: [
      ['Take it to a shop for a diagnostic anyway', 'Ignore the light until payday', 'Ask a knowledgeable friend to check with an OBD reader'],
      ['Pay the ticket and move on', 'Dispute it at city hall — you have time stamps', 'Leave it and risk the late fee doubling'],
      ['Negotiate with the landlord for a smaller increase', 'Start looking for a cheaper place', 'Accept it and cut other expenses'],
    ],
    outcomes: {
      good: ['Diagnostic is a loose gas cap. Free fix. Panic for nothing.', 'Dispute works. Ticket waived. Justice served.'],
      neutral: ['Ignoring the light works for now. You\'ll check it on payday.', 'Negotiating gets you $100 increase instead. Small win.'],
      bad: ['Ignoring it becomes a $1,200 repair in three weeks.', 'Late fee doubles. Should\'ve just paid it.'],
    },
  },
  {
    category: 'social',
    tone: 'everyday',
    asciiKey: 'awkward_moment',
    setups: [
      'Splitting the bill at dinner. You ordered light but everyone wants to split evenly. The math doesn\'t feel fair.',
      'A friend asks if their new outfit looks good. It doesn\'t. They\'re clearly excited. Everyone is looking at you.',
      'Someone at the gym corrects your form unsolicited. You weren\'t asking for help. People nearby are watching.',
    ],
    optionPatterns: [
      ['Politely ask to pay only for what you ordered', 'Split evenly to avoid awkwardness', 'Suggest splitting food but not drinks'],
      ['Find something genuine to compliment', 'Be honest but kind about what could be better', 'Deflect: "It\'s not my style but you rock it"'],
      ['Thank them and adjust your form', 'Say "I\'ve got it, thanks" firmly', 'Ignore them and keep going'],
    ],
    outcomes: {
      good: ['They respect the fair split. "Good call, I ate most of the appetizers anyway."', 'Genuine compliment lands. "You always know what to say."'],
      neutral: ['You overpay by $12. Annoying, but dinner stays fun.', 'Deflecting works. Slightly awkward but nobody\'s feelings are destroyed.'],
      bad: ['Pushing the bill split makes you "the cheap one" in the group chat later.', 'Honesty without tact ruins their night. They leave early.'],
    },
  },
];

const ALL_GENERAL_TEMPLATES = [...SCENARIO_TEMPLATES, ...REAL_LIFE_TEMPLATES];

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

  const available = ALL_GENERAL_TEMPLATES.filter(
    (t) => !usedCategories.includes(t.category) || usedCategories.length > 4
  );
  return available.length ? available : ALL_GENERAL_TEMPLATES;
}

function getVariantFingerprint(template, setupIndex, optionSetIndex) {
  return `${template.asciiKey}:${setupIndex}:${optionSetIndex}`;
}

export function getScenarioFingerprint(scenario) {
  if (!scenario) return '';
  if (scenario.fingerprint) return scenario.fingerprint;
  if (scenario.isAi) return `ai:${(scenario.setup || '').trim().slice(0, 160)}`;
  if (scenario.setupIndex !== undefined && scenario.optionSetIndex !== undefined) {
    return getVariantFingerprint(scenario.template || { asciiKey: scenario.asciiKey }, scenario.setupIndex, scenario.optionSetIndex);
  }
  return `${scenario.asciiKey}:${(scenario.setup || '').trim().slice(0, 80)}`;
}

function enumerateVariants(pool) {
  const variants = [];
  for (const template of pool) {
    for (let s = 0; s < template.setups.length; s++) {
      for (let o = 0; o < template.optionPatterns.length; o++) {
        variants.push({ template, setupIndex: s, optionSetIndex: o });
      }
    }
  }
  return variants;
}

function buildScenarioFromVariant(template, setupIndex, optionSetIndex, mode = 'survival') {
  const fingerprint = getVariantFingerprint(template, setupIndex, optionSetIndex);
  const viewType = pickViewType('standard');
  const viewSequence = buildViewSequence('standard', viewType, template.asciiKey);
  return {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    category: template.category,
    asciiKey: template.asciiKey,
    viewType,
    viewSequence,
    setup: template.setups[setupIndex],
    options: shuffleArray(template.optionPatterns[optionSetIndex]),
    template,
    setupIndex,
    optionSetIndex,
    fingerprint,
    isAi: false,
    isCreepy: template.creepiness >= 8,
    tone: template.tone || 'intense',
  };
}

function pickWeightedVariant(variants, mode) {
  if (mode === 'horror') {
    const exclusiveKeys = new Set(HORROR_EXCLUSIVE_TEMPLATES.map((t) => t.asciiKey));
    const exclusive = variants.filter((v) => exclusiveKeys.has(v.template.asciiKey));
    if (exclusive.length && Math.random() < 0.55) {
      return pickRandom(exclusive);
    }
    return pickRandom(variants);
  }

  const everyday = variants.filter((v) => v.template.tone === 'everyday');
  const intense = variants.filter((v) => v.template.tone !== 'everyday');

  if (everyday.length && intense.length && Math.random() < 0.5) {
    return pickRandom(everyday);
  }
  return pickRandom(intense.length ? intense : variants);
}

export function getAvailableScenarioCount(mode = 'survival') {
  return enumerateVariants(getTemplatePool(mode, [])).length;
}

export function generateLocalScenario(round = 0, usedCategories = [], options = {}) {
  const {
    mode = 'survival',
    playedFingerprints = [],
    allowRepeats = false,
  } = options;

  const pool = getTemplatePool(mode, usedCategories);
  const allVariants = enumerateVariants(pool);
  const playedSet = new Set(playedFingerprints);

  let candidateVariants = allVariants;
  let poolRefreshed = false;

  if (!allowRepeats && playedSet.size > 0) {
    const unplayed = allVariants.filter(
      (v) => !playedSet.has(getVariantFingerprint(v.template, v.setupIndex, v.optionSetIndex))
    );
    if (unplayed.length > 0) {
      candidateVariants = unplayed;
    } else {
      candidateVariants = allVariants;
      poolRefreshed = true;
    }
  }

  const picked = pickWeightedVariant(candidateVariants, mode);
  const scenario = buildScenarioFromVariant(picked.template, picked.setupIndex, picked.optionSetIndex);
  if (poolRefreshed) scenario.poolRefreshed = true;
  return scenario;
}

export function resolveChoice(scenario, optionIndex, round, mode = 'survival', combo = 0) {
  const resultType = evaluateChoice(optionIndex, round, mode);
  const outcomes = scenario.template.outcomes[resultType];
  const outcome = pickRandom(outcomes);
  const isEveryday = scenario.tone === 'everyday' || scenario.template?.tone === 'everyday';

  let healthDelta = resultType === 'good' ? 0 : resultType === 'neutral' ? -10 : -25;
  let scoreDelta = resultType === 'good' ? 100 : resultType === 'neutral' ? 50 : 10;

  if (isEveryday) {
    healthDelta = resultType === 'good' ? 5 : resultType === 'neutral' ? -5 : -15;
    scoreDelta = resultType === 'good' ? 80 : resultType === 'neutral' ? 45 : 15;
  }

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
  if (isEveryday) survived = resultType !== 'bad' || Math.random() > 0.85;
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
  const { mode = 'survival', playedFingerprints = [], allowRepeats = false } = options;
  const context = previousChoices.length
    ? `Previous player choices: ${previousChoices.join('; ')}. Build on this story.`
    : 'Start a new scenario — mix real-life everyday situations with tense dramatic ones.';

  const playedSetups = playedFingerprints
    .filter((f) => f.startsWith('ai:'))
    .map((f) => f.slice(3))
    .slice(-12);

  const noRepeatRule = !allowRepeats && playedSetups.length
    ? `\nDO NOT repeat or closely rephrase these already-used scenarios:\n${playedSetups.map((s, i) => `${i + 1}. ${s}`).join('\n')}\nCreate something clearly different.`
    : '';

  const modeHint = mode === 'horror'
    ? 'This is HORROR ONLY mode. Make it deeply disturbing, psychologically terrifying, and viscerally creepy. Use body horror, the uncanny, and dread.'
    : mode === 'endless'
      ? `Endless mode round ${round + 1}. Escalate tension — this has been going on a long time.`
      : mode === 'arcade'
        ? 'Arcade mode — punchy, fast-paced, high-stakes scenario.'
        : 'Mix everyday real-life scenarios (parties, work, relationships, car trouble, social awkwardness) with dramatic survival situations. About half should feel like normal life decisions.';

  const prompt = `You are a text adventure game engine. Generate an immersive scenario where the player faces a meaningful choice.

${context}
${modeHint}
${noRepeatRule}

Round: ${round + 1}

Respond ONLY with valid JSON in this exact format:
{
  "setup": "2-3 sentence scenario description with dialogue if appropriate",
  "options": ["option 1", "option 2", "option 3"],
  "asciiKey": "one of: bedroom_killer, dark_alley, elevator, forest, phone_call, car_breakdown, haunted_house, stranger_knock, survival_camp, hostage, zombie, mystery_box, mirror_horror, sleep_paralysis, doll_room, crawlspace, basement_whispers, party_invite, car_repair, job_interview, awkward_moment, morning_rush, text_message, grocery_store, roommate_issue, work_deadline",
  "category": "horror|thriller|survival|mystery|everyday|social|work"
}

Make options meaningfully different — risky, cautious, and clever. Real-life scenarios should feel relatable (skipping parties, fixing cars, awkward social moments, work stress).`;

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
  const setup = parsed.setup;
  const asciiKey = parsed.asciiKey || 'default';
  const viewType = pickViewType('standard');

  return {
    id: `ai-${Date.now()}`,
    category: parsed.category || 'mystery',
    asciiKey,
    viewType,
    viewSequence: buildViewSequence('standard', viewType, asciiKey),
    setup,
    options: parsed.options.slice(0, 3),
    fingerprint: `ai:${setup.trim().slice(0, 160)}`,
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
