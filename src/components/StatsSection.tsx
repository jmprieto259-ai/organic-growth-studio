import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 1.7, suffix: 'M', prefix: '', desc: 'Seguidores construidos\nde forma 100% orgánica' },
  { value: 1.2, suffix: 'M', prefix: '', desc: 'Votos conseguidos\nsin publicidad paga' },
  { value: 12, suffix: '+', prefix: '', desc: 'Videos diarios publicados\nen campaña de alto impacto' },
  { value: 0, suffix: '', prefix: '$', desc: 'Invertidos en publicidad\npara construir 1.7M' },
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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [started, target, duration]);

  return value;
}

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
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

  const animated = useCountUp(stat.value, visible);
  const display = stat.value === 0 ? '$0' : `${stat.prefix}${stat.value % 1 === 0 ? Math.round(animated) : animated.toFixed(1)}`;

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2 transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.92)',
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div
        className="font-display font-black text-background"
        style={{ fontSize: 'clamp(60px, 10vw, 140px)', lineHeight: 0.85, letterSpacing: '-0.04em' }}
      >
        {display}
        {stat.suffix && (
          <sup className="text-[0.38em] align-top" style={{ marginTop: '0.1em' }}>
            {stat.suffix}
          </sup>
        )}
      </div>
      <div
        className="font-body font-medium"
        style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.35 }}
      >
        {stat.desc.split('\n').map((line, j) => (
          <span key={j}>{line}{j === 0 && <br />}</span>
        ))}
      </div>
    </div>
  );
};

const StatsSection = () => (
  <section className="bg-primary px-[60px] py-[100px] relative overflow-hidden halftone-dots">
    <div className="relative z-[2] grid grid-cols-2 gap-x-20 gap-y-[70px]">
      {stats.map((s, i) => (
        <StatCard key={i} stat={s} index={i} />
      ))}
    </div>
  </section>
);

export default StatsSection;
