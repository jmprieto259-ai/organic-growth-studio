import { useEffect, useRef, useState } from 'react';
import ScrollText from './ScrollText';

const PlotTwistSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const raw = -rect.top / (rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-5 md:px-[60px]">
        <p
          className="font-display font-black uppercase max-w-[800px] mx-auto text-center"
          style={{
            fontSize: 'clamp(24px, 5vw, 52px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          <ScrollText
            text="Cumplí mi sueño del llano y tenía claro que no quería ser influencer. Por eso construí mi empresa. Crecí por voz a voz y en 2025 me lancé a LinkedIn para buscar nuevos clientes — lo que vino después lo cambió todo."
            activeColor="hsl(var(--foreground))"
            useOpacity
            startAt={0.05}
            endAt={0.85}
            externalProgress={progress}
          />
        </p>
      </div>
    </section>
  );
};

export default PlotTwistSection;
