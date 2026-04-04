const Footer = () => {
  return (
    <footer id="contacto" className="bg-background border-t border-foreground/10 px-5 md:px-[60px] pt-14 md:pt-20 pb-8 md:pb-10">
      {/* CTA */}
      <div className="max-w-[900px] mx-auto flex justify-center mb-10 md:mb-[60px]">
        <a
          href="https://www.linkedin.com/in/josemprieto1/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[10px] bg-primary text-foreground font-body text-[14px] font-semibold px-6 md:px-7 py-[15px] rounded-full no-underline cursor-pointer transition-opacity duration-[250ms] hover:opacity-[0.88]"
        >
          Contactar a Jose →
        </a>
      </div>

      {/* Bottom */}
      <div className="max-w-[900px] mx-auto flex justify-between items-center pt-6 md:pt-7 border-t border-foreground/10">
        <span className="font-body text-[12px]" style={{ color: 'rgba(255,255,255,0.22)' }}>
          © 2026 Jose Prieto
        </span>
        <a href="https://www.linkedin.com/in/joseprieto" target="_blank" rel="noopener noreferrer" className="font-body text-[12px] no-underline transition-colors duration-200 hover:text-foreground/60" style={{ color: 'rgba(255,255,255,0.22)' }}>
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
