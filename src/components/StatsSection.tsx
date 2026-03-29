import { useEffect, useRef, useState } from 'react';

const mainStat = {
  value: 1.7,
  suffix: 'M',
  label: 'Seguidores construidos\nde forma 100% orgánica',
};

const breakdown = [
  { platform: 'TikTok', value: 950, suffix: 'K' },
  { platform: 'Instagram', value: 450, suffix: 'K' },
  { platform: 'Facebook', value: 200, suffix: 'K' },
  { platform: 'YouTube', value: 100, suffix: 'K' },
];

function useCountUp(target: number, started: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [started, target, duration]);

  return value;
}

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { rootMargin: '-80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const mainAnimated = useCountUp(mainStat.value, visible);

  return (
    <section
      ref={ref}
      className="bg-primary px-5 md:px-[60px] py-14 md:py-[100px] relative overflow-hidden halftone-dots"
    >
      <div className="relative z-[2] flex flex-col items-center text-center gap-10 md:gap-16">
        {/* Main number */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.92)',
          }}
        >
          <div
            className="font-display font-black text-background"
            style={{ fontSize: 'clamp(80px, 22vw, 220px)', lineHeight: 0.85, letterSpacing: '-0.04em' }}
          >
            {mainAnimated.toFixed(1)}
            <sup className="text-[0.35em] align-top">{mainStat.suffix}</sup>
          </div>
          <div
            className="font-body font-medium mt-3"
            style={{ fontSize: 'clamp(13px, 3.5vw, 18px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.4 }}
          >
            {mainStat.label.split('\n').map((line, j) => (
              <span key={j}>{line}{j === 0 && <br />}</span>
            ))}
          </div>
        </div>

        {/* Breakdown by platform */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-[800px]">
          {breakdown.map((item, i) => {
            const animated = useCountUp(item.value, visible, 1800 + i * 200);
            return (
              <div
                key={item.platform}
                className="flex flex-col items-center transition-all duration-700 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: `${300 + i * 150}ms`,
                }}
              >
                <div
                  className="font-display font-black text-background"
                  style={{ fontSize: 'clamp(36px, 10vw, 72px)', lineHeight: 0.9, letterSpacing: '-0.03em' }}
                >
                  {Math.round(animated)}
                  <sup className="text-[0.4em] align-top">{item.suffix}</sup>
                </div>
                <span
                  className="font-body font-medium mt-1"
                  style={{ fontSize: 'clamp(11px, 3vw, 14px)', color: 'rgba(0,0,0,0.50)' }}
                >
                  {item.platform}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
