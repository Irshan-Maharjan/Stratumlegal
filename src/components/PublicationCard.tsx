import Link from 'next/link';
import type { Publication } from '@/content/types';
import { Eyebrow } from './Eyebrow';

/**
 * <PublicationCard> — an article, on an index.
 *
 * Publications are the firm's only compliant way to demonstrate expertise, so
 * this component and the article template carry more strategic weight than
 * anything else on the site.
 *
 * Designed to look correct with three articles and with three hundred: no
 * feature/hero treatment that breaks when the list is long, no image dependency
 * (most legal analysis has no natural illustration and stock imagery would be
 * worse than none), and a fixed row height independent of summary length.
 */

type PublicationCardProps = {
  publication: Publication;
  /** Practice area title resolved from the slug by the caller. */
  areaTitle?: string;
  /** Compact drops the summary — used in the homepage's three-item list. */
  compact?: boolean;
  /**
   * Heading level for the title. Defaults to h3 (card sits under a section
   * h2). Index pages whose own title is the page h1 must pass "h2" so cards
   * don't skip a level.
   */
  headingLevel?: 'h2' | 'h3';
};

/** Deterministic, locale-stable date formatting — no hydration mismatch. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${day} ${months[month - 1]} ${year}`;
}

export function PublicationCard({
  publication,
  areaTitle,
  compact = false,
  headingLevel = 'h3',
}: PublicationCardProps) {
  const { slug, title, date, summary, readingMinutes, isStub } = publication;
  const Heading = headingLevel;

  return (
    <Link
      href={`/publications/${slug}`}
      className="group relative block border-b border-line py-7 transition-colors duration-(--duration-hover) hover:border-line-hi"
    >
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute bottom-[-1px] left-0 h-px w-full origin-left',
          'scale-x-0 transition-transform duration-(--duration-hover) ease-(--ease-standard)',
          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
        ].join(' ')}
        style={{ backgroundColor: 'var(--color-brass)' }}
      />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Eyebrow>
          <time dateTime={date}>{formatDate(date)}</time>
        </Eyebrow>
        {areaTitle && (
          <>
            <span aria-hidden="true" className="text-paper-3">
              ·
            </span>
            <Eyebrow>{areaTitle}</Eyebrow>
          </>
        )}
        {isStub && (
          <>
            <span aria-hidden="true" className="text-paper-3">
              ·
            </span>
            <Eyebrow tone="accent">Stub entry</Eyebrow>
          </>
        )}
      </div>

      <Heading
        className={[
          'mt-3 max-w-(--container-measure) font-display text-h3 leading-snug text-paper md:text-h2',
          'transition-transform duration-(--duration-hover) ease-(--ease-standard)',
          'group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px]',
        ].join(' ')}
        style={{ fontWeight: 500, letterSpacing: '-0.015em' }}
      >
        {title}
      </Heading>

      {!compact && summary && (
        <p className="mt-3 max-w-(--container-measure) text-body-sm text-paper-2">{summary}</p>
      )}

      <p className="mt-3 font-mono text-data text-paper-3">{readingMinutes} min read</p>
    </Link>
  );
}
