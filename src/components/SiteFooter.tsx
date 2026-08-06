import Link from 'next/link';
import {
  CONTACT,
  DISCLAIMER,
  FIRM_LEGAL_NAME,
  FIRM_TRADING_NAME,
  REGISTRATION,
} from '@/config/firm';
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from '@/config/nav';
import { ContactChannels, OfficeAddress } from './ContactChannels';
import { Eyebrow, DataValue } from './Eyebrow';
import { StratumSeal } from './brand/Seal';
import { TodoClient } from './TodoClient';

/**
 * <SiteFooter>
 *
 * Carries the compliance payload: the registered name, company registration
 * number, PAN, office address, and the Bar Council disclaimer. Published
 * registration detail is the strongest available trust signal in a market with
 * many unverifiable "law firms" online, and it is fully permitted.
 *
 * The seal appears here at full size, legible, as the firm's primary mark —
 * matching its use in the header and hero.
 *
 * Everything here reads from src/config/firm.ts.
 */

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-000">
      <div className="mx-auto w-full max-w-(--container-shell) px-5 py-(--spacing-section-sm) md:px-8">
        <StratumSeal
          ringColor="var(--color-brass)"
          emblemColor="var(--color-paper)"
          className="mb-12 h-20 w-20 opacity-90"
        />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Office */}
          <div>
            <Eyebrow as="div">Office</Eyebrow>
            <div className="mt-4">
              <OfficeAddress />
            </div>
            {CONTACT.officeHours ? (
              <p className="mt-4 text-body-sm text-paper-3">{CONTACT.officeHours}</p>
            ) : (
              <p className="mt-4">
                <TodoClient>office hours</TodoClient>
              </p>
            )}
          </div>

          {/* Contact channels */}
          <div>
            <Eyebrow as="div">Contact</Eyebrow>
            <ContactChannels className="mt-4" />
          </div>

          {/* Navigation, repeated */}
          <div>
            <Eyebrow as="div">Navigate</Eyebrow>
            <ul className="mt-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {SECONDARY_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Registration */}
          <div>
            <Eyebrow as="div">Registration</Eyebrow>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-body-sm text-paper-3">Registered name</dt>
                <dd className="mt-0.5 text-body-sm text-paper-2">{FIRM_LEGAL_NAME}</dd>
              </div>
              <div>
                <dt className="text-body-sm text-paper-3">Company registration</dt>
                <dd className="mt-0.5">
                  {REGISTRATION.companyNumber ? (
                    <DataValue className="text-paper-2">{REGISTRATION.companyNumber}</DataValue>
                  ) : (
                    <TodoClient>firm registration number</TodoClient>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-body-sm text-paper-3">PAN</dt>
                <dd className="mt-0.5">
                  {REGISTRATION.pan ? (
                    <DataValue className="text-paper-2">{REGISTRATION.pan}</DataValue>
                  ) : (
                    <TodoClient>PAN</TodoClient>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Disclaimer — required in the footer and on /legal-notice. */}
        <div className="mt-16 border-t border-line pt-8">
          <p className="max-w-(--container-measure) text-body-sm text-paper-2">{DISCLAIMER}</p>

          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-mono text-label tracking-[0.13em] text-paper-3 uppercase">
              © {year} {FIRM_TRADING_NAME}
            </p>
            <p className="font-mono text-label tracking-[0.13em] text-paper-3 uppercase">
              Kathmandu, Nepal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
