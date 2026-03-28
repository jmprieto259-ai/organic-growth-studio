const AboutSection = () => (
  <section id="sobre-mi" className="bg-background px-[60px] py-[100px] grid grid-cols-[1fr_1.6fr] gap-20 items-start">
    <div>
      <h2
        className="font-display font-black uppercase text-foreground"
        style={{ fontSize: 'clamp(30px, 4.5vw, 60px)', lineHeight: 0.92, letterSpacing: '-0.03em' }}
      >
        Estratega<br />Orgánico
      </h2>
    </div>
    <div>
      <p className="font-body mb-[22px]" style={{ fontSize: 'clamp(14px, 1.15vw, 16px)', lineHeight: 1.78, color: 'rgba(255,255,255,0.50)' }}>
        Desde que era niño tuve claro que el camino corporativo no era para mí. Trabajé como líder de tecnología en una startup — aprendí todo lo que pude — y un día le dije adiós a la oficina para irme al llano a <strong className="text-foreground font-semibold">vivir descalzo como vaquero.</strong>
      </p>
      <p className="font-body mb-[22px]" style={{ fontSize: 'clamp(14px, 1.15vw, 16px)', lineHeight: 1.78, color: 'rgba(255,255,255,0.50)' }}>
        Lo que vino después nadie lo planeó: empecé a documentar esa vida en redes sociales y sin gastar un peso en publicidad construí <em className="not-italic text-primary font-semibold">una comunidad de 1.7 millones de seguidores.</em> Ahí entendí algo que cambió todo: <strong className="text-foreground font-semibold">el algoritmo no premia los presupuestos, premia las historias reales.</strong>
      </p>
      <p className="font-body mb-[22px]" style={{ fontSize: 'clamp(14px, 1.15vw, 16px)', lineHeight: 1.78, color: 'rgba(255,255,255,0.50)' }}>
        Ese conocimiento lo validé en el escenario más exigente posible: una campaña política. Tomé las redes de Juan Daniel Oviedo, apostamos todo al orgánico, y pasamos del 1% a <strong className="text-foreground font-semibold">1.2 millones de votos reales.</strong>
      </p>
      <p className="font-body" style={{ fontSize: 'clamp(14px, 1.15vw, 16px)', lineHeight: 1.78, color: 'rgba(255,255,255,0.50)' }}>
        Hoy asesoro a los founders más grandes del ecosistema tech de Latam y ayudo a empresas de cualquier industria — desde frigoríficos hasta startups que buscan ser unicornio — a entender que <em className="not-italic text-primary font-semibold">su historia es su mayor activo.</em>
      </p>
    </div>
  </section>
);

export default AboutSection;
