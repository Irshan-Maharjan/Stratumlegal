import type { ReactNode } from 'react';

/**
 * <Prose> — article typography.
 *
 * The site is a single light ground throughout (Ground #F3F2F2), so
 * publications no longer invert to a separate "paper" surface — they render
 * on the same default tokens as every other page. See the removed
 * [data-surface='paper'] override in globals.css for why.
 *
 * Measure is capped at --container-measure (65ch, ~68 rendered characters).
 * Body copy uses Archivo — the brand has no serif companion, so long-form and
 * UI text share one typeface throughout.
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
