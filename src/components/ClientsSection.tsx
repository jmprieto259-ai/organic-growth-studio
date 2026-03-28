import { useState, useEffect, useRef } from "react";
import ScrollText from "./ScrollText";

const accordionData = [
  {
    title: "Founders & Marca Personal",
    items: [
      "Andrés Bilbao — Cofundador de Rappi",
      "Santiago Pineda — CEO Mensajeros Urbanos",
      "Nicolás Quijano",
      "Giovanni Stella — Ex Country Manager Google",
      "Hugo Surek",
      "Juan Daniel Oviedo — Campaña Política",
    ],
    defaultOpen: true,
  },
  {
    title: "Startups Fintech",
    items: ["Trii", "Mejor CDT", "Cíclico", "TuEme"],
    defaultOpen: false,
  },
  {
    title: "Empresas Tradicionales",
    items: [
      "Grupo Takami",
      "Viajero Hostels",
      "Friogan (Frigorífico)",
      "Subasta de Ganado (millones de vistas)",
    ],
    defaultOpen: false,
  },
];

const ClientsSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '-80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section ref={sectionRef} className="bg-background px-[60px] py-[100px]">
      {/* Header */}
      <div className="grid grid-cols-2 gap-10 items-end mb-[60px]">
        <div>
          <span
            className="block font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-muted mb-[14px] transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Clientes y Marcas
          </span>
          <div
            className="font-display font-black uppercase mb-[14px] transition-all duration-700 ease-out"
            style={{
              fontSize: 'clamp(18px, 4.5vw, 28px)',
              letterSpacing: '0.05em',
              color: 'rgba(255,255,255,0.18)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '100ms',
            }}
          >
            클라이언트
          </div>
          <ScrollText
            text="Cualquier industria puede ser viral."
            className="font-display font-black uppercase block"
            style={{
              fontSize: 'clamp(24px, 4vw, 42px)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
            }}
            activeColor="rgba(255,255,255,0.92)"
            inactiveColor="rgba(255,255,255,0.08)"
            startAt={0.2}
            endAt={0.5}
          />
        </div>
        <div
          className="flex justify-end items-end transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '400ms',
          }}
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-[10px] border border-foreground/25 text-foreground font-body text-[13px] font-medium px-[22px] py-[13px] rounded-full no-underline transition-all duration-[250ms] hover:bg-foreground hover:text-background"
          >
            Trabaja conmigo
            <span className="w-[22px] h-[22px] border border-foreground/30 rounded-full flex items-center justify-center text-[11px]">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Accordion */}
      <ul className="list-none">
        {accordionData.map((item, idx) => (
          <li
            key={idx}
            className="border-b border-foreground/10 transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: `${500 + idx * 120}ms`,
            }}
          >
            <div
              onClick={() => toggle(idx)}
              className="flex items-center gap-4 py-5 cursor-pointer font-body font-medium select-none"
              style={{ fontSize: 'clamp(15px, 1.6vw, 20px)', color: 'rgba(255,255,255,0.75)' }}
            >
              <span className="w-[26px] h-[26px] border border-foreground/25 rounded-full flex items-center justify-center text-[15px] flex-shrink-0 transition-all duration-[250ms]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {openIndex === idx ? '−' : '+'}
              </span>
              {item.title}
            </div>
            <div className={openIndex === idx ? 'acc-body-open' : 'acc-body-closed'}>
              <ul className="list-none flex flex-col gap-2">
                {item.items.map((name, i) => (
                  <li
                    key={i}
                    className="font-body text-[14px] pl-[10px] border-l border-foreground/[0.08]"
                    style={{ color: 'rgba(255,255,255,0.40)' }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ClientsSection;
