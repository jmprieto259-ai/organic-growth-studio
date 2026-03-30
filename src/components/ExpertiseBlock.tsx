import { useEffect, useRef, useState } from "react";
import ScrollText from "./ScrollText";

const SkillsList = ({ skills }: { skills: string[] }) => {
  if (skills.length === 0) return null;
  return (
    <ul className="list-none border-t border-foreground/10">
      {skills.map((skill, i) => (
        <li
          key={i}
          className="flex justify-between items-center py-3 md:py-[13px] border-b border-foreground/10 font-body text-[12px] md:text-[13px] tracking-[0.02em]"
        >
          <ScrollText
            text={skill}
            activeColor="rgba(255,255,255,0.55)"
            inactiveColor="rgba(255,255,255,0.06)"
            startAt={0.64 + i * 0.04}
            endAt={0.68 + i * 0.04}
          />
          <span className="text-[10px] md:text-[11px] flex-shrink-0 ml-3" style={{ color: 'rgba(255,255,255,0.18)' }}>
            {String(i + 1).padStart(2, '0')}
          </span>
        </li>
      ))}
    </ul>
  );
};

interface ExpertiseBlockProps {
  stickyBarLeft: string;
  stickyBarRight: string;
  bgWord: string;
  placeholder: string;
  image?: string;
  imageOverlayText?: string;
  imagePosition?: string;
  number: string;
  code: string;
  title: string;
  subtitle: string;
  subtitleColor?: string;
  h4Text: string;
  paragraph: string;
  skills: string[];
  hideTopGradient?: boolean;
  panelClassName?: string;
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

const ExpertiseBlock = ({
  stickyBarLeft,
  stickyBarRight,
  bgWord,
  placeholder,
  image,
  imageOverlayText,
  imagePosition,
  subtitleColor,
  number,
  code,
  title,
  subtitle,
  h4Text,
  paragraph,
  skills,
  hideTopGradient,
  panelClassName,
}: ExpertiseBlockProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [blackVis, setBlackVis] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (panelRef.current) {
        const rect = panelRef.current.getBoundingClientRect();
        const wh = window.innerHeight;
        if (rect.bottom > 0 && rect.top < wh) {
          const progress = (wh - rect.top) / (wh + rect.height);
          setOffset((progress - 0.5) * 80);
          setVisibility(Math.min(1, Math.max(0, (wh - rect.top) / (wh * 0.4))));
        }
      }
      if (blackRef.current) {
        const rect = blackRef.current.getBoundingClientRect();
        const wh = window.innerHeight;
        const raw = (wh - rect.top) / (wh + rect.height);
        setBlackVis(Math.min(1, Math.max(0, raw)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blurAmount = Math.max(0, 20 * (1 - visibility));
  const textReady = visibility > 0.6;
  const leftReady = blackVis > 0.2;
  const bgWordShift = (blackVis - 0.5) * 60;

  return (
    <div className="relative">
      {/* Red panel */}
      <div
        ref={panelRef}
        className={panelClassName || "relative bg-primary h-[60vh] md:h-[75vh] min-h-[360px] md:min-h-[480px] overflow-hidden"}
      >
        {/* Top gradient fade from black */}
        {!hideTopGradient && <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[3]" />}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 md:px-[22px] py-3 md:py-[14px] border-b border-black/[0.12]">
          <span className="font-body text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(0,0,0,0.45)' }}>
            {stickyBarLeft}
          </span>
          <span className="font-body text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(0,0,0,0.45)' }}>
            {stickyBarRight}
          </span>
        </div>

        {/* BG word */}
        <div
          className="absolute inset-0 flex items-center justify-center font-display font-black uppercase overflow-hidden whitespace-nowrap select-none pointer-events-none z-[1]"
          style={{
            fontSize: 'clamp(70px, 20vw, 320px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'rgba(0,0,0,0.22)',
            transform: `translateY(${offset * 0.5}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {bgWord}
        </div>

        {image ? (
          <>
            <div
              className="absolute inset-0 z-[2]"
              style={{
                transform: `translateY(${offset}px) scale(${1 + visibility * 0.05})`,
                willChange: 'transform, filter',
                filter: `blur(${blurAmount}px)`,
                transition: 'filter 0.3s ease-out',
              }}
            >
              <img
                src={image}
                alt={bgWord}
                className="w-full h-[120%] object-cover"
                style={{ mixBlendMode: 'multiply', marginTop: '-10%', objectPosition: imagePosition || 'center 15%' }}
              />
            </div>

            <div className="absolute top-12 left-5 md:top-[60px] md:left-[40px] z-[5] flex flex-col gap-0">
              <span
                className={`block font-body text-[11px] md:text-[12px] font-semibold tracking-[0.04em] text-white/70 mb-[10px] transition-all duration-700 ease-out ${
                  textReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {code}
              </span>
              {imageOverlayText && imageOverlayText.split('\n').map((line, i) => (
                <div
                  key={i}
                  className={`font-display font-black uppercase text-white transition-all ease-out ${
                    textReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    fontSize: 'clamp(28px, 10vw, 90px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    transitionDuration: `${800 + i * 200}ms`,
                    transitionDelay: `${i * 180}ms`,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            className="absolute inset-0 z-[2] flex items-center justify-center font-body text-[13px] tracking-[0.05em]"
            style={{ color: 'rgba(0,0,0,0.35)' }}
          >
            {placeholder}
          </div>
        )}
      </div>

      {/* Black panel */}
      <div ref={blackRef} className="bg-background px-5 md:px-[60px] py-14 md:py-[100px] relative overflow-hidden">
        {/* Outline number */}
        <div
          className="absolute outline-num font-display font-black select-none pointer-events-none"
          style={{
            bottom: '-40px',
            left: '-10px',
            fontSize: 'clamp(120px, 38vw, 520px)',
            lineHeight: 0.8,
            letterSpacing: '-0.06em',
            transform: `translateY(${bgWordShift}px)`,
            transition: 'transform 0.15s linear',
          }}
        >
          {number}
        </div>

        {/* Inner grid — single column on mobile */}
        <div className="relative z-[2] flex flex-col gap-10 md:grid md:grid-cols-[1fr_1.3fr] md:gap-20 md:items-start">
          {/* Left */}
          <div
            className="transition-all duration-[900ms] ease-out"
            style={{
              opacity: leftReady ? 1 : 0,
              transform: leftReady ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <span className="block font-body text-[12px] text-muted tracking-[0.04em] mb-3 md:mb-[18px]">
              {code}
            </span>
            <h3
              className="font-display font-black uppercase text-foreground mb-3 md:mb-[18px]"
              style={{ fontSize: 'clamp(36px, 12vw, 90px)', lineHeight: 0.88, letterSpacing: '-0.03em' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <span
              className="block font-display font-bold uppercase"
              style={{ fontSize: 'clamp(14px, 4vw, 26px)', letterSpacing: '0.05em', color: subtitleColor || 'rgba(255,255,255,0.22)' }}
            >
              {subtitle}
            </span>
          </div>

          {/* Right */}
          <div>
            <ScrollText
              text={h4Text}
              className="font-display font-black uppercase block mb-4 md:mb-[22px]"
              style={{ fontSize: 'clamp(18px, 5vw, 36px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              activeColor="rgba(255,255,255,0.92)"
              inactiveColor="rgba(255,255,255,0.08)"
              startAt={0.12}
              endAt={0.30}
            />
            <ScrollText
              text={stripHtml(paragraph)}
              className="font-body block"
              style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.75, maxWidth: '65ch' }}
              activeColor="rgba(255,255,255,0.55)"
              inactiveColor="rgba(255,255,255,0.06)"
              startAt={0.30}
              endAt={0.62}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseBlock;
