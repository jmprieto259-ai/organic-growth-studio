import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const accordionData = [
  {
    title: "Founders & Marca Personal",
    items: [
      { name: "Andrés Bilbao", role: "Cofundador de Rappi" },
      { name: "Juan Daniel Oviedo", role: "Candidato Presidencial" },
      { name: "Santiago Pinzón", role: "Mensajeros Urbanos" },
      { name: "Giovanni Stella", role: "Ex Country Director en Google" },
      { name: "Nicolás Quijano", role: "Founder Sueños" },
      { name: "Antoine Crettex", role: "Founder Dermaly" },
      { name: "Dylan Rosenberg", role: "Cofundador de 30X" },
    ],
    defaultOpen: true,
  },
  {
    title: "Empresas",
    items: [
      { name: "Ciclico", role: "" },
      { name: "Truora", role: "" },
      { name: "Redi Food", role: "" },
      { name: "Trii", role: "" },
      { name: "Mejor CDT", role: "" },
      { name: "30X", role: "" },
      { name: "Next Gen", role: "" },
      { name: "Friogan", role: "" },
      { name: "Takami", role: "" },
      { name: "Subacasanare", role: "" },
      { name: "El Viajero Hostels", role: "" },
    ],
    defaultOpen: false,
  },
];

const ClientsSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-anim]");
    gsap.fromTo(
      children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-background px-5 md:px-[60px] py-20 md:py-[120px]"
    >
      <div ref={contentRef} className="max-w-[900px]">
        {/* Eyebrow */}
        <p
          data-anim
          className="font-body uppercase tracking-[0.2em] mb-6"
          style={{
            fontSize: "clamp(10px, 2vw, 13px)",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Clientes
        </p>

        {/* Title */}
        <h2
          data-anim
          className="font-display font-black mb-16 md:mb-20"
          style={{
            fontSize: "clamp(24px, 5vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "hsl(var(--foreground))",
          }}
        >
          No vine a ser influencer. Vine a dar influencia. Desde el 2023 ayudo a
          personas y empresas a crecer en redes sociales.
        </h2>

        {/* Accordion */}
        <div data-anim>
          {accordionData.map((group, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-t"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                {/* Header */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between py-5 md:py-6 cursor-pointer select-none group"
                >
                  <span
                    className="font-display font-bold text-left"
                    style={{
                      fontSize: "clamp(18px, 4vw, 28px)",
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    {group.title}
                  </span>
                  <span
                    className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] flex items-center justify-center text-[18px] md:text-[20px] flex-shrink-0 transition-transform duration-[400ms] ease-out"
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Content */}
                <div
                  className="overflow-hidden transition-all duration-[400ms] ease-out"
                  style={{
                    maxHeight: isOpen ? "1000px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="pb-6 md:pb-8">
                    {group.items.map((item, i) => (
                      <div
                        key={i}
                        className="py-3 md:py-3.5 border-b"
                        style={{ borderColor: "rgba(255,255,255,0.06)" }}
                      >
                        <span
                          className="font-body"
                          style={{
                            fontSize: "clamp(14px, 3vw, 17px)",
                            color: "hsl(var(--foreground))",
                          }}
                        >
                          {item.name}
                        </span>
                        {item.role && (
                          <span
                            className="font-body ml-2"
                            style={{
                              fontSize: "clamp(12px, 2.5vw, 14px)",
                              color: "rgba(255,255,255,0.35)",
                            }}
                          >
                            — {item.role}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          {/* Bottom border */}
          <div
            className="border-t"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
