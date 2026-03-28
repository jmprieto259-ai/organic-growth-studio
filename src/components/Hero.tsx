import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [textBlur, setTextBlur] = useState(0);
  const blurTimeout = useRef<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouse({ x, y });

    // Check if mouse is over the text area (center zone)
    const centerX = Math.abs(x - 0.5) < 0.35;
    const centerY = y > 0.25 && y < 0.75;
    if (centerX && centerY) {
      // Distance from center — closer = more blur
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

  // Background shift based on mouse
  const bgX = (mouse.x - 0.5) * 30;
  const bgY = (mouse.y - 0.5) * 20;
  const bgBlur = Math.sqrt((mouse.x - 0.5) ** 2 + (mouse.y - 0.5) ** 2) * 4;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full h-[100svh] min-h-[640px] bg-primary flex flex-col justify-between px-[60px] pb-[44px] pt-0 overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[2]" />

      {/* Radial glow — moves with mouse */}
      <div
        className="absolute inset-0 z-0 transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(ellipse 70% 60% at ${50 + bgX}% ${55 + bgY}%, rgba(220,70,0,0.45) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at ${30 - bgX * 0.5}% ${70 - bgY * 0.5}%, rgba(180,30,0,0.3) 0%, transparent 60%)`,
          filter: `blur(${bgBlur}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-[3] flex flex-col items-center justify-center text-center flex-1 pt-[60px]">
        <p
          className="font-display font-bold uppercase tracking-[0.10em] mb-1 transition-all duration-700 ease-out"
          style={{
            fontSize: 'clamp(13px, 1.8vw, 26px)',
            color: 'rgba(0,0,0,0.55)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.6s',
          }}
        >
          Estratega de Contenido Orgánico
        </p>

        <h1
          className="font-display font-black uppercase leading-[0.86] transition-[filter] duration-500 ease-out"
          style={{
            fontSize: 'clamp(88px, 13vw, 230px)',
            letterSpacing: '-0.035em',
            color: 'rgba(0,0,0,0.72)',
            filter: `blur(${textBlur}px)`,
          }}
        >
          <span
            className="block transition-all duration-[900ms] ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'scale(1)' : 'scale(0.96)',
              transitionDelay: '0.2s',
            }}
          >
            Jose
          </span>
          <span
            className="block transition-all duration-[900ms] ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'scale(1)' : 'scale(0.96)',
              transitionDelay: '0.35s',
            }}
          >
            Prieto
          </span>
        </h1>

        <p
          className="font-body mt-7 max-w-[560px] text-center transition-all duration-700 ease-out"
          style={{
            fontSize: 'clamp(13px, 1.2vw, 17px)',
            lineHeight: 1.6,
            color: 'rgba(0,0,0,0.50)',
            letterSpacing: '0.01em',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '0.9s',
          }}
        >
          De vivir como vaquero a conseguir asesorar a los top founders de Latam y conseguir 1.2 millones de votos.
        </p>
      </div>

      {/* Footer stats */}
      <div
        className="relative z-[3] grid grid-cols-3 gap-4 transition-all duration-700 ease-out"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '1.1s',
        }}
      >
        <span
          className="font-body font-medium uppercase tracking-[0.10em]"
          style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', color: 'rgba(0,0,0,0.55)' }}
        >
          Basado en Colombia
        </span>
        <span
          className="font-body font-medium uppercase tracking-[0.10em] text-center"
          style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', color: 'rgba(0,0,0,0.55)' }}
        >
          Redes Sociales &amp; Crecimiento 100% Orgánico
        </span>
        <span
          className="font-body font-medium uppercase tracking-[0.10em] text-right"
          style={{ fontSize: 'clamp(10px, 0.85vw, 13px)', color: 'rgba(0,0,0,0.55)' }}
        >
          1.7M+ Seguidores Construidos
        </span>
      </div>
    </section>
  );
};

export default Hero;
