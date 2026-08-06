import Image from 'next/image';
import Link from 'next/link';
import type { Person } from '@/content/types';
import { Eyebrow } from './Eyebrow';
import { TodoClient } from './TodoClient';

/**
 * <PersonCard> — a lawyer, on an index.
 *
 * Photographs are treated consistently: identical 4:5 crop, identical grade
 * (a slight desaturation so a mix of studio and non-studio portraits reads as
 * one set). The grade is a CSS filter on a static image, applied at rest and
 * never animated — filter is not a compositor-friendly property.
 *
 * Where no photograph exists yet, the frame renders with the strata motif
 * rather than collapsing, so the layout is identical before and after the
 * client supplies portraits, and the gap is visible rather than hidden.
 *
 * Name and specialisation only at this level; everything else lives on
 * /people/[slug]. Nepali clients hire a person, so that page is the destination.
 */

type PersonCardProps = {
  person: Person;
  /** Practice area titles resolved from slugs by the caller. */
  areaTitles?: string[];
  /**
   * Heading level for the name. Defaults to h3 (card sits under a section
   * h2, e.g. on the homepage). Index pages whose own title is the page h1
   * must pass "h2" here so cards don't skip a level.
   */
  headingLevel?: 'h2' | 'h3';
};

export function PersonCard({ person, areaTitles = [], headingLevel = 'h3' }: PersonCardProps) {
  const hasName = Boolean(person.fullName);
  const Heading = headingLevel;

  const inner = (
    <>
      <div
        className="relative mb-5 w-full overflow-hidden border border-line bg-ink-100"
        style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-sm)' }}
      >
        {person.photograph ? (
          <Image
            src={person.photograph}
            alt={person.fullName ?? ''}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-top"
            style={{ filter: 'saturate(0.72) contrast(1.04)' }}
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-end justify-center p-4"
          >
            <span className="w-full">
              <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="block h-16 w-full">
                {[0, 14, 26, 36, 44].map((y, i) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="var(--color-line-strata)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    opacity={0.9 - i * 0.13}
                  />
                ))}
              </svg>
            </span>
          </span>
        )}
      </div>

      <Heading
        className="font-display text-h3 leading-tight text-paper"
        style={{ fontWeight: 400, letterSpacing: '-0.01em' }}
      >
        {person.fullName ?? <TodoClient>lawyer full name</TodoClient>}
      </Heading>

      {person.designation ? (
        <Eyebrow as="p" className="mt-2 block">
          {person.designation}
        </Eyebrow>
      ) : (
        <p className="mt-2">
          <TodoClient>designation</TodoClient>
        </p>
      )}

      {areaTitles.length > 0 && (
        <p className="mt-3 text-body-sm text-paper-2">{areaTitles.join(' · ')}</p>
      )}
    </>
  );

  // Only link when there is a name to link to; an anonymous card is a dead end.
  if (!hasName) {
    return <div className="block">{inner}</div>;
  }

  return (
    <Link
      href={`/people/${person.slug}`}
      className="group block transition-opacity duration-(--duration-hover) hover:opacity-90"
    >
      {inner}
    </Link>
  );
}
