import { Counter } from '@/components/motion/Counter';

/**
 * The credibility band: a reversed (white-on-black) panel, which is the one
 * place the logo's black field is used at full size.
 *
 * NOTE ON THE FIGURES: every number here is derived from something on this
 * site that a visitor can go and count — practice areas published, guidance
 * notes published, languages of service. There is deliberately no "cases
 * won", "success rate", or "clients served" figure. Those are unverifiable
 * from outside the firm, and comparative or success-rate claims are exactly
 * what the Nepal Bar Council's advertising restrictions prohibit. If the
 * client later supplies audited figures, add them to src/config/firm.ts and
 * render them here — do not invent them.
 */

const STATS: { value: number; suffix?: string; label: string; note: string }[] = [
  {
    value: 11,
    label: 'Practice areas',
    note: 'Corporate, finance, energy, disputes and more',
  },
  {
    value: 13,
    label: 'Guidance notes',
    note: 'Written for in-house counsel, free to read',
  },
  {
    value: 2,
    label: 'Languages',
    note: 'Instructions taken in English and Nepali',
  },
];

export function TrustBand() {
  return (
    <section className="bg-paper-bg text-ink-000">
      <div className="mx-auto w-full max-w-(--container-shell) px-5 py-(--spacing-section-md) md:px-8">
        <p className="font-mono text-label tracking-[0.2em] uppercase" style={{ color: 'var(--color-brass)' }}>
          Why clients stay
        </p>
        <h2 className="mt-5 max-w-(--container-measure) font-display text-h1 leading-tight">
          One partner on the file, from first instruction to final order.
        </h2>
        <p className="mt-6 max-w-(--container-measure) text-body-lg" style={{ color: '#B9B5B0' }}>
          Mandates are not passed down to whoever is free. The partner who takes
          your first call is the partner who argues the matter — which is why
          most of our work comes from clients we have already acted for.
        </p>

        <div className="mt-16 grid gap-10 border-t pt-12 sm:grid-cols-3" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="block font-display text-display-2 leading-none"
              />
              <p className="mt-4 text-body font-medium">{stat.label}</p>
              <p className="mt-1 text-body-sm" style={{ color: '#9B9691' }}>
                {stat.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
