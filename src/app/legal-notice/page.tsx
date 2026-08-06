import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Rule } from '@/components/Rule';
import { StratumSeal } from '@/components/brand/Seal';
import { DISCLAIMER, FIRM_LEGAL_NAME, FIRM_TRADING_NAME } from '@/config/firm';

export const metadata: Metadata = {
  title: 'Legal notice',
  description: `Disclaimer and privacy notice for the ${FIRM_TRADING_NAME} website.`,
};

export default function LegalNoticePage() {
  return (
    <>
      <Section rhythm="md" index="01" railLabel="Legal" as="header">
        <StratumSeal
          ringColor="var(--color-brass)"
          emblemColor="var(--color-paper)"
          className="mb-8 h-16 w-16 opacity-90"
        />
        <Eyebrow tone="accent">Legal notice</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.05] text-paper"
          style={{ fontWeight: 300, letterSpacing: '-0.03em', fontVariationSettings: "'opsz' 48" }}
        >
          Disclaimer &amp; privacy
        </h1>
      </Section>

      <Section rhythm="sm" index="02" railLabel="Disclaimer" measure>
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Disclaimer
        </h2>
        <p className="mt-5 text-body-sm text-paper-2">{DISCLAIMER}</p>
        <p className="mt-5 text-body-sm text-paper-2">
          Nothing on this website is legal advice specific to any person&rsquo;s
          circumstances. The information presented, including the practice area pages
          and publications, describes the general legal and regulatory framework in
          Nepal as understood at the time of writing and may not reflect subsequent
          changes in law or regulatory practice.
        </p>
        <p className="mt-5 text-body-sm text-paper-2">
          {FIRM_LEGAL_NAME} accepts no responsibility for actions taken in reliance on
          the content of this website without independent legal advice.
        </p>
      </Section>

      <Section rhythm="sm" index="03" railLabel="Privacy" measure>
        <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
          Privacy
        </h2>
        <p className="mt-5 text-body-sm text-paper-2">
          Information submitted through the enquiry form on this website — name,
          organisation, email, phone, matter type, and message — is used solely to
          respond to the enquiry. It is not shared with third parties except where
          necessary to respond to the enquiry itself, and is not used for marketing
          without separate consent.
        </p>
        <p className="mt-5 text-body-sm text-paper-2">
          This website does not use tracking cookies or third-party analytics beyond
          what is necessary for the site to function.
        </p>
      </Section>

      <Section rhythm="md" index="04" railLabel="Note">
        <Rule className="mb-8" />
        <p className="max-w-(--container-measure) text-body-sm text-paper-3">
          This page is provided for general information and does not constitute a
          binding terms-of-service agreement. Contact the firm directly with any
          questions about this notice.
        </p>
      </Section>
    </>
  );
}
