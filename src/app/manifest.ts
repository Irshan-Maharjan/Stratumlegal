import type { MetadataRoute } from 'next';
import { FIRM_TRADING_NAME, FIRM_SHORT } from '@/config/firm';

/**
 * Next's manifest file convention — reads name from config so a rename
 * propagates with no other edit, unlike a static public/site.webmanifest.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: FIRM_TRADING_NAME,
    short_name: FIRM_SHORT,
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#080a0d',
    background_color: '#080a0d',
    display: 'standalone',
  };
}
