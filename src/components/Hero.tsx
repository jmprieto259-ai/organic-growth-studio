const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative w-full h-[100svh] min-h-[640px] bg-primary flex flex-col justify-between px-[60px] pb-[44px] pt-0 overflow-hidden"
    >
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[2]" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 65% 55%, rgba(220,70,0,0.45) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 30% 70%, rgba(180,30,0,0.3) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[3] flex flex-col items-center justify-center text-center flex-1 pt-[60px]">
        <p
          className="font-display font-bold uppercase tracking-[0.10em]"
          style={{ fontSize: 'clamp(13px, 1.8vw, 26px)', color: 'rgba(0,0,0,0.55)' }}
        >
          Estratega de Contenido Orgánico
        </p>
        <h1
          className="font-display font-black uppercase leading-[0.86]"
          style={{
            fontSize: 'clamp(88px, 13vw, 230px)',
            letterSpacing: '-0.035em',
            color: 'rgba(0,0,0,0.72)',
          }}
        >
          Jose<br />Prieto
        </h1>
      </div>

      {/* Footer stats */}
      <div className="relative z-[3] grid grid-cols-3 gap-4">
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
