import { useEffect, useRef, useState } from 'react';
import ScrollText from './ScrollText';

const aboutTexts = [
  'Desde que era niño tuve claro que el camino corporativo no era para mí. Trabajé como líder de tecnología en una startup — aprendí todo lo que pude — y un día le dije adiós a la oficina para irme al llano a vivir descalzo como vaquero.',
  'Lo que vino después nadie lo planeó: empecé a documentar esa vida en redes sociales y sin gastar un peso en publicidad construí una comunidad de 1.7 millones de seguidores. Ahí entendí algo que cambió todo: el algoritmo no premia los presupuestos, premia las historias reales.',
  'Ese conocimiento lo validé en el escenario más exigente posible: una campaña política. Tomé las redes de Juan Daniel Oviedo, apostamos todo al orgánico, y pasamos del 1% a 1.2 millones de votos reales.',
  'Hoy asesoro a los founders más grandes del ecosistema tech de Latam y ayudo a empresas de cualquier industria — desde frigoríficos hasta startups que buscan ser unicornio — a entender que su historia es su mayor activo.',
];

const AboutSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVis, setTitleVis] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTitleVis(true); observer.disconnect(); } },
      { rootMargin: '-80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre-mi" className="bg-background px-5 md:px-[60px] py-14 md:py-[100px] flex flex-col gap-10 md:grid md:grid-cols-[1fr_1.6fr] md:gap-20 md:items-start">
      <div ref={titleRef}>
        <h2
          className="font-display font-black uppercase text-foreground transition-all duration-[1000ms] ease-out"
          style={{
            fontSize: 'clamp(30px, 10vw, 60px)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            opacity: titleVis ? 1 : 0,
            transform: titleVis ? 'translateY(0)' : 'translateY(25px)',
          }}
        >
          Estratega<br />Orgánico
        </h2>
      </div>
      <div>
        {aboutTexts.map((text, i) => (
          <ScrollText
            key={i}
            text={text}
            className="font-body block mb-5 md:mb-[22px]"
            style={{
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              lineHeight: 1.78,
            }}
            activeColor="rgba(255,255,255,0.55)"
            inactiveColor="rgba(255,255,255,0.06)"
            startAt={0.1 + i * 0.12}
            endAt={0.3 + i * 0.12}
          />
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
