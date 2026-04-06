import { useRef, useState, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MENU_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Caso Oviedo', href: '#caso-oviedo' },
  { label: 'Caso Bilbao', href: '#caso-bilbao' },
  { label: 'Mi Historia', href: '#mi-historia' },
  { label: 'LinkedIn', href: '#linkedin-section' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contacto', href: 'https://www.linkedin.com/in/josemprieto1/', external: true },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const isAnimating = useRef(false);

  // Run open animation after showMenu causes the menu DOM to render
  useEffect(() => {
    if (!showMenu) return;
    const circle = circleRef.current;
    const menu = menuRef.current;
    if (!circle || !menu) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxDist = Math.sqrt(vw * vw + vh * vh) * 2;

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    tl.set(circle, {
      display: 'block',
      width: maxDist,
      height: maxDist,
      borderRadius: '50%',
      scale: 0,
      xPercent: 50,
      yPercent: -50,
    });
    tl.to(circle, {
      scale: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    });

    const items = menu.querySelectorAll('[data-menu-item]');
    tl.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      '-=0.15'
    );
  }, [showMenu]);

  const open = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsOpen(true);
    setShowMenu(true);
  }, []);

  const close = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const circle = circleRef.current;
    const menu = menuRef.current;
    if (!circle || !menu) {
      setIsOpen(false);
      setShowMenu(false);
      isAnimating.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        setShowMenu(false);
        isAnimating.current = false;
        gsap.set(circle, { display: 'none' });
      },
    });

    const items = menu.querySelectorAll('[data-menu-item]');
    tl.to(items, { opacity: 0, duration: 0.2, ease: 'power2.in' });
    tl.to(circle, {
      scale: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    }, '-=0.1');
  }, []);

  const handleItemClick = useCallback((item: typeof MENU_ITEMS[0], e: React.MouseEvent<HTMLButtonElement>) => {
    // Mobile tap flash
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) {
      const btn = e.currentTarget;
      gsap.to(btn, { color: '#E03200', duration: 0.15, onComplete: () => {
        gsap.to(btn, { color: '#ffffff', duration: 0.15 });
      }});
    }

    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      close();
      return;
    }

    close();
    setTimeout(() => {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => ScrollTrigger.refresh(), 600);
      }
    }, 650);
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
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

          {/* Hamburger / X toggle */}
          <button
            ref={hamburgerRef}
            onClick={() => (isOpen ? close() : open())}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="relative flex flex-col justify-center items-center w-[28px] h-[28px] cursor-pointer p-1 z-[1002] bg-transparent border-none outline-none"
          >
            <span
              className="block w-[22px] h-[1.5px] bg-foreground rounded-sm transition-all duration-300 origin-center"
              style={{
                transform: isOpen ? 'translateY(3.25px) rotate(45deg)' : 'translateY(0) rotate(0)',
              }}
            />
            <span
              className="block w-[22px] h-[1.5px] bg-foreground rounded-sm transition-all duration-300"
              style={{
                opacity: isOpen ? 0 : 1,
                marginTop: '5px',
              }}
            />
            <span
              className="block w-[22px] h-[1.5px] bg-foreground rounded-sm transition-all duration-300 origin-center"
              style={{
                transform: isOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'translateY(0) rotate(0)',
                marginTop: isOpen ? '0' : '5px',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Radial circle overlay */}
      <div
        ref={circleRef}
        className="fixed z-[999] bg-black"
        style={{
          display: 'none',
          top: 0,
          right: 0,
          transformOrigin: 'top right',
          pointerEvents: 'none',
        }}
      />

      {/* Menu overlay */}
      {showMenu && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[1001] flex flex-col items-center justify-center"
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Cerrar menú"
            className="absolute top-4 right-5 md:top-[22px] md:right-[44px] z-[1003] flex items-center justify-center w-[28px] h-[28px] bg-transparent border-none outline-none cursor-pointer"
          >
            <span className="block w-[22px] h-[1.5px] bg-foreground rounded-sm origin-center" style={{ transform: 'translateY(0.75px) rotate(45deg)', position: 'absolute' }} />
            <span className="block w-[22px] h-[1.5px] bg-foreground rounded-sm origin-center" style={{ transform: 'translateY(0.75px) rotate(-45deg)', position: 'absolute' }} />
          </button>

          <div className="flex flex-col items-center gap-6 md:gap-8">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.label}
                data-menu-item
                onClick={(e) => handleItemClick(item, e)}
                className="group relative font-display font-black uppercase text-foreground text-[clamp(28px,7vw,56px)] leading-[1.1] tracking-[-0.02em] cursor-pointer bg-transparent border-none outline-none"
                style={{ opacity: 0, paddingLeft: '16px', transition: 'transform 0.2s ease' }}
                onMouseEnter={(e) => {
                  if (window.matchMedia('(hover: hover)').matches) {
                    gsap.to(e.currentTarget, { x: 8, duration: 0.2, ease: 'power2.out' });
                    const line = e.currentTarget.querySelector('[data-hover-line]') as HTMLElement;
                    if (line) gsap.to(line, { scaleY: 1, opacity: 1, duration: 0.2, ease: 'power2.out' });
                  }
                }}
                onMouseLeave={(e) => {
                  if (window.matchMedia('(hover: hover)').matches) {
                    gsap.to(e.currentTarget, { x: 0, duration: 0.2, ease: 'power2.out' });
                    const line = e.currentTarget.querySelector('[data-hover-line]') as HTMLElement;
                    if (line) gsap.to(line, { scaleY: 0, opacity: 0, duration: 0.2, ease: 'power2.out' });
                  }
                }}
              >
                <span
                  data-hover-line
                  className="absolute left-0 top-0 h-full"
                  style={{ width: '2px', background: '#E03200', transformOrigin: 'center', transform: 'scaleY(0)', opacity: 0 }}
                />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
