import { Section } from '@/components/Section';
import { Eyebrow, DataValue } from '@/components/Eyebrow';
import { Rule } from '@/components/Rule';
import { LinkRow } from '@/components/LinkRow';
import { PersonCard } from '@/components/PersonCard';
import { PublicationCard } from '@/components/PublicationCard';
import { Prose } from '@/components/Prose';
import { EnquiryForm } from '@/components/EnquiryForm';
import { ContactChannels, OfficeAddress } from '@/components/ContactChannels';
import { TodoClient } from '@/components/TodoClient';
import { FIRM_SHORT } from '@/config/firm';
import { orderedPracticeAreas } from '@/content/practice-areas';

/**
 * DEV PREVIEW — primitives on a blank page.
 *
 * Internal style guide, not a real route in the site's IA (route group
 * `(dev)`). Exercises every Stratum token and component in isolation, useful
 * for visually verifying the rebrand: wordmark, colour palette, type scale,
 * rows, rules, cards, prose, and the form.
 */

export default function PrimitivesPreview() {
  const areas = orderedPracticeAreas();

  return (
    <>
      <Section rhythm="md" index="00" railLabel="Preview">
        <Eyebrow tone="accent">Dev preview</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
          style={{ fontWeight: 800, letterSpacing: '-0.03em' }}
        >
          Primitives
        </h1>
        <p className="mt-8 max-w-(--container-measure) font-display text-body-lg text-paper-2">
          Shell and components rendering with no page content and no motion. Every
          value on this page derives from the Stratum token system.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="01" railLabel="Colour">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          Palette
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Ink, Ground, Signal Red, and Grey 600 — the entire palette. No second accent,
          no tint system.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { name: 'Ink', hex: '#201E1D', var: '--color-paper' },
            { name: 'Ground', hex: '#F3F2F2', var: '--color-ink-000' },
            { name: 'Signal Red', hex: '#EC3013', var: '--color-brass' },
            { name: 'Grey 600', hex: '#605D5D', var: '--color-paper-2' },
          ].map((swatch) => (
            <figure key={swatch.hex}>
              <div
                className="h-24 w-full border border-line"
                style={{ backgroundColor: `var(${swatch.var})` }}
              />
              <figcaption className="mt-3">
                <span className="block text-body-sm text-paper">{swatch.name}</span>
                <span className="mt-0.5 block font-mono text-data text-paper-3">{swatch.hex}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="02" railLabel="Brand">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          Wordmark
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Set live in Archivo, not rasterised artwork — <code className="font-mono text-data">FIRM_SHORT</code>{' '}
          in weight 800 above a rule, &ldquo;LAW ASSOCIATES&rdquo; in weight 500 below it. No
          symbol: the identity is the wordmark alone.
        </p>

        <div className="mt-10">
          <span
            className="block font-display uppercase text-paper"
            style={{ fontWeight: 800, letterSpacing: '-0.03em', fontSize: '3rem' }}
          >
            {FIRM_SHORT}
          </span>
          <div className="mt-3 h-px w-24" style={{ backgroundColor: 'var(--color-line-hi)' }} />
          <span
            className="mt-3 block font-sans uppercase text-paper-3"
            style={{ fontWeight: 500, letterSpacing: '0.34em', fontSize: '0.85rem' }}
          >
            Law Associates
          </span>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section rhythm="sm" index="03" railLabel="Type">
        <h2 className="font-display text-h1 text-paper" style={{ letterSpacing: '-0.022em' }}>
          Type scale
        </h2>
        <div className="mt-10 space-y-8">
          <TypeSpecimen
            label="display-1 · Archivo 800 · 84px"
            className="text-display-2 md:text-display-1"
            tracking="-0.03em"
          />
          <TypeSpecimen
            label="display-2 · Archivo 800 · 60px"
            className="text-h1 md:text-display-2"
            tracking="-0.03em"
          />
          <TypeSpecimen
            label="h1 · Archivo 800 · 44px"
            className="text-h2 md:text-h1"
            tracking="-0.022em"
          />
          <TypeSpecimen
            label="h2 · Archivo 800 · 30px"
            className="text-h3 md:text-h2"
            tracking="-0.015em"
          />
          <div>
            <Eyebrow as="div">h3 / subhead · Archivo 500 · 21px</Eyebrow>
            <p className="mt-2 font-sans text-h3 font-medium text-paper">
              Precision over expression
            </p>
          </div>
          <div>
            <Eyebrow as="div">body-lg · Archivo 400 · 19px · article body</Eyebrow>
            <p className="mt-2 max-w-(--container-measure) font-display text-body-lg text-paper">
              Foreign investment into Nepal runs through a defined approval pathway. The
              Foreign Investment and Technology Transfer Act 2019 sets the minimum
              investment threshold and the approving authority for each class of investment.
            </p>
          </div>
          <div>
            <Eyebrow as="div">body · Archivo 400 · 16px · UI</Eyebrow>
            <p className="mt-2 max-w-(--container-measure) text-body text-paper">
              Approval is the beginning rather than the end. Repatriation of dividends
              requires separate recording of the investment with Nepal Rastra Bank.
            </p>
          </div>
          <div>
            <Eyebrow as="div">body-sm · 14px · secondary</Eyebrow>
            <p className="mt-2 max-w-(--container-measure) text-body-sm text-paper-2">
              Secondary text sits on paper-2 (Grey 600), which measures 5.7:1 against ground.
            </p>
          </div>
          <div>
            <Eyebrow as="div">label · Archivo 500 · 12px · +80 tracking, uppercase</Eyebrow>
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
          Hover or tab through: the hairline lifts to line-hi, a Signal Red rule scales in
          from the left, and the label shifts 2px. That is the entire hover vocabulary of
          the site.
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
            <Eyebrow as="div">accent — Signal Red segment</Eyebrow>
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
          Prose
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Publications render on the same default ground as every other page — no
          separate surface to invert to.
        </p>
        <div className="mt-8 border border-line p-8 md:p-12">
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
  tracking,
  weight = 800,
}: {
  label: string;
  className: string;
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
          lineHeight: 1.02,
        }}
      >
        Precision, continuity, discretion
      </p>
    </div>
  );
}
