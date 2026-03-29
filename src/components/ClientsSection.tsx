import { useState, useEffect, useRef, useCallback } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const animatedGroups = useRef<Set<number>>(new Set());

  // Watermark + subtitle entrance
  useEffect(() => {
    const section = sectionRef.current;
    const watermark = watermarkRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !watermark || !subtitle) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(watermark, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" });
    tl.fromTo(subtitle, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.8");

    return () => { tl.kill(); };
  }, []);

  // Animate client items when accordion group opens
  const animateItems = useCallback((groupIdx: number) => {
    if (animatedGroups.current.has(groupIdx)) return;
    animatedGroups.current.add(groupIdx);

    requestAnimationFrame(() => {
      const container = accordionRef.current;
      if (!container) return;
      const groupEl = container.querySelectorAll("[data-group]")[groupIdx];
      if (!groupEl) return;
      const items = groupEl.querySelectorAll("[data-client]");
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    });
  }, []);

  // Animate default-open group on scroll enter
  useEffect(() => {
    const container = accordionRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      once: true,
      onEnter: () => animateItems(0),
    });

    return () => { st.kill(); };
  }, [animateItems]);

  const toggle = (idx: number) => {
    const next = openIndex === idx ? -1 : idx;
    setOpenIndex(next);
    if (next >= 0) {
      animateItems(next);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-background relative overflow-hidden"
      style={{ padding: "clamp(80px, 15vh, 160px) 0" }}
    >
      {/* Giant CLIENTES watermark */}
      <div
        ref={watermarkRef}
        className="flex items-center justify-center pointer-events-none select-none mb-6 opacity-0"
      >
        <span
          className="font-display font-black uppercase whitespace-nowrap"
          style={{
            fontSize: "clamp(60px, 18vw, 320px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "hsl(var(--foreground))",
          }}
        >
          CLIENTES
        </span>
      </div>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="font-body text-center mx-auto mb-16 md:mb-24 px-5 opacity-0"
        style={{
          fontSize: "clamp(13px, 2.5vw, 16px)",
          color: "rgba(255,255,255,0.40)",
          maxWidth: "500px",
          lineHeight: 1.6,
        }}
      >
        Estas son algunas de las personas y empresas que han confiado en mí.
      </p>

      {/* Accordion */}
      <div ref={accordionRef} className="max-w-[700px] mx-auto px-5 md:px-[60px]">
        {accordionData.map((group, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              data-group
              className="border-t"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between py-5 md:py-6 cursor-pointer select-none"
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
                      data-client
                      className="py-3 md:py-3.5 border-b"
                      style={{ borderColor: "rgba(255,255,255,0.06)", opacity: 0 }}
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
        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }} />
      </div>
    </section>
  );
};

export default ClientsSection;
