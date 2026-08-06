'use client';

import { useMemo, useState } from 'react';
import { PublicationCard } from '@/components/PublicationCard';
import { Eyebrow } from '@/components/Eyebrow';
import type { Publication } from '@/content/types';

/**
 * Client-side filter over the publications index. All publications are
 * server-rendered into the initial HTML (see page.tsx), so filtering is a
 * progressive enhancement — with JS disabled, every publication is listed
 * and simply not filterable, never hidden.
 */

type PublicationsFilterProps = {
  publications: Publication[];
  areaOptions: { slug: string; title: string }[];
};

const PAGE_SIZE = 10;

export function PublicationsFilter({ publications, areaOptions }: PublicationsFilterProps) {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const areaTitleBySlug = useMemo(
    () => Object.fromEntries(areaOptions.map((a) => [a.slug, a.title])),
    [areaOptions]
  );

  const filtered = activeArea ? publications.filter((p) => p.practiceArea === activeArea) : publications;
  const visible = filtered.slice(0, visibleCount);

  function selectArea(slug: string | null) {
    setActiveArea(slug);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-2 gap-y-3" role="group" aria-label="Filter by practice area">
        <FilterChip active={activeArea === null} onClick={() => selectArea(null)}>
          All
        </FilterChip>
        {areaOptions.map((area) => (
          <FilterChip key={area.slug} active={activeArea === area.slug} onClick={() => selectArea(area.slug)}>
            {area.title}
          </FilterChip>
        ))}
      </div>

      <p className="mt-6 text-body-sm text-paper-3">
        {filtered.length} {filtered.length === 1 ? 'publication' : 'publications'}
      </p>

      <div className="mt-4">
        {visible.map((pub) => (
          <PublicationCard
            key={pub.slug}
            publication={pub}
            areaTitle={areaTitleBySlug[pub.practiceArea]}
            headingLevel="h2"
          />
        ))}
      </div>

      {visible.length < filtered.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          className="mt-10 border border-line px-5 py-3 text-body-sm text-paper transition-colors duration-(--duration-hover) hover:border-line-hi"
          style={{ borderRadius: 'var(--radius-sm)' }}
        >
          Show more
        </button>
      )}

      {filtered.length === 0 && (
        <p className="mt-4 text-body-sm text-paper-2">
          <Eyebrow>No results</Eyebrow>
          <br />
          No publications are filed under this area yet.
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'border px-3 py-1.5 font-mono text-label tracking-[0.08em] uppercase transition-colors duration-(--duration-hover)',
        active ? 'border-brass text-brass' : 'border-line text-paper-2 hover:border-line-hi hover:text-paper',
      ].join(' ')}
      style={{ borderRadius: 'var(--radius-sm)' }}
    >
      {children}
    </button>
  );
}
