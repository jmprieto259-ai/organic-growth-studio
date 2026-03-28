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
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Only calculate when panel is near or in viewport
      if (rect.bottom > 0 && rect.top < windowH) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setOffset((progress - 0.5) * 80);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTextVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (panelRef.current) observer.observe(panelRef.current);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      {/* Red panel */}
      <div
        ref={panelRef}
        className="relative bg-primary h-[75vh] min-h-[480px] overflow-hidden flex items-center justify-center"
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
            {/* Full-cover image with multiply blend and parallax */}
            <div
              className="absolute inset-0 z-[2]"
              style={{
                transform: `translateY(${offset}px)`,
                willChange: 'transform',
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
            {/* Overlay text */}
            {imageOverlayText && (
              <div
                className={`relative z-[3] font-display font-black uppercase text-center transition-all duration-1000 ease-out ${
                  textVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  fontSize: 'clamp(36px, 8vw, 120px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em',
                  color: 'rgba(0,0,0,0.7)',
                  textShadow: '0 2px 40px rgba(0,0,0,0.15)',
                }}
              >
                {imageOverlayText}
              </div>
            )}
          </>
        ) : (
          <div
            className="relative z-[2] w-[52%] h-[88%] rounded-[3px] flex items-center justify-center font-body text-[13px] tracking-[0.05em]"
            style={{ background: 'rgba(0,0,0,0.18)', color: 'rgba(0,0,0,0.35)' }}
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
