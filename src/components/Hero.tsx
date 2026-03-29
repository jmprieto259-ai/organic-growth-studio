import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const joseRef = useRef<HTMLSpanElement>(null);
  const prietoRef = useRef<HTMLSpanElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [textBlur, setTextBlur] = useState(0);
  const blurTimeout = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Lenis + GSAP ScrollTrigger parallax
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // JOSE moves up faster
    if (joseRef.current && sectionRef.current) {
      gsap.fromTo(
        joseRef.current,
        { yPercent: 0 },
        {
          yPercent: -40,
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

    // PRIETO moves up slower
    if (prietoRef.current && sectionRef.current) {
      gsap.fromTo(
        prietoRef.current,
        { yPercent: 0 },
        {
          yPercent: -10,
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

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouse({ x, y });

    const centerX = Math.abs(x - 0.5) < 0.35;
    const centerY = y > 0.25 && y < 0.75;
    if (centerX && centerY) {
      const dist = Math.sqrt((x - 0.5) ** 2 + ((y - 0.5) * 0.6) ** 2);
      const blur = Math.max(0, (1 - dist / 0.4) * 12);
      setTextBlur(blur);
    } else {
      setTextBlur(0);
    }

    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    blurTimeout.current = window.setTimeout(() => setTextBlur(0), 150);
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0.5, y: 0.5 });
    setTextBlur(0);
  };

  const bgX = (mouse.x - 0.5) * 30;
  const bgY = (mouse.y - 0.5) * 20;
  const bgBlur = Math.sqrt((mouse.x - 0.5) ** 2 + (mouse.y - 0.5) ** 2) * 4;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full h-[100svh] min-h-[640px] bg-primary flex flex-col justify-between px-5 md:px-[60px] pb-6 md:pb-[44px] pt-0 overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[2]" />

      <div
        className="absolute inset-0 z-0 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(ellipse 70% 60% at ${50 + bgX}% ${55 + bgY}%, rgba(220,70,0,0.45) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at ${30 - bgX * 0.5}% ${70 - bgY * 0.5}%, rgba(180,30,0,0.3) 0%, transparent 60%)`,
          filter: `blur(${bgBlur}px)`,
        }}
      />

      <div className="relative z-[3] flex flex-col items-center justify-center text-center flex-1 pt-[60px]">
        <p
          className="font-display font-bold uppercase tracking-[0.10em] mb-1 transition-all duration-700 ease-out"
          style={{
            fontSize: 'clamp(11px, 3vw, 26px)',
            color: 'rgba(0,0,0,0.55)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.6s',
          }}
        >
          Estratega de Contenido
        </p>

        <h1
          className="font-display font-black uppercase leading-[0.86] transition-[filter] duration-500 ease-out"
          style={{
            fontSize: 'clamp(64px, 18vw, 230px)',
            letterSpacing: '-0.035em',
            color: 'rgba(0,0,0,0.72)',
            filter: `blur(${textBlur}px)`,
          }}
        >
          <span
            ref={joseRef}
            className="block will-change-transform transition-opacity duration-[900ms] ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transitionDelay: '0.2s',
            }}
          >
            Jose
          </span>
          <span
            ref={prietoRef}
            className="block will-change-transform transition-opacity duration-[900ms] ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transitionDelay: '0.35s',
            }}
          >
            Prieto
          </span>
        </h1>

      </div>

      {/* Footer stats — stack on mobile */}
      <div
        className="relative z-[3] flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-4 transition-all duration-700 ease-out"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '1.1s',
        }}
      >
        <span
          className="font-body font-medium uppercase tracking-[0.10em] text-center"
          style={{ fontSize: 'clamp(9px, 2.5vw, 13px)', color: 'rgba(0,0,0,0.55)' }}
        >
          1.7M+ Seguidores
        </span>
      </div>
    </section>
  );
};

export default Hero;
