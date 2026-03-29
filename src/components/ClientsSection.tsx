import { useState, useEffect, useRef } from "react";

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
    <section ref={sectionRef} className="bg-background px-5 md:px-[60px] py-14 md:py-[100px]">

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
              className="flex items-center gap-3 md:gap-4 py-4 md:py-5 cursor-pointer font-body font-medium select-none"
              style={{ fontSize: 'clamp(14px, 4vw, 20px)', color: 'rgba(255,255,255,0.75)' }}
            >
              <span className="w-[24px] h-[24px] md:w-[26px] md:h-[26px] border border-foreground/25 rounded-full flex items-center justify-center text-[14px] md:text-[15px] flex-shrink-0 transition-all duration-[250ms]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {openIndex === idx ? '−' : '+'}
              </span>
              {item.title}
            </div>
            <div className={openIndex === idx ? 'acc-body-open' : 'acc-body-closed'}>
              <ul className="list-none flex flex-col gap-2">
                {item.items.map((name, i) => (
                  <li
                    key={i}
                    className="font-body text-[13px] md:text-[14px] pl-[10px] border-l border-foreground/[0.08]"
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
