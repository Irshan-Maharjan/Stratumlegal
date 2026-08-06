import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/Section';
import { Eyebrow, DataValue } from '@/components/Eyebrow';
import { Rule } from '@/components/Rule';
import { TodoClient } from '@/components/TodoClient';
import { PEOPLE, getPerson } from '@/content/people';
import { getPracticeArea } from '@/content/practice-areas';
import { FIRM_TRADING_NAME } from '@/config/firm';

/**
 * /people/[slug] — the highest-value template on the site per the brief.
 * Every fact is either present or a visible TODO(client); nothing is invented.
 */

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return {};
  const name = person.fullName ?? 'Lawyer profile pending';
  return {
    title: name,
    description: person.designation
      ? `${name}, ${person.designation} at ${FIRM_TRADING_NAME}.`
      : `Lawyer profile at ${FIRM_TRADING_NAME}.`,
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();

  const areas = person.practiceAreas
    .map((s) => getPracticeArea(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <Section rhythm="md" index="01" railLabel="Profile" as="header">
        <Link
          href="/people"
          className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
        >
          ← All people
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[16rem_1fr] md:gap-14">
          <div
            className="relative w-full overflow-hidden border border-line bg-ink-100"
            style={{ aspectRatio: '4 / 5', borderRadius: 'var(--radius-sm)' }}
          >
            {person.photograph ? (
              <Image
                src={person.photograph}
                alt={person.fullName ?? ''}
                fill
                sizes="256px"
                className="object-cover object-top"
                style={{ filter: 'saturate(0.72) contrast(1.04)' }}
              />
            ) : (
              <span aria-hidden="true" className="absolute inset-0 flex items-end p-4">
                <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="block h-20 w-full">
                  {[0, 14, 26, 36, 44].map((y, i) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke="var(--color-line-strata)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      opacity={0.9 - i * 0.13}
                    />
                  ))}
                </svg>
              </span>
            )}
          </div>

          <div>
            <h1
              className="font-display text-display-2 leading-[1.05] text-paper"
              style={{ fontWeight: 300, letterSpacing: '-0.03em', fontVariationSettings: "'opsz' 48" }}
            >
              {person.fullName ?? <TodoClient>lawyer full name</TodoClient>}
            </h1>

            <div className="mt-3">
              {person.designation ? (
                <Eyebrow tone="secondary">{person.designation}</Eyebrow>
              ) : (
                <TodoClient>designation</TodoClient>
              )}
            </div>

            {areas.length > 0 && (
              <p className="mt-5 max-w-(--container-measure) text-body-sm text-paper-2">
                {areas.map((a) => a.title).join(' · ')}
              </p>
            )}

            <Rule className="my-8" />

            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              <div>
                <dt className="text-body-sm text-paper-3">Nepal Bar Council licence</dt>
                <dd className="mt-1">
                  {person.licenceNumber ? (
                    <DataValue className="text-paper">{person.licenceNumber}</DataValue>
                  ) : (
                    <TodoClient>Bar Council licence number</TodoClient>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-body-sm text-paper-3">Years in practice</dt>
                <dd className="mt-1">
                  {person.calledYear ? (
                    <DataValue className="text-paper">Since {person.calledYear}</DataValue>
                  ) : (
                    <TodoClient>year first called</TodoClient>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-body-sm text-paper-3">Languages</dt>
                <dd className="mt-1 text-body-sm text-paper-2">
                  {person.languages.length > 0 ? (
                    person.languages.join(', ')
                  ) : (
                    <TodoClient>languages spoken</TodoClient>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-body-sm text-paper-3">Email</dt>
                <dd className="mt-1">
                  {person.email ? (
                    <a
                      href={`mailto:${person.email}`}
                      className="font-mono text-data text-paper transition-colors duration-(--duration-hover) hover:text-brass"
                    >
                      {person.email}
                    </a>
                  ) : (
                    <TodoClient>direct email</TodoClient>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section rhythm="sm" index="02" railLabel="Education">
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Education
        </h2>
        <div className="mt-6">
          {person.education.length > 0 ? (
            <ul className="space-y-4">
              {person.education.map((e, i) => (
                <li key={i} className="text-body-sm text-paper-2">
                  <span className="text-paper">{e.qualification}</span>, {e.institution} ({e.year})
                </li>
              ))}
            </ul>
          ) : (
            <TodoClient>education history (institutions and years)</TodoClient>
          )}
        </div>
      </Section>

      <Section rhythm="sm" index="03" railLabel="Bio" measure>
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Experience
        </h2>
        <div className="mt-6 space-y-4 font-display text-body-lg text-paper-2">
          {person.bio ? (
            person.bio.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <TodoClient>
              biography, 150–250 words describing experience and specialisation — not
              outcomes or achievements
            </TodoClient>
          )}
        </div>
      </Section>
    </>
  );
}
