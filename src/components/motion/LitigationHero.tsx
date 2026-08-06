'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Section } from '@/components/Section';
import { Strata } from '@/components/Strata';
import { LitigationReveal } from './LitigationReveal';

/**
 * Client wrapper around the litigation page's header + the scroll-driven
 * strata-to-bars, ink-to-oxblood transition. Kept separate from the rest of
 * the page (which stays server-rendered) because it needs a ref shared
 * between the animated strata element and the GSAP driver.
 */
export function LitigationHero({ title, summary }: { title: string; summary: string }) {
  const strataRef = useRef<HTMLDivElement>(null);

  return (
    <LitigationReveal strataRef={strataRef}>
      <Section rhythm="md" index="01" railLabel="Litigation" as="header" className="relative overflow-hidden">
        <div
          ref={strataRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
        >
          <Strata variant="strata" density={9} className="h-full w-full" />
        </div>
        <div className="relative">
          <Link
            href="/practice"
            className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
          >
            ← All practice areas
          </Link>
          <h1
            className="mt-6 max-w-(--container-measure) font-display text-display-2 leading-[1.05] text-paper"
            style={{ fontWeight: 300, letterSpacing: '-0.03em', fontVariationSettings: "'opsz' 48" }}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-(--container-measure) font-display text-body-lg text-paper-2">
            {summary}
          </p>
        </div>
      </Section>
    </LitigationReveal>
  );
}
