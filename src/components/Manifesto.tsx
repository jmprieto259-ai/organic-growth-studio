import { useEffect, useRef, useState } from 'react';

const words = 'El contenido orgánico no se puede delegar a una agencia — tu historia es tu mayor activo.'.split(' ');

const Manifesto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const raw = (wh - rect.top) / (wh + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section ref={ref} className="bg-background px-[60px] py-[180px] text-center">
      <p
        className="font-display font-black uppercase max-w-[1200px] mx-auto"
        style={{
          fontSize: 'clamp(32px, 6vw, 88px)',
          lineHeight: 1.04,
          letterSpacing: '-0.03em',
        }}
      >
        {words.map((word, i) => {
          // Each word lights up sequentially based on scroll progress
          const wordProgress = (i / words.length);
          const isLit = progress > 0.15 + wordProgress * 0.55;
          return (
            <span
              key={i}
              className="inline-block mr-[0.28em] transition-all duration-500 ease-out"
              style={{
                color: isLit ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.07)',
                transform: isLit ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              {word}
            </span>
          );
        })}
      </p>
    </section>
  );
};

export default Manifesto;
