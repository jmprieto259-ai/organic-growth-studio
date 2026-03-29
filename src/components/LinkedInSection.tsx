import { useEffect, useRef, useState } from 'react';
import ScrollText from './ScrollText';

const LinkedInSection = () => {
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

  // Phase helpers — map global progress to sub-phases
  const phase = (start: number, end: number) =>
    Math.min(1, Math.max(0, (progress - start) / (end - start)));

  const headlineProgress = phase(0, 0.35);
  const bodyProgress = phase(0.25, 0.55);
  const cardsOpacity = phase(0.5, 0.65);

  return (
    <section ref={sectionRef} className="relative bg-background" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* LINKEDIN watermark */}

        {/* Content */}
        <div className="relative z-[2] w-full max-w-[1200px] mx-auto px-5 md:px-[60px]">
          {/* Eyebrow */}
          <span
            className="block font-body text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-6 md:mb-8 transition-opacity duration-500"
            style={{
              color: 'rgba(255,255,255,0.35)',
              opacity: progress > 0.02 ? 1 : 0,
            }}
          >
            MARCA PERSONAL
          </span>

          {/* Headline — word-by-word reveal */}
          <h3
            className="font-display font-black uppercase mb-6 md:mb-10"
            style={{
              fontSize: 'clamp(28px, 6vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            <ScrollText
              text="De ser un desconocido en LinkedIn pasé a trabajar con los Bilbao y un candidato presidencial."
              activeColor="hsl(var(--foreground))"
              useOpacity
              startAt={0.05}
              endAt={0.9}
              externalProgress={headlineProgress}
              getWordStyle={(word) => {
                const clean = word.replace(/[.,!?]/g, '').toLowerCase();
                if (clean === 'linkedin')
                  return { color: '#E8000D', fontWeight: 900, letterSpacing: '-0.02em' };
                return undefined;
              }}
            />
          </h3>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-4 md:gap-8 mb-6 md:mb-10 font-display font-bold uppercase text-[12px] md:text-[14px] tracking-[0.08em] transition-opacity duration-700"
            style={{
              color: 'rgba(255,255,255,0.45)',
              opacity: bodyProgress > 0.1 ? 1 : 0,
              transform: `translateY(${bodyProgress > 0.1 ? 0 : 15}px)`,
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span>8 meses publicando</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <span>7M de impresiones</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <span>19K seguidores</span>
          </div>

          {/* Body text — word-by-word */}
          <p
            className="font-body mb-10 md:mb-14 max-w-[650px]"
            style={{
              fontSize: '15px',
              lineHeight: 1.75,
            }}
          >
            <ScrollText
              text="Ayudo a marcas personales a posicionarse y vender en LinkedIn. Sin pauta. Solo contenido estratégico, constancia y un sistema probado de marca personal."
              activeColor="rgba(255,255,255,0.55)"
              useOpacity
              startAt={0.05}
              endAt={0.9}
              externalProgress={bodyProgress}
            />
          </p>

          {/* Product cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[700px]"
            style={{
              opacity: cardsOpacity,
              transform: `translateY(${(1 - cardsOpacity) * 25}px)`,
              transition: 'transform 0.1s linear',
            }}
          >
            {/* Card 1 */}
            <div
              className="rounded-[4px] p-6 md:p-7 flex flex-col gap-4"
              style={{ border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <span className="font-display font-black text-[11px]" style={{ color: 'rgba(255,255,255,0.18)' }}>01</span>
              <h5 className="font-display font-black uppercase text-foreground" style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>
                Acompañamiento 1:1
              </h5>
              <p className="font-body" style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(255,255,255,0.45)' }}>
                Programa de 90 días para founders y líderes que quieren construir su marca personal en LinkedIn de forma orgánica y sostenida.
              </p>
              <a
                href="https://www.linkedin.com/in/joseprieto/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-auto font-body text-[12px] text-foreground rounded-full px-5 py-2.5 transition-colors duration-200 hover:bg-foreground hover:text-background self-start"
                style={{ border: '1px solid rgba(255,255,255,0.25)' }}
              >
                Aplicar al programa →
              </a>
            </div>

            {/* Card 2 */}
            <div
              className="rounded-[4px] p-6 md:p-7 flex flex-col gap-4"
              style={{ border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <span className="font-display font-black text-[11px]" style={{ color: 'rgba(255,255,255,0.18)' }}>02</span>
              <h5 className="font-display font-black uppercase text-foreground" style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>
                Bootcamp Marca Personal
              </h5>
              <p className="font-body" style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(255,255,255,0.45)' }}>
                Intensivo grupal para profesionales y emprendedores que quieren dominar LinkedIn y empezar a crear contenido que posicione desde el día uno.
              </p>
              <a
                href="https://www.linkedin.com/in/joseprieto/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-auto font-body text-[12px] text-foreground rounded-full px-5 py-2.5 transition-colors duration-200 hover:bg-foreground hover:text-background self-start"
                style={{ border: '1px solid rgba(255,255,255,0.25)' }}
              >
                Aplica al Bootcamp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkedInSection;
