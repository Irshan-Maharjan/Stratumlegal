import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { FIRM_TRADING_NAME } from '@/config/firm';

/**
 * Site-wide default OG image. Reads the firm name from config, so a rename
 * requires no edit here. The seal is embedded as a pre-rendered PNG (not the
 * live traced SVG component) because next/og's Satori renderer has limited
 * support for arbitrary SVG path data — a raster export is the reliable path.
 * Regenerate seal-og-source.png from brand/processed/seal-dark.svg if the
 * seal artwork ever changes.
 */

export const alt = `${FIRM_TRADING_NAME} — corporate law firm in Kathmandu, Nepal`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [sealBuffer, newsreaderFont] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/seal-og-source.png')),
    readFile(join(process.cwd(), 'src/app/newsreader-og.ttf')),
  ]);
  const sealSrc = `data:image/png;base64,${sealBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 56,
          background: '#080A0D',
          padding: '0 80px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sealSrc} width={220} height={220} alt="" />
        <div
          style={{
            fontFamily: 'Newsreader',
            fontWeight: 300,
            fontSize: 64,
            color: '#E8E4DB',
            letterSpacing: '-0.02em',
          }}
        >
          {FIRM_TRADING_NAME}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Newsreader', data: newsreaderFont, style: 'normal', weight: 300 }],
    }
  );
}
