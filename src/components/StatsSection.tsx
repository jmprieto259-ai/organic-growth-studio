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
  const platformsRef = useRef<HTMLDivElement>(null);
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

  // Staggered fade-up for platform items
  useEffect(() => {
    const el = platformsRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.platform-item');
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  const eased = 1 - Math.pow(1 - progress, 3);
  const mainDisplay = (mainStat.value * eased).toFixed(1);

  return (
    <section
      ref={ref}
      className="bg-primary px-5 md:px-[60px] py-14 md:py-[100px] relative overflow-hidden halftone-dots"
    >
      {/* Top gradient fade from black */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[1]" />
      <div className="relative z-[2] flex flex-col items-center text-center gap-10 md:gap-16">
        {/* Main number */}
        <div>
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

        {/* Platform breakdown */}
        <div
          ref={platformsRef}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {platforms.map((p, i) => (
            <div
              key={p.name}
              className="platform-item flex flex-col items-center gap-1"
              style={{ opacity: 0 }}
            >
              <span
                className="font-display font-black text-background"
                style={{ fontSize: 'clamp(28px, 5vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {p.value}
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
