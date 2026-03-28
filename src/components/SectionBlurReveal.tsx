import { useEffect, useRef, useState, ReactNode } from 'react';

interface SectionBlurRevealProps {
  children: ReactNode;
  className?: string;
  /** Max blur in px when section is off-screen */
  maxBlur?: number;
}

/**
 * Wraps a section so it starts blurred and becomes sharp as it scrolls into view.
 * Same effect as the vaquero image panel.
 */
const SectionBlurReveal = ({ children, className = '', maxBlur = 12 }: SectionBlurRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [blur, setBlur] = useState(maxBlur);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      // visibility: 0 when bottom edge just enters, 1 when ~40% visible
      const vis = Math.min(1, Math.max(0, (wh - rect.top) / (wh * 0.4)));
      setBlur(Math.max(0, maxBlur * (1 - vis)));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [maxBlur]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        filter: `blur(${blur}px)`,
        transition: 'filter 0.3s ease-out',
        willChange: 'filter',
      }}
    >
      {children}
    </div>
  );
};

export default SectionBlurReveal;
