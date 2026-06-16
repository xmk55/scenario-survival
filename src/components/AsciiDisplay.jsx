import { getAsciiArt } from '../data/asciiArt';

export default function AsciiDisplay({ asciiKey, loading }) {
  const art = getAsciiArt(asciiKey);

  return (
    <div className="ascii-display">
      <div className="ascii-frame">
        {loading ? (
          <pre className="ascii-art ascii-loading">
{`    ╔══════════════════════════════╗
    ║                              ║
    ║      GENERATING SCENE...     ║
    ║                              ║
    ║         ◐ ◓ ◑ ◒              ║
    ║                              ║
    ╚══════════════════════════════╝`}
          </pre>
        ) : (
          <pre className="ascii-art">{art}</pre>
        )}
      </div>
    </div>
  );
}
