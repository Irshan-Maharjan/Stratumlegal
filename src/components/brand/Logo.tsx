import Image from 'next/image';
import { FIRM_SHORT, FIRM_DESCRIPTOR, FIRM_TRADING_NAME } from '@/config/firm';

/**
 * The brand lockup, in two forms.
 *
 * <LogoMark>    the square frame + scales, on its own. Used wherever the
 *               lockup has to stay compact (header, footer, favicons).
 * <LogoLockup>  mark + wordmark + descriptor, set as live text rather than
 *               baked into the raster. The wordmark is live so it inherits
 *               FIRM_SHORT from config — a rename propagates without new
 *               artwork — and so the red "A" can be coloured per the logo.
 *
 * The raster mark (public/stratum-mark.png) is the client's supplied artwork,
 * trimmed and alpha-keyed off its off-white field, NOT redrawn. Keeping it as
 * the supplied asset means the mark on the site is provably the mark the
 * client approved.
 */

export function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/stratum-mark.png"
      alt=""
      aria-hidden="true"
      width={358}
      height={325}
      priority={priority}
      className={className}
sizes="(max-width: 768px) 48px, 64px"
    />
  );
}

/**
 * The wordmark as live text. The A is crimson, exactly as in the artwork —
 * it is index 4 of "STRATUM", but splitting on the letter rather than the
 * index keeps it correct if FIRM_SHORT ever changes length.
 */
export function Wordmark({
  className,
  'aria-hidden': ariaHidden,
}: {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}) {
  const name = FIRM_SHORT.toUpperCase();
  const accentAt = name.indexOf('A');

  return (
    <span
      className={className}
      aria-hidden={ariaHidden}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {accentAt === -1 ? (
        name
      ) : (
        <>
          {name.slice(0, accentAt)}
          <span style={{ color: 'var(--color-brass)' }}>{name[accentAt]}</span>
          {name.slice(accentAt + 1)}
        </>
      )}
    </span>
  );
}

export function LogoLockup({
  className,
  markClassName,
  priority = false,
}: {
  className?: string;
  markClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className={className}>
      <span className="sr-only">{FIRM_TRADING_NAME}</span>
      <LogoMark className={markClassName} priority={priority} />
      <Wordmark
        aria-hidden="true"
        className="block leading-none tracking-[0.06em]"
      />
      <span
        aria-hidden="true"
        className="block font-sans uppercase leading-none text-paper-2"
      >
        {FIRM_DESCRIPTOR}
      </span>
    </span>
  );
}
