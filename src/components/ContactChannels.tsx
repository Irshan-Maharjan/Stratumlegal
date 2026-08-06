import { CONTACT, digitsOnly } from '@/config/firm';
import { Eyebrow } from './Eyebrow';
import { TodoClient } from './TodoClient';

/**
 * <ContactChannels> — phone, Viber and WhatsApp as deep links.
 *
 * Reused in the footer, on /contact, and in the mobile sticky bar. In Nepal
 * these substantially outperform a web form, so they are given equal or greater
 * prominence than the form itself rather than being tucked underneath it.
 *
 * Every number reads from CONTACT in src/config/firm.ts. Missing numbers render
 * a TodoClient marker instead of a dead link — a tel: href pointing at nothing
 * is worse than a visible gap.
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
    key: 'landline',
    label: 'Telephone',
    value: CONTACT.phoneLandline,
    href: (v) => `tel:${digitsOnly(v)}`,
    missing: 'landline number',
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
        {CHANNELS.map((channel) => (
          <li key={channel.key} className="flex-1 border-l border-line first:border-l-0">
            {channel.value ? (
              <a
                href={channel.href(channel.value)}
                className="flex h-full min-h-12 items-center justify-center px-3 text-body-sm text-paper transition-colors duration-(--duration-hover) hover:text-brass"
              >
                {channel.label}
              </a>
            ) : (
              <span className="flex h-full min-h-12 items-center justify-center px-3 font-mono text-label text-paper-3 uppercase">
                {channel.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={['space-y-4', className].filter(Boolean).join(' ')}>
      {CHANNELS.map((channel) => (
        <li key={channel.key}>
          <Eyebrow as="div">{channel.label}</Eyebrow>
          <div className="mt-1">
            {channel.value ? (
              <a
                href={channel.href(channel.value)}
                className="font-mono text-data text-paper transition-colors duration-(--duration-hover) hover:text-brass"
              >
                {channel.value}
              </a>
            ) : (
              <TodoClient>{channel.missing}</TodoClient>
            )}
          </div>
        </li>
      ))}
      <li>
        <Eyebrow as="div">Email</Eyebrow>
        <div className="mt-1">
          {CONTACT.email ? (
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-mono text-data text-paper transition-colors duration-(--duration-hover) hover:text-brass"
            >
              {CONTACT.email}
            </a>
          ) : (
            <TodoClient>general email address</TodoClient>
          )}
        </div>
      </li>
    </ul>
  );
}

/**
 * The office address block. Also reads entirely from CONTACT.
 * Rendered as a semantic <address> so it is machine- and AT-legible.
 */
export function OfficeAddress({ className }: { className?: string }) {
  const { address } = CONTACT;
  const hasStreet = Boolean(address.line1);

  return (
    <address className={['not-italic', className].filter(Boolean).join(' ')}>
      {hasStreet ? (
        <span className="block text-body-sm text-paper-2">{address.line1}</span>
      ) : (
        <TodoClient>street address</TodoClient>
      )}
      {address.ward ? (
        <span className="block text-body-sm text-paper-2">{address.ward}</span>
      ) : (
        <span className="mt-1 block">
          <TodoClient>ward number</TodoClient>
        </span>
      )}
      <span className="block text-body-sm text-paper-2">
        {address.city}
        {address.postalCode ? ` ${address.postalCode}` : ''}, {address.country}
      </span>
    </address>
  );
}
