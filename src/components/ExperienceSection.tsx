import { useState } from "react";

const jobs = [
  {
    name: "Vaquero Influencer — Crecimiento Propio",
    role: "Creador de Contenido",
    date: "Colombia · 2020 – Presente",
    description:
      "Dejé la startup para vivir mi sueño: irme al llano a vivir como vaquero. Lo documenté en redes y construí, sin presupuesto y sin plan, una comunidad de 1.7 millones de seguidores en TikTok, Instagram, YouTube y Facebook.",
    bullets: [
      "Construí 1.7M de seguidores en 4 plataformas sin invertir en publicidad",
      "Descubrí los patrones del algoritmo desde dentro, como creador nativo",
      "Desarrollé el método de las 4P a partir de mi propia experiencia viral",
    ],
    defaultOpen: true,
  },
  {
    name: "Juan Daniel Oviedo — Dirección de Redes",
    role: "Director de Contenido",
    date: "Bogotá · Campaña Electoral",
    description:
      "Asumí la dirección de redes sociales de la campaña. Apostamos todo al contenido orgánico: 12 videos diarios, lenguaje simple, autenticidad total. Pasamos del 1% de intención de voto a 1.2 millones de votos reales.",
    bullets: [
      "12 videos diarios publicados en pico de campaña",
      "1% a 1.2M votos — 100% estrategia orgánica",
      "Narrativa política simplificada para audiencia masiva",
    ],
    defaultOpen: false,
  },
  {
    name: "Founders & Startups — Asesoría",
    role: "Asesor de Marca Personal & Growth",
    date: "Latam · 2022 – Presente",
    description:
      "Asesor de los líderes más influyentes del ecosistema tech y startups de alto crecimiento en Colombia y Latam. Ayudo a founders a construir su marca personal y a startups a lograr tracción orgánica real.",
    bullets: [
      "Andrés Bilbao (Rappi), Daniel Bilbao (Truora), Santiago Pineda (Mensajeros Urbanos)",
      "Giovanni Stella — Ex Country Manager de Google Colombia",
      "Trii: mayor número de descargas en la historia de la app — orgánico",
    ],
    defaultOpen: false,
  },
];

const ExperienceSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="experiencia" className="bg-off-white px-[60px] py-[100px]">
      <div className="mb-[60px]">
        <span className="block font-body text-[11px] font-semibold tracking-[0.18em] uppercase mb-[14px]" style={{ color: 'rgba(0,0,0,0.35)' }}>
          Mi Experiencia
        </span>
        <h2
          className="font-display font-black uppercase text-background"
          style={{ fontSize: 'clamp(24px, 4vw, 48px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
        >
          Resultados en todos<br />los frentes
        </h2>
      </div>

      <ul className="list-none">
        {jobs.map((job, idx) => (
          <li key={idx} className="border-b" style={{ borderColor: 'rgba(0,0,0,0.10)' }}>
            <div
              onClick={() => toggle(idx)}
              className="flex items-center justify-between py-[22px] cursor-pointer select-none"
            >
              <span
                className="font-body font-semibold"
                style={{ fontSize: 'clamp(17px, 2vw, 24px)', color: 'rgba(0,0,0,0.80)' }}
              >
                {job.name}
              </span>
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-[16px] flex-shrink-0 transition-all duration-[250ms]"
                style={{ border: '1px solid rgba(0,0,0,0.20)', color: 'rgba(0,0,0,0.40)' }}
              >
                {openIndex === idx ? '−' : '+'}
              </span>
            </div>
            <div className={openIndex === idx ? 'job-body-open' : 'job-body-closed'}>
              <div className="flex gap-3 items-center mb-4">
                <span
                  className="font-body text-[12px] font-medium px-[14px] py-[5px] rounded-full"
                  style={{ border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.55)' }}
                >
                  {job.role}
                </span>
                <span className="font-body text-[12px]" style={{ color: 'rgba(0,0,0,0.35)' }}>
                  {job.date}
                </span>
              </div>
              <p className="font-body text-[14px] leading-[1.70] mb-[14px]" style={{ color: 'rgba(0,0,0,0.55)' }}>
                {job.description}
              </p>
              <ul className="list-none flex flex-col gap-2">
                {job.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="font-body text-[13px] pl-[14px] leading-[1.5]"
                    style={{ color: 'rgba(0,0,0,0.50)', borderLeft: '2px solid rgba(232,43,0,0.4)' }}
                  >
                    {b}
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

export default ExperienceSection;
