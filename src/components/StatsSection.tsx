import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mainStat = {
  value: 1.7,
  suffix: 'M',
  label: 'Seguidores',
};

const platforms = [
  { name: 'TikTok', numValue: 950, suffix: 'K' },
  { name: 'Instagram', numValue: 450, suffix: 'K' },
  { name: 'Facebook', numValue: 200, suffix: 'K' },
  { name: 'YouTube', numValue: 100, suffix: 'K' },
];

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const raw = (wh - rect.top) / (wh * 0.7);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const eased = 1 - Math.pow(1 - progress, 3);
  const mainDisplay = (mainStat.value * eased).toFixed(1);

  return (
    <section
      ref={ref}
      className="bg-primary px-5 md:px-[60px] py-14 md:py-[100px] relative overflow-hidden halftone-dots"
    >
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[1]" />
      <div className="relative z-[2] flex flex-col items-center text-center gap-10 md:gap-16">
        <div className="pin-animate">
          <div
            className="font-display font-black text-background"
            style={{ fontSize: 'clamp(80px, 22vw, 220px)', lineHeight: 0.85, letterSpacing: '-0.04em' }}
          >
            {mainDisplay}
            <sup className="text-[0.35em] align-top">{mainStat.suffix}</sup>
          </div>
          <div
            className="font-body font-medium mt-3"
            style={{ fontSize: 'clamp(13px, 3.5vw, 18px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.4 }}
          >
            {mainStat.label}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="pin-animate flex flex-col items-center gap-1"
            >
              <span
                className="font-display font-black text-background"
                style={{ fontSize: 'clamp(28px, 5vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {Math.round(p.numValue * eased)}{p.suffix}
              </span>
              <span
                className="font-body font-medium uppercase tracking-[0.12em]"
                style={{ fontSize: 'clamp(9px, 2vw, 12px)', color: 'rgba(0,0,0,0.50)' }}
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
