import { Section } from '@/components/Section';
import { Strata, InterlockingRings } from '@/components/Strata';
import { Eyebrow, DataValue } from '@/components/Eyebrow';
import { Rule } from '@/components/Rule';
import { LinkRow } from '@/components/LinkRow';
import { PersonCard } from '@/components/PersonCard';
import { PublicationCard } from '@/components/PublicationCard';
import { Prose } from '@/components/Prose';
import { EnquiryForm } from '@/components/EnquiryForm';
import { ContactChannels, OfficeAddress } from '@/components/ContactChannels';
import { TodoClient } from '@/components/TodoClient';
import { StratumSeal } from '@/components/brand/Seal';
import { orderedPracticeAreas } from '@/content/practice-areas';

/**
 * PHASE 2 PREVIEW — primitives on a blank page.
 *
 * This file is scaffolding, not the homepage. It exists so the shell and every
 * primitive can be reviewed in isolation before any page content is written.
 * Phase 3 replaces it entirely with the real home page.
 */

export default function PrimitivesPreview() {
  const areas = orderedPracticeAreas();

  return (
    <>
      <Section rhythm="md" index="00" railLabel="Preview">
        <Eyebrow tone="accent">Phase 2</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
          style={{ fontWeight: 300, letterSpacing: '-0.035em', fontVariationSettings: "'opsz' 72" }}
        >
          Primitives
        </h1>
        <p className="mt-8 max-w-(--container-measure) font-display text-body-lg text-paper-2">
          Shell and components rendering with no page content and no motion. Every
          value on this page derives from the phase 1 token system.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="01" railLabel="Strata">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          The strata motif
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          One primitive, three readings. Static, zero JavaScript.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          <figure>
            <Eyebrow as="figcaption">strata — compressing downward</Eyebrow>
            <div className="mt-4 h-40 border border-line p-4">
              <Strata variant="strata" className="h-full w-full" />
            </div>
          </figure>
          <figure>
            <Eyebrow as="figcaption">bars — even, vertical</Eyebrow>
            <div className="mt-4 h-40 border border-line p-4">
              <Strata variant="bars" className="h-full w-full" />
            </div>
          </figure>
          <figure>
            <Eyebrow as="figcaption">rules — ruled page</Eyebrow>
            <div className="mt-4 h-40 border border-line p-4">
              <Strata variant="rules" className="h-full w-full" />
            </div>
          </figure>
        </div>

        <div className="mt-10 flex flex-wrap items-end gap-12">
          <figure>
            <Eyebrow as="figcaption">accentIndex — one brass line</Eyebrow>
            <div className="mt-4 h-24 w-56 border border-line p-4">
              <Strata variant="strata" accentIndex={2} className="h-full w-full" />
            </div>
          </figure>
          <figure>
            <Eyebrow as="figcaption">rings — litigation rail marker</Eyebrow>
            <div className="mt-4 flex h-24 w-56 items-center border border-line p-4">
              <InterlockingRings className="h-10 w-auto text-paper-3" />
            </div>
          </figure>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="02" railLabel="Brand">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          Wordmark
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Live text from <code className="font-mono text-data">FIRM_TRADING_NAME</code>, not
          rasterised artwork. The rules above the name are the motif, so the mark and the
          strata are one object.
        </p>

        <div className="mt-10 flex flex-wrap items-end gap-x-16 gap-y-10">
          <div>
            <Eyebrow as="div">seal — 64px</Eyebrow>
            <StratumSeal
              ringColor="var(--color-brass)"
              emblemColor="var(--color-paper)"
              className="mt-4 h-16 w-16"
            />
          </div>
          <div>
            <Eyebrow as="div">seal — 40px</Eyebrow>
            <StratumSeal
              ringColor="var(--color-brass)"
              emblemColor="var(--color-paper)"
              className="mt-4 h-10 w-10"
            />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="03" railLabel="Type">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          Type scale
        </h2>
        <div className="mt-10 space-y-8">
          <TypeSpecimen
            label="display-1 · Newsreader 300 · 84px"
            className="text-display-2 md:text-display-1"
            opsz={72}
            tracking="-0.035em"
          />
          <TypeSpecimen
            label="display-2 · Newsreader 300 · 60px"
            className="text-h1 md:text-display-2"
            opsz={48}
            tracking="-0.03em"
          />
          <TypeSpecimen
            label="h1 · Newsreader 400 · 44px"
            className="text-h2 md:text-h1"
            opsz={32}
            tracking="-0.022em"
            weight={400}
          />
          <TypeSpecimen
            label="h2 · Newsreader 400 · 30px"
            className="text-h3 md:text-h2"
            opsz={24}
            tracking="-0.015em"
            weight={400}
          />
          <div>
            <Eyebrow as="div">h3 · Instrument Sans 500 · 21px</Eyebrow>
            <p className="mt-2 font-sans text-h3 font-medium text-paper">
              The paper becomes the brand mark
            </p>
          </div>
          <div>
            <Eyebrow as="div">body-lg · Newsreader 400 · 19px · article body</Eyebrow>
            <p className="mt-2 max-w-(--container-measure) font-display text-body-lg text-paper">
              Foreign investment into Nepal runs through a defined approval pathway. The
              Foreign Investment and Technology Transfer Act 2019 sets the minimum
              investment threshold and the approving authority for each class of investment.
            </p>
          </div>
          <div>
            <Eyebrow as="div">body · Instrument Sans 400 · 16px · UI</Eyebrow>
            <p className="mt-2 max-w-(--container-measure) text-body text-paper">
              Approval is the beginning rather than the end. Repatriation of dividends
              requires separate recording of the investment with Nepal Rastra Bank.
            </p>
          </div>
          <div>
            <Eyebrow as="div">body-sm · 14px · secondary</Eyebrow>
            <p className="mt-2 max-w-(--container-measure) text-body-sm text-paper-2">
              Secondary text sits on paper-2, which measures 8.1:1 against ink-000.
            </p>
          </div>
          <div>
            <Eyebrow as="div">label · JetBrains Mono 500 · 12px · the only uppercase</Eyebrow>
            <p className="mt-2">
              <Eyebrow>Nepal Bar Council</Eyebrow>
            </p>
          </div>
          <div>
            <Eyebrow as="div">data · JetBrains Mono 400 · 13px · reference values</Eyebrow>
            <p className="mt-2">
              <DataValue className="text-paper-2">NBC/2074/1189</DataValue>
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="04" railLabel="Rows">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          LinkRow
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Hover or tab through: the hairline lifts to line-hi, a brass rule scales in from
          the left, and the label shifts 2px. That is the entire hover vocabulary of the site.
        </p>
        <div className="mt-8">
          {areas.slice(0, 5).map((area, i) => (
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

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="05" railLabel="Rules">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          Rule
        </h2>
        <div className="mt-8 space-y-8">
          <div>
            <Eyebrow as="div">weight: line</Eyebrow>
            <Rule className="mt-3" />
          </div>
          <div>
            <Eyebrow as="div">weight: hi</Eyebrow>
            <Rule weight="hi" className="mt-3" />
          </div>
          <div>
            <Eyebrow as="div">accent — brass segment</Eyebrow>
            <Rule weight="hi" accent className="mt-3" />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="06" railLabel="People">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          PersonCard
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Rendered with no data supplied, which is the current state: the frame holds, the
          motif fills the portrait, and the missing facts are loud rather than absent.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {['a', 'b', 'c', 'd'].map((key) => (
            <PersonCard
              key={key}
              person={{
                slug: key,
                fullName: null,
                designation: null,
                licenceNumber: null,
                education: [],
                calledYear: null,
                practiceAreas: [],
                sectors: [],
                languages: [],
                email: null,
                photograph: null,
                bio: null,
              }}
            />
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="07" railLabel="Pubs">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          PublicationCard
        </h2>
        <div className="mt-8">
          <PublicationCard
            publication={{
              slug: 'fdi-approval-pathway-fitta-2019',
              title: 'The FDI approval pathway under FITTA 2019',
              date: '2026-06-18',
              practiceArea: 'foreign-direct-investment',
              author: null,
              summary:
                'Which authority approves an investment, what the thresholds are, and where the timetable usually slips.',
              readingMinutes: 9,
            }}
            areaTitle="Foreign direct investment"
          />
          <PublicationCard
            publication={{
              slug: 'stub-example',
              title: 'A seeded index entry with no article behind it',
              date: '2026-05-02',
              practiceArea: 'tax',
              author: null,
              summary:
                'Stub entries exercise filtering and pagination before real volume exists.',
              readingMinutes: 6,
              isStub: true,
            }}
            areaTitle="Tax"
          />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="08" railLabel="Prose">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          Prose — paper ground
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Publications invert. Same tokens, remapped under{' '}
          <code className="font-mono text-data">[data-surface=&quot;paper&quot;]</code>.
        </p>
        <div data-surface="paper" className="mt-8 border border-line p-8 md:p-12">
          <Prose>
            <h2>Recording the investment</h2>
            <p>
              Approval under the Foreign Investment and Technology Transfer Act 2019 permits
              the investment to be made. It does not, by itself, permit the proceeds to leave
              the country. Repatriation depends on the investment having been recorded with
              Nepal Rastra Bank.
            </p>
            <p>
              The recording is a separate step, made after the funds arrive, and it is the
              step most often left until a dividend is declared — at which point the
              documentary trail is years old.
            </p>
            <h3>What the bank looks for</h3>
            <ul>
              <li>The approval letter from the Department of Industry</li>
              <li>Evidence the funds entered through the banking channel</li>
              <li>The share certificate and updated shareholder register</li>
            </ul>
            <blockquote>
              A security interest that is imperfectly registered may not survive the
              borrower becoming insolvent.
            </blockquote>
            <p>
              Rates are set annually by the Finance Act, so any figure quoted here is
              accurate only to the fiscal year in which it was written.
            </p>
          </Prose>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="09" railLabel="Form">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          EnquiryForm
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Submit empty to see validation. Errors say what to fix and move focus to the first
          failing field. Submission is stubbed — no backend yet.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_20rem]">
          <EnquiryForm
            matterTypes={areas.map((area) => ({ value: area.slug, label: area.title }))}
          />
          <div>
            <Eyebrow as="div">Channels</Eyebrow>
            <ContactChannels className="mt-4" />
            <div className="mt-8">
              <Eyebrow as="div">Office</Eyebrow>
              <div className="mt-4">
                <OfficeAddress />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="md" index="10" railLabel="Todo">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          TodoClient
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Renders in production deliberately. A placeholder that disappears at build time is
          a placeholder that ships empty and nobody notices.
        </p>
        <p className="mt-6">
          <TodoClient>Nepal Bar Council licence number</TodoClient>
        </p>
      </Section>
    </>
  );
}

function TypeSpecimen({
  label,
  className,
  opsz,
  tracking,
  weight = 300,
}: {
  label: string;
  className: string;
  opsz: number;
  tracking: string;
  weight?: number;
}) {
  return (
    <div>
      <Eyebrow as="div">{label}</Eyebrow>
      <p
        className={`mt-2 font-display text-paper ${className}`}
        style={{
          fontWeight: weight,
          letterSpacing: tracking,
          fontVariationSettings: `'opsz' ${opsz}`,
          lineHeight: 1.02,
        }}
      >
        Layers of certainty
      </p>
    </div>
  );
}
