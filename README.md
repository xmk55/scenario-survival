# Scenario Survival

A text-based survival game with AI-generated scenarios, three-choice decisions, ASCII art visuals, customizable themes, 8-bit sounds, and four distinct game modes.

**[Play Online](https://scenario-survival.vercel.app)**

## Features

- **4 Game Modes** — Survival, Endless, Arcade, and Horror Only
- **Dynamic scenarios** — 12+ built-in situations plus 6 exclusive nightmare scenarios
- **AI mode** — Optional OpenAI integration for fully AI-generated scenarios
- **3 choices per round** — Keyboard shortcuts `1`, `2`, `3`
- **ASCII art** — Visual scene representation for every scenario
- **8-bit sound effects** — Clicks, poofs, chimes, and fanfares
- **Floating theme emojis** — Customizable background ambiance per theme
- **High scores** — Tracked per mode in local storage

## Game Modes

| Mode | Description |
|------|-------------|
| **Survival** | Classic 10-round run. Survive with your health intact. |
| **Endless** | No end — difficulty ramps every round until you fall. |
| **Arcade** | 45-second timer per choice. Build combos for score multipliers. |
| **Horror Only** | Pure nightmare fuel — sleep paralysis, mirror horrors, dolls, crawlspaces, and more. Deadlier consequences. |

## Quick Start

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
npx vercel --prod
```

## AI Mode (Optional)

1. Open **Settings** (gear icon)
2. Toggle **Use AI-generated scenarios**
3. Enter your OpenAI API key
4. Save

## Controls

| Key | Action |
|-----|--------|
| `1` / `2` / `3` | Select option during gameplay |
| `Enter` | Continue after seeing result |

## Tech Stack

- React + Vite
- Web Audio API (procedural 8-bit sounds)
- LocalStorage (themes, high scores, settings)
- Vercel (hosting)
