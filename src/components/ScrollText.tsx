import { useEffect, useRef, useState } from 'react';

interface ScrollTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Color when word is revealed */
  activeColor?: string;
  /** Color when word is not yet revealed */
  inactiveColor?: string;
  /** How far into scroll (0-1) the reveal starts */
  startAt?: number;
  /** How far into scroll (0-1) all words are revealed */
  endAt?: number;
}

/**
 * Text that reveals word-by-word as you scroll through it.
 * Inspired by the Manifesto section style.
 */
const ScrollText = ({
  text,
  className = '',
  style = {},
  activeColor = 'rgba(255,255,255,0.85)',
  inactiveColor = 'rgba(255,255,255,0.07)',
  startAt = 0.15,
  endAt = 0.7,
}: ScrollTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const raw = (wh - rect.top) / (wh + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const words = text.split(' ');

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, i) => {
        const wordPos = i / words.length;
        const isLit = progress > startAt + wordPos * (endAt - startAt);
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
