import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { PersonCard } from '@/components/PersonCard';
import { Strata } from '@/components/Strata';
import { PEOPLE } from '@/content/people';
import { getPracticeArea } from '@/content/practice-areas';

export const metadata: Metadata = {
  title: 'People',
  description:
    'The lawyers at Stratum Legal: names, designations, Bar Council licence numbers, and areas of practice.',
};

export default function PeoplePage() {
  return (
    <>
      <Section rhythm="md" index="01" railLabel="People" as="header">
        <Eyebrow tone="accent">People</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
          style={{ fontWeight: 300, letterSpacing: '-0.035em', fontVariationSettings: "'opsz' 72" }}
        >
          The people
        </h1>
        <p className="mt-8 max-w-(--container-measure) font-display text-body-lg text-paper-2">
          Nepali clients hire a lawyer, not a brand. Below are the lawyers practising
          at the firm, their designations, and their areas of practice.
        </p>
        <div className="mt-16">
          <Strata variant="strata" density={5} className="h-16 w-full opacity-60" />
        </div>
      </Section>

      <Section rhythm="lg" index="02" railLabel="Index">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
          {PEOPLE.map((person) => (
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
    </>
  );
}
