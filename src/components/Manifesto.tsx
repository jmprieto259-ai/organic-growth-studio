import { useEffect, useRef, useState } from 'react';
import ScrollText from './ScrollText';

const Manifesto = () => {
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
          className="font-display font-black uppercase max-w-[1100px] mx-auto text-center"
          style={{
            fontSize: 'clamp(28px, 8vw, 80px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          <ScrollText
            text="No hay maquinaria política ni presupuesto de marketing que le gane a una buena historia."
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

export default Manifesto;
