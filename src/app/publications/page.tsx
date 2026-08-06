import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Strata } from '@/components/Strata';
import { PUBLICATIONS } from '@/content/publications';
import { PRACTICE_AREAS } from '@/content/practice-areas';
import { PublicationsFilter } from './PublicationsFilter';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Analysis of Nepali statutes, regulatory change, and issues of public concern, from Stratum Legal.',
};

export default function PublicationsPage() {
  const areaOptions = PRACTICE_AREAS.filter((a) =>
    PUBLICATIONS.some((p) => p.practiceArea === a.slug)
  )
    .sort((a, b) => a.order - b.order)
    .map((a) => ({ slug: a.slug, title: a.title }));

  return (
    <>
      <Section rhythm="md" index="01" railLabel="Publications" as="header">
        <Eyebrow tone="accent">Publications</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
          style={{ fontWeight: 300, letterSpacing: '-0.035em', fontVariationSettings: "'opsz' 72" }}
        >
          Publications
        </h1>
        <p className="mt-8 max-w-(--container-measure) font-display text-body-lg text-paper-2">
          Analysis of Nepali statutes and regulatory change. This is how the firm
          demonstrates its expertise — not by describing outcomes in matters it has
          handled, but by writing plainly about the law.
        </p>
        <div className="mt-14">
          <Strata variant="rules" density={7} className="h-16 w-full opacity-50" />
        </div>
      </Section>

      <Section rhythm="lg" index="02" railLabel="Index">
        <PublicationsFilter publications={PUBLICATIONS} areaOptions={areaOptions} />
      </Section>
    </>
  );
}
