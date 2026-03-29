import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface ScrollTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  activeColor?: string;
  inactiveColor?: string;
  startAt?: number;
  endAt?: number;
  useOpacity?: boolean;
  externalProgress?: number;
  /** Words to pulse red after reveal, e.g. "millones de votos" */
  pulseWords?: string;
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
  pulseWords,
}: ScrollTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [internalProgress, setInternalProgress] = useState(0);
  const pulseFired = useRef(false);
  const pulseRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

  // Determine which words are pulse targets
  const pulseWordsLower = pulseWords?.toLowerCase().split(' ') || [];
  const pulseStartIdx = pulseWordsLower.length > 0
    ? words.findIndex((_, i) =>
        pulseWordsLower.every((pw, j) =>
          words[i + j]?.toLowerCase().replace(/[.,!?]/g, '') === pw
        )
      )
    : -1;
  const pulseEndIdx = pulseStartIdx >= 0 ? pulseStartIdx + pulseWordsLower.length : -1;

  // Check if all pulse words are revealed, fire GSAP pulse once
  useEffect(() => {
    if (pulseFired.current || pulseStartIdx < 0) return;
    const lastPulseWordPos = (pulseEndIdx - 1) / words.length;
    const isLastRevealed = progress > startAt + lastPulseWordPos * (endAt - startAt);
    if (!isLastRevealed) return;

    pulseFired.current = true;
    const els = pulseRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (els.length === 0) return;

    // Delay 0.4s, then pulse white → red → white
    gsap.timeline({ delay: 0.4 })
      .to(els, {
        color: '#c0392b',
        textShadow: '0 0 40px rgba(200, 50, 30, 0.5)',
        duration: 0.6,
        ease: 'power2.inOut',
      })
      .to(els, {
        color: activeColor,
        textShadow: '0 0 0px rgba(200, 50, 30, 0)',
        duration: 0.8,
        ease: 'power2.inOut',
      });
  }, [progress, pulseStartIdx, pulseEndIdx, words.length, startAt, endAt, activeColor]);

  const setPulseRef = useCallback((idx: number) => (el: HTMLSpanElement | null) => {
    pulseRefs.current[idx] = el;
  }, []);

  return (
    <span ref={ref} className={className} style={style}>
      {words.map((word, i) => {
        const wordPos = i / words.length;
        const isLit = progress > startAt + wordPos * (endAt - startAt);
        const isPulseWord = i >= pulseStartIdx && i < pulseEndIdx;

        if (useOpacity) {
          return (
            <span
              key={i}
              ref={isPulseWord ? setPulseRef(i - pulseStartIdx) : undefined}
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
            ref={isPulseWord ? setPulseRef(i - pulseStartIdx) : undefined}
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
