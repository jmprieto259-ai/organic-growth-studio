const stats = [
  { value: '1.7', sup: 'M', desc: 'Seguidores construidos\nde forma 100% orgánica' },
  { value: '1.2', sup: 'M', desc: 'Votos conseguidos\nsin publicidad paga' },
  { value: '12', sup: '+', desc: 'Videos diarios publicados\nen campaña de alto impacto' },
  { value: '$0', sup: '', desc: 'Invertidos en publicidad\npara construir 1.7M' },
];

const StatsSection = () => (
  <section className="bg-primary px-[60px] py-[100px] relative overflow-hidden halftone-dots">
    <div className="relative z-[2] grid grid-cols-2 gap-x-20 gap-y-[70px]">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div
            className="font-display font-black text-background"
            style={{ fontSize: 'clamp(60px, 10vw, 140px)', lineHeight: 0.85, letterSpacing: '-0.04em' }}
          >
            {s.value}
            {s.sup && (
              <sup className="text-[0.38em] align-top" style={{ marginTop: '0.1em' }}>
                {s.sup}
              </sup>
            )}
          </div>
          <div
            className="font-body font-medium"
            style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.35 }}
          >
            {s.desc.split('\n').map((line, j) => (
              <span key={j}>
                {line}
                {j === 0 && <br />}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsSection;
