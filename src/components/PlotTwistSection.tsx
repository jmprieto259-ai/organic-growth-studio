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
      <div className="sticky top-0 h-screen flex items-center justify-center px-5 md:px-[60px] overflow-hidden">
        <div
          className="font-display font-black uppercase max-w-[1100px] mx-auto text-center"
          style={{
            fontSize: 'clamp(32px, 7vw, 80px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          <ScrollText
            text="Del llano pasé a asesorar marcas en redes sociales y en 2025 me lancé a crear contenido en LinkedIn... y mi empresa explotó."
            activeColor="hsl(var(--foreground))"
            useOpacity
            startAt={0.05}
            endAt={0.85}
            externalProgress={progress}
          />
        </div>
      </div>
    </section>
  );
};

export default PlotTwistSection;
