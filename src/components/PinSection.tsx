import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PinSectionProps {
  children: ReactNode;
  className?: string;
  /** Duration the section stays pinned (seconds). Default 1.5 */
  pinDuration?: number;
  /** Stagger delay between animated children. Default 0.1 */
  stagger?: number;
  /** CSS selector for elements to animate in. Default '.pin-animate' */
  animateSelector?: string;
  /** Disable pin (just animate). Default false */
  disablePin?: boolean;
}

/**
 * Wraps a section so it pins on scroll entry, plays staggered fade-up
 * animations on inner elements matching `animateSelector`, then releases.
 */
const PinSection = ({
  children,
  className = '',
  pinDuration = 1.5,
  stagger = 0.1,
  animateSelector = '.pin-animate',
  disablePin = false,
}: PinSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(animateSelector);

    // Set initial state
    gsap.set(items, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: `+=${window.innerHeight * pinDuration}`,
        pin: !disablePin,
        anticipatePin: 1,
        scrub: false,
        onEnter: () => {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger,
            ease: 'power2.out',
            onComplete: () => {
              ScrollTrigger.refresh();
            },
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [pinDuration, stagger, animateSelector, disablePin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default PinSection;
