import { useEffect, useRef, useState, useCallback } from 'react';

/** Returns a ref + a 0→1 progress value as the element scrolls through the viewport */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(threshold = 0) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      // 0 when bottom edge enters viewport, 1 when top edge exits
      const raw = (wh - rect.top) / (wh + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return { ref, progress };
}

/** Returns true once element has entered the viewport by `offset` pixels */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(offset = 120) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: `-${offset}px` }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [offset]);

  return { ref, visible };
}

/** Returns a progress value based on how far through a sticky container the user has scrolled */
export function useStickyProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const raw = -rect.top / (rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return { ref, progress };
}
