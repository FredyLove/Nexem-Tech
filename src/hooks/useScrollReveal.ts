import { useEffect, useRef, useState, type RefObject } from "react";

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

/**
 * Hook that returns a ref and a boolean indicating whether the element is in view.
 * Designed for scroll-triggered reveal animations.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/**
 * Generates inline styles for staggered child animations.
 * Use with the `reveal-child` CSS class.
 */
export function staggerDelay(index: number, base = 80): React.CSSProperties {
  return { transitionDelay: `${index * base}ms` };
}
