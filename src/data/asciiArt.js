import { getAsciiView } from './asciiViews';

export const ASCII_ART = {
  bedroom_killer: `
╔══════════════════════════════════════════════════════════════════╗
║  BEDROOM — 3:17 AM                              🌙  ☁  ☁  ☁     ║
║                                                                  ║
║   ┌─────┐   POSTER    ┌────────────────────────────────────┐    ║
║   │LAMP │   ┌────┐    │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    ║
║   │ OFF │   │SKULL│   │         YOUR BED — z z z z z        │    ║
║   └──┬──┘   └────┘    │  ┌──────────────────────────────┐  │    ║
║      │                 │  │  (\\_/)                       │  │    ║
║   WINDOW               │  │  (='.'=)  YOU   pretending   │  │    ║
║   ┌────────┐           │  │  (")_(")  to sleep...        │  │    ║
║   │░ moon ░│  CLOSET→  │  └──────────────────────────────┘  │    ║
║   │░ glow ░│  [door]   └────────────────────────────────────┘    ║
║   └────────┘                                                     ║
║   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ UNDER THE BED ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
║   ▓  ...wet breathing...  fingers curl around bed frame...    ▓  ║
║   ▓  VOICE: "I know you're awake. Are you asleep?"          ▓  ║
║   ▓  dust motes float   carpet stain leads under bed →      ▓  ║
║   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║
╚══════════════════════════════════════════════════════════════════╝`,

  dark_alley: `
╔══════════════════════════════════════════════════════════════════╗
║  DARK ALLEY — MIDNIGHT              🌧 DRIZZLE   STREETLAMP ✦   ║
║                                                                  ║
║   BUILDINGS          BUILDINGS          BUILDINGS                ║
║   ┌──┬──┬──┐        ┌──┬──┬──┐        ┌──┬──┬──┐               ║
║   │██│░░│██│        │██│░░│██│        │██│░░│██│               ║
║   │██│░░│██│        │██│░░│██│        │██│░░│██│               ║
║   └──┴──┴──┘        └──┴──┴──┘        └──┴──┴──┘               ║
║        ?                   YOU !                  ?              ║
║       /|\\                 /|\\                  /|\\            ║
║        |                   |                    |              ║
║   ═════╪═══════════════════╪════════════════════╪════════════   ║
║   TRASH  DUMPSTERS    FOOTSTEPS ECHO BEHIND YOU    WET PUDDLES  ║
║   [can] [bags] [box]    step... step... step...    ~~~ ~~~ ~~~  ║
║                                                                  ║
║   FIRE ESCAPE    RUSTY LADDER    DEAD END →    Flickering ✦     ║
║   ┌─┐            ┌─┐              ┌───┐                         ║
║   │ │  SHADOW    │ │   FIGURE     │ X │  BRICK WALL              ║
║   └─┘  watching  └─┘   ahead?    └───┘                         ║
║                                                                  ║
║   PHONE: NO SIGNAL ░░░░    KEYS IN HAND    HEART RATE: ↑↑↑      ║
╚══════════════════════════════════════════════════════════════════╝`,

  elevator: `
╔══════════════════════════════════════════════════════════════════╗
║  ELEVATOR — STUCK BETWEEN FLOORS          ⚡ POWER FAILURE       ║
║                                                                  ║
║   ┌────────────────────────────────────────────────────────┐    ║
║   │  PANEL:  ▲ 14  [░░]  ▼ B   ← FLOOR DOES NOT EXIST     │    ║
║   │  ┌────┐ ┌────┐ ┌────┐ ┌────┐  EMERGENCY  [🔴 ALARM]  │    ║
║   │  │ 1  │ │ 2  │ │ 3  │ │ ?  │  PHONE: DEAD LINE ────  │    ║
║   │  └────┘ └────┘ └────┘ └────┘                          │    ║
║   │                                                        │    ║
║   │     MIRROR          YOU 😰          CEILING HATCH ↑    │    ║
║   │    ┌──────┐       ┌─────┐          ┌───────────┐      │    ║
║   │    │ pale │       │     │          │  ▓▓▓▓▓▓▓  │      │    ║
║   │    │ face │       │ YOU │          │  SCRAPE?  │      │    ║
║   │    └──────┘       └─────┘          └───────────┘      │    ║
║   │                                                        │    ║
║   │  ████████████████████████████████████████████████████  │    ║
║   │  CABLES CREAKING...  CAB SWAYS...  SOMETHING ON ROOF   │    ║
║   │  INTERCOM: *crackle* "do not... panic..." *static*     │    ║
║   └────────────────────────────────────────────────────────┘    ║
║   SHAFT: ░░░░░░░░░░░ 59 FLOORS OF DARKNESS ░░░░░░░░░░░░░░░░░░  ║
╚══════════════════════════════════════════════════════════════════╝`,

  forest: `
╔══════════════════════════════════════════════════════════════════╗
║  FOREST — SUNSET IN 18 MIN           COMPASS: SPINNING 🧭       ║
║                                                                  ║
║         /\\              /\\                /\\       /\\         ║
║        /  \\    /\\      /  \\      /\\      /  \\     /  \\        ║
║       /    \\  /  \\    /    \\    /  \\    /    \\   /    \\       ║
║      /  /\\  \\/ /\\  \\/  /\\  \\/ /\\  \\/  /\\  \\/ /\\  \\/  /\\  \\      ║
║     /  /  \\    X      /  \\      /  \\        /  \\    /  \\     ║
║    /__/\\/ \\__/\\__/\\__/\\/ \\__/\\/ \\__/\\____/\\/ \\__/\\/ \\__\\    ║
║                                                                  ║
║   YOU →  😰   TRAIL ENDED HERE   ← ?   BIRD SILENT   OWL 👁     ║
║                                                                  ║
║   STREAM →  ~~~  SIGNAL FIRE?  🔥   BROKEN BRANCH MARKERS  | |  ║
║   MOSS ON TREES: NORTH? SOUTH?   FOOTPRINTS: NOT YOURS...       ║
║                                                                  ║
║   BACKPACK: 1 WATER LEFT   PHONE: 2%   MAP: USELESS            ║
║   ┌──────────────────────────────────────────────────────────┐ ║
║   │  distant howl...  wind through pines...  getting colder  │ ║
║   │  shadows stretch longer...  darkness between the trees   │ ║
║   └──────────────────────────────────────────────────────────┘ ║
╚══════════════════════════════════════════════════════════════════╝`,

  phone_call: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR BEDROOM — 2:47 AM              CITY LIGHTS OUT WINDOW     ║
║                                                                  ║
║   DESK        LAMP    BED (empty)         DOOR ← hallway dark    ║
║   ┌────┐     ┌───┐   ┌──────────┐        ┌────┐                 ║
║   │BOOK│     │ ○ │   │          │        │    │                 ║
║   └────┘     └───┘   └──────────┘        └────┘                 ║
║                                                                  ║
║        ┌─────────────────────────────────────────┐            ║
║        │  📱  INCOMING CALL — CALL #5 TONIGHT     │            ║
║        │  ┌─────────────────────────────────────┐ │            ║
║        │  │  UNKNOWN NUMBER                      │ │            ║
║        │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ │            ║
║        │  │         📞  RINGING  RINGING         │ │            ║
║        │  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ │            ║
║        │  │                                      │ │            ║
║        │  │   [ ANSWER ]    [ IGNORE ]  [ BLOCK ]│ │            ║
║        │  └─────────────────────────────────────┘ │            ║
║        │  CALLER ID SHOWS: YOUR OWN NUMBER...?    │            ║
║        └─────────────────────────────────────────┘            ║
║   OUTSIDE: car door slams?   or imagination?   CURTAINS MOVE    ║
╚══════════════════════════════════════════════════════════════════╝`,

  car_breakdown: `
╔══════════════════════════════════════════════════════════════════╗
║  DESERTED HIGHWAY — 11:43 PM         NO CELL SIGNAL ░░░░        ║
║                                                                  ║
║   SKY: ★  ★    ★        ★   ★      ★    ★   ★   ★   ★  ★       ║
║                                                                  ║
║        _______________________________________________           ║
║       |  ___   ___   ___   WINDSHIELD   ___   ___   |\\          ║
║       | |   | |   | |   |   CRACKED    |   | |   | | |         ║
║       | |___| |___| |___|    ░░░░░     |___| |___| |/          ║
║       |_______________________________________________|          ║
║              YOU inside 😰        ENGINE: DEAD  SMOKE: wisp      ║
║   ═══════════════════════════════════════════════════════════    ║
║   EMPTY ROAD BOTH DIRECTIONS ────────────╳──────────────         ║
║                                                                  ║
║   REARVIEW: ● HEADLIGHTS APPROACHING ●  (slow? fast?)            ║
║   DASH: CHECK ENGINE 🔴   FUEL: 1/4   MILES TO TOWN: 12         ║
║                                                                  ║
║   OPTIONS ON SHOULDER:  JACK  SPARE TIRE  FLARE  WALLET          ║
║   TREE LINE:  👁 something watching?   COYOTE?  PERSON?         ║
║   WIND: picks up...  dust swirls...  headlights brighter...     ║
╚══════════════════════════════════════════════════════════════════╝`,

  haunted_house: `
╔══════════════════════════════════════════════════════════════════╗
║  ABANDONED HOUSE — STORM NIGHT       ⚡ THUNDER   🌧 RAIN        ║
║                                                                  ║
║              /\\        LIGHTNING →  ⚡                           ║
║             /  \\      ┌─────────────────────────┐               ║
║            / ▓▓ \\     /   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   \\              ║
║           /______\\   /    ▓ HAUNTED HOUSE ▓    \\             ║
║           |  |  |  |  |  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  |              ║
║           |__|__|__|  |  WINDOWS: DARK  DOOR: ? |              ║
║                       └─────────────────────────┘               ║
║   YOU → 🚪 front door (slammed shut behind you)                 ║
║                                                                  ║
║   INSIDE VISIBLE THROUGH CRACK:  OUIJA BOARD  DUST  CHAINS        ║
║   MIRRORS: all facing hallway   FLOORBOARDS: creak upstairs     ║
║   BASEMENT DOOR: padlock broken   CHANDELIER: swaying alone       ║
║                                                                  ║
║   PLANCHEITE SPELLS: B-E-H-I-N-D-Y-O-U                        ║
║   TEMPERATURE: dropping...  BREATH VISIBLE...  WHISPER: "stay"  ║
╚══════════════════════════════════════════════════════════════════╝`,

  stranger_knock: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR HOME — 3:00 AM                 STREET: EMPTY & QUIET      ║
║                                                                  ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  LIVING ROOM          KITCHEN         HALLWAY             │  ║
║   │  ┌────────┐          ┌───────┐       ┌────┐              │  ║
║   │  │  sofa  │          │fridge │       │    │   BEDROOM →  │  ║
║   │  │  YOU 😰│          │  🌙  │       │ 👁 │   peephole    │  ║
║   │  └────────┘          └───────┘       └────┘              │  ║
║   │                                                          │  ║
║   │  FRONT DOOR ═══════════════════════════════════════      │  ║
║   │  ┌────────────────────────────────────────────────┐     │  ║
║   │  │  KNOCK  KNOCK  KNOCK  KNOCK  KNOCK  KNOCK      │     │  ║
║   │  │  DELIVERY UNIFORM — NO TRUCK — NO PACKAGE       │     │  ║
║   │  │  FACE: obscured by hood   HANDS: in pockets    │     │  ║
║   │  │  "LET ME IN. I KNOW YOU'RE IN THERE."           │     │  ║
║   │  └────────────────────────────────────────────────┘     │  ║
║   │  DOORBELL RINGS AGAIN   SECURITY CAM: STATIC ░░░░       │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   PHONE: 911 ready?   BASEBALL BAT by door?   NEIGHBORS: dark    ║
╚══════════════════════════════════════════════════════════════════╝`,

  survival_camp: `
╔══════════════════════════════════════════════════════════════════╗
║  WILDERNESS CAMP — 12:48 AM          MOON: 🌕   OWLS SILENT     ║
║                                                                  ║
║         /\\         /\\              /\\         TREELINE         ║
║        /  \\       /  \\            /  \\       ┌─────────┐     ║
║       /    \\     /    \\          /    \\      │  DARK   │     ║
║      /  /\\  \\   /  /\\  \\        /  /\\  \\     │ FOREST  │     ║
║                                                                  ║
║   TENT: /\\    CAMPFIRE: 🔥 (dying embers ░░)    YOU: inside   ║
║        /  \\       / | \\                                        ║
║       /____\\     /  |  \\   BACKPACK  COOLER  BEAR BAG (empty) ║
║                                                                  ║
║   SOUNDS:  SNAP  ...  CRACKLE  ...  BRANCH BREAK  ← close       ║
║   FLASHLIGHT: low battery ▓▓░░░   KNIFE on belt   MAP wet       ║
║                                                                  ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  TWO GLOWING EYES between trees...  circling...           │  ║
║   │  paw prints in mud — too big for deer — fresh           │  ║
║   │  wind carries smell: wet fur... rotting... something      │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   RADIO: static only   HELP: 40 miles   DAWN: 5 hours away      ║
╚══════════════════════════════════════════════════════════════════╝`,

  hostage: `
╔══════════════════════════════════════════════════════════════════╗
║  FIRST NATIONAL BANK — LOCKDOWN      SIRENS: 🔴 OUTSIDE         ║
║                                                                  ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  TELLER LINE    SECURITY DESK    VAULT (CLOSED)         │  ║
║   │  ┌──┐ ┌──┐ ┌──┐    ┌─────┐        ┌─────────────┐       │  ║
║   │  │$$│ │$$│ │$$│    │ CAM │        │   VAULT     │       │  ║
║   │  └──┘ └──┘ └──┘    │ OFF │        │   🔒 🔒     │       │  ║
║   │                    └─────┘        └─────────────┘       │  ║
║   │                                                          │  ║
║   │  HOSTAGE 1 😱   YOU 😰   HOSTAGE 2 😱   HOSTAGE 3       │  ║
║   │       \\         |         /              |              │  ║
║   │        \\   ON THE FLOOR  /               |              │  ║
║   │                                                          │  ║
║   │  ROBBER A: 🔫 "NOBODY MOVE!"    ROBBER B: 🔫 at door    │  ║
║   │  MASKS ON   BAG OF CASH   POLICE: sirens approaching    │  ║
║   │  ROBBER A → YOU: "YOU. PHONE. NOW."                      │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   HEART POUNDING   HANDS VISIBLE   EXIT BLOCKED   GLASS SHATTERED║
╚══════════════════════════════════════════════════════════════════╝`,

  zombie: `
╔══════════════════════════════════════════════════════════════════╗
║  CITY STREET — OUTBREAK DAY 4        SKY: SMOKE   SIRENS FAR    ║
║                                                                  ║
║   ABANDONED CARS    OVERTURNED BUS    BURNING BUILDING 🔥       ║
║   ┌────┐ ┌────┐    ┌──────────┐      ┌─────────────┐           ║
║   │ 🚗 │ │ 🚗 │    │  BUS  🧟  │      │  ▓▓ FIRE ▓▓ │           ║
║   └────┘ └────┘    └──────────┘      └─────────────┘           ║
║                                                                  ║
║        🧟 ←    🧟 ←      YOU !      → 🧟    → 🧟               ║
║       shambling  running          /|\\   surrounded             ║
║                                    |                             ║
║   ═══════════════════════════════════════════════════════════   ║
║   GROCERY STORE: looted   PHARMACY: boarded   ALLEY: blocked    ║
║                                                                  ║
║   INVENTORY: bat 🏏  knife 🔪  bandage  water (1)  phone dead    ║
║   SIGNS: DEAD END ←   HOSPITAL 2mi →   SAFE ZONE? 5mi ↑         ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  horde attracted to noise... 100+ in distance...         │  ║
║   │  helicopter spotlight sweeps overhead... passes you...  │  ║
║   └──────────────────────────────────────────────────────────┘  ║
╚══════════════════════════════════════════════════════════════════╝`,

  mystery_box: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR DOORSTEP — RAINY AFTERNOON     NO RETURN ADDRESS          ║
║                                                                  ║
║   PORCH    WELCOME MAT    FLOWER POT    MAILBOX (empty)         ║
║   ┌───┐    ┌────────┐    ┌────┐        ┌─────┐                  ║
║   │ 🪴│    │ WELCOME│    │dead│        │     │                  ║
║   └───┘    └────────┘    │plant│       └─────┘                  ║
║                          └────┘                                  ║
║                                                                  ║
║        ┌─────────────────────────────────────────────┐        ║
║        │         MYSTERIOUS PACKAGE                   │        ║
║        │    ┌─────────────────────────────────┐      │        ║
║        │    │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │      │        ║
║        │    │ ▓  NO LABEL  NO STAMP  HEAVY ▓ │      │        ║
║        │    │ ▓  YOUR NAME CARVED IN LID   ▓ │      │        ║
║        │    │ ▓  SHAKES: something inside  ▓ │      │        ║
║        │    │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │      │        ║
║        │    │  NOTE: "YOU KNOW WHICH DOOR"  │      │        ║
║        │    │  KEY INSIDE: rusty, teeth marks│      │        ║
║        │    └─────────────────────────────────┘      │        ║
║        │  YOU → OPEN?   BURN?   POLICE?   IGNORE?   │        ║
║        └─────────────────────────────────────────────┘        ║
║   NEIGHBORS: curtains closed   STREET: too quiet   DOG: whining ║
╚══════════════════════════════════════════════════════════════════╝`,

  mirror_horror: `
╔══════════════════════════════════════════════════════════════════╗
║  BATHROOM — 1:15 AM                  FAUCET: DRIPPING 💧       ║
║                                                                  ║
║   TILE FLOOR    TOILET    SHOWER (curtain half open)            ║
║   ▓▓▓▓▓▓▓▓    ┌────┐    ┌──────────────┐                        ║
║   ▓▓▓▓▓▓▓▓    │    │    │ ░░ curtain ░░│  SHADOW IN SHOWER?     ║
║               └────┘    └──────────────┘                        ║
║                                                                  ║
║   ┌──────────────────────┐    REAL WORLD: empty behind you      ║
║   │      MIRROR          │    REFLECTION: figure standing there  ║
║   │  ┌────────────────┐  │                                       ║
║   │  │  YOU     😰   │  │    YOU turn — nothing there           ║
║   │  │               │  │    Mirror — it's STILL behind you     ║
║   │  │  FIGURE  👤   │  │                                       ║
║   │  │  (not moving  │  │    FIGURE smiles when you don't       ║
║   │  │   when you do)│  │                                       ║
║   │  └────────────────┘  │    CRACK in mirror: spreads slowly    ║
║   │  "BEHIND YOU" written│    in steam on glass                ║
║   └──────────────────────┘                                       ║
║   LIGHTS FLICKER   MEDICINE CABINET: open   DOOR: locked?       ║
╚══════════════════════════════════════════════════════════════════╝`,

  sleep_paralysis: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR BEDROOM — CAN'T MOVE           ALARM: 3:33 AM            ║
║                                                                  ║
║   CEILING: cracks you've never noticed    FAN: spinning slow    ║
║                                                                  ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ║
║   │▓  YOU — AWAKE — FROZEN — EYES OPEN — CANNOT MOVE        ▓│  ║
║   │▓  ┌────────────────────────────────────────────────┐    ▓│  ║
║   │▓  │  body won't respond   fingers won't twitch   │    ▓│  ║
║   │▓  │  chest heavy... 200lbs on ribs...            │    ▓│  ║
║   │▓  └────────────────────────────────────────────────┘    ▓│  ║
║   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ║
║   └──────────────────────────────────────────────────────────┘  ║
║                                                                  ║
║   FIGURE ON CHEST: tall, black, leaning close   BREATH: cold     ║
║   WHISPER IN EAR: your name... your name... again...            ║
║   CORNER OF ROOM: second figure?   or shadow?   EYES: glowing   ║
║   TRY: scream (no sound)  move toe (nothing)  wake up (can't)   ║
╚══════════════════════════════════════════════════════════════════╝`,

  doll_room: `
╔══════════════════════════════════════════════════════════════════╗
║  GRANDMOTHER'S ATTIC — MOONLIGHT     DUST   COBWEBS   CREAK    ║
║                                                                  ║
║   SHELVES: old books   TRUNK   rocking horse   PHOTO ALBUMS     ║
║   ┌────┐  ┌────┐  ┌────────┐  ┌──────┐  ┌──────────────┐       ║
║   │book│  │box │  │ horse  │  │album │  │ YOUR PHOTO  │       ║
║   └────┘  └────┘  └────────┘  └──────┘  │ as a child  │       ║
║                                          └──────────────┘       ║
║   🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆     ║
║   doll doll doll doll doll doll doll doll doll doll doll doll   ║
║                                                                  ║
║        YOU → 😰        ONE DOLL MOVED CLOSER TO DOOR            ║
║                        mouth open — wasn't before               ║
║   🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆  🪆     ║
║   ALL HEADS TURNED TOWARD YOU — every painted eye watching      ║
║                                                                  ║
║   MUSIC BOX: playing alone   WINDOW: locked   STAIRS: creak     ║
║   SMELL: old perfume + something sweet + rot                    ║
╚══════════════════════════════════════════════════════════════════╝`,

  crawlspace: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR CLOSET — CRAWLSPACE OPEN       HOUSE: quiet   2:00 AM     ║
║                                                                  ║
║   CLOTHES    SHOES    HANGERS    FLASHLIGHT (you hold it) 🔦    ║
║   ┌──┐ ┌──┐   ┌─┐ ┌─┐           beam → into darkness            ║
║   │  │ │  │   │ │ │ │                                           ║
║   └──┘ └──┘   └─┘ └─┘                                           ║
║                                                                  ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  CRAWLSPACE HATCH — OPEN — something dragged bedding in  │  ║
║   │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ║
║   │  ▓  YOU at entrance — too small for adult — but...     ▓│  ║
║   │  ▓  BREATHING inside — wet — not yours                 ▓│  ║
║   │  ▓  SCRATCH marks on floor — dragged toward center     ▓│  ║
║   │  ▓  CHILD VOICE: "can you help me find my eyes?"       ▓│  ║
║   │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   VENTS: connect to whole house   TOOLS: none   PHONE: upstairs ║
║   FINGERNAIL MARKS: on inside of hatch — scratching to get OUT  ║
╚══════════════════════════════════════════════════════════════════╝`,

  basement_whispers: `
╔══════════════════════════════════════════════════════════════════╗
║  BASEMENT DOOR — KITCHEN             HOUSE: everyone asleep     ║
║                                                                  ║
║   FRIDGE   STOVE   COUNTER   COFFEE MUG   BASEMENT DOOR ↓       ║
║   ┌────┐  ┌───┐  ┌────────┐  ┌───┐       ┌────────────────┐    ║
║   │ 🌙 │  │ ○ │  │        │  │ ☕│       │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │    ║
║   └────┘  └───┘  └────────┘  └───┘       │ ▓ STAIRS DOWN ▓ │    ║
║                                           │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │    ║
║   YOU at top of stairs — flashlight off   └────────────────┘    ║
║                                                                  ║
║   FROM BELOW:                                                    ║
║   "come down..."  (voice: your dead grandfather?)               ║
║   "we've been waiting..."  (voice: your childhood friend?)       ║
║   "we know what you did..."  (voice: yours?)                     ║
║                                                                  ║
║   STAIRS: wooden, creak on step 4   HANDRAIL: splintered        ║
║   PHOTOS ON WALL: you in places you never visited               ║
║   COLD AIR: rushing up   LIGHT BULB: flickering   DOOR: unlocks ║
║   itself every night at 3am                                      ║
╚══════════════════════════════════════════════════════════════════╝`,

  party_invite: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR ROOM — FRIDAY 7:42 PM          RAIN ON WINDOW 🌧          ║
║                                                                  ║
║   BED   DESK   GAMING CHAIR   POSTERS   LAMP   BOOKSHELF        ║
║   ┌────┐ ┌──┐  ┌───┐  ┌────┐  ┌──┐  ┌────────────┐             ║
║   │pill│ │PC│  │YOU│  │band│  │ ○ │  │ books games│             ║
║   └────┘ └──┘  └───┘  └────┘  └──┘  └────────────┘             ║
║                                                                  ║
║   PHONE — GROUP CHAT EXPLODING:                                  ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  📱  47 UNREAD MESSAGES                                   │  ║
║   │  Jake: "party at mine tonight!!!"                        │  ║
║   │  Sam: "everyone's going 🎉🎉"                             │  ║
║   │  Alex: "@YOU you coming right???"                        │  ║
║   │  Mia: "don't be lame lol"                                │  ║
║   │  ─────────────────────────────────────                   │  ║
║   │  YOU: ...typing...  (exhausted, want to stay home)       │  ║
║   │  [ SEND ]  [ LEAVE CHAT ]  [ AIRPLANE MODE ]             │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   OUTSIDE: party sounds 3 blocks away   PJS: already on         ║
║   TOMORROW: exam at 8am   ENERGY: empty   FOMO vs PEACE         ║
╚══════════════════════════════════════════════════════════════════╝`,

  car_repair: `
╔══════════════════════════════════════════════════════════════════╗
║  HIGHWAY SHOULDER — 2:15 PM          TRAFFIC: whizzing past    ║
║                                                                  ║
║   SKY: ☀️   HEAT WAVES   ROAD: melting asphalt                  ║
║                                                                  ║
║        _________________________________________________         ║
║       |  hood UP  |  SMOKE wisp  |  FLAT: rear left |\\        ║
║       |___________|_______________|___________________| |        ║
║              CAR — broken down — hazard lights 🔴🔴              ║
║                                                                  ║
║   YOU: on ground with JACK   SPARE TIRE   LUG WRENCH   MANUAL   ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  STEP 1: loosen lugs  STEP 2: jack up  STEP 3: swap     │  ║
║   │  HANDS: greasy  SHIRT: sweaty  CARS: not stopping       │  ║
║   │  LAST CHANGED TIRE: years ago...  BOLT: stuck?          │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   SIGN: NEXT GAS 8 MI   WATER: half bottle   PHONE: 34%         ║
║   OPTION: flag someone down?   call AAA?   muscle through it?   ║
╚══════════════════════════════════════════════════════════════════╝`,

  job_interview: `
╔══════════════════════════════════════════════════════════════════╗
║  CORPORATE OFFICE — 10TH FLOOR       RECEPTION: marble, cold    ║
║                                                                  ║
║   WAITING AREA    PLANTS    COMPANY LOGO    CLOCK: 9:58 AM      ║
║   ┌────┐ ┌────┐  ┌──────────────┐  ┌────┐                      ║
║   │ 🪴 │ │ 🪴 │  │  ACME CORP   │  │ ⏰ │  INTERVIEW: 10:00    ║
║   └────┘ └────┘  └──────────────┘  └────┘                      ║
║                                                                  ║
║   INTERVIEW ROOM:                                                ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  TABLE    WATER    NOTEPAD    RESUME (yours, wrinkled)    │  ║
║   │                                                          │  ║
║   │  INTERVIEWER: suit, stern, reading your resume           │  ║
║   │  "Tell me about yourself."                               │  ║
║   │                                                          │  ║
║   │  YOU: 😰  sweating  resume gap unexplained  mind blank   │  ║
║   │                                                          │  ║
║   │  WHITEBOARD: "CULTURE FIT"   WINDOW: city below          │  ║
║   │  OTHER CANDIDATES: waiting outside door                  │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   TIE: too tight   PREP NOTES: forgotten   SALARY: need this job║
╚══════════════════════════════════════════════════════════════════╝`,

  awkward_moment: `
╔══════════════════════════════════════════════════════════════════╗
║  COFFEE SHOP — SATURDAY 10AM          JAZZ   ESPRESSO MACHINE   ║
║                                                                  ║
║   COUNTER   BARISTA   MENU BOARD   TABLES   WINDOW SEATS       ║
║   ┌──────┐  ┌───┐   ┌─────────┐  ┌──┐ ┌──┐  ┌─────────┐       ║
║   │PASTRIES│ │ ☕│   │ LATTE $6│  │  │ │  │  │  rain   │       ║
║   └──────┘  └───┘   └─────────┘  └──┘ └──┘  └─────────┘       ║
║                                                                  ║
║   TABLE 3: your EX — coffee in hand — turning around —          ║
║                                                                  ║
║        EX 😬  ←——— EYE CONTACT ———→  YOU 😳                     ║
║                                                                  ║
║   TABLE 1: couple watching   TABLE 5: friend of ex?             ║
║   BARISTA: calling "order for—"   DOOR: no easy exit            ║
║                                                                  ║
║   OPTIONS FLOATING:                                              ║
║   wave?   hide behind menu?   leave drink?   pretend phone call?║
║   "hey how are you"?   run?   order to-go and vanish?           ║
║   MEMORY: last conversation ended badly... 3 months ago          ║
╚══════════════════════════════════════════════════════════════════╝`,

  morning_rush: `
╔══════════════════════════════════════════════════════════════════╗
║  YOUR BEDROOM — 8:47 AM              CLASS STARTS: 9:00 AM      ║
║                                                                  ║
║   ALARM CLOCK: DEAD (unplugged?)     PHONE: 8:47 — 13 MIN LEFT  ║
║   ┌──────┐                                                        ║
║   │ 8:47 │  RED FLASHING   SNooze DIDN'T WORK                    ║
║   └──────┘                                                        ║
║                                                                  ║
║   YOU: just woke — PANIC — hair disaster — breath stinks          ║
║                                                                  ║
║   TIMELINE:                                                      ║
║   NOW ──→ SHOWER? (5min) ──→ CLOTHES? (2min) ──→ FOOD? (skip)   ║
║         ──→ CAR (3min) ──→ CAMPUS (5min) ──→ CLASS (DEADLINE)    ║
║                                                                  ║
║   MATH: impossible without skipping something                   ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  FLOOR: clothes everywhere   MIRROR: don't look          │  ║
║   │  BACKPACK: not packed   KEYS: where?   BUS: just left    │  ║
║   │  PROFESSOR: locks door at 9:00 SHARP                     │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   TEXT FROM FRIEND: "u coming?"   EXAM: 40% of grade today      ║
╚══════════════════════════════════════════════════════════════════╝`,

  text_message: `
╔══════════════════════════════════════════════════════════════════╗
║  CITY BUS — COMMUTE HOME             RAIN   1% BATTERY 🔴     ║
║                                                                  ║
║   BUS INTERIOR    STRANGERS    WINDOW: blurred city lights      ║
║   ┌──┐ ┌──┐ ┌──┐  ┌─────────────────────────────┐  ┌──┐       ║
║   │  │ │  │ │  │  │  rain streaks on glass     │  │  │       ║
║   └──┘ └──┘ └──┘  └─────────────────────────────┘  └──┘       ║
║   YOU: squished in seat, phone dying, charger forgotten          ║
║                                                                  ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  📱  BATTERY: 1%  ▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ║
║   │                                                          │  ║
║   │  Mom: "Are you okay?"                                    │  ║
║   │  Mom: "We need to talk."                                 │  ║
║   │  Mom: "Call me when you get this."                       │  ║
║   │  Mom: "It's important."                                  │  ║
║   │                                                          │  ║
║   │  [ REPLY QUICK ]  [ CALL ]  [ TYPE LATER ]               │  ║
║   │                                                          │  ║
║   │  SCREEN DIMMING...  AUTO-SHUTDOWN IN SECONDS...          │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   MIND: worst case scenarios   THUMB: hovering over keyboard    ║
╚══════════════════════════════════════════════════════════════════╝`,

  grocery_store: `
╔══════════════════════════════════════════════════════════════════╗
║  GROCERY STORE — AISLE 7 DAIRY       FLUORESCENT LIGHTS        ║
║                                                                  ║
║   SHELVES: milk   yogurt   cheese   butter   eggs   juice       ║
║   ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐    ║
║   │milk││milk││milk││ OUT││ OUT││yog ││chee││eggs││ OJ │    ║
║   └────┘└────┘└────┘└────┘└────┘└────┘└────┘└────┘└────┘    ║
║                                                                  ║
║   LAST CARTON OF MILK — on shelf — two hands reach for it       ║
║                                                                  ║
║        YOUR HAND →  🥛  ← STRANGER'S HAND                      ║
║                                                                  ║
║   AWKWARD EYE CONTACT   OTHER SHOPPERS WATCHING                 ║
║   CART: yours has cereal — needs milk   THEIR CART: baby food   ║
║                                                                  ║
║   CHECKOUT LINE: 8 people   SELF-CHECKOUT: broken               ║
║   OPTIONS: let them have it?   joke?   grab fast?   split?      ║
║   SPEAKER: "cleanup aisle 4"   CHILD: crying in distance       ║
╚══════════════════════════════════════════════════════════════════╝`,

  roommate_issue: `
╔══════════════════════════════════════════════════════════════════╗
║  SHARED APARTMENT — KITCHEN           FRIDGE: buzzing   9 PM     ║
║                                                                  ║
║   YOUR SIDE clean   THEIR SIDE: disaster   LEASE: both signed   ║
║                                                                  ║
║   SINK — 3 WEEKS OF DISHES:                                    ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  🍽️ 🍽️ 🍽️ 🥣 🥣 🍴 🍴 🥄 plate plate bowl mug mug       │  ║
║   │  smell: sour   flies: 2   mold: visible on one bowl      │  ║
║   │  NOTE YOU LEFT: "please clean" — ignored — day 5         │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║                                                                  ║
║   LIVING ROOM: ROOMMATE gaming 🎮 headphones on — oblivious     ║
║   TV: loud   TRASH: overflowing   LAUNDRY: in your way 3 days    ║
║                                                                  ║
║   YOU: clench fists   OPTIONS: talk?   clean and bill them?     ║
║   passive aggressive note?   text group chat?   escalate?       ║
║   RENT DUE: 5 days   SECURITY DEPOSIT: at risk                  ║
╚══════════════════════════════════════════════════════════════════╝`,

  work_deadline: `
╔══════════════════════════════════════════════════════════════════╗
║  OFFICE — FRIDAY 4:58 PM             WEEKEND: PLANS WAITING     ║
║                                                                  ║
║   CUBICLES   PRINTERS   COFFEE MACHINE   EXIT SIGN →            ║
║   ┌──┐ ┌──┐  ┌────┐  ┌───┐  ┌────┐                            ║
║   │PC│ │PC│  │ 🖨 │  │ ☕│  │EXIT│  coworkers packing up...    ║
║   └──┘ └──┘  └────┘  └───┘  └────┘                            ║
║                                                                  ║
║   BOSS OFFICE — door open — walking toward YOU                  ║
║   ┌──────────────────────────────────────────────────────────┐  ║
║   │  BOSS: "Got a minute? Need the Henderson report Monday." │  ║
║   │  YOU: weekend — concert tickets — non-refundable — date    │  ║
║   │  BOSS: "I know it's short notice. Critical client."        │  ║
║   │  STACK ON DESK: 200 pages unread   LAPTOP: still logged  │  ║
║   │  EMAIL SENT: "Re: URGENT — Monday 8am delivery"          │  ║
║   └──────────────────────────────────────────────────────────┘  ║
║   CALENDAR: concert tonight 7pm   PROMOTION: under review       ║
║   COWORKERS: already leaving   OFFICE: emptying fast            ║
╚══════════════════════════════════════════════════════════════════╝`,

  default: `
╔══════════════════════════════════════════════════════════════════╗
║  UNKNOWN LOCATION                    ? ? ? ? ? ? ? ? ? ? ?       ║
║                                                                  ║
║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║   ░░                                                      ░░░  ║
║   ░░    ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?    ░░░  ║
║   ░░                                                      ░░░  ║
║   ░░              S  C  E  N  A  R  I  O                  ░░░  ║
║   ░░                                                      ░░░  ║
║   ░░              L  O  A  D  I  N  G  .  .  .            ░░░  ║
║   ░░                                                      ░░░  ║
║   ░░    ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?    ░░░  ║
║   ░░                                                      ░░░  ║
║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║   SOMETHING IS ABOUT TO HAPPEN...                               ║
╚══════════════════════════════════════════════════════════════════╝`,
};

export function getAsciiArt(key, viewType = 'pov', portraitKey) {
  const sceneArt = ASCII_ART[key] || ASCII_ART.default;
  const viewKey = viewType === 'portrait' ? (portraitKey || key) : key;
  return getAsciiView(viewKey, viewType, sceneArt, key);
}
