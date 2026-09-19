import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { FIRM_SHORT, FIRM_DESCRIPTOR, FIRM_TRADING_NAME } from '@/config/firm';

/**
 * Site-wide default OG image. Reads the firm name from config, so a rename
 * requires no edit here.
 *
 * The mark is the client's own artwork, read off disk and inlined as a data
 * URI — Satori cannot resolve a relative /public URL during static export, so
 * the file has to be embedded rather than referenced.
 *
 * Playfair is loaded here as a TTF, not the woff2 the site itself uses:
 * Satori (which renders this image) rejects woff2 outright with "Unsupported
 * OpenType signature wOF2". playfair-og.ttf is the same typeface at the same
 * weight, in the one container Satori accepts.
 */

/**
 * Required under `output: 'export'` — see the note in robots.ts. The image is
 * generated once at build time and written out as a PNG, which is what a
 * static host needs anyway.
 */
export const dynamic = 'force-static';

export const alt = `${FIRM_TRADING_NAME} — corporate law firm in Kathmandu, Nepal`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [markData, playfair] = await Promise.all([
    readFile(join(process.cwd(), 'public', 'stratum-mark.png')),
    readFile(join(process.cwd(), 'src', 'app', 'playfair-og.ttf')),
  ]);

  const markSrc = `data:image/png;base64,${markData.toString('base64')}`;
  const name = FIRM_SHORT.toUpperCase();
  const accentAt = name.indexOf('A');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#FEFDFB',
          padding: '0 90px',
          fontFamily: 'Playfair',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} alt="" width={120} height={109} />
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 110,
            color: '#000000',
            letterSpacing: '4px',
          }}
        >
          <span>{name.slice(0, accentAt)}</span>
          <span style={{ color: '#B80201' }}>{name[accentAt]}</span>
          <span>{name.slice(accentAt + 1)}</span>
        </div>
        <div style={{ marginTop: 24, width: 160, height: 2, background: '#000000' }} />
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: '#4A4744',
            letterSpacing: '10px',
            textTransform: 'uppercase',
          }}
        >
          {FIRM_DESCRIPTOR}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Playfair', data: playfair, style: 'normal', weight: 500 }],
    }
  );
}
