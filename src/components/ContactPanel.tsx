import Link from 'next/link';
import { CONTACT, digitsOnly } from '@/config/firm';
import { TodoClient } from './TodoClient';

/**
 * The homepage's closing contact block, reversed onto ink.
 *
 * Deliberately NOT <ContactChannels>: that component is built for the light
 * ground and uses --color-paper for its text, which is black-on-black here.
 * Rather than teach it a second theme for one call site, this panel states
 * its own reversed colours.
 *
 * The mobile number is the focal point at display size. In Nepal a phone call
 * substantially outperforms a web form for corporate enquiries, and the
 * enquiry form on /contact is still a stub, so pointing the page's final call
 * to action at a live tel: link is both the honest and the effective choice.
 */

/** Reversed-ground tones. Measured against #000: 15.1:1 and 7.6:1. */
const DIM = '#B9B5B0';
const DIMMER = '#8C8884';

export function ContactPanel() {
  const phone = CONTACT.phoneMobile;

  return (
    <section className="bg-paper-bg text-ink-000">
      <div className="mx-auto w-full max-w-(--container-shell) px-5 py-(--spacing-section-lg) md:px-8">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-24">
          <div>
            <p
              className="font-mono text-label tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-brass)' }}
            >
              Speak to a partner
            </p>
            <h2 className="mt-5 font-display text-h1 leading-tight">
              Tell us what you are trying to do.
            </h2>
            <p className="mt-6 max-w-(--container-measure) text-body-lg" style={{ color: DIM }}>
              A first conversation costs nothing and is handled by a partner, not
              an intake desk. If the matter is not one we should take, we will
              say so and point you to someone who should.
            </p>

            {/* The number, at display size — the page's final call to action. */}
            <div className="mt-12">
              {phone ? (
                <a
                  href={`tel:${digitsOnly(phone)}`}
                  className="group inline-flex items-baseline gap-4 transition-colors duration-(--duration-hover)"
                >
                  <span className="font-display text-display-2 leading-none group-hover:text-[var(--color-brass)]">
                    {phone}
                  </span>
                </a>
              ) : (
                <TodoClient>mobile number</TodoClient>
              )}
              <p className="mt-4 text-body-sm" style={{ color: DIMMER }}>
                {CONTACT.officeHours ?? 'Sunday to Friday, during office hours'}
              </p>
            </div>
          </div>

          {/* Office and written enquiry, secondary to the call. */}
          <div className="flex flex-col gap-10 lg:pt-4">
            <div>
              <p
                className="font-mono text-label tracking-[0.2em] uppercase"
                style={{ color: DIMMER }}
              >
                Office
              </p>
              <address className="mt-4 text-body not-italic" style={{ color: DIM }}>
                {CONTACT.address.line1 && (
                  <>
                    {CONTACT.address.line1}
                    <br />
                  </>
                )}
                {CONTACT.address.ward && (
                  <>
                    {CONTACT.address.city}&#8202;&ndash;&#8202;
                    {CONTACT.address.ward.replace(/^Ward\s*/i, '')}
                    <br />
                  </>
                )}
                {CONTACT.address.country}
              </address>
            </div>

            <div>
              <p
                className="font-mono text-label tracking-[0.2em] uppercase"
                style={{ color: DIMMER }}
              >
                Prefer to write
              </p>
              <p className="mt-4 max-w-(--container-measure) text-body-sm" style={{ color: DIM }}>
                Some enquiries are easier to set out on paper. The contact page
                has a short form for those.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-3 border px-6 py-3 text-body-sm transition-colors duration-(--duration-hover) hover:border-[var(--color-brass)] hover:text-[var(--color-brass)]"
                style={{ borderColor: 'rgba(255,255,255,0.28)' }}
              >
                Go to contact
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
