import type { ReactNode } from 'react';

/**
 * <Eyebrow> — the small mono label.
 *
 * This is the ONLY uppercase in the type system. Everything else is sentence
 * case, per the design direction.
 *
 * Use it only where it encodes something real: a practice area, a date, a
 * licence number, a section number. Never as decoration above a heading — an
 * eyebrow reading "OUR SERVICES" above a heading that says "Our services" is
 * exactly the generic default this system is built to avoid.
 */

type EyebrowProps = {
  children: ReactNode;
  /** `tertiary` is the default; `accent` uses brass and is rationed. */
  tone?: 'tertiary' | 'secondary' | 'accent';
  as?: 'span' | 'p' | 'div' | 'dt' | 'figcaption';
  className?: string;
};

const TONE: Record<NonNullable<EyebrowProps['tone']>, string> = {
  tertiary: 'text-paper-3',
  secondary: 'text-paper-2',
  accent: 'text-brass',
};

export function Eyebrow({ children, tone = 'tertiary', as: Tag = 'span', className }: EyebrowProps) {
  return (
    <Tag
      className={[
        'font-mono text-label font-medium tracking-[0.13em] uppercase',
        TONE[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}

/**
 * <DataValue> — mono, but not uppercase and not tracked out.
 *
 * For genuine reference data where the characters matter individually and get
 * read or copied: licence numbers, registration numbers, PAN, filing refs.
 * Distinct from Eyebrow, which labels; this one carries the value.
 */
export function DataValue({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={['font-mono text-data tracking-[0.02em]', className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
