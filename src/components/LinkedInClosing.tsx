import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteContent } from '@/hooks/use-site-content';

gsap.registerPlugin(ScrollTrigger);

const LinkedInClosing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { getContent } = useSiteContent();

  const eyebrow = getContent('linkedin', 'eyebrow', 'Marca Personal');
  const headline = getContent('linkedin', 'headline', 'Con mi estrategia logré en 8 meses, 7 millones de impresiones y 20K seguidores');
  const body = getContent('linkedin', 'body', 'Hoy ayudo a marcas personales y equipos a posicionarse y vender en LinkedIn.');
  const ctaLabel = getContent('linkedin', 'cta_label', 'Aplica mi Bootcamp →');

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

    tl.fromTo(watermark, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' });

    const children = content.querySelectorAll('[data-anim]');
    tl.fromTo(children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1 }, '-=0.8');

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background overflow-hidden" style={{ padding: 'clamp(80px, 15vh, 160px) 0' }}>
      <div ref={watermarkRef} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1] opacity-0">
        <span className="font-display font-black uppercase whitespace-nowrap" style={{ fontSize: 'clamp(120px, 28vw, 500px)', lineHeight: 1, letterSpacing: '-0.04em', color: 'rgba(232, 0, 13, 0.35)' }}>
          LINKEDIN
        </span>
      </div>

      <div ref={contentRef} className="relative z-[2] flex flex-col items-center text-center px-5 md:px-[60px] max-w-[900px] mx-auto">
        <span data-anim className="font-body text-[11px] md:text-[12px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {eyebrow}
        </span>

        <h2 data-anim className="font-display font-black uppercase text-foreground mt-6 md:mt-8" style={{ fontSize: 'clamp(28px, 6vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          {headline}
        </h2>

        <div style={{ height: 'clamp(80px, 18vh, 200px)' }} />

        <p data-anim className="font-body" style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.50)', maxWidth: '55ch' }}>
          {body}
        </p>

        <a data-anim href="https://www.notion.so/Bootcamp-Pedro-y-Jos-3-0-3232ec953e8d802b9294e3413153fe6d" target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-display font-black uppercase text-white px-8 py-4 text-[13px] md:text-[14px] tracking-[0.08em] transition-opacity duration-200 hover:opacity-80" style={{ marginTop: 'clamp(16px, 3vh, 32px)', backgroundColor: 'hsl(11, 100%, 45%)' }}>
          {ctaLabel}
        </a>
      </div>
    </section>
  );
};

export default LinkedInClosing;
