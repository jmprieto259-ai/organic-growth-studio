const Footer = () => {
  return (
    <footer id="contacto" className="bg-background border-t border-foreground/10 px-5 md:px-[60px] pt-14 md:pt-20 pb-8 md:pb-10">
      <div className="max-w-[900px] mx-auto flex flex-col gap-10 md:grid md:grid-cols-[1fr_1fr_1.4fr] md:gap-[60px] mb-10 md:mb-[60px]">
        {/* Contact */}
        <div>
          <h3 className="font-display font-black uppercase text-foreground mb-4 md:mb-[18px]" style={{ fontSize: 'clamp(18px, 5vw, 22px)', letterSpacing: '-0.02em' }}>
            Trabaja Conmigo
          </h3>
          <p className="font-body text-[11px] tracking-[0.12em] uppercase mb-[10px]" style={{ color: 'rgba(255,255,255,0.38)' }}>Contacto</p>
          <a href="https://www.linkedin.com/in/joseprieto" target="_blank" rel="noopener noreferrer" className="block font-body text-[13px] no-underline leading-[1.80] transition-colors duration-200 hover:text-foreground" style={{ color: 'rgba(255,255,255,0.38)' }}>LinkedIn</a>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-display font-black uppercase text-foreground mb-4 md:mb-[18px]" style={{ fontSize: 'clamp(18px, 5vw, 22px)', letterSpacing: '-0.02em' }}>
            Servicios
          </h3>
          <p className="font-body text-[13px] leading-[1.80]" style={{ color: 'rgba(255,255,255,0.38)' }}>Asesoría de TikTok e Instagram</p>
          <p className="font-body text-[13px] leading-[1.80]" style={{ color: 'rgba(255,255,255,0.38)' }}>Asesoría Marca Personal LinkedIn 1 a 1</p>
          <p className="font-body text-[13px] leading-[1.80]" style={{ color: 'rgba(255,255,255,0.38)' }}>Bootcamp Marca Personal en LinkedIn</p>
        </div>

        {/* CTA */}
        <div>
          <a
            href="https://www.linkedin.com/in/joseprieto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[10px] bg-primary text-foreground font-body text-[14px] font-semibold px-6 md:px-7 py-[15px] rounded-full no-underline mt-5 cursor-pointer transition-opacity duration-[250ms] hover:opacity-[0.88]"
          >
            Contactar a Jose →
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[900px] mx-auto flex justify-between items-center pt-6 md:pt-7 border-t border-foreground/10">
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
