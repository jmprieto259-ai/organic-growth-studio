import ScrollText from './ScrollText';

const StatementSection = () => {
  return (
    <section className="bg-background px-5 md:px-[60px] py-20 md:py-[180px] flex items-center justify-center min-h-[60vh]">
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
          inactiveColor="hsl(var(--muted-foreground))"
          startAt={0.15}
          endAt={0.7}
        />
      </p>
    </section>
  );
};

export default StatementSection;
