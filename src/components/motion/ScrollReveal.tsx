'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Section reveal on scroll: fades and lifts content in as it enters the
 * viewport. transform (translateY) and opacity only — the brief's constraint
 * that scroll animation never touches top/left/width/height/filter, so
 * everything here stays on the compositor.
 *
 * Disabled below 768px and under prefers-reduced-motion: reduce — content is
 * rendered at its final, visible state immediately with no animation and no
 * layout difference, so there is no loss of content, only of the reveal
 * itself.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(el, { opacity: 0, y: 28 });

    const trigger = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
