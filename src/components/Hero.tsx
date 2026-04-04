import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import heroImage from '@/assets/hero-jose.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const joseRef = useRef<HTMLSpanElement>(null);
  const prietoRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [textBlur, setTextBlur] = useState(0);
  const blurTimeout = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(
      joseRef.current,
      { x: '-40vw', opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0
    );
    tl.fromTo(
      prietoRef.current,
      { x: '40vw', opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0
    );

    tl.to(
      subtitleRef.current,
      { filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
      1.0
    );

    tl.call(() => {
      if (joseRef.current && sectionRef.current) {
        gsap.fromTo(
          joseRef.current,
          { x: 0 },
          {
            x: '-30vw',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }
      if (prietoRef.current && sectionRef.current) {
        gsap.fromTo(
          prietoRef.current,
          { x: 0 },
          {
            x: '30vw',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // Scroll-driven cinematic darkening
      if (overlayRef.current && sectionRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }
    });

    return () => {
      tl.kill();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const centerX = Math.abs(x - 0.5) < 0.15;
    const centerY = y > 0.35 && y < 0.65;
    if (centerX && centerY) {
      const dist = Math.sqrt((x - 0.5) ** 2 + ((y - 0.5) * 0.6) ** 2);
      const blur = Math.max(0, (1 - dist / 0.12) * 6);
      setTextBlur(blur);
    } else {
      setTextBlur(0);
    }

    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    blurTimeout.current = window.setTimeout(() => setTextBlur(0), 150);
  };

  const handleMouseLeave = () => {
    setTextBlur(0);
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full h-[100svh] min-h-[640px] bg-black flex flex-col justify-between px-5 md:px-[60px] pb-6 md:pb-[44px] pt-0 overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image */}
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Scroll-driven cinematic darkening overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.75) 100%)',
          opacity: 0,
        }}
      />

      {/* Subtle top gradient for text readability */}
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-[2]" />

      {/* Text content — shifted 10% lower with pt-[16vh] */}
      <div className="relative z-[3] flex flex-col items-center justify-center text-center flex-1 pt-[16vh]">
        <p
          ref={subtitleRef}
          className="font-display font-bold uppercase tracking-[0.10em] mb-1"
          style={{
            fontSize: 'clamp(11px, 3vw, 26px)',
            color: 'rgba(255,255,255,0.6)',
            opacity: 1,
            filter: 'blur(8px)',
          }}
        >
          Estratega de Contenido
        </p>

        <h1
          className="font-display font-black uppercase leading-[0.86] transition-[filter] duration-500 ease-out"
          style={{
            fontSize: 'clamp(64px, 18vw, 230px)',
            letterSpacing: '-0.035em',
            color: 'rgba(255,255,255,0.9)',
            filter: `blur(${textBlur}px)`,
            textShadow: '0 2px 40px rgba(0,0,0,0.4)',
          }}
        >
          <span
            ref={joseRef}
            className="block will-change-transform"
            style={{ opacity: 0 }}
          >
            Jose
          </span>
          <span
            ref={prietoRef}
            className="block will-change-transform"
            style={{ opacity: 0 }}
          >
            Prieto
          </span>
        </h1>
      </div>

      {/* Footer stats */}
      <div className="relative z-[3] flex justify-center">
        <span
          className="font-body font-medium uppercase tracking-[0.10em] text-center"
          style={{ fontSize: 'clamp(9px, 2.5vw, 13px)', color: 'rgba(255,255,255,0.5)' }}
        >
          1.7M+ Seguidores
        </span>
      </div>
    </section>
  );
};

export default Hero;
