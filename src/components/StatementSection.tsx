import { useEffect, useRef, useState } from 'react';
import ScrollText from './ScrollText';

const StatementSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      // 0 when section top hits viewport bottom, 1 when section bottom exits top
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
            text="De vivir como vaquero a asesorar a los top founders de Latam y conseguir 1.2 millones de votos."
            activeColor="hsl(var(--foreground))"
            useOpacity
            startAt={0.05}
            endAt={0.85}
            externalProgress={progress}
            pulseWords="millones de votos"
            getWordStyle={(_word, index) => {
              // words: ...conseguir(13) 1.2(14) millones(15) de(16) votos.(17)
              if (index >= 14 && index <= 17)
                return { color: '#E8000D' };
              return undefined;
            }}
          />
        </p>
      </div>
    </section>
  );
};

export default StatementSection;
