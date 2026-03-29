import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PinSectionProps {
  children: ReactNode;
  className?: string;
  /** How many viewport heights of scroll distance to pin. Default 1 (100vh) */
  scrollLength?: number;
  /** Stagger delay in timeline between animated children. Default 0.08 */
  stagger?: number;
  /** CSS selector for elements to animate in. Default '.pin-animate' */
  animateSelector?: string;
}

/**
 * Pins a section and reveals `.pin-animate` children progressively
 * tied to scroll position (scrub). User cannot scroll past until
 * all content is revealed — same mechanic as the Statement section.
 */
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

    // Build a timeline that reveals all items
    const tl = gsap.timeline();

    items.forEach((item, i) => {
      // Check if it's an image
      const isImg = item.querySelector('img') || item.tagName === 'IMG';
      if (isImg) {
        tl.fromTo(
          item,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
          i * stagger
        );
      } else {
        tl.fromTo(
          item,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          i * stagger
        );
      }
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: `+=${window.innerHeight * scrollLength}`,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
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
