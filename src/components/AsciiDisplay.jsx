import { useRef, useEffect, useCallback } from 'react';
import { getAsciiArt } from '../data/asciiArt';
import { getSceneName } from '../data/gameMeta';
import { getViewLabel } from '../data/asciiViews';

const LOADING_ART = `╔══════════════════════════════════════════════════════════════════╗
║  GENERATING SCENE...                         ◐ ◓ ◑ ◒  loading   ║
║                                                                  ║
║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║   ░░  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐ ░░  ║
║   ░░  │ ?? │  │ ?? │  │ ?? │  │ ?? │  │ ?? │  │ ?? │  │ ?? │ ░░  ║
║   ░░  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘ ░░  ║
║   ░░                                                          ░░  ║
║   ░░        BUILDING YOUR NEXT SCENARIO . . .                 ░░  ║
║   ░░        adding details · objects · atmosphere             ░░  ║
║   ░░                                                          ░░  ║
║   ░░  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐ ░░  ║
║   ░░  │ ?? │  │ ?? │  │ ?? │  │ ?? │  │ ?? │  │ ?? │  │ ?? │ ░░  ║
║   ░░  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘ ░░  ║
║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
╚══════════════════════════════════════════════════════════════════╝`;

export default function AsciiDisplay({
  asciiKey,
  viewType = 'scene',
  loading,
  category,
  isCreepy,
  size = 'hero',
  showLabel = true,
}) {
  const frameRef = useRef(null);
  const artRef = useRef(null);
  const art = getAsciiArt(asciiKey, viewType);
  const sceneName = getSceneName(asciiKey);
  const viewLabel = getViewLabel(viewType);
  const catClass = category ? `ascii-cat-${category}` : '';
  const creepyClass = isCreepy ? 'ascii-creepy' : '';

  const fitArt = useCallback(() => {
    const frame = frameRef.current;
    const pre = artRef.current;
    if (!frame || !pre) return;

    pre.style.transform = 'none';
    pre.style.fontSize = '10px';

    const frameW = frame.clientWidth - 32;
    const frameH = frame.clientHeight - 32;
    const artW = pre.scrollWidth;
    const artH = pre.scrollHeight;

    if (artW === 0 || artH === 0) return;

    const scale = Math.min(frameW / artW, frameH / artH) * 0.96;
    pre.style.fontSize = '10px';
    pre.style.transform = `scale(${scale})`;
  }, []);

  useEffect(() => {
    fitArt();
    const frame = frameRef.current;
    if (!frame) return undefined;

    const observer = new ResizeObserver(fitArt);
    observer.observe(frame);
    window.addEventListener('resize', fitArt);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fitArt);
    };
  }, [asciiKey, viewType, loading, fitArt]);

  return (
    <div className={`ascii-display ascii-size-${size}`}>
      {showLabel && !loading && asciiKey && (
        <div className="ascii-scene-label">
          <span className="ascii-scene-dot" />
          <span className="ascii-view-tag">{viewLabel}</span>
          <span className="ascii-scene-sep">/</span>
          {sceneName}
        </div>
      )}
      <div ref={frameRef} className={`ascii-frame ${catClass} ${creepyClass}`}>
        <div className="ascii-art-wrapper">
          <pre ref={artRef} className={`ascii-art ${loading ? 'ascii-loading' : ''}`}>
            {loading ? LOADING_ART : art}
          </pre>
        </div>
      </div>
    </div>
  );
}
