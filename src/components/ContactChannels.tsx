import { CONTACT, digitsOnly } from '@/config/firm';
import { Eyebrow } from './Eyebrow';

/**
 * <ContactChannels> — phone, Viber and WhatsApp as deep links.
 *
 * Reused in the footer, on /contact, and in the mobile sticky bar. In Nepal
 * these substantially outperform a web form, so they are given equal or greater
 * prominence than the form itself rather than being tucked underneath it.
 *
 * Every number reads from CONTACT in src/config/firm.ts. A channel with no
 * number is omitted entirely, label included: a tel: href pointing at nothing
 * is worse than an absent row, and a heading over empty space looks broken.
 *
 * Deep link formats:
 *   tel:      +9771XXXXXXX          international format, punctuation stripped
 *   viber://  chat?number=%2B977... URL-encoded leading +
 *   wa.me/    9771XXXXXXX           digits only, no + and no punctuation
 */

type ContactChannelsProps = {
  /** `stack` for footer/page columns, `inline` for the mobile sticky bar. */
  layout?: 'stack' | 'inline';
  className?: string;
};

type Channel = {
  key: string;
  label: string;
  value: string | null;
  href: (value: string) => string;
  missing: string;
};

const CHANNELS: Channel[] = [
  {
    key: 'telephone',
    label: 'Telephone',
    /**
     * The mobile is the firm's working number; no landline has been supplied.
     * Falling back to it means the primary "Telephone" row shows a number a
     * client can actually ring, rather than a TODO marker sitting above a
     * Viber row that displays the very number that is missing.
     */
    value: CONTACT.phoneLandline ?? CONTACT.phoneMobile,
    href: (v) => `tel:${digitsOnly(v)}`,
    missing: 'telephone number',
  },
  {
    key: 'viber',
    label: 'Viber',
    value: CONTACT.phoneMobile,
    href: (v) => `viber://chat?number=${encodeURIComponent(digitsOnly(v))}`,
    missing: 'Viber number',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: CONTACT.whatsapp,
    href: (v) => `https://wa.me/${digitsOnly(v).replace(/^\+/, '')}`,
    missing: 'WhatsApp number',
  },
];

export function ContactChannels({ layout = 'stack', className }: ContactChannelsProps) {
  if (layout === 'inline') {
    return (
      <ul className={['flex items-stretch', className].filter(Boolean).join(' ')}>
        {/* Same rule as the stack layout: a channel with no number is left
            out rather than rendered as a dead, unclickable label. */}
        {CHANNELS.filter((channel) => channel.value).map((channel) => (
          <li key={channel.key} className="flex-1 border-l border-line first:border-l-0">
            <a
              href={channel.href(channel.value as string)}
              className="flex h-full min-h-12 items-center justify-center px-3 text-body-sm text-paper transition-colors duration-(--duration-hover) hover:text-brass"
            >
              {channel.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={['space-y-4', className].filter(Boolean).join(' ')}>
      {/* A channel with no number is omitted outright, label included. The
          placeholder marker no longer renders in production, so keeping the
          row would leave a heading standing over empty space. */}
      {CHANNELS.filter((channel) => channel.value).map((channel) => (
        <li key={channel.key}>
          <Eyebrow as="div">{channel.label}</Eyebrow>
          <div className="mt-1">
            <a
              href={channel.href(channel.value as string)}
              className="font-mono text-data text-paper transition-colors duration-(--duration-hover) hover:text-brass"
            >
              {channel.value}
            </a>
          </div>
        </li>
      ))}
      {CONTACT.email && (
        <li>
          <Eyebrow as="div">Email</Eyebrow>
          <div className="mt-1">
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-mono text-data text-paper transition-colors duration-(--duration-hover) hover:text-brass"
            >
              {CONTACT.email}
            </a>
          </div>
        </li>
      )}
    </ul>
  );
}

/**
 * The office address block. Also reads entirely from CONTACT.
 * Rendered as a semantic <address> so it is machine- and AT-legible.
 */
export function OfficeAddress({ className }: { className?: string }) {
  const { address } = CONTACT;

  return (
    <address className={['not-italic', className].filter(Boolean).join(' ')}>
      {/* The street line is optional: "Lalitpur-23, Nepal" is a complete and
          usable address here, so its absence is not a gap to flag. */}
      {address.line1 && (
        <span className="block text-body-sm text-paper-2">{address.line1}</span>
      )}
      {/* Nepali addresses are conventionally written "Lalitpur-23", city and
          ward as one token, so the ward is joined to the city rather than set
          on its own line. */}
      <span className="block text-body-sm text-paper-2">
        {address.city}
        {address.ward ? `–${address.ward.replace(/^Ward\s*/i, '')}` : ''}
        {address.postalCode ? ` ${address.postalCode}` : ''}, {address.country}
      </span>
    </address>
  );
}
