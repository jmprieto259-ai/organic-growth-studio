import { useState } from "react";

const filters = ["Todos", "Política", "Startups", "Founders", "Empresas"];

const workItems = [
  "Caso Oviedo — 1.2M Votos",
  "Trii — Récord de Descargas",
  "Andrés Bilbao (Rappi)",
  "Friogan — Viral Inesperado",
  "De Vaquero a 1.7M Seguidores",
  "Giovanni Stella (Ex Google)",
];

const WorkSection = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  return (
    <section id="casos" className="bg-background px-[60px] pt-[110px] pb-[100px]">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1.1fr] gap-10 mb-20">
        <div>
          <span className="block font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-muted mb-[14px]">
            Casos Destacados
          </span>
          <span
            className="font-display font-black uppercase tracking-[0.05em]"
            style={{ fontSize: 'clamp(20px, 5vw, 30px)', color: 'rgba(255,255,255,0.20)' }}
          >
            실績
          </span>
        </div>
        <h2
          className="font-display font-black uppercase text-foreground self-end"
          style={{ fontSize: 'clamp(22px, 4.5vw, 44px)', lineHeight: '1.0', letterSpacing: '-0.025em' }}
        >
          Resultados que hablan<br />por sí solos
        </h2>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`font-body text-[12px] font-medium tracking-[0.04em] px-[18px] py-2 rounded-full bg-transparent cursor-pointer transition-all duration-[250ms] border ${
              activeFilter === f
                ? "border-foreground text-foreground"
                : "border-foreground/10 text-foreground/50 hover:border-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Work list */}
      <ul className="list-none border-t border-foreground/10">
        {workItems.map((name) => (
          <li
            key={name}
            className="flex items-center justify-between py-[26px] border-b border-foreground/10 no-underline cursor-pointer transition-[padding-left] duration-300 ease-in-out hover:pl-[10px] group"
          >
            <span
              className="font-display font-bold transition-colors duration-300 group-hover:text-foreground"
              style={{
                fontSize: 'clamp(26px, 3.8vw, 56px)',
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              {name}
            </span>
            <span className="w-9 h-9 border border-foreground/20 rounded-full flex items-center justify-center text-[15px] text-foreground/40 flex-shrink-0 transition-all duration-300 rotate-45 group-hover:bg-foreground group-hover:text-background group-hover:rotate-0">
              ↗
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WorkSection;
