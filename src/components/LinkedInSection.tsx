const LinkedInSection = () => {
  return (
    <div className="relative">
      {/* Red panel */}
      <div className="relative bg-primary h-[60vh] md:h-[75vh] min-h-[360px] md:min-h-[480px] overflow-hidden">
        {/* Sticky top bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 md:px-[22px] py-3 md:py-[14px] border-b border-black/[0.12]">
          <span
            className="font-body text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'rgba(0,0,0,0.45)' }}
          >
            LinkedIn &amp; Marca Personal
          </span>
          <span
            className="font-body text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: 'rgba(0,0,0,0.45)' }}
          >
            링크드인
          </span>
        </div>

        {/* BG word */}
        <div
          className="absolute inset-0 flex items-center justify-center font-display font-black uppercase overflow-hidden whitespace-nowrap select-none pointer-events-none z-[1]"
          style={{
            fontSize: 'clamp(70px, 20vw, 320px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'rgba(0,0,0,0.22)',
          }}
        >
          LINKEDIN
        </div>

        {/* Image placeholder */}
        <div
          className="absolute inset-0 z-[2] flex items-center justify-center"
        >
          <div
            className="font-body text-[13px] tracking-[0.05em] flex items-center justify-center"
            style={{
              width: '52%',
              height: '88%',
              color: 'rgba(0,0,0,0.35)',
              filter: 'grayscale(1)',
              mixBlendMode: 'multiply',
            }}
          >
            [ LinkedIn Profile Screenshot ]
          </div>
        </div>
      </div>

      {/* Black panel */}
      <div className="bg-background px-5 md:px-[60px] py-14 md:py-[100px] relative overflow-hidden">
        {/* Inner grid */}
        <div className="relative z-[2] flex flex-col gap-10 md:grid md:grid-cols-[1fr_1.3fr] md:gap-20 md:items-start">
          {/* Left */}
          <div>
            <span className="block font-body text-[12px] text-muted tracking-[0.04em] mb-3 md:mb-[18px]">
              // 04
            </span>
            <h3
              className="font-display font-black uppercase text-foreground mb-3 md:mb-[18px]"
              style={{
                fontSize: 'clamp(36px, 12vw, 90px)',
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
              }}
            >
              Marca<br />Personal
            </h3>
            <span
              className="block font-display font-bold uppercase"
              style={{
                fontSize: 'clamp(14px, 4vw, 26px)',
                letterSpacing: '0.05em',
                color: 'rgba(255,255,255,0.22)',
              }}
            >
              LinkedIn
            </span>
          </div>

          {/* Right */}
          <div>
            <h4
              className="font-display font-black uppercase text-foreground mb-4 md:mb-[22px]"
              style={{
                fontSize: 'clamp(28px, 4vw, 52px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
              }}
            >
              De 0 a 7.000.000 de impresiones
            </h4>
            <p
              className="font-body mb-8 md:mb-10"
              style={{
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.50)',
              }}
            >
              En 8 meses construí una presencia en LinkedIn desde cero hasta millones de impresiones.
              <br />
              Sin pauta. Solo contenido estratégico, constancia y un sistema probado de marca personal.
            </p>

            {/* Product cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8 md:mt-10">
              {/* Card 1 */}
              <div
                className="rounded-[4px] p-6 md:p-7 flex flex-col gap-4"
                style={{ border: '1px solid rgba(255,255,255,0.10)' }}
              >
                <span
                  className="font-display font-black text-[11px]"
                  style={{ color: 'rgba(255,255,255,0.18)' }}
                >
                  01
                </span>
                <h5
                  className="font-display font-black uppercase text-foreground"
                  style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
                >
                  Acompañamiento 1:1
                </h5>
                <p
                  className="font-body"
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  Programa de 90 días para founders y líderes que quieren construir
                  su marca personal en LinkedIn de forma orgánica y sostenida.
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
                <span
                  className="font-display font-black text-[11px]"
                  style={{ color: 'rgba(255,255,255,0.18)' }}
                >
                  02
                </span>
                <h5
                  className="font-display font-black uppercase text-foreground"
                  style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}
                >
                  Bootcamp Marca Personal
                </h5>
                <p
                  className="font-body"
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  Intensivo grupal para profesionales y emprendedores que quieren
                  dominar LinkedIn y empezar a crear contenido que posicione desde el día uno.
                </p>
                <a
                  href="https://www.linkedin.com/in/joseprieto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-auto font-body text-[12px] text-foreground rounded-full px-5 py-2.5 transition-colors duration-200 hover:bg-foreground hover:text-background self-start"
                  style={{ border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  Ver próxima fecha →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInSection;
