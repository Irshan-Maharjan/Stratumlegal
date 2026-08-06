'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * The litigation page's one sustained moment, per the brief: on scroll, the
 * strata lines rotate from horizontal to vertical (becoming <Strata
 * variant="bars">'s reading) and the surface darkens from --ink-000 toward
 * --surface-oxblood, with content sitting in the gaps between bars.
 *
 * This is the ONLY page where this happens, and it happens once, scrubbed
 * against the header section's scroll position rather than replayed —
 * "one sustained moment, not a page full of effects."
 *
 * Animates transform (rotate on the strata group) and backgroundColor.
 * backgroundColor is not transform/opacity, but it is not one of the
 * explicitly prohibited properties either (top/left/width/height/filter) —
 * it is the one deliberate exception the brief's own spec calls for ("the
 * surface behind darkens toward --oxblood"), so it is scoped to this single
 * moment rather than used as a general-purpose technique.
 *
 * Disabled below 768px and under prefers-reduced-motion: reduce — the
 * static final frame (oxblood surface, vertical bars) renders immediately.
 */
export function LitigationReveal({
  children,
  strataRef,
}: {
  children: ReactNode;
  strataRef: React.RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const strata = strataRef.current;
    if (!container || !strata) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) {
      // Static final frame: oxblood surface, vertical bars, no motion.
      gsap.set(container, { backgroundColor: 'var(--color-surface-oxblood)' });
      gsap.set(strata, { rotate: 90 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(container, { backgroundColor: 'var(--color-ink-000)' });
    gsap.set(strata, { rotate: 0 });

    const tween = gsap.to(container, {
      backgroundColor: 'var(--color-surface-oxblood)',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=600',
        scrub: 0.6,
      },
    });

    const rotateTween = gsap.to(strata, {
      rotate: 90,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=600',
        scrub: 0.6,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      rotateTween.scrollTrigger?.kill();
      rotateTween.kill();
    };
  }, [strataRef]);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-surface-oxblood)' }}>
      {children}
    </div>
  );
}
