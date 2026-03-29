import { useEffect, useRef, useState } from 'react';

interface ScrollTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  activeColor?: string;
  inactiveColor?: string;
  startAt?: number;
  endAt?: number;
  useOpacity?: boolean;
  /** If provided, skip internal scroll tracking and use this value (0-1) */
  externalProgress?: number;
}

const ScrollText = ({
  text,
  className = '',
  style = {},
  activeColor = 'rgba(255,255,255,0.85)',
  inactiveColor = 'rgba(255,255,255,0.07)',
  startAt = 0.15,
  endAt = 0.7,
  useOpacity = false,
  externalProgress,
}: ScrollTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [internalProgress, setInternalProgress] = useState(0);

  const hasExternal = externalProgress !== undefined;
  const progress = hasExternal ? externalProgress : internalProgress;

  useEffect(() => {
    if (hasExternal) return;
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const raw = (wh - rect.top) / (wh + rect.height);
      setInternalProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [hasExternal]);

  const words = text.split(' ');

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, i) => {
        const wordPos = i / words.length;
        const isLit = progress > startAt + wordPos * (endAt - startAt);

        if (useOpacity) {
          return (
            <span
              key={i}
              className="inline-block mr-[0.28em] transition-opacity duration-[400ms] ease-out"
              style={{
                color: activeColor,
                opacity: isLit ? 1 : 0,
              }}
            >
              {word}
            </span>
          );
        }

        return (
          <span
            key={i}
            className="inline-block mr-[0.28em] transition-colors duration-500 ease-out"
            style={{ color: isLit ? activeColor : inactiveColor }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

export default ScrollText;
