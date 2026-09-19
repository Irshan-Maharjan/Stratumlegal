'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '@/config/nav';
import { CONTACT, FIRM_DESCRIPTOR, digitsOnly } from '@/config/firm';
import { LogoMark, Wordmark } from '@/components/brand/Logo';

/**
 * <SiteHeader>
 *
 * Sticky, with a hairline bottom border that appears only once scrolled — at
 * rest the header sits on the page without a seam, which keeps the hero clean.
 *
 * The mobile menu is a plain panel: it opens, it closes. No hamburger morph, no
 * staggered item animation. Those cost CPU on the mid-range Android that most
 * Nepali traffic runs on, and buy nothing.
 *
 * One quiet contact affordance: the telephone number, not a "Book a free
 * consultation" button. Urgency language is prohibited by the Bar Council rules
 * and would read wrong to a general counsel regardless.
 *
 * Brand mark: the square scales mark (the client's own artwork) beside the
 * wordmark set in Playfair, with "LAW ASSOCIATES" as a small
 * descriptor beside it. The header uses the compact one-line form; the footer
 * uses the fuller two-line lockup with the rule between name and descriptor.
 */

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // passive listener + a boolean flip; no layout reads, no rAF loop needed.
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the panel on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape closes the panel; focus stays predictable for keyboard users.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full bg-ink-000/95 backdrop-blur-[2px]',
        'transition-colors duration-(--duration-hover)',
        scrolled ? 'border-b border-line' : 'border-b border-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex w-full max-w-(--container-shell) items-center justify-between gap-6 px-5 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 text-paper transition-opacity duration-(--duration-hover) hover:opacity-80"
          aria-label="Home"
        >
          <LogoMark priority className="h-9 w-auto md:h-10" />
          <span className="flex flex-col justify-center">
            <Wordmark
              aria-hidden="true"
              className="whitespace-nowrap text-[1.1rem] leading-none tracking-[0.07em] md:text-[1.2rem]"
            />
            <span
              className="hidden whitespace-nowrap font-sans leading-none text-paper-3 uppercase md:block"
              style={{ fontWeight: 500, letterSpacing: '0.26em', fontSize: '0.5rem' }}
            >
              {FIRM_DESCRIPTOR}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={[
                'relative py-1 text-body-sm transition-colors duration-(--duration-hover)',
                isActive(item.href) ? 'text-paper' : 'text-paper-2 hover:text-paper',
              ].join(' ')}
            >
              {item.label}
              {isActive(item.href) && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full"
                  style={{ backgroundColor: 'var(--color-paper)' }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {CONTACT.phoneLandline && (
            <a
              href={`tel:${digitsOnly(CONTACT.phoneLandline)}`}
              className="hidden font-mono text-data text-paper-2 transition-colors duration-(--duration-hover) hover:text-brass lg:block"
            >
              {CONTACT.phoneLandline}
            </a>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="border border-line px-3 py-2 text-body-sm text-paper transition-colors duration-(--duration-hover) hover:border-line-hi lg:hidden"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile panel. Plain show/hide — no morph, no stagger. */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line bg-ink-000 lg:hidden"
        >
          <ul className="mx-auto w-full max-w-(--container-shell) px-5 py-2 md:px-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={[
                    'block py-4 text-body',
                    isActive(item.href) ? 'text-paper' : 'text-paper-2',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
