'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * The hero load sequence, ~2.5s, per the brief's §7.
 *
 * Six thin-stroke outlined sheets — at the aspect ratio of a Nepali A4 court
 * filing (210:297) — drift upward and across at varying depths and opacity,
 * then flatten into horizontal bands, then those bands compress downward into
 * the strata stack (gaps tightening on the same 0.82 geometric decay the
 * static <Strata> component uses), and the seal/wordmark resolves inside the
 * widest band. The sheets are few and deliberate, and they resolve into
 * furniture the page keeps using — the final settled band positions ARE the
 * hero's static strata rule, so nothing here is decoration that gets thrown
 * away once the animation ends.
 *
 * Plays once per browser session (sessionStorage flag). Skippable via a
 * visible control and Escape. Disabled completely under
 * prefers-reduced-motion and below 768px — those cases render the static
 * final frame immediately, with markup identical to what the animation would
 * have settled into, so there is no discontinuity between the skipped and
 * animated states.
 *
 * Animates only transform (translate/scale/rotate) and opacity.
 */

const SESSION_KEY = 'stratum-hero-seen';
const SHEET_COUNT = 6;
/** A4 proportion, used as the sheet aspect ratio — a literal court filing. */
const SHEET_ASPECT = 210 / 297;

/** Final resting Y offsets (px from centre) at compressing (0.82 decay) gaps. */
const SETTLE_Y = [-70, -34, -6, 18, 36, 50];

/** Scattered starting positions — genuinely varied depth, not near-identical. */
const START = [
  { x: -220, y: 260, rot: -14, scale: 1.15, opacity: 0 },
  { x: 180, y: 340, rot: 10, scale: 0.85, opacity: 0 },
  { x: -140, y: 420, rot: 8, scale: 1.05, opacity: 0 },
  { x: 240, y: 200, rot: -9, scale: 0.95, opacity: 0 },
  { x: -60, y: 480, rot: 5, scale: 1.2, opacity: 0 },
  { x: 90, y: 300, rot: -6, scale: 0.9, opacity: 0 },
];

export function HeroSequence({ onDone }: { onDone: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [skippable, setSkippable] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === '1';

    if (prefersReducedMotion || isMobile || alreadySeen) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onDone();
      return;
    }

    const sheets = sheetRefs.current.filter((el): el is HTMLDivElement => Boolean(el));

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, '1');
        onDone();
      },
    });

    sheets.forEach((sheet, i) => {
      gsap.set(sheet, START[i]);
    });

    // 1. Drift upward and across into view — genuinely staggered, varied paths.
    tl.to(sheets, {
      opacity: 0.85,
      x: (i) => (i % 2 === 0 ? -18 : 18),
      y: (i) => SETTLE_Y[i] - 40,
      rotate: 0,
      scale: 1,
      duration: 1.15,
      ease: 'power2.out',
      stagger: 0.09,
    });

    // 2. Flatten into horizontal bands — scaleY drops so each sheet reads as
    // a band rather than a full sheet, while still at its pre-compression Y.
    tl.to(
      sheets,
      {
        x: 0,
        scaleY: 0.05,
        opacity: 0.7,
        duration: 0.55,
        ease: 'power2.inOut',
        stagger: 0.05,
      },
      '-=0.25'
    );

    // 3. Compress downward into the final strata gaps (0.82 decay spacing).
    tl.to(
      sheets,
      {
        y: (i) => SETTLE_Y[i],
        duration: 0.6,
        ease: 'power3.inOut',
        stagger: 0.03,
      },
      '-=0.1'
    );

    const skipTimer = setTimeout(() => setSkippable(true), 300);

    return () => {
      tl.kill();
      clearTimeout(skipTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function skip() {
    sessionStorage.setItem(SESSION_KEY, '1');
    gsap.globalTimeline.clear();
    onDone();
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') skip();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-ink-000"
    >
      <div className="relative h-[320px] w-[min(70vw,32rem)]">
        {Array.from({ length: SHEET_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              sheetRefs.current[i] = el;
            }}
            className="absolute inset-x-0 top-1/2 border border-brass"
            style={{
              aspectRatio: SHEET_ASPECT,
              width: '82%',
              left: '9%',
              marginTop: `-${(82 * (1 / SHEET_ASPECT)) / 2}%`,
            }}
          />
        ))}
      </div>

      {skippable && (
        <button
          type="button"
          onClick={skip}
          className="pointer-events-auto absolute bottom-8 right-8 border border-line-hi px-4 py-2 font-mono text-label tracking-[0.13em] text-paper-2 uppercase transition-colors duration-(--duration-hover) hover:text-paper"
          style={{ borderRadius: 'var(--radius-sm)' }}
        >
          Skip
        </button>
      )}
    </div>
  );
}
