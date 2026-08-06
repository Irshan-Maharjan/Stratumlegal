import Link from 'next/link';
import { Section } from '@/components/Section';
import { Strata } from '@/components/Strata';
import { Eyebrow } from '@/components/Eyebrow';
import { LinkRow } from '@/components/LinkRow';
import { PersonCard } from '@/components/PersonCard';
import { PublicationCard } from '@/components/PublicationCard';
import { ContactChannels, OfficeAddress } from '@/components/ContactChannels';
import { StratumSeal } from '@/components/brand/Seal';
import { HeroGate } from '@/components/motion/HeroGate';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { CONTACT, FIRM_TRADING_NAME } from '@/config/firm';
import { getPracticeArea, orderedPracticeAreas } from '@/content/practice-areas';
import { PEOPLE } from '@/content/people';
import { PUBLICATIONS } from '@/content/publications';

/**
 * Home. Six sections per the brief, in order: hero, what we do, the firm
 * briefly, people, recent publications, contact block. No stat counters, no
 * imagery of scales/gavels/courthouses/handshakes beyond the seal itself
 * (which the client asked to be used sitewide as the primary mark), and no
 * urgency language anywhere.
 */

export default function HomePage() {
  const areas = orderedPracticeAreas();
  const featuredPeople = PEOPLE.slice(0, 4);
  const recentPublications = PUBLICATIONS.slice(0, 3);

  return (
    <>
      {/* 1. Hero — the load sequence resolves into exactly this composition. */}
      <HeroGate>
        <Section rhythm="lg" index="00" railLabel="Home" as="header" className="pt-20 md:pt-28">
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-16">
            <StratumSeal
              ringColor="var(--color-brass)"
              emblemColor="var(--color-paper)"
              className="h-28 w-28 shrink-0 md:h-40 md:w-40"
            />
            <div>
              <Eyebrow tone="accent">Kathmandu, Nepal</Eyebrow>
              <h1
                className="mt-5 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
                style={{ fontWeight: 300, letterSpacing: '-0.035em', fontVariationSettings: "'opsz' 72" }}
              >
                {FIRM_TRADING_NAME}
              </h1>
              <p className="mt-7 max-w-(--container-measure) font-display text-body-lg text-paper-2">
                Corporate and commercial law for foreign investors, financial institutions,
                and energy and infrastructure developers in Nepal.
              </p>
              <div className="mt-9">
                <Link
                  href="/contact"
                  className="inline-block border border-line-hi px-6 py-3 text-body-sm text-paper transition-colors duration-(--duration-hover) hover:border-brass"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                >
                  Start a conversation
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 md:mt-28">
            <Strata variant="strata" density={7} className="h-24 w-full opacity-60" />
          </div>
        </Section>
      </HeroGate>

      {/* 2. What we do */}
      <ScrollReveal>
        <Section rhythm="lg" index="01" railLabel="Practice">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
              What we do
            </h2>
            <Link
              href="/practice"
              className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
            >
              All practice areas →
            </Link>
          </div>
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
      </ScrollReveal>

      {/* 3. The firm, briefly */}
      <ScrollReveal>
        <Section rhythm="md" index="02" railLabel="Firm" measure>
          <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
            The firm, briefly
          </h2>
          <div className="mt-8 space-y-5 font-display text-body-lg text-paper-2">
            <p>
              {FIRM_TRADING_NAME} advises corporate clients on Nepali law — foreign
              investment approval, company formation, banking and security, and the
              regulatory frameworks governing energy and infrastructure projects.
            </p>
            <p>
              Criminal and white-collar litigation is a real but secondary practice,
              handled separately from the firm&rsquo;s corporate work.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/about"
              className="text-body-sm text-paper underline decoration-line-hi underline-offset-4 transition-colors duration-(--duration-hover) hover:decoration-brass"
            >
              More about the firm →
            </Link>
          </div>
        </Section>
      </ScrollReveal>

      {/* 4. People */}
      <ScrollReveal>
        <Section rhythm="lg" index="03" railLabel="People">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
              People
            </h2>
            <Link
              href="/people"
              className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
            >
              All people →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {featuredPeople.map((person) => (
              <PersonCard
                key={person.slug}
                person={person}
                areaTitles={person.practiceAreas
                  .map((slug) => getPracticeArea(slug)?.title)
                  .filter((t): t is string => Boolean(t))
                  .slice(0, 1)}
              />
            ))}
          </div>
        </Section>
      </ScrollReveal>

      {/* 5. Recent publications */}
      <ScrollReveal>
        <Section rhythm="md" index="04" railLabel="Reading">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
              Recent publications
            </h2>
            <Link
              href="/publications"
              className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
            >
              All publications →
            </Link>
          </div>
          <div className="mt-6">
            {recentPublications.map((pub) => (
              <PublicationCard
                key={pub.slug}
                publication={pub}
                areaTitle={getPracticeArea(pub.practiceArea)?.title}
                compact
              />
            ))}
          </div>
        </Section>
      </ScrollReveal>

      {/* 6. Contact block */}
      <ScrollReveal>
        <Section rhythm="lg" index="05" railLabel="Contact">
          <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
            Get in touch
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <Eyebrow as="div">Office</Eyebrow>
              <div className="mt-4">
                <OfficeAddress />
              </div>
              {CONTACT.officeHours && (
                <p className="mt-4 text-body-sm text-paper-3">{CONTACT.officeHours}</p>
              )}
            </div>
            <div>
              <Eyebrow as="div">Reach us directly</Eyebrow>
              <ContactChannels className="mt-4" />
            </div>
            <div>
              <Eyebrow as="div">Enquiry form</Eyebrow>
              <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
                Prefer to write? The contact page has a short form for enquiries that are
                easier to put in writing.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block border border-line-hi px-5 py-2.5 text-body-sm text-paper transition-colors duration-(--duration-hover) hover:border-brass"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                Go to contact
              </Link>
            </div>
          </div>
        </Section>
      </ScrollReveal>
    </>
  );
}
