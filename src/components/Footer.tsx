import { useEffect, useRef, useState } from 'react';

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); observer.disconnect(); } },
      { rootMargin: '-40px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contacto" className="bg-background border-t border-foreground/10 px-5 md:px-[60px] pt-14 md:pt-20 pb-8 md:pb-10">
      <div
        ref={ref}
        className="flex flex-col gap-10 md:grid md:grid-cols-[1fr_1fr_1.4fr] md:gap-[60px] mb-10 md:mb-[60px]"
      >
        {/* Contact */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <h3 className="font-display font-black uppercase text-foreground mb-4 md:mb-[18px]" style={{ fontSize: 'clamp(18px, 5vw, 22px)', letterSpacing: '-0.02em' }}>
            Trabaja Conmigo
          </h3>
          <p className="font-body text-[11px] tracking-[0.12em] uppercase mb-[10px]" style={{ color: 'rgba(255,255,255,0.38)' }}>Contacto</p>
          <a href="mailto:jm.prieto259@gmail.com" className="block font-body text-[13px] no-underline leading-[1.80] transition-colors duration-200 hover:text-foreground break-all" style={{ color: 'rgba(255,255,255,0.38)' }}>jm.prieto259@gmail.com</a>
          <a href="https://instagram.com" className="block font-body text-[13px] no-underline leading-[1.80] mt-[6px] transition-colors duration-200 hover:text-foreground" style={{ color: 'rgba(255,255,255,0.38)' }}>Instagram</a>
          <a href="https://tiktok.com" className="block font-body text-[13px] no-underline leading-[1.80] transition-colors duration-200 hover:text-foreground" style={{ color: 'rgba(255,255,255,0.38)' }}>TikTok</a>
          <a href="https://linkedin.com" className="block font-body text-[13px] no-underline leading-[1.80] transition-colors duration-200 hover:text-foreground" style={{ color: 'rgba(255,255,255,0.38)' }}>LinkedIn</a>
        </div>

        {/* Services */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '150ms',
          }}
        >
          <h3 className="font-display font-black uppercase text-foreground mb-4 md:mb-[18px]" style={{ fontSize: 'clamp(18px, 5vw, 22px)', letterSpacing: '-0.02em' }}>
            Servicios
          </h3>
          <p className="font-body text-[13px] leading-[1.80]" style={{ color: 'rgba(255,255,255,0.38)' }}>Programa 1 a 1 — 90 días</p>
          <p className="font-body text-[13px] leading-[1.80]" style={{ color: 'rgba(255,255,255,0.38)' }}>Bootcamp Marca Personal LinkedIn</p>
          <p className="font-body text-[13px] leading-[1.80]" style={{ color: 'rgba(255,255,255,0.38)' }}>Asesoría para Founders</p>
          <p className="font-body text-[13px] leading-[1.80]" style={{ color: 'rgba(255,255,255,0.38)' }}>Dirección de Contenido</p>
        </div>

        {/* CTA */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '300ms',
          }}
        >
          <h3 className="font-display font-black uppercase text-foreground mb-4 md:mb-[18px]" style={{ fontSize: 'clamp(18px, 5vw, 22px)', letterSpacing: '-0.02em' }}>
            ¿Listo para crecer sin pagar publicidad?
          </h3>
          <p className="font-body text-[13px] leading-[1.80]" style={{ color: 'rgba(255,255,255,0.38)' }}>
            Tu historia es tu mayor activo. El contenido orgánico no se puede delegar a una agencia — tiene que salir de ti. Agendemos una llamada.
          </p>
          <a
            href="mailto:jm.prieto259@gmail.com"
            className="inline-flex items-center gap-[10px] bg-primary text-foreground font-body text-[14px] font-semibold px-6 md:px-7 py-[15px] rounded-full no-underline mt-5 cursor-pointer transition-opacity duration-[250ms] hover:opacity-[0.88]"
          >
            Agendar llamada →
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-between items-center pt-6 md:pt-7 border-t border-foreground/10">
        <span className="font-body text-[12px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
          © 2024 – 2025 Jose Prieto
        </span>
        <a href="https://linkedin.com" className="font-body text-[12px] no-underline transition-colors duration-200 hover:text-foreground/60" style={{ color: 'rgba(255,255,255,0.22)' }}>
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
