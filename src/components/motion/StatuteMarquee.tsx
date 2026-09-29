'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Two rows of statute and regulator names, drifting in opposite directions.
 *
 * This is the "precision is credibility" argument made at a glance: the names
 * are the actual Nepali statutes and regulators recorded against each practice
 * area in src/content/practice-areas.ts, not decoration. A general counsel
 * scanning the page sees the instruments their matter will turn on.
 *
 * Each row renders its list twice and translates by exactly -50%, so the
 * second copy is in the first copy's starting position when the tween loops —
 * the seam is therefore invisible and the motion reads as continuous.
 *
 * Under prefers-reduced-motion nothing moves: the rows render static and the
 * overflow is simply clipped, which is legible on its own.
 */
export function StatuteMarquee({ rows }: { rows: [string[], string[]] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-marquee-track]').forEach((track, i) => {
        // Row 0 drifts left, row 1 right, so the pair reads as two currents
        // rather than one sliding block.
        const toLeft = i % 2 === 0;
        gsap.fromTo(
          track,
          { xPercent: toLeft ? 0 : -50 },
          {
            xPercent: toLeft ? -50 : 0,
            duration: 48,
            ease: 'none',
            repeat: -1,
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const all = [...rows[0], ...rows[1]];

  return (
    <>
      {/* The moving strip is decorative duplication: every name appears twice
          in the DOM for the loop, so it is hidden from assistive tech and the
          real list is exposed below instead. */}
      <div
        ref={rootRef}
        aria-hidden="true"
        className="flex flex-col gap-3 overflow-hidden"
      >
        {rows.map((row, i) => (
          <div key={i} className="overflow-hidden">
            <div data-marquee-track className="flex w-max gap-3">
              {[...row, ...row].map((name, j) => (
                <span
                  key={`${name}-${j}`}
                  className="shrink-0 border border-line px-4 py-2 text-body-sm whitespace-nowrap text-paper-2"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ul className="sr-only">
        {all.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </>
  );
}
