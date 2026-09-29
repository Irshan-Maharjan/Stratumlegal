import Link from 'next/link';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { PersonCard } from '@/components/PersonCard';
import { PublicationCard } from '@/components/PublicationCard';
import { TrustBand } from '@/components/TrustBand';
import { ContactPanel } from '@/components/ContactPanel';
import { Figure } from '@/components/media/Figure';
import { Hero } from '@/components/motion/Hero';
import { PinnedPractice } from '@/components/motion/PinnedPractice';
import { StatuteMarquee } from '@/components/motion/StatuteMarquee';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { FIRM_TRADING_NAME } from '@/config/firm';
import {
  allRegulatorNames,
  allStatuteNames,
  getPracticeArea,
  orderedPracticeAreas,
} from '@/content/practice-areas';
import { PEOPLE } from '@/content/people';
import { PUBLICATIONS } from '@/content/publications';

/**
 * Home.
 *
 * Every section is deliberately a different shape, so the page reads as a
 * sequence rather than one repeating block:
 *
 *   hero          full-bleed, type-led, image right
 *   practice      pinned; scrolling advances one area at a time
 *   photograph    full-bleed band, parallax
 *   trust         reversed panel, counters
 *   firm          two columns, text beside image
 *   people        grid
 *   statute       full-bleed marquee, two rows drifting opposite ways
 *   publications  numbered editorial index
 *   contact       reversed panel, the phone number at display size
 *
 * The two reversed panels bracket the lower half of the page, and no two
 * adjacent sections share a layout.
 *
 * No imagery of gavels, courthouses or handshakes, and no urgency language —
 * both read wrong to a general counsel, and the second is restricted under
 * Nepal Bar Council advertising rules.
 */

export default function HomePage() {
  const areas = orderedPracticeAreas();
  const featuredPeople = PEOPLE.slice(0, 4);
  const recentPublications = PUBLICATIONS.slice(0, 3);
  const statutes = allStatuteNames();
  const regulators = allRegulatorNames();

  return (
    <>
      <Hero />

      {/* Practice — pinned on wide screens, a plain list everywhere else. */}
      <section className="py-(--spacing-section-md)">
        <div className="mx-auto mb-12 w-full max-w-(--container-shell) px-5 md:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <Eyebrow tone="accent">What we do</Eyebrow>
              <h2 className="mt-4 font-display text-h1">Practice areas</h2>
            </div>
            <Link
              href="/practice"
              className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
            >
              All practice areas →
            </Link>
          </div>
        </div>
        <PinnedPractice
          areas={areas.map((a) => ({ slug: a.slug, title: a.title, summary: a.summary }))}
        />
      </section>

      {/* A full-bleed band of rock strata, sitting immediately above the
          reversed panel so the page steps ground → photograph → ink rather
          than jumping straight from white to black. */}
      <Figure
        src="/img/strata-band.jpg"
        alt="Horizontal bands of layered rock, photographed in black and white"
        width={2000}
        height={900}
        sizes="100vw"
        parallax={16}
        className="h-[38vh] w-full md:h-[52vh]"
      />

      <TrustBand />

      {/* The firm, briefly */}
      <ScrollReveal>
        <Section rhythm="md" index="02" railLabel="Firm">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <h2 className="font-display text-h1">The firm, briefly</h2>
              <div className="mt-8 max-w-(--container-measure) space-y-5 text-body-lg text-paper-2">
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
            </div>

            <Figure
              src="/img/strata-hero.jpg"
              alt="A cliff face of tilted rock layers, photographed in black and white"
              width={1800}
              height={1500}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-[4/3] w-full"
            />
          </div>
        </Section>
      </ScrollReveal>

      {/* People */}
      <ScrollReveal>
        <Section rhythm="lg" index="03" railLabel="People">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-h1">People</h2>
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

      {/* The instruments the firm works against. Two drifting rows of the
          actual statutes and regulators recorded in the practice-area data —
          specificity as the credibility argument, and a band of pure texture
          between two text-heavy sections. */}
      <ScrollReveal>
        <Section rhythm="md" index="04" railLabel="Statute">
          <div className="max-w-(--container-measure)">
            <Eyebrow tone="accent">The law we work in</Eyebrow>
            <h2 className="mt-4 font-display text-h1">
              Nepali statute, cited precisely.
            </h2>
            <p className="mt-6 text-body-lg text-paper-2">
              Advice is only as good as the instrument it rests on. These are the
              Acts and regulators our practice areas are actually built against.
            </p>
          </div>
        </Section>
        {/* Outside <Section>: the marquee is full-bleed, and the rail/measure
            grid would box it back into the text column. */}
        <div className="pb-(--spacing-section-md)">
          <StatuteMarquee rows={[statutes, regulators]} />
        </div>
      </ScrollReveal>

      {/* Recent publications — a numbered editorial index rather than cards,
          so it reads as a journal contents page and not as a third grid. */}
      <ScrollReveal>
        <Section rhythm="md" index="05" railLabel="Reading">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-h1">Recent publications</h2>
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

      {/* Contact — reversed, so the page closes on ink the way the trust band
          opened it, and the last thing on screen is a way to reach a partner
          rather than another column of body copy. */}
      <ContactPanel />
    </>
  );
}
