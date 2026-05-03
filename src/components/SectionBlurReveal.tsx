import { useEffect, useRef, ReactNode } from 'react';

interface SectionBlurRevealProps {
  children: ReactNode;
  className?: string;
  maxBlur?: number;
}

const SectionBlurReveal = ({ children, className = '', maxBlur = 12 }: SectionBlurRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.willChange = 'filter';
    el.style.transition = 'filter 0.15s linear';

    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const vis = Math.min(1, Math.max(0, (wh - rect.top) / (wh * 0.4)));
      const blurVal = Math.max(0, maxBlur * (1 - vis));
      el.style.filter = `blur(${blurVal.toFixed(2)}px)`;
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [maxBlur]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default SectionBlurReveal;
