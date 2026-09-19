import type { MetadataRoute } from 'next';
import { IS_INDEXABLE, SITE_URL } from '@/config/firm';

/**
 * Required under `output: 'export'`. Next treats a metadata route as dynamic
 * by default and refuses to export it without this; the output here is a pure
 * function of SITE_URL, so freezing it at build time changes nothing.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // A preview deployment disallows everything, and publishes no sitemap —
  // offering a sitemap while disallowing the site sends mixed signals.
  if (!IS_INDEXABLE) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
