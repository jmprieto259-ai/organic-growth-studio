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

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      // Progress from 0 to 1 as section scrolls into view
      const raw = (wh - rect.top) / (wh * 0.7);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Ease-out cubic for smooth counting
  const eased = 1 - Math.pow(1 - progress, 3);

  const mainDisplay = (mainStat.value * eased).toFixed(1);

  return (
    <section
      ref={ref}
      className="bg-primary px-5 md:px-[60px] py-14 md:py-[100px] relative overflow-hidden halftone-dots"
    >
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
            {mainStat.label.split('\n').map((line, j) => (
              <span key={j}>{line}{j === 0 && <br />}</span>
            ))}
          </div>
        </div>

        {/* Breakdown by platform */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-[800px]">
          {breakdown.map((item) => (
            <div key={item.platform} className="flex flex-col items-center">
              <div
                className="font-display font-black text-background"
                style={{ fontSize: 'clamp(36px, 10vw, 72px)', lineHeight: 0.9, letterSpacing: '-0.03em' }}
              >
                {Math.round(item.value * eased)}
                <sup className="text-[0.4em] align-top">{item.suffix}</sup>
              </div>
              <span
                className="font-body font-medium mt-1"
                style={{ fontSize: 'clamp(11px, 3vw, 14px)', color: 'rgba(0,0,0,0.50)' }}
              >
                {item.platform}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
