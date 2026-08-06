/**
 * <Strata> — the signature element. One primitive, three readings.
 *
 * "Stratum" means layer. Everything visual on this site derives from a set of
 * parallel lines; this component is that set. There is no second decorative
 * system anywhere in the codebase.
 *
 *   strata  Horizontal, gaps compressing downward on a 0.82 geometric decay,
 *           like sediment settling denser under its own weight. Hero, page
 *           headers, section transitions.
 *   bars    The same lines rotated to vertical, but at EVEN spacing. The rhythm
 *           difference carries the meaning: compression is geological, bars are
 *           manufactured. Criminal & white-collar litigation page only.
 *   rules   Horizontal at even leading, with some lines truncated so it reads as
 *           a ruled page carrying text. Publications and document-heavy sections.
 *
 * Renders as inline SVG with zero JavaScript — it must look correct with JS
 * disabled, and it does. Phase 5 animates it via transform/opacity only, which
 * is why the lines are grouped: compression is a scaleY on the group, never a
 * per-line y mutation, so it stays on the compositor.
 */

type StrataVariant = 'strata' | 'bars' | 'rules';

type StrataProps = {
  variant?: StrataVariant;
  /** Number of lines. Defaults per variant. */
  density?: number;
  /** Index of the line drawn in brass instead of line-strata. Omit for none. */
  accentIndex?: number;
  className?: string;
};

const DEFAULT_DENSITY: Record<StrataVariant, number> = {
  strata: 7,
  bars: 7,
  rules: 9,
};

/** Compressing gaps: each successive gap is 82% of the previous one. */
const DECAY = 0.82;

function compressedPositions(count: number): number[] {
  const gaps: number[] = [];
  let gap = 1;
  for (let i = 0; i < count - 1; i += 1) {
    gaps.push(gap);
    gap *= DECAY;
  }
  const total = gaps.reduce((sum, g) => sum + g, 0) || 1;
  const positions = [0];
  let acc = 0;
  for (const g of gaps) {
    acc += g;
    positions.push((acc / total) * 100);
  }
  return positions;
}

function evenPositions(count: number): number[] {
  if (count < 2) return [50];
  return Array.from({ length: count }, (_, i) => (i / (count - 1)) * 100);
}

/** Truncated line lengths for `rules`, so it reads as ruled paper with text. */
const RULE_LENGTHS = [100, 100, 62, 100, 84, 100, 100, 47, 92];

export function Strata({ variant = 'strata', density, accentIndex, className }: StrataProps) {
  const count = density ?? DEFAULT_DENSITY[variant];

  // Bars are manufactured and evenly spaced; strata compress under load.
  const positions =
    variant === 'strata' ? compressedPositions(count) : evenPositions(count);

  const isVertical = variant === 'bars';

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className}
      style={{ display: 'block' }}
    >
      <g>
        {positions.map((pos, i) => {
          const isAccent = i === accentIndex;
          const stroke = isAccent ? 'var(--color-brass)' : 'var(--color-line-strata)';

          if (isVertical) {
            return (
              <line
                key={pos}
                x1={pos}
                y1="0"
                x2={pos}
                y2="100"
                stroke={stroke}
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            );
          }

          const length = variant === 'rules' ? RULE_LENGTHS[i % RULE_LENGTHS.length] : 100;

          return (
            <line
              key={pos}
              x1="0"
              y1={pos}
              x2={length}
              y2={pos}
              stroke={stroke}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </g>
    </svg>
  );
}

/**
 * Two thin interlocking rings, drawn at the same stroke weight as `bars`.
 *
 * This is the client's requested handcuff imagery, relocated rather than
 * removed: it appears only as a scroll marker in the left rail of the criminal
 * and white-collar litigation page. Never photorealistic, never in a hero,
 * never on the homepage — handcuffs in a corporate firm's hero read as criminal
 * defence advertising and repel the target client.
 */
export function InterlockingRings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
    >
      <circle cx="14" cy="12" r="9" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <circle cx="26" cy="12" r="9" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
