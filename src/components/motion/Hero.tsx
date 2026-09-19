'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Figure } from '@/components/media/Figure';
import { FIRM_SHORT, FIRM_DESCRIPTOR } from '@/config/firm';

/**
 * The homepage hero.
 *
 * Replaces the old full-screen preloader gate. A blocking splash costs every
 * visitor ~2.5s before they can read anything, and the second visit it is
 * dead weight — so the motion was moved into the page itself, where it plays
 * while the content is already legible.
 *
 * The sequence: the wordmark's letters rise into place, the descriptor and
 * rule extend, the strata figure wipes open, then the copy and calls to
 * action resolve.
 *
 * Under prefers-reduced-motion nothing moves: the markup below IS the final
 * frame, so the static state is the animated state's last keyframe, not a
 * separate layout.
 */

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('[data-hero-letter]', {
        yPercent: 120,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.055,
      })
        .from(
          '[data-hero-descriptor]',
          { opacity: 0, letterSpacing: '0.5em', duration: 0.9, ease: 'power2.out' },
          '-=0.45'
        )
        .from(
          '[data-hero-rule]',
          { scaleX: 0, duration: 0.8, ease: 'power3.inOut', transformOrigin: 'left center' },
          '-=0.7'
        )
        // The figure wipes open from its bottom edge, in sequence rather than
        // on scroll — it is above the fold, so a ScrollTrigger would fire at
        // load anyway and race the rest of this timeline.
        .from(
          '[data-hero-figure]',
          { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'power3.out' },
          '-=0.75'
        )
        .from(
          '[data-hero-copy]',
          { y: 24, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12 },
          '-=0.75'
        )
        .from('[data-hero-cue]', { opacity: 0, duration: 0.6 }, '-=0.2');

      // The scroll cue keeps breathing until the visitor scrolls.
      const cue = gsap.to('[data-hero-cue-line]', {
        scaleY: 0.3,
        transformOrigin: 'top center',
        duration: 1.1,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });

      const stop = () => cue.kill();
      window.addEventListener('scroll', stop, { once: true, passive: true });
    }, root);

    return () => ctx.revert();
  }, []);

  const letters = FIRM_SHORT.toUpperCase().split('');
  const accentAt = FIRM_SHORT.toUpperCase().indexOf('A');

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[88vh] items-center overflow-hidden px-5 pt-16 pb-24 md:px-8"
    >
      <div className="mx-auto grid w-full max-w-(--container-shell) gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-20">
        <div>
          {/* Wordmark, letter by letter. Each letter needs its own clipping
              wrapper so the rise reads as a reveal rather than a slide. */}
          <h1 className="font-display leading-[0.92] text-[clamp(3.5rem,13vw,10rem)] tracking-[0.02em]">
            <span className="sr-only">{FIRM_SHORT} {FIRM_DESCRIPTOR}</span>
            <span aria-hidden="true" className="flex">
              {letters.map((letter, i) => (
                <span key={i} className="overflow-hidden">
                  <span
                    data-hero-letter
                    className="block"
                    style={i === accentAt ? { color: 'var(--color-brass)' } : undefined}
                  >
                    {letter}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p
            data-hero-descriptor
            aria-hidden="true"
            className="mt-3 font-sans text-[clamp(0.7rem,1.6vw,1rem)] tracking-[0.42em] text-paper-2 uppercase"
          >
            {FIRM_DESCRIPTOR}
          </p>

          <div data-hero-rule className="mt-8 h-px w-full max-w-lg bg-line-hi" />

          <p
            data-hero-copy
            className="mt-8 max-w-(--container-measure) text-body-lg text-paper-2"
          >
            Counsel for institutions that cannot afford ambiguity. We advise on
            foreign direct investment, corporate and commercial matters, banking
            and finance, and dispute resolution in Nepal.
          </p>

          <div data-hero-copy className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-paper bg-paper px-7 py-3.5 text-body-sm text-ink-000 transition-colors duration-(--duration-hover) hover:bg-brass hover:border-brass"
            >
              <span>Speak to a partner</span>
              <span aria-hidden="true" className="transition-transform duration-(--duration-hover) group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/practice"
              className="inline-flex items-center gap-3 border border-line-hi px-7 py-3.5 text-body-sm text-paper transition-colors duration-(--duration-hover) hover:border-paper"
            >
              Practice areas
            </Link>
          </div>
        </div>

        {/* Rock strata — the firm's name, made literal. Hidden below lg: on a
            phone the wordmark alone carries the fold, and a tall image here
            would push the copy and the calls to action under it.

            The mark is not repeated here; it already sits in the header two
            inches above, and a second copy competes with the wordmark rather
            than adding anything. */}
        <div data-hero-figure className="hidden lg:block">
          <Figure
            src="/img/strata-tall.jpg"
            alt="Layered sedimentary rock, photographed in black and white"
            width={1100}
            height={1500}
            priority
            parallax={0}
            wipe={false}
            sizes="(max-width: 1024px) 0px, 32vw"
            className="h-[clamp(22rem,42vw,34rem)] w-[clamp(16rem,28vw,24rem)]"
          />
        </div>
      </div>

      <div
        data-hero-cue
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-mono text-label tracking-[0.2em] text-paper-3 uppercase">
          Scroll
        </span>
        <span data-hero-cue-line className="block h-10 w-px bg-line-hi" />
      </div>
    </section>
  );
}
