import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Rule } from '@/components/Rule';
import { TodoClient } from '@/components/TodoClient';
import { ROLES } from '@/content/roles';
import { CONTACT, FIRM_TRADING_NAME } from '@/config/firm';

export const metadata: Metadata = {
  title: 'Careers',
  description: `Open roles and internship applications at ${FIRM_TRADING_NAME} in Kathmandu.`,
};

export default function CareersPage() {
  return (
    <>
      <Section rhythm="md" index="01" railLabel="Careers" as="header">
        <Eyebrow tone="accent">Careers</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
          style={{ fontWeight: 800, letterSpacing: '-0.03em' }}
        >
          Work with us
        </h1>
        <p className="mt-8 max-w-(--container-measure) font-display text-body-lg text-paper-2">
          Open roles for lawyers and internships for students and recent graduates.
        </p>
        <div className="mt-14">
          <Rule weight="hi" />
        </div>
      </Section>

      <Section rhythm="sm" index="02" railLabel="Roles">
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Open roles
        </h2>
        <div className="mt-8">
          {ROLES.map((role) => (
            <div key={role.slug} className="border-b border-line py-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Eyebrow>{role.type}</Eyebrow>
                <span aria-hidden="true" className="text-paper-3">
                  ·
                </span>
                <Eyebrow>{role.location}</Eyebrow>
              </div>
              <h3
                className="mt-3 font-display text-h2 text-paper"
                style={{ fontWeight: 500, letterSpacing: '-0.015em' }}
              >
                {role.title}
              </h3>
              <p className="mt-3 max-w-(--container-measure) text-body-sm text-paper-2">{role.summary}</p>

              <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow as="div">Responsibilities</Eyebrow>
                  <ul className="mt-3 space-y-2">
                    {role.responsibilities.map((r) => (
                      <li key={r} className="flex gap-3 text-body-sm text-paper-2">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-line-hi" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Eyebrow as="div">Requirements</Eyebrow>
                  <ul className="mt-3 space-y-2">
                    {role.requirements.map((r) => (
                      <li key={r} className="flex gap-3 text-body-sm text-paper-2">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-line-hi" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {role.closingDate ? (
                <p className="mt-6 font-mono text-data text-paper-3">
                  Applications close {role.closingDate}
                </p>
              ) : (
                <p className="mt-6 font-mono text-data text-paper-3">Applications open, no stated closing date</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section rhythm="sm" index="03" railLabel="Internships">
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Internships
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          The firm accepts internship applications from law students on a rolling basis.
          Internships are unpaid or stipend-based depending on duration —{' '}
          <TodoClient>internship terms and stipend policy</TodoClient>.
        </p>
      </Section>

      <Section rhythm="md" index="04" railLabel="Apply">
        <Rule className="mb-10" />
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          How to apply
        </h2>
        <p className="mt-4 max-w-(--container-measure) text-body-sm text-paper-2">
          Send a CV and a short cover note to{' '}
          {CONTACT.email ? (
            <a
              href={`mailto:${CONTACT.email}?subject=Application`}
              className="text-paper underline decoration-line-hi underline-offset-4 transition-colors duration-(--duration-hover) hover:decoration-brass"
            >
              {CONTACT.email}
            </a>
          ) : (
            <TodoClient>recruitment email address</TodoClient>
          )}
          , stating the role or internship period you are applying for.
        </p>
      </Section>
    </>
  );
}
