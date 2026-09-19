import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * <LinkRow> — the list row used for practice areas, publications and people
 * indexes. The most-used component on the site.
 *
 * Structure: an index number, a label, optional meta, and a hairline beneath.
 * The whole row is the link target, not just the label — a 44px+ tap target
 * matters more than usual here, since most Nepali traffic is mid-range Android.
 *
 * Hover vocabulary (the entire site's, defined once):
 *   1. the bottom hairline goes line -> line-hi
 *   2. a brass hairline slides in from the left edge
 *   3. the label shifts 2px right
 * No shadow, no fill change, no scale. 180ms, transform and opacity only.
 *
 * Row dividers are plain hairlines (--color-line) — the old build's "strata"
 * line-motif is gone; a row separator is just a rule now.
 */

type LinkRowProps = {
  href: string;
  /** The row's primary text. */
  label: string;
  /** Mono index, e.g. "01". Encodes order — omit where order is meaningless. */
  index?: string;
  /** Secondary line beneath the label. */
  description?: string;
  /** Right-aligned metadata: date, reading time, count. */
  meta?: ReactNode;
  className?: string;
};

export function LinkRow({ href, label, index, description, meta, className }: LinkRowProps) {
  return (
    <Link
      href={href}
      className={[
        'group relative block border-b border-line py-6',
        'transition-colors duration-(--duration-hover) hover:border-line-hi',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Brass hairline sliding in from the left. Scale-x only: compositor-safe. */}
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute bottom-[-1px] left-0 h-px w-full origin-left',
          'scale-x-0 transition-transform duration-(--duration-hover) ease-(--ease-standard)',
          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
        ].join(' ')}
        style={{ backgroundColor: 'var(--color-brass)' }}
      />

      <div className="flex items-baseline gap-4 md:gap-8">
        {index && (
          <span className="shrink-0 font-mono text-label font-medium tracking-[0.13em] text-paper-3 uppercase">
            {index}
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span
            className={[
              'block font-display text-h2 leading-tight text-paper',
              'transition-transform duration-(--duration-hover) ease-(--ease-standard)',
              'group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px]',
            ].join(' ')}
            style={{ fontWeight: 800, letterSpacing: '-0.015em' }}
          >
            {label}
          </span>
          {description && (
            <span className="mt-2 block max-w-(--container-measure) text-body-sm text-paper-2">
              {description}
            </span>
          )}
        </span>

        {meta && (
          <span className="hidden shrink-0 text-right font-mono text-data text-paper-3 sm:block">
            {meta}
          </span>
        )}
      </div>
    </Link>
  );
}
