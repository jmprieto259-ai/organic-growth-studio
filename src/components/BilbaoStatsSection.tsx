import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mainStat = {
  value: 875,
  suffix: 'K',
  label: 'Seguidores',
};

const platforms = [
  { name: 'Instagram', numValue: 500, suffix: 'K' },
  { name: 'TikTok', numValue: 200, suffix: 'K' },
  { name: 'Facebook', numValue: 65, suffix: 'K' },
  { name: 'LinkedIn', numValue: 110, suffix: 'K' },
];

const BilbaoStatsSection = () => {
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
  const mainDisplay = Math.round(mainStat.value * eased);

  return (
    <section
      ref={ref}
      className="bg-primary px-5 md:px-[60px] py-14 md:py-[100px] relative overflow-hidden halftone-dots"
    >
      <div className="relative z-[2] flex flex-col items-center text-center gap-10 md:gap-16">
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
          <div
            className="font-body mt-2"
            style={{ fontSize: 'clamp(11px, 2.5vw, 14px)', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.02em' }}
          >
            @AndresBilbao
          </div>
        </div>

        <div
          ref={platformsRef}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {platforms.map((p) => (
            <div
              key={p.name}
              className="platform-item flex flex-col items-center gap-1"
              style={{ opacity: 0 }}
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

export default BilbaoStatsSection;
