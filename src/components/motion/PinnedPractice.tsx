'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Area = { slug: string; title: string; summary: string };

/**
 * The practice list, pinned while it advances.
 *
 * The section holds still and the visitor scrolls *through* the practice
 * areas one at a time, with the active one enlarged and the rest dimmed. It
 * is the retention mechanic on this page: the firm's actual capability is the
 * argument, and this makes a visitor read every line of it rather than
 * skimming a bulleted list.
 *
 * Below lg, and under prefers-reduced-motion, the pin is not created at all
 * and every area renders as a plain stacked list — pinning on a phone fights
 * the OS scroll and reduced-motion users should never be trapped in a
 * scroll-jacked section.
 */
export function PinnedPractice({ areas }: { areas: Area[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    if (reduced || !wide) return;

    setPinned(true);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: () => `+=${areas.length * 55}%`,
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const i = Math.min(areas.length - 1, Math.floor(self.progress * areas.length));
          setActive(i);
        },
      });
    }, root);

    return () => {
      ctx.revert();
      setPinned(false);
    };
  }, [areas.length]);

  return (
    <div ref={rootRef} className="relative">
      <div className="mx-auto w-full max-w-(--container-shell) px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-20">
          {/* Index rail — only meaningful while pinned. */}
          <div className="hidden lg:block">
            <div className="sticky top-1/2 font-mono text-label tracking-[0.2em] text-paper-3 uppercase">
              <div className="flex flex-col gap-2">
                {areas.map((area, i) => (
                  <span
                    key={area.slug}
                    className="transition-colors duration-(--duration-hover)"
                    style={{ color: pinned && i === active ? 'var(--color-brass)' : undefined }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={pinned ? 'flex min-h-[70vh] flex-col justify-center' : ''}>
            {areas.map((area, i) => {
              const isActive = pinned && i === active;
              return (
                <Link
                  key={area.slug}
                  href={`/practice/${area.slug}`}
                  className="group block border-b border-line py-5 last:border-b-0"
                  style={{
                    opacity: pinned ? (isActive ? 1 : 0.3) : 1,
                    transition: 'opacity 320ms var(--ease-standard)',
                  }}
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-label text-paper-3 lg:hidden">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block font-display leading-tight transition-all duration-(--duration-reveal)"
                        style={{
                          fontSize: isActive ? 'var(--text-h1)' : 'var(--text-h2)',
                        }}
                      >
                        {area.title}
                      </span>
                      {/* The summary only earns its space on the active item. */}
                      <span
                        className="block overflow-hidden text-body-sm text-paper-2 transition-all duration-(--duration-reveal)"
                        style={{
                          maxHeight: pinned ? (isActive ? '6rem' : '0rem') : '6rem',
                          opacity: pinned ? (isActive ? 1 : 0) : 1,
                          marginTop: isActive || !pinned ? '0.5rem' : '0',
                        }}
                      >
                        {area.summary}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-(--duration-hover) group-hover:translate-x-1"
                      style={{ color: isActive ? 'var(--color-brass)' : 'var(--color-paper-3)' }}
                    >
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
