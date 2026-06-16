import { useMemo } from 'react';

const SPEED_RANGES = {
  slow: { min: 18, max: 26 },
  normal: { min: 12, max: 18 },
  fast: { min: 6, max: 11 },
};

function parseEmojis(emojiSet) {
  if (!emojiSet) return ['✨'];
  return [...new Set(emojiSet.split(/\s+/).filter(Boolean))];
}

export default function FloatingEmojis({ theme }) {
  const effects = theme.effects || {};

  const particles = useMemo(() => {
    if (!effects.floatingEmojis) return [];

    const emojis = parseEmojis(effects.emojiSet);
    const count = effects.emojiCount ?? 14;
    const range = SPEED_RANGES[effects.emojiSpeed] || SPEED_RANGES.normal;

    return Array.from({ length: count }, (_, i) => {
      const duration = range.min + Math.random() * (range.max - range.min);
      return {
        id: i,
        emoji: emojis[i % emojis.length],
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * duration}s`,
        duration: `${duration}s`,
        drift: `${-30 + Math.random() * 60}px`,
        rotation: `${-25 + Math.random() * 50}deg`,
        scale: 0.7 + Math.random() * 0.6,
        animType: i % 3,
      };
    });
  }, [effects.floatingEmojis, effects.emojiSet, effects.emojiCount, effects.emojiSpeed]);

  if (!effects.floatingEmojis || particles.length === 0) return null;

  return (
    <div
      className="floating-emojis"
      style={{
        '--emoji-opacity': effects.emojiOpacity ?? 0.12,
        '--emoji-size': effects.emojiSize ?? '1.4rem',
      }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`floating-emoji anim-type-${p.animType}`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--drift': p.drift,
            '--spin': p.rotation,
            fontSize: `calc(var(--emoji-size) * ${p.scale})`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
