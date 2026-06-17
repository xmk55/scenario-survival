import { getAsciiArt } from '../data/asciiArt';
import { getSceneName } from '../data/gameMeta';

export default function AsciiDisplay({
  asciiKey,
  loading,
  category,
  isCreepy,
  size = 'normal',
  showLabel = true,
}) {
  const art = getAsciiArt(asciiKey);
  const sceneName = getSceneName(asciiKey);
  const catClass = category ? `ascii-cat-${category}` : '';
  const creepyClass = isCreepy ? 'ascii-creepy' : '';

  return (
    <div className={`ascii-display ascii-size-${size}`}>
      {showLabel && !loading && asciiKey && (
        <div className="ascii-scene-label">
          <span className="ascii-scene-dot" />
          {sceneName}
        </div>
      )}
      <div className={`ascii-frame ${catClass} ${creepyClass}`}>
        {loading ? (
          <pre className="ascii-art ascii-loading">
{`    ╔════════════════════════════════════╗
    ║                                    ║
    ║        GENERATING SCENE...         ║
    ║                                    ║
    ║           ◐ ◓ ◑ ◒                 ║
    ║                                    ║
    ╚════════════════════════════════════╝`}
          </pre>
        ) : (
          <pre className="ascii-art">{art}</pre>
        )}
      </div>
    </div>
  );
}
