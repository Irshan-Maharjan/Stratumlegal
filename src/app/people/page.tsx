import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { PersonCard } from '@/components/PersonCard';
import { Rule } from '@/components/Rule';
import { PEOPLE } from '@/content/people';
import { getPracticeArea } from '@/content/practice-areas';
import { FIRM_TRADING_NAME } from '@/config/firm';

export const metadata: Metadata = {
  title: 'People',
  description:
    `The lawyers at ${FIRM_TRADING_NAME}: names, designations, Bar Council licence numbers, and areas of practice.`,
};

/**
 * People.
 *
 * The managing director is given his own full-width block above the rest of
 * the team rather than an equal cell in one grid. On a firm this size the
 * flat grid implied a parity that does not exist — he is the practising
 * lawyer and the person a client is actually retaining; the others are
 * technical staff. The split says so without needing a sentence that ranks
 * colleagues.
 */
export default function PeoplePage() {
  const lead = PEOPLE.find((p) => p.designation === 'Managing Director');
  const team = PEOPLE.filter((p) => p !== lead);

  return (
    <>
      <Section rhythm="md" index="01" railLabel="People" as="header">
        <Eyebrow tone="accent">People</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
          style={{ fontWeight: 800, letterSpacing: '-0.03em' }}
        >
          The people
        </h1>
        <p className="mt-8 max-w-(--container-measure) font-display text-body-lg text-paper-2">
          Nepali clients hire a person, not a brand. Below is everyone at the firm,
          their designations, and — for those practising — their areas of practice.
        </p>
        <div className="mt-16">
          <Rule weight="hi" />
        </div>
      </Section>

      {/* The managing director, at full width. */}
      {lead && (
        <Section rhythm="lg" index="02" railLabel="Counsel">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Link href={`/people/${lead.slug}`} className="group block">
                <div
                  className="relative w-full overflow-hidden border border-line bg-ink-100"
                  style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-sm)' }}
                >
                  {lead.photograph && (
                    <Image
                      src={lead.photograph}
                      alt={lead.fullName ?? ''}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center grayscale transition-transform duration-(--duration-slow) group-hover:scale-[1.02]"
                    />
                  )}
                </div>
              </Link>
            </div>

            <div className="lg:col-span-7 lg:pt-4">
              <Eyebrow tone="accent">{lead.designation}</Eyebrow>
              <h2
                className="mt-5 font-display text-display-2 leading-[1.04] text-paper"
                style={{ fontWeight: 500, letterSpacing: '-0.025em' }}
              >
                {lead.fullName}
              </h2>

              <blockquote className="mt-8 border-l-2 border-brass pl-6">
                <p className="font-display text-h2 leading-[1.15] text-paper" style={{ fontWeight: 400 }}>
                  &ldquo;The law rewards the side that prepared
                  <span style={{ color: 'var(--color-brass)' }}> first</span>.&rdquo;
                </p>
              </blockquote>

              <p className="mt-8 max-w-(--container-measure) text-body-lg text-paper-2">
                Leads every corporate file at the firm from first instruction to final
                order — foreign investment approval, company formation, banking and
                security, and the regulatory work behind energy and infrastructure
                projects.
              </p>

              <div className="mt-8">
                <Link
                  href={`/people/${lead.slug}`}
                  className="text-body-sm text-paper underline decoration-line-hi underline-offset-4 transition-colors duration-(--duration-hover) hover:decoration-brass"
                >
                  Full profile →
                </Link>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* The rest of the team, below and visually subordinate. */}
      {team.length > 0 && (
        <Section rhythm="lg" index="03" railLabel="Team">
          <div className="mb-10">
            <Eyebrow>The team</Eyebrow>
            <div className="mt-6">
              <Rule />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3">
            {team.map((person) => (
              <PersonCard
                key={person.slug}
                person={person}
                headingLevel="h2"
                areaTitles={person.practiceAreas
                  .map((slug) => getPracticeArea(slug)?.title)
                  .filter((t): t is string => Boolean(t))}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
