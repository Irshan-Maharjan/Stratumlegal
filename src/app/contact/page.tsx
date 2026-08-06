import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { EnquiryForm } from '@/components/EnquiryForm';
import { ContactChannels, OfficeAddress } from '@/components/ContactChannels';
import { TodoClient } from '@/components/TodoClient';
import { CONTACT } from '@/config/firm';
import { orderedPracticeAreas } from '@/content/practice-areas';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Stratum Legal in Kathmandu — phone, Viber, WhatsApp, email, and enquiry form.',
};

export default function ContactPage() {
  const areas = orderedPracticeAreas();

  return (
    <>
      <Section rhythm="md" index="01" railLabel="Contact" as="header">
        <Eyebrow tone="accent">Contact</Eyebrow>
        <h1
          className="mt-6 font-display text-display-2 leading-[1.02] text-paper md:text-display-1 md:leading-[0.94]"
          style={{ fontWeight: 300, letterSpacing: '-0.035em', fontVariationSettings: "'opsz' 72" }}
        >
          Get in touch
        </h1>
        <p className="mt-8 max-w-(--container-measure) font-display text-body-lg text-paper-2">
          Telephone, Viber and WhatsApp reach the firm fastest. The form below is for
          enquiries that are easier to put in writing.
        </p>
      </Section>

      <Section rhythm="lg" index="02" railLabel="Details">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_22rem]">
          <div>
            <h2 className="font-display text-h2 text-paper" style={{ letterSpacing: '-0.015em' }}>
              Send an enquiry
            </h2>
            <div className="mt-8">
              <EnquiryForm
                matterTypes={areas.map((area) => ({ value: area.slug, label: area.title }))}
              />
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <Eyebrow as="div">Reach us directly</Eyebrow>
              <ContactChannels className="mt-5" />
            </div>

            <div>
              <Eyebrow as="div">Office</Eyebrow>
              <div className="mt-5">
                <OfficeAddress />
              </div>
              <div className="mt-5">
                {CONTACT.officeHours ? (
                  <p className="text-body-sm text-paper-2">{CONTACT.officeHours}</p>
                ) : (
                  <TodoClient>office hours</TodoClient>
                )}
              </div>
            </div>

            <div>
              <Eyebrow as="div">Map</Eyebrow>
              <div className="mt-5">
                {CONTACT.mapUrl ? (
                  <a
                    href={CONTACT.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-line p-4 text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:border-line-hi hover:text-paper"
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  >
                    View on Google Maps →
                  </a>
                ) : (
                  <div
                    className="border border-line p-4"
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  >
                    <TodoClient>Google Maps link or coordinates</TodoClient>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Sticky mobile channel bar — the brief notes these outperform the form in Nepal. */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink-000 lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ContactChannels layout="inline" />
      </div>
      {/* Spacer so the sticky bar never overlaps the form's submit button. */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </>
  );
}
