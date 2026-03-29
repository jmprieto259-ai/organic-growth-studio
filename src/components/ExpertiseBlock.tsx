import { useRef } from "react";
import ScrollText from "./ScrollText";

const SkillsList = ({ skills }: { skills: string[] }) => {
  if (skills.length === 0) return null;
  return (
    <ul className="list-none border-t border-foreground/10 pin-animate">
      {skills.map((skill, i) => (
        <li
          key={i}
          className="flex justify-between items-center py-3 md:py-[13px] border-b border-foreground/10 font-body text-[12px] md:text-[13px] tracking-[0.02em]"
        >
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{skill}</span>
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
  number: string;
  code: string;
  title: string;
  subtitle: string;
  h4Text: string;
  paragraph: string;
  skills: string[];
  hideTopGradient?: boolean;
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

const ExpertiseBlock = ({
  stickyBarLeft,
  stickyBarRight,
  bgWord,
  placeholder,
  image,
  imageOverlayText,
  number,
  code,
  title,
  subtitle,
  h4Text,
  paragraph,
  skills,
  hideTopGradient,
}: ExpertiseBlockProps) => {
  return (
    <div className="relative">
      {/* Red panel */}
      <div
        className="relative bg-primary h-[60vh] md:h-[75vh] min-h-[360px] md:min-h-[480px] overflow-hidden"
      >
        {!hideTopGradient && <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-[3]" />}
        
        {/* Sticky bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 md:px-[22px] py-3 md:py-[14px] border-b border-black/[0.12] pin-animate">
          <span className="font-body text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(0,0,0,0.45)' }}>
            {stickyBarLeft}
          </span>
          <span className="font-body text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(0,0,0,0.45)' }}>
            {stickyBarRight}
          </span>
        </div>

        {/* BG word */}
        <div
          className="absolute inset-0 flex items-center justify-center font-display font-black uppercase overflow-hidden whitespace-nowrap select-none pointer-events-none z-[1] pin-animate"
          style={{
            fontSize: 'clamp(70px, 20vw, 320px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'rgba(0,0,0,0.22)',
          }}
        >
          {bgWord}
        </div>

        {image ? (
          <>
            <div className="absolute inset-0 z-[2]">
              <img
                src={image}
                alt={bgWord}
                className="w-full h-[120%] object-cover object-[center_15%]"
                style={{ mixBlendMode: 'multiply', marginTop: '-10%' }}
              />
            </div>

            <div className="absolute bottom-5 left-5 md:bottom-[40px] md:left-[40px] z-[5] flex flex-col gap-0">
              {code && (
                <span className="block font-body text-[11px] md:text-[12px] font-semibold tracking-[0.04em] text-white/70 mb-[10px] pin-animate">
                  {code}
                </span>
              )}
              {imageOverlayText && imageOverlayText.split('\n').map((line, i) => (
                <div
                  key={i}
                  className="font-display font-black uppercase text-white pin-animate"
                  style={{
                    fontSize: 'clamp(28px, 10vw, 90px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            className="absolute inset-0 z-[2] flex items-center justify-center font-body text-[13px] tracking-[0.05em] pin-animate"
            style={{ color: 'rgba(0,0,0,0.35)' }}
          >
            {placeholder}
          </div>
        )}
      </div>

      {/* Black panel */}
      <div className="bg-background px-5 md:px-[60px] py-14 md:py-[100px] relative overflow-hidden">
        {number && (
          <div
            className="absolute outline-num font-display font-black select-none pointer-events-none"
            style={{
              bottom: '-40px',
              left: '-10px',
              fontSize: 'clamp(120px, 38vw, 520px)',
              lineHeight: 0.8,
              letterSpacing: '-0.06em',
            }}
          >
            {number}
          </div>
        )}

        <div className="relative z-[2] flex flex-col gap-10 md:grid md:grid-cols-[1fr_1.3fr] md:gap-20 md:items-start">
          {/* Left */}
          <div className="pin-animate">
            {code && (
              <span className="block font-body text-[12px] text-muted tracking-[0.04em] mb-3 md:mb-[18px]">
                {code}
              </span>
            )}
            <h3
              className="font-display font-black uppercase text-foreground mb-3 md:mb-[18px]"
              style={{ fontSize: 'clamp(36px, 12vw, 90px)', lineHeight: 0.88, letterSpacing: '-0.03em' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <span
              className="block font-display font-bold uppercase"
              style={{ fontSize: 'clamp(14px, 4vw, 26px)', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.22)' }}
            >
              {subtitle}
            </span>
          </div>

          {/* Right */}
          <div>
            <div className="pin-animate">
              <p
                className="font-display font-black uppercase mb-4 md:mb-[22px]"
                style={{ fontSize: 'clamp(18px, 5vw, 36px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.92)' }}
              >
                {h4Text}
              </p>
            </div>
            <div className="pin-animate">
              <p
                className="font-body mb-8 md:mb-10"
                style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)' }}
              >
                {stripHtml(paragraph)}
              </p>
            </div>
            <SkillsList skills={skills} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseBlock;
