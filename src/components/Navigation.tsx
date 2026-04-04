const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-5 md:px-[44px] py-4 md:py-[22px]">
      <a href="#" className="flex flex-col gap-[3px] no-underline">
        <span className="block font-display font-black text-[11px] tracking-[0.12em] uppercase text-foreground leading-[1.1]">Jose</span>
        <span className="block font-display font-black text-[11px] tracking-[0.12em] uppercase text-foreground leading-[1.1]">Prieto</span>
        <span className="block font-display font-black text-[11px] tracking-[0.12em] uppercase text-foreground leading-[1.1]">——</span>
      </a>
      <div className="flex items-center gap-4 md:gap-5">
        <a
          href="https://www.linkedin.com/in/josemprieto1/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-block border border-foreground/[0.35] text-foreground font-body text-[12px] font-medium tracking-[0.03em] px-[22px] py-[10px] rounded-full no-underline transition-all duration-[250ms] hover:bg-foreground hover:text-background"
        >
          Trabaja Conmigo
        </a>
        <div className="flex flex-col gap-[5px] cursor-pointer p-1">
          <span className="block w-[22px] h-[1.5px] bg-foreground rounded-sm" />
          <span className="block w-[22px] h-[1.5px] bg-foreground rounded-sm" />
          <span className="block w-[22px] h-[1.5px] bg-foreground rounded-sm" />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
