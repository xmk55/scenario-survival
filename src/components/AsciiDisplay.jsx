import { useRef, useEffect, useCallback } from 'react';
import { getAsciiArt } from '../data/asciiArt';
import { getSceneName } from '../data/gameMeta';
import { getViewLabel, isImmersiveView } from '../data/asciiViews';

const LOADING_ART = `╔══════════════════════════════════════════════════════════════════╗
║  GENERATING SCENE...                         [~] loading          ║
║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
║   ░░        BUILDING YOUR NEXT MOMENT . . .                   ░░  ║
║   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ║
╚══════════════════════════════════════════════════════════════════╝`;

function getFitLimits() {
  const narrow = typeof window !== 'undefined' && window.innerWidth <= 600;
  return {
    minFont: narrow ? 8 : 11,
    maxFont: narrow ? 16 : 22,
    padding: narrow ? 16 : 28,
    maxScale: narrow ? 0.92 : 0.97,
  };
}

function findOptimalFit(pre, frameW, frameH, dpr) {
  const { minFont, maxFont, maxScale } = getFitLimits();
  let bestFont = minFont;
  let bestScale = 0;

  for (let fs = minFont; fs <= maxFont; fs += 1) {
    const renderSize = fs * dpr;
    pre.style.fontSize = `${renderSize}px`;
    pre.style.transform = 'none';
    pre.style.width = 'max-content';

    const artW = pre.scrollWidth;
    const artH = pre.scrollHeight;
    if (!artW || !artH) continue;

    const scale = Math.min(frameW / artW, frameH / artH) * maxScale;
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
  const scale = Math.min(frameW / artW, frameH / artH) * maxScale;

  return { renderSize, scale: Math.min(scale, 1) };
}

export default function AsciiDisplay({
  asciiKey,
  portraitKey,
  viewType = 'pov',
  loading,
  category,
  isCreepy,
  size = 'hero',
  showLabel = true,
}) {
  const frameRef = useRef(null);
  const artRef = useRef(null);
  const art = getAsciiArt(asciiKey, viewType, portraitKey);
  const sceneName = getSceneName(asciiKey);
  const viewLabel = getViewLabel(viewType);
  const catClass = category ? `ascii-cat-${category}` : '';
  const creepyClass = isCreepy ? 'ascii-creepy' : '';
  const viewClass = `ascii-view-${viewType}`;
  const immersiveClass = isImmersiveView(viewType) ? 'ascii-immersive' : '';

  const fitArt = useCallback(() => {
    const frame = frameRef.current;
    const pre = artRef.current;
    if (!frame || !pre) return;

    const { padding } = getFitLimits();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const frameW = frame.clientWidth - padding;
    const frameH = frame.clientHeight - padding;

    const { renderSize, scale } = findOptimalFit(pre, frameW, frameH, dpr);

    pre.style.fontSize = `${renderSize}px`;
    pre.style.transform = `scale(${scale}) translateZ(0)`;
  }, []);

  useEffect(() => {
    if (loading) return undefined;

    let raf1;
    let raf2;
    raf1 = requestAnimationFrame(() => {
      fitArt();
      raf2 = requestAnimationFrame(fitArt);
    });

    const frame = frameRef.current;
    if (!frame) return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(fitArt);
    });
    observer.observe(frame);
    window.addEventListener('resize', fitArt);
    window.addEventListener('orientationchange', fitArt);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observer.disconnect();
      window.removeEventListener('resize', fitArt);
      window.removeEventListener('orientationchange', fitArt);
    };
  }, [asciiKey, viewType, loading, art, fitArt]);

  return (
    <div className={`ascii-display ascii-size-${size}`}>
      {showLabel && !loading && asciiKey && (
        <div className="ascii-scene-label">
          <span className={`ascii-scene-dot ${viewClass}`} />
          <span className={`ascii-view-tag ${viewClass}`}>{viewLabel}</span>
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
            key={`${asciiKey}-${viewType}`}
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
