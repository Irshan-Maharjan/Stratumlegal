import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { FIRM_TRADING_NAME, FIRM_LEGAL_NAME, SITE_URL } from '@/config/firm';

/**
 * Root layout.
 *
 * Every string identifying the firm comes from src/config/firm.ts — including
 * the metadata title template, which is why a Bar Council rename propagates to
 * page titles and OG images with no other edit.
 *
 * `data-scroll-behavior="smooth"` is required in Next 16: the framework no
 * longer overrides a global `scroll-behavior: smooth` during route transitions
 * unless this attribute is present, and without it a navigation would land
 * mid-page having smooth-scrolled there.
 *
 * Playfair Display (display) and Archivo (body/UI) mirror the logo lockup:
 * a high-contrast classical serif wordmark over a spaced sans descriptor.
 *
 * Both are self-hosted via next/font/local rather than next/font/google.
 * next/font/google's build-time fetch to fonts.gstatic.com hangs indefinitely
 * in this environment (no timeout in production builds — see
 * next/dist/compiled/@next/font/dist/google/fetch-resource.js — and isolated
 * probes of the same Google Fonts endpoints succeed outside of Turbopack's own
 * font-loader integration, so the hang is specific to that code path here, not
 * a general network block). next/font/local sidesteps it entirely while still
 * self-hosting with zero runtime requests, so src/fonts/archivo-variable-latin.woff2
 * (the same file Google's CSS API would have served, fetched once via curl) is
 * checked in and loaded locally. It's the single variable-weight Latin file —
 * one file covers weights 400/500/800, matching next/font/google's own
 * recommendation to prefer variable fonts. Exposed as the --font-archivo CSS
 * variable (wired into --font-display/--font-sans in globals.css) rather than
 * a `.className`, so both display and UI text can reference the same variable
 * without importing the font object everywhere. JetBrains Mono stays
 * self-hosted via @font-face in globals.css, unchanged.
 */

const archivo = localFont({
  src: '../fonts/archivo-variable-latin.woff2',
  weight: '400 800',
  display: 'swap',
  variable: '--font-archivo',
});

const playfair = localFont({
  src: '../fonts/playfair-variable-latin.woff2',
  weight: '400 900',
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${FIRM_TRADING_NAME} — Corporate law firm in Kathmandu, Nepal`,
    template: `%s — ${FIRM_TRADING_NAME}`,
  },
  description:
    `${FIRM_LEGAL_NAME} is a law firm in Kathmandu advising on foreign direct investment, ` +
    'corporate and commercial matters, banking and finance, energy and infrastructure, ' +
    'and dispute resolution in Nepal.',
  applicationName: FIRM_TRADING_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en',
    siteName: FIRM_TRADING_NAME,
    url: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`h-full ${archivo.variable} ${playfair.variable}`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only border border-brass bg-ink-200 px-4 py-2 text-body-sm text-paper focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
