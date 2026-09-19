'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * The logo's square frame + scales, redrawn as inline SVG so it can animate.
 *
 * This is NOT a replacement for the supplied artwork — <LogoMark> renders the
 * client's own raster everywhere the mark identifies the firm (header,
 * footer, favicons). Geometry here is measured off that PNG so the two read
 * as the same mark.
 *
 * CURRENTLY UNUSED. It was the hero's centrepiece until the hero moved to
 * photography; the mark already sits in the header, so a second, larger copy
 * a few inches below competed with the wordmark instead of adding to it.
 * Kept because it is a finished, working asset — a natural fit for a page
 * header, a section marker, or a 404 — not because anything imports it.
 *
 * The animation is the brand argument made visually: the beam enters tilted
 * (an unresolved matter) and settles level (resolved). It runs once, then
 * holds. Under prefers-reduced-motion it renders the settled frame with no
 * motion at all.
 */

/** Frame: black on the top-left run, crimson on the bottom-right run. */
const FRAME_BLACK = 'M 96 8 L 8 8 L 8 148';
const FRAME_RED = 'M 8 148 L 8 192 L 192 192 L 192 8 L 96 8';

export function ScalesMark({ className }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const beamRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const beam = beamRef.current;
    if (!root || !beam) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const frames = root.querySelectorAll<SVGPathElement>('[data-draw]');
    const fills = root.querySelectorAll<SVGElement>('[data-fade]');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // 1. The frame draws itself, black run then crimson run.
      frames.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });
      tl.to(frames, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
        stagger: 0.18,
      });

      // 2. Scales fade up.
      gsap.set(fills, { opacity: 0, y: -6 });
      tl.to(fills, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.06 }, '-=0.35');

      // 3. The beam swings and settles level — weighed, then balanced.
      tl.fromTo(
        beam,
        { rotate: -9 },
        { rotate: 0, duration: 1.6, ease: 'elastic.out(1, 0.45)', transformOrigin: '100px 72px' },
        '-=0.2'
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Scales of justice"
      fill="none"
    >
      <path
        data-draw
        d={FRAME_BLACK}
        stroke="var(--color-paper)"
        strokeWidth="6"
        strokeLinecap="square"
      />
      <path
        data-draw
        d={FRAME_RED}
        stroke="var(--color-brass)"
        strokeWidth="6"
        strokeLinecap="square"
      />

      {/* Column + finial, in crimson, as in the artwork. */}
      <g data-fade>
        <path d="M 100 34 L 107 50 L 100 64 L 93 50 Z" fill="var(--color-brass)" />
        <path d="M 95 58 L 105 58 L 103 140 L 97 140 Z" fill="var(--color-brass)" />
      </g>

      {/* Base. */}
      <g data-fade>
        <path d="M 78 152 Q 100 132 122 152 Z" fill="var(--color-paper)" />
      </g>

      {/* The beam and both pans swing as one rigid group. */}
      <g ref={beamRef}>
        <g data-fade>
          {/* The beam rises to a crest at the centre and sweeps down to each
             tip, as in the artwork — convex, not a straight bar. */}
          <path
            d="M 46 72 Q 100 50 154 72"
            stroke="var(--color-paper)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="46" cy="72" r="6" fill="var(--color-paper)" />
          <circle cx="154" cy="72" r="6" fill="var(--color-paper)" />
          {/* Short hangers from each beam tip down to its pan. */}
          <path d="M 46 72 L 46 86" stroke="var(--color-paper)" strokeWidth="3" />
          <path d="M 154 72 L 154 86" stroke="var(--color-paper)" strokeWidth="3" />

          {/* Pans. Each is an open triangle — flat top edge, tapering to a
             point — with the lower third filled, exactly as the artwork draws
             it. The filled wedge shares the triangle's own edges so it reads
             as liquid sitting in the pan, not a second shape below it. */}
          <path d="M 16 86 L 76 86 L 46 126 Z" fill="none" stroke="var(--color-paper)" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 31 106 L 61 106 L 46 126 Z" fill="var(--color-paper)" />

          <path d="M 124 86 L 184 86 L 154 126 Z" fill="none" stroke="var(--color-paper)" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 139 106 L 169 106 L 154 126 Z" fill="var(--color-paper)" />
        </g>
      </g>
    </svg>
  );
}
