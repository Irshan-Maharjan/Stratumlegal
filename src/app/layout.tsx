import type { Metadata } from 'next';
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
 * Fonts are self-hosted via @font-face in globals.css rather than next/font,
 * so the woff2 files can be subset and served from /public with no per-route
 * font CSS injection.
 */

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
    <html lang="en" data-scroll-behavior="smooth" className="h-full">
      <head>
        {/* The two faces used above the fold. Preloaded to avoid a swap flash. */}
        <link
          rel="preload"
          href="/fonts/instrument-sans-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/newsreader-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only rounded-sm border border-brass bg-ink-200 px-4 py-2 text-body-sm text-paper focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]"
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
