'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A photograph in a frame that wipes open as it enters the viewport, with the
 * image itself drifting slowly against the scroll.
 *
 * Photography on this site is black and white — the palette carries only ink,
 * ground and the one crimson, so a colour photograph would introduce a second
 * accent the system has no room for. The source files in /public/img are
 * already desaturated, so this is not doing it with a CSS filter at runtime.
 *
 * Both effects are transform/opacity only. Under prefers-reduced-motion the
 * image renders in place with neither wipe nor parallax.
 */
export function Figure({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  parallax = 12,
  priority = false,
  wipe = true,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  /** Vertical drift in percent across the full scroll pass. 0 disables. */
  parallax?: number;
  priority?: boolean;
  /**
   * Whether this figure wipes itself open on scroll. Set false when the
   * caller animates the wipe as part of its own timeline — an above-the-fold
   * figure would otherwise trigger at load and race that timeline.
   */
  wipe?: boolean;
  sizes?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // The frame wipes open from the bottom edge.
      if (wipe) {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: frame, start: 'top 82%', once: true },
          }
        );
      }

      // The image oversizes by the parallax amount (see the style below) so
      // drifting it never exposes an empty edge inside the frame.
      if (parallax > 0) {
        gsap.fromTo(
          img,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      }
    }, frame);

    return () => ctx.revert();
  }, [parallax, wipe]);

  return (
    <div ref={frameRef} className={`relative overflow-hidden bg-ink-200 ${className ?? ''}`}>
      <div
        ref={imgRef}
        className="relative h-full w-full"
        // Oversize vertically by the drift range so the parallax cannot
        // uncover the frame's background at either extreme.
        style={parallax > 0 ? { height: `${100 + parallax}%`, top: `${-parallax / 2}%` } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={`h-full w-full object-cover ${imageClassName ?? ''}`}
        />
      </div>
    </div>
  );
}
