'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Wires Lenis smooth scroll into GSAP's ticker and keeps ScrollTrigger in
 * sync with Lenis's virtual scroll position, per the standard Lenis+GSAP
 * integration.
 *
 * Disabled entirely below 768px and under prefers-reduced-motion: reduce —
 * per the brief, scroll choreography is switched off on mobile (CPU cost on
 * mid-range Android) and the site ships static compositions of the same
 * motif instead. This component just doesn't construct Lenis in those cases;
 * native scroll behaviour takes over with no further code needed.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
