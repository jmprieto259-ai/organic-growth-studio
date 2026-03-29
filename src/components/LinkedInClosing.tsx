import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LinkedInClosing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const watermark = watermarkRef.current;
    const content = contentRef.current;
    if (!section || !watermark || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    // Watermark scales in
    tl.fromTo(
      watermark,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
    );

    // Content staggers in
    const children = content.querySelectorAll('[data-anim]');
    tl.fromTo(
      children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1 },
      '-=0.8'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-hidden"
      style={{ padding: 'clamp(80px, 15vh, 160px) 0' }}
    >

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[2] flex flex-col items-center text-center px-5 md:px-[60px] max-w-[900px] mx-auto"
        style={{ gap: 'clamp(24px, 4vh, 48px)' }}
      >
        {/* Eyebrow */}
        <span
          data-anim
          className="font-body text-[11px] md:text-[12px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Marca Personal
        </span>

        {/* Headline */}
        <h2
          data-anim
          className="font-display font-black uppercase text-foreground"
          style={{
            fontSize: 'clamp(28px, 6vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          De ser un desconocido en LinkedIn a 7 millones de impresiones en 8 meses.
        </h2>

        {/* Subtext */}
        <p
          data-anim
          className="font-display font-bold uppercase"
          style={{
            fontSize: 'clamp(14px, 3vw, 22px)',
            color: 'rgba(255,255,255,0.30)',
            letterSpacing: '0.04em',
          }}
        >
          Todo con el poder del storytelling.
        </p>

        {/* Stat callout */}
        <div
          data-anim
          className="font-display font-black text-foreground"
          style={{
            fontSize: 'clamp(18px, 4vw, 36px)',
            letterSpacing: '-0.02em',
          }}
        >
          7M de impresiones · 8 meses · 20.000 seguidores
        </div>

        {/* Body */}
        <p
          data-anim
          className="font-body"
          style={{
            fontSize: 'clamp(14px, 1.8vw, 17px)',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.50)',
            maxWidth: '55ch',
          }}
        >
          Ayudo a marcas personales a posicionarse y vender en LinkedIn.
        </p>

        {/* CTA */}
        <a
          data-anim
          href="https://www.linkedin.com/in/joseprieto/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-display font-black uppercase text-background bg-foreground px-8 py-4 text-[13px] md:text-[14px] tracking-[0.08em] transition-opacity duration-200 hover:opacity-80"
          style={{ marginTop: '8px' }}
        >
          Aplica al Bootcamp →
        </a>
      </div>
    </section>
  );
};

export default LinkedInClosing;
