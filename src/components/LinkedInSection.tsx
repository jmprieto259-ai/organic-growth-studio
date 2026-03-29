const LinkedInSection = () => {
  return (
    <section className="bg-background px-5 md:px-[60px] py-24 md:py-[140px]">
      <div className="max-w-[900px] mx-auto flex flex-col items-start gap-8 md:gap-12">
        {/* Eyebrow */}
        <span
          className="font-body text-[11px] md:text-[12px] font-semibold tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Marca Personal
        </span>

        {/* Headline */}
        <h2
          className="font-display font-black uppercase text-foreground"
          style={{
            fontSize: 'clamp(32px, 7vw, 72px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
          }}
        >
          De ser un desconocido en LinkedIn a 7 millones de impresiones en 8 meses.
        </h2>

        {/* Subtext */}
        <p
          className="font-body"
          style={{
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.4,
          }}
        >
          Todo con el poder del storytelling.
        </p>

        {/* Stat callout */}
        <div
          className="font-display font-black uppercase text-foreground flex flex-wrap items-baseline gap-x-4 gap-y-2"
          style={{
            fontSize: 'clamp(20px, 4vw, 42px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          <span>7M de impresiones</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span>8 meses</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span>20.000 seguidores</span>
        </div>

        {/* Body */}
        <p
          className="font-body max-w-[55ch]"
          style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.50)',
          }}
        >
          Ayudo a marcas personales a posicionarse y vender en LinkedIn.
        </p>

        {/* CTA */}
        <a
          href="https://www.linkedin.com/in/joseprieto/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-display font-black uppercase text-background bg-foreground px-8 py-4 text-[13px] tracking-[0.08em] transition-opacity duration-200 hover:opacity-80"
        >
          Aplica al Bootcamp →
        </a>
      </div>
    </section>
  );
};

export default LinkedInSection;
