import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { LinkRow } from '@/components/LinkRow';
import { orderedPracticeAreas } from '@/content/practice-areas';
import { FIRM_TRADING_NAME } from '@/config/firm';

export const metadata: Metadata = {
  title: 'Practice areas',
  description:
    `Foreign direct investment, corporate and commercial, banking and finance, energy and infrastructure, and other areas of practice at ${FIRM_TRADING_NAME} in Kathmandu.`,
};

export default function PracticePage() {
  const areas = orderedPracticeAreas();

  return (
    <>
      <Section rhythm="md" index="01" railLabel="Practice" as="header">
        <Eyebrow tone="accent">Practice areas</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
          style={{ fontWeight: 800, letterSpacing: '-0.03em' }}
        >
          What we do
        </h1>
        <p className="mt-8 max-w-(--container-measure) font-display text-body-lg text-paper-2">
          Corporate and commercial work for foreign investors, financial institutions
          and developers, in priority order. Criminal and white-collar litigation is a
          real but secondary practice.
        </p>
      </Section>

      <Section rhythm="lg" index="02" railLabel="Index">
        <div>
          {areas.map((area, i) => (
            <LinkRow
              key={area.slug}
              href={`/practice/${area.slug}`}
              index={String(i + 1).padStart(2, '0')}
              label={area.title}
              description={area.summary}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
