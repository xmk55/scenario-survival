import { useRef, useEffect, useCallback, useState } from 'react';
import { getAsciiArt } from '../data/asciiArt';
import { getSceneName } from '../data/gameMeta';
import { getViewLabel, isImmersiveView } from '../data/asciiViews';

const LOADING_ART = `╔══════════════════════════════════════════════════════════════════╗
║  GENERATING SCENE...                         [~] loading          ║
║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║   ░░        BUILDING YOUR NEXT MOMENT . . .                   ░░  ║
║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
╚══════════════════════════════════════════════════════════════════╝`;

const MIN_FONT = 13;
const MAX_FONT = 24;
const PADDING = 28;

function findOptimalFit(pre, frameW, frameH, dpr) {
  let bestFont = MIN_FONT;
  let bestScale = 0;

  for (let fs = MIN_FONT; fs <= MAX_FONT; fs += 1) {
    const renderSize = fs * dpr;
    pre.style.fontSize = `${renderSize}px`;
    pre.style.transform = 'none';
    pre.style.width = 'max-content';

    const artW = pre.scrollWidth;
    const artH = pre.scrollHeight;
    if (!artW || !artH) continue;

    const scale = Math.min(frameW / artW, frameH / artH) * 0.97;
    if (scale > bestScale) {
      bestScale = scale;
      bestFont = fs;
    }
  }

  const renderSize = bestFont * dpr;
  pre.style.fontSize = `${renderSize}px`;
  pre.style.transform = 'none';

  const artW = pre.scrollWidth;
  const artH = pre.scrollHeight;
  const scale = Math.min(frameW / artW, frameH / artH) * 0.97;

  return { renderSize, scale };
}

export default function AsciiDisplay({
  asciiKey,
  portraitKey,
  viewType = 'pov',
  viewBeat = 0,
  loading,
  category,
  isCreepy,
  size = 'hero',
  showLabel = true,
}) {
  const frameRef = useRef(null);
  const artRef = useRef(null);
  const [fadeKey, setFadeKey] = useState(0);
  const art = getAsciiArt(asciiKey, viewType, portraitKey);
  const sceneName = getSceneName(asciiKey);
  const viewLabel = getViewLabel(viewType);
  const catClass = category ? `ascii-cat-${category}` : '';
  const creepyClass = isCreepy ? 'ascii-creepy' : '';
  const viewClass = `ascii-view-${viewType}`;
  const immersiveClass = isImmersiveView(viewType) ? 'ascii-immersive' : '';
  const showCut = viewBeat > 0;

  const fitArt = useCallback(() => {
    const frame = frameRef.current;
    const pre = artRef.current;
    if (!frame || !pre) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const frameW = frame.clientWidth - PADDING;
    const frameH = frame.clientHeight - PADDING;

    const { renderSize, scale } = findOptimalFit(pre, frameW, frameH, dpr);

    pre.style.fontSize = `${renderSize}px`;
    pre.style.transform = `scale(${scale}) translateZ(0)`;
  }, []);

  useEffect(() => {
    setFadeKey((k) => k + 1);
  }, [asciiKey, viewType]);

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
  }, [asciiKey, viewType, loading, art, fitArt]);

  return (
    <div className={`ascii-display ascii-size-${size}`}>
      {showLabel && !loading && asciiKey && (
        <div className="ascii-scene-label">
          <span className={`ascii-scene-dot ${viewClass}`} />
          <span className={`ascii-view-tag ${viewClass}`}>{viewLabel}</span>
          {showCut && <span className="ascii-cut-tag">angle {viewBeat + 1}</span>}
          <span className="ascii-scene-sep">/</span>
          <span className="ascii-scene-name">{sceneName}</span>
        </div>
      )}
      <div
        ref={frameRef}
        className={`ascii-frame ${catClass} ${creepyClass} ${viewClass} ${immersiveClass}`}
      >
        <div className="ascii-vignette" aria-hidden="true" />
        <div className="ascii-scanlines" aria-hidden="true" />
        <div className="ascii-art-wrapper">
          <pre
            key={`${asciiKey}-${viewType}-${fadeKey}`}
            ref={artRef}
            className={`ascii-art ${loading ? 'ascii-loading' : ''} ascii-art-hires ${viewClass}`}
          >
            {loading ? LOADING_ART : art}
          </pre>
        </div>
      </div>
    </div>
  );
}
