import type { ReactNode, ElementType } from 'react';

/**
 * <Section> — vertical rhythm and measure, defined once.
 *
 * Every page section on the site uses this. Spacing lives here and is never
 * overridden downstream; that rule is what keeps specificity conflicts from
 * starting. If a section needs spacing this component cannot express, the
 * token scale is incomplete — extend --spacing-section-* rather than adding a
 * one-off class at the call site.
 *
 * Layout: a 12-column grid where content occupies columns 3-9 and columns 1-2
 * are a persistent left rail (the ruled edge of a page). The rail carries mono
 * section numbers and is where strata lines originate. Below 768px the rail
 * collapses to a gutter and content runs full width.
 */

type SectionProps = {
  children: ReactNode;
  /** Vertical rhythm. Uneven by design — see the phase 1 layout note. */
  rhythm?: 'sm' | 'md' | 'lg' | 'none';
  /** Mono section number shown in the left rail, e.g. "01". */
  index?: string;
  /** Short label shown in the rail beneath the number. */
  railLabel?: string;
  /** Cap content at the reading measure (~68 characters) instead of full width. */
  measure?: boolean;
  as?: ElementType;
  className?: string;
  id?: string;
};

const RHYTHM: Record<NonNullable<SectionProps['rhythm']>, string> = {
  none: '',
  sm: 'py-(--spacing-section-sm)',
  md: 'py-(--spacing-section-md)',
  lg: 'py-(--spacing-section-lg)',
};

export function Section({
  children,
  rhythm = 'md',
  index,
  railLabel,
  measure = false,
  as: Tag = 'section',
  className,
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={['relative w-full', RHYTHM[rhythm], className].filter(Boolean).join(' ')}
    >
      <div className="mx-auto flex w-full max-w-(--container-shell) gap-0 px-5 md:px-8">
        {/* Left rail — columns 1-2. Hidden from AT: decorative numbering. */}
        <div
          aria-hidden="true"
          className="hidden shrink-0 md:block"
          style={{ width: 'var(--rail-width)' }}
        >
          {index && (
            <div className="sticky top-28 pr-6">
              <span className="font-mono text-label font-medium tracking-[0.13em] text-paper-3 uppercase">
                {index}
              </span>
              {railLabel && (
                <span className="mt-2 block max-w-[7ch] font-mono text-label leading-snug tracking-[0.13em] text-paper-3 uppercase">
                  {railLabel}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          className={['min-w-0 flex-1', measure ? 'max-w-(--container-measure)' : ''].join(' ')}
        >
          {children}
        </div>
      </div>
    </Tag>
  );
}
