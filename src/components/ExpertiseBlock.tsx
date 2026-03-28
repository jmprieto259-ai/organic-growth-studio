import { useEffect, useRef, useState } from "react";

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
}

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
}: ExpertiseBlockProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [visibility, setVisibility] = useState(0); // 0 to 1 progress

  useEffect(() => {
    const handleScroll = () => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowH) {
        // Parallax offset
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setOffset((progress - 0.5) * 80);
        // Visibility progress: 0 when just entering, 1 when ~40% visible
        const visProgress = Math.min(1, Math.max(0, (windowH - rect.top) / (windowH * 0.4)));
        setVisibility(visProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Blur goes from 20px to 0 as visibility goes 0→1
  const blurAmount = Math.max(0, 20 * (1 - visibility));
  const textReady = visibility > 0.6;

  return (
    <div className="relative">
      {/* Red panel */}
      <div
        ref={panelRef}
        className="relative bg-primary h-[75vh] min-h-[480px] overflow-hidden"
      >
        {/* Sticky bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-[22px] py-[14px] border-b border-black/[0.12]">
          <span className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(0,0,0,0.45)' }}>
            {stickyBarLeft}
          </span>
          <span className="font-body text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(0,0,0,0.45)' }}>
            {stickyBarRight}
          </span>
        </div>

        {/* BG word */}
        <div
          className="absolute inset-0 flex items-center justify-center font-display font-black uppercase overflow-hidden whitespace-nowrap select-none pointer-events-none z-[1]"
          style={{
            fontSize: 'clamp(100px, 20vw, 320px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'rgba(0,0,0,0.22)',
          }}
        >
          {bgWord}
        </div>

        {/* Image or placeholder */}
        {image ? (
          <>
            {/* Full-cover image with multiply blend, parallax, and blur-to-sharp */}
            <div
              className="absolute inset-0 z-[2]"
              style={{
                transform: `translateY(${offset}px)`,
                willChange: 'transform, filter',
                filter: `blur(${blurAmount}px)`,
                transition: 'filter 0.3s ease-out',
              }}
            >
              <img
                src={image}
                alt={bgWord}
                className="w-full h-[120%] object-cover"
                style={{
                  mixBlendMode: 'multiply',
                  marginTop: '-10%',
                }}
              />
            </div>

            {/* Bottom-left overlay: number + text (like reference) */}
            <div
              className="absolute bottom-[40px] left-[40px] z-[5] flex flex-col gap-0"
            >
              {/* Section code */}
              <span
                className={`block font-body text-[12px] font-semibold tracking-[0.04em] text-white/70 mb-[10px] transition-all duration-700 ease-out ${
                  textReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {code}
              </span>
              {/* Overlay text lines */}
              {imageOverlayText && imageOverlayText.split('\n').map((line, i) => (
                <div
                  key={i}
                  className={`font-display font-black uppercase text-white transition-all ease-out ${
                    textReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{
                    fontSize: 'clamp(32px, 6vw, 90px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    transitionDuration: `${800 + i * 200}ms`,
                    transitionDelay: `${i * 120}ms`,
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
      <div className="bg-background px-[60px] py-[100px] relative overflow-hidden">
        {/* Outline number */}
        <div
          className="absolute outline-num font-display font-black select-none pointer-events-none"
          style={{
            bottom: '-80px',
            left: '-10px',
            fontSize: 'clamp(200px, 38vw, 520px)',
            lineHeight: 0.8,
            letterSpacing: '-0.06em',
          }}
        >
          {number}
        </div>

        {/* Inner grid */}
        <div className="relative z-[2] grid grid-cols-[1fr_1.3fr] gap-20 items-start">
          {/* Left */}
          <div>
            <span className="block font-body text-[12px] text-muted tracking-[0.04em] mb-[18px]">
              {code}
            </span>
            <h3
              className="font-display font-black uppercase text-foreground mb-[18px]"
              style={{ fontSize: 'clamp(36px, 7vw, 90px)', lineHeight: 0.88, letterSpacing: '-0.03em' }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <span
              className="block font-display font-bold uppercase"
              style={{ fontSize: 'clamp(16px, 3vw, 26px)', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.22)' }}
            >
              {subtitle}
            </span>
          </div>

          {/* Right */}
          <div>
            <h4
              className="font-display font-black uppercase text-foreground mb-[22px]"
              style={{ fontSize: 'clamp(18px, 2.8vw, 36px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              {h4Text}
            </h4>
            <p
              className="font-body mb-10"
              style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.75, color: 'rgba(255,255,255,0.50)' }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
            <ul className="list-none border-t border-foreground/10">
              {skills.map((skill, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center py-[13px] border-b border-foreground/10 font-body text-[13px] tracking-[0.02em]"
                  style={{ color: 'rgba(255,255,255,0.50)' }}
                >
                  {skill}
                  <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseBlock;
