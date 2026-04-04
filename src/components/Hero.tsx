import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import heroImg from '@/assets/hero-jose.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const joseRef = useRef<HTMLSpanElement>(null);
  const prietoRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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

      // Scroll-driven image reveal: dark/muted → full color
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
              end: '60% top',
              scrub: 0.8,
            },
          }
        );
      }
      if (imgRef.current && sectionRef.current) {
        gsap.fromTo(
          imgRef.current,
          { filter: 'saturate(1) brightness(1)' },
          {
            filter: 'saturate(0.3) brightness(0.5)',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '60% top',
              scrub: 0.8,
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

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between px-5 md:px-[60px] pb-6 md:pb-[44px] pt-0 overflow-hidden cursor-default"
    >
      {/* Background image */}
      <img
        ref={imgRef}
        src={heroImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'saturate(0.85) brightness(1)' }}
      />

      {/* Dark warm overlay that fades out on scroll */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(20,10,0,0.18) 60%, rgba(0,0,0,0.1) 100%)' }}
      />

      {/* Top gradient for text readability */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-[2]" />

      <div className="relative z-[3] flex flex-col items-center justify-center text-center flex-1 pt-[60px]">
        <p
          ref={subtitleRef}
          className="font-display font-bold uppercase tracking-[0.10em] mb-1"
          style={{
            fontSize: 'clamp(11px, 3vw, 26px)',
            color: 'rgba(255,255,255,0.65)',
            opacity: 1,
            filter: 'blur(8px)',
          }}
        >
          Estratega de Contenido
        </p>

        <h1
          className="font-display font-black uppercase leading-[0.86]"
          style={{
            fontSize: 'clamp(64px, 18vw, 230px)',
            letterSpacing: '-0.035em',
            color: '#ffffff',
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
          style={{ fontSize: 'clamp(9px, 2.5vw, 13px)', color: 'rgba(255,255,255,0.6)' }}
        >
          1.7M+ Seguidores
        </span>
      </div>
    </section>
  );
};

export default Hero;
