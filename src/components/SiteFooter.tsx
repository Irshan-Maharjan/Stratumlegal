import Link from 'next/link';
import {
  CONTACT,
  DISCLAIMER,
  FIRM_DESCRIPTOR,
  FIRM_LEGAL_NAME,
  FIRM_TRADING_NAME,
} from '@/config/firm';
import { LogoMark, Wordmark } from './brand/Logo';
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from '@/config/nav';
import { ContactChannels, OfficeAddress } from './ContactChannels';
import { Eyebrow } from './Eyebrow';
import { TodoClient } from './TodoClient';

/**
 * <SiteFooter>
 *
 * Carries the compliance payload: the registered name, office address and the
 * Bar Council disclaimer. The registration number and PAN are deliberately
 * not published — see the note on /about.
 *
 * The nav column renders NAV_ITEMS flat, ignoring the practice submenu: a
 * footer listing ten practice areas under one heading would dwarf every other
 * column, and the header menu already reaches them from every route.
 *
 * Brand mark: the full stacked lockup — the scales mark, the wordmark in
 * Playfair (with the crimson A), a rule, then LAW ASSOCIATES in spaced
 * Archivo, mirroring the arrangement of the supplied logo artwork.
 *
 * Everything here reads from src/config/firm.ts.
 */

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-000">
      <div className="mx-auto w-full max-w-(--container-shell) px-5 py-(--spacing-section-sm) md:px-8">
        <div className="mb-12">
          <LogoMark className="h-14 w-auto" />
          <Wordmark
            aria-hidden="true"
            className="mt-4 block text-[1.75rem] leading-none tracking-[0.07em] text-paper"
          />
          <div className="mt-2 h-px w-16" style={{ backgroundColor: 'var(--color-line-hi)' }} />
          <span
            className="mt-2 block font-sans uppercase text-paper-3"
            style={{ fontWeight: 500, letterSpacing: '0.34em', fontSize: '0.65rem' }}
          >
            {FIRM_DESCRIPTOR}
          </span>
        </div>
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

          {/* Registered entity. The registration number and PAN are
              deliberately not published — see the note on /about — so this
              column carries the registered name alone. */}
          <div>
            <Eyebrow as="div">Registered entity</Eyebrow>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-body-sm text-paper-3">Registered name</dt>
                <dd className="mt-0.5 text-body-sm text-paper-2">{FIRM_LEGAL_NAME}</dd>
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
