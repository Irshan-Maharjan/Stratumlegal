/**
 * <Rule> — the hairline divider, at the two defined weights.
 *
 * `line` is the resting weight; `line-hi` is for active or hovered boundaries
 * and for the one or two places a division needs to actually assert itself.
 * There is no third weight. If a divider needs more presence than `hi`, the
 * problem is the layout, not the rule.
 *
 * Rendered as a border rather than an <hr> element by default so it carries no
 * semantic weight — most rules here are visual, not thematic breaks. Pass
 * `semantic` where the division genuinely separates topics.
 */

type RuleProps = {
  weight?: 'line' | 'hi';
  /** Render as <hr> (a thematic break) instead of a decorative <div>. */
  semantic?: boolean;
  /** Brass segment at the left edge — used sparingly to mark an active row. */
  accent?: boolean;
  className?: string;
};

export function Rule({ weight = 'line', semantic = false, accent = false, className }: RuleProps) {
  const Tag = semantic ? 'hr' : 'div';
  const color = weight === 'hi' ? 'var(--color-line-hi)' : 'var(--color-line)';

  return (
    <Tag
      aria-hidden={semantic ? undefined : 'true'}
      className={['relative h-px w-full border-0', className].filter(Boolean).join(' ')}
      style={{ backgroundColor: color }}
    >
      {accent && (
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 h-px w-8"
          style={{ backgroundColor: 'var(--color-brass)' }}
        />
      )}
    </Tag>
  );
}
