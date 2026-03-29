import ScrollText from './ScrollText';

const StatementSection = () => {
  return (
    <section className="relative bg-background" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-5 md:px-[60px]">
        <p
          className="font-display font-black uppercase max-w-[1100px] mx-auto text-center"
          style={{
            fontSize: 'clamp(28px, 8vw, 80px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          <ScrollText
            text="De vivir como vaquero a asesorar a los top founders de Latam y conseguir 1.2 millones de votos."
            activeColor="hsl(var(--foreground))"
            useOpacity
            startAt={0.1}
            endAt={0.55}
          />
        </p>
      </div>
    </section>
  );
};

export default StatementSection;
