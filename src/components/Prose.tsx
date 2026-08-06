import type { ReactNode } from 'react';

/**
 * <Prose> — article typography.
 *
 * Publications invert to the paper ground (see [data-surface='paper'] in
 * globals.css). Long-form legal analysis on near-black is measurably worse to
 * read, the firm's credibility rests on these pieces actually being read, and
 * the strata motif becomes literal ruled lines on paper in exactly the section
 * where that reading applies. Same tokens, remapped — no new values.
 *
 * Measure is capped at --container-measure (65ch, ~68 rendered characters in
 * Newsreader at 19px). Body is Newsreader, not the UI sans: a publications-led
 * firm reads long-form in a serif and keeps the sans for chrome.
 *
 * Styling is applied via descendant selectors rather than per-element classes
 * because the content arrives from MDX as plain HTML elements.
 */

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={['prose-stratum max-w-(--container-measure)', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
