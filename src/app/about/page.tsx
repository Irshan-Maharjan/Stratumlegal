import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow, DataValue } from '@/components/Eyebrow';
import { Rule } from '@/components/Rule';
import { TodoClient } from '@/components/TodoClient';
import { CONTACT, FIRM_LEGAL_NAME, FIRM_TRADING_NAME, REGISTRATION } from '@/config/firm';
import { PEOPLE } from '@/content/people';

export const metadata: Metadata = {
  title: 'About',
  description:
    `${FIRM_LEGAL_NAME} — firm philosophy, registration detail, and Bar Council licence numbers of the practising lawyers.`,
};

export default function AboutPage() {
  return (
    <>
      <Section rhythm="md" index="01" railLabel="About" as="header">
        <Eyebrow tone="accent">About the firm</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
          style={{ fontWeight: 800, letterSpacing: '-0.03em' }}
        >
          {FIRM_TRADING_NAME}
        </h1>
        <div className="mt-14">
          <Rule weight="hi" />
        </div>
      </Section>

      <Section rhythm="sm" index="02" railLabel="Approach" measure>
        <div className="space-y-5 font-display text-body-lg text-paper-2">
          <p>
            {FIRM_LEGAL_NAME} advises corporate clients on Nepali law: foreign investors
            entering the market, banks and financial institutions, energy and
            infrastructure developers, and established Nepali businesses. Criminal and
            white-collar litigation is a real but secondary practice.
          </p>
          <p>
            The firm&rsquo;s work concentrates on transactions and regulatory questions
            that require precise knowledge of Nepali statute and procedure — foreign
            investment approval, company registration, banking and security law, and the
            regulatory frameworks governing energy and infrastructure projects. Where a
            matter proceeds to dispute, the firm represents clients before the Nepali
            courts and in arbitration.
          </p>
          <p>
            The firm publishes analysis of Nepali statutes and regulatory change as a
            matter of professional practice — see{' '}
            <a
              href="/publications"
              className="text-paper underline decoration-line-hi underline-offset-4 transition-colors duration-(--duration-hover) hover:decoration-brass"
            >
              publications
            </a>
            .
          </p>
        </div>
      </Section>

      <Section rhythm="sm" index="03" railLabel="Registration">
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Registration
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Published registration detail is the strongest available trust signal in a
          market with many unverifiable &ldquo;law firms&rdquo; online.
        </p>

        <div className="mt-8">
          <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-body-sm text-paper-3">Registered name</dt>
              <dd className="mt-1 text-body-sm text-paper">{FIRM_LEGAL_NAME}</dd>
            </div>
            <div>
              <dt className="text-body-sm text-paper-3">Trading name</dt>
              <dd className="mt-1 text-body-sm text-paper">{FIRM_TRADING_NAME}</dd>
            </div>
            <div>
              <dt className="text-body-sm text-paper-3">Company registration number</dt>
              <dd className="mt-1">
                {REGISTRATION.companyNumber ? (
                  <DataValue className="text-paper">{REGISTRATION.companyNumber}</DataValue>
                ) : (
                  <TodoClient>firm registration number</TodoClient>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-body-sm text-paper-3">PAN</dt>
              <dd className="mt-1">
                {REGISTRATION.pan ? (
                  <DataValue className="text-paper">{REGISTRATION.pan}</DataValue>
                ) : (
                  <TodoClient>PAN</TodoClient>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-body-sm text-paper-3">Year established</dt>
              <dd className="mt-1">
                {REGISTRATION.established ? (
                  <DataValue className="text-paper">{REGISTRATION.established}</DataValue>
                ) : (
                  <TodoClient>year established</TodoClient>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-body-sm text-paper-3">Office address</dt>
              <dd className="mt-1 text-body-sm text-paper">
                {CONTACT.address.line1 ? (
                  <>
                    {CONTACT.address.line1}
                    {CONTACT.address.ward ? `, ${CONTACT.address.ward}` : ''}, {CONTACT.address.city},{' '}
                    {CONTACT.address.country}
                  </>
                ) : (
                  <TodoClient>office address</TodoClient>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section rhythm="sm" index="04" railLabel="Licences">
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Bar Council licences
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Nepal Bar Council licence numbers of the lawyers practising at the firm. Full
          profiles are at{' '}
          <a
            href="/people"
            className="text-paper underline decoration-line-hi underline-offset-4 transition-colors duration-(--duration-hover) hover:decoration-brass"
          >
            /people
          </a>
          .
        </p>

        <div className="mt-8">
          {PEOPLE.map((person) => (
            <div
              key={person.slug}
              className="flex flex-col gap-2 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span className="min-w-0 text-body-sm text-paper">
                {person.fullName ?? <TodoClient>lawyer full name</TodoClient>}
              </span>
              <span className="shrink-0">
                {person.licenceNumber ? (
                  <DataValue className="text-paper-2">{person.licenceNumber}</DataValue>
                ) : (
                  <TodoClient>licence number</TodoClient>
                )}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section rhythm="md" index="05" railLabel="Note">
        <Rule className="mb-8" />
        <p className="max-w-(--container-measure) text-body-sm text-paper-3">
          This page states registration and licensing detail as permitted under the
          Rules of Professional Code of Conduct of Legal Practitioners, 2079 (2023). It
          does not describe outcomes in any matter, and nothing on this page should be
          read as a comparison with any other firm.
        </p>
      </Section>
    </>
  );
}
