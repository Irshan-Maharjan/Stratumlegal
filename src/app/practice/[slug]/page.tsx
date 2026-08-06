import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Rule } from '@/components/Rule';
import { LinkRow } from '@/components/LinkRow';
import { PersonCard } from '@/components/PersonCard';
import { Strata, InterlockingRings } from '@/components/Strata';
import { LitigationHero } from '@/components/motion/LitigationHero';
import { PRACTICE_AREAS, getPracticeArea } from '@/content/practice-areas';
import { getPerson } from '@/content/people';
import { PUBLICATIONS } from '@/content/publications';
import { PublicationCard } from '@/components/PublicationCard';

/**
 * /practice/[slug] — the SEO surface. Written for someone searching
 * "FDI approval process Nepal" or "company registration foreign investor
 * Nepal", without keyword stuffing.
 *
 * The criminal & white-collar page (isLitigation) is the one place the bars
 * motif and oxblood surface appear, per the brief: on this page only, strata
 * rotates to vertical, the surface darkens toward --surface-oxblood, and the
 * interlocking-rings scroll marker (the relocated handcuff motif) sits in the
 * left rail. Every other practice page uses the standard `strata` header.
 */

export function generateStaticParams() {
  return PRACTICE_AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return {};
  return { title: area.title, description: area.summary };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  const people = area.people.map((s) => getPerson(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const related = PUBLICATIONS.filter((p) => p.practiceArea === area.slug).slice(0, 3);

  if (area.isLitigation) {
    return <LitigationTemplate area={area} people={people} related={related} />;
  }

  return (
    <>
      <Section rhythm="md" index="01" railLabel="Practice" as="header">
        <Link
          href="/practice"
          className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
        >
          ← All practice areas
        </Link>
        <h1
          className="mt-6 max-w-(--container-measure) font-display text-display-2 leading-[1.05] text-paper"
          style={{ fontWeight: 300, letterSpacing: '-0.03em', fontVariationSettings: "'opsz' 48" }}
        >
          {area.title}
        </h1>
        <p className="mt-6 max-w-(--container-measure) font-display text-body-lg text-paper-2">
          {area.summary}
        </p>
        <div className="mt-14">
          <Strata variant="strata" density={6} className="h-20 w-full opacity-50" />
        </div>
      </Section>

      <Section rhythm="sm" index="02" railLabel="Overview" measure>
        <div className="space-y-5 font-display text-body-lg text-paper-2">
          {area.overview.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section rhythm="sm" index="03" railLabel="Services">
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Services
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
          {area.services.map((s) => (
            <li key={s} className="flex gap-3 border-b border-line py-3 text-body-sm text-paper-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-line-hi" />
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section rhythm="sm" index="04" railLabel="Law">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
              Statutes
            </h2>
            <ul className="mt-6 space-y-4">
              {area.statutes.map((s) => (
                <li key={s.name} className="border-b border-line pb-4 text-body-sm">
                  <span className="text-paper">{s.name}</span>
                  {s.note && <span className="mt-1 block text-paper-3">{s.note}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
              Regulators
            </h2>
            <ul className="mt-6 space-y-4">
              {area.regulators.map((r) => (
                <li key={r.name} className="border-b border-line pb-4 text-body-sm">
                  <span className="text-paper">{r.name}</span>
                  {r.note && <span className="mt-1 block text-paper-3">{r.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {people.length > 0 && (
        <Section rhythm="sm" index="05" railLabel="People">
          <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
            Who works in this area
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {people.map((p) => (
              <PersonCard key={p.slug} person={p} />
            ))}
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section rhythm="md" index="06" railLabel="Reading">
          <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
            Related publications
          </h2>
          <div className="mt-6">
            {related.map((pub) => (
              <PublicationCard key={pub.slug} publication={pub} areaTitle={area.title} compact />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function LitigationTemplate({
  area,
  people,
  related,
}: {
  area: NonNullable<ReturnType<typeof getPracticeArea>>;
  people: ReturnType<typeof getPerson>[];
  related: typeof PUBLICATIONS;
}) {
  const validPeople = people.filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div data-surface="litigation" style={{ backgroundColor: 'var(--color-surface-oxblood)' }}>
      <LitigationHero title={area.title} summary={area.summary} />

      <Section rhythm="sm" index="02" railLabel="Overview" measure className="relative">
        <div aria-hidden="true" className="absolute top-0 -left-2 hidden md:block">
          <InterlockingRings className="h-6 w-auto text-paper-3 opacity-70" />
        </div>
        <div className="space-y-5 font-display text-body-lg text-paper-2">
          {area.overview.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section rhythm="sm" index="03" railLabel="Services">
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Services
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
          {area.services.map((s) => (
            <li key={s} className="flex gap-3 border-b border-line py-3 text-body-sm text-paper-2">
              <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-line-hi" />
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section rhythm="sm" index="04" railLabel="Law">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
              Statutes
            </h2>
            <ul className="mt-6 space-y-4">
              {area.statutes.map((s) => (
                <li key={s.name} className="border-b border-line pb-4 text-body-sm">
                  <span className="text-paper">{s.name}</span>
                  {s.note && <span className="mt-1 block text-paper-3">{s.note}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
              Regulators
            </h2>
            <ul className="mt-6 space-y-4">
              {area.regulators.map((r) => (
                <li key={r.name} className="border-b border-line pb-4 text-body-sm">
                  <span className="text-paper">{r.name}</span>
                  {r.note && <span className="mt-1 block text-paper-3">{r.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {validPeople.length > 0 && (
        <Section rhythm="sm" index="05" railLabel="People">
          <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
            Who works in this area
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {validPeople.map((p) => (
              <PersonCard key={p.slug} person={p} />
            ))}
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section rhythm="md" index="06" railLabel="Reading">
          <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
            Related publications
          </h2>
          <div className="mt-6">
            {related.map((pub) => (
              <PublicationCard key={pub.slug} publication={pub} areaTitle={area.title} compact />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
