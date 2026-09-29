/**
 * The build credit, below the footer.
 *
 * Deliberately the shortest strip on the page: one line, small type, tight
 * vertical padding. It sits outside <SiteFooter> because it is not the firm
 * speaking — everything above it is Stratum's, this line is the studio's.
 *
 * The purple is the one colour on the site outside the brand palette, which
 * is the point: it reads as a separate party's mark rather than as a Stratum
 * element, and it cannot be mistaken for the firm's own crimson accent. It is
 * scoped to this strip and defined here rather than in the token block, so it
 * cannot leak into the brand system.
 *
 * Contrast: #C4B5FD on #2A1F3D is 8.3:1, and the hover state #DDD6FE is
 * 11.2:1 — both clear AA and AAA for normal text.
 *
 * The text is centred, which the brand system otherwise forbids. That rule
 * governs Stratum's own layout; this strip is explicitly not part of it, and
 * centring is one more signal that it belongs to someone else.
 */

const PANEL = '#2A1F3D';
const TEXT = '#C4B5FD';

export function SilicoreCredit() {
  return (
    <div style={{ backgroundColor: PANEL }}>
      <div className="mx-auto w-full max-w-(--container-shell) px-5 py-2.5 md:px-8">
        <p className="text-center text-[0.7rem] leading-none" style={{ color: TEXT }}>
          Website by{' '}
          <a
            href="https://silicore.com.np"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-transparent underline-offset-2 transition-colors duration-(--duration-hover) hover:decoration-current"
          >
            Silicore
          </a>
        </p>
      </div>
    </div>
  );
}
