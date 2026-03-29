import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PinSectionProps {
  children: ReactNode;
  className?: string;
  scrollLength?: number;
  stagger?: number;
  animateSelector?: string;
}

const PinSection = ({
  children,
  className = '',
  scrollLength = 1,
  stagger = 0.08,
  animateSelector = '.pin-animate',
}: PinSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(animateSelector);
    if (items.length === 0) return;

    const tl = gsap.timeline();

    // Content starts hidden, fades in over the first 80% of scroll
    items.forEach((item, i) => {
      const isImg = item.querySelector('img') || item.tagName === 'IMG';
      const pos = i * stagger;
      if (isImg) {
        tl.fromTo(
          item,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power1.inOut' },
          pos
        );
      } else {
        tl.fromTo(
          item,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power1.inOut' },
          pos
        );
      }
    });

    // Add a hold at the end so content stays fully visible before release
    tl.to({}, { duration: 0.3 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${window.innerHeight * scrollLength}`,
      pin: true,
      anticipatePin: 1,
      scrub: 2,
      animation: tl,
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [scrollLength, stagger, animateSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default PinSection;
