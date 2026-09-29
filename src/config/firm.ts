/**
 * SINGLE SOURCE OF TRUTH for the firm's identity and contact details.
 *
 * The firm is officially registered as Stratum Law Associates Pvt. Ltd.
 * Nothing in this repository may hardcode the firm name, a phone number, an
 * email address, or the office address. Everything reads from here — including
 * page titles, structured data, OG images, and alt text.
 *
 * To verify: change FIRM_TRADING_NAME below and confirm the new value appears
 * everywhere on the site with no other edits.
 */

export const FIRM_LEGAL_NAME = 'Stratum Law Associates Pvt. Ltd.';
export const FIRM_TRADING_NAME = 'Stratum Law Associates';
export const FIRM_SHORT = 'Stratum';
/** The descriptor set below the wordmark in the logo lockup. */
export const FIRM_DESCRIPTOR = 'Law Associates';

/** Registration detail. Published as a trust signal — see /about. */
export const REGISTRATION = {
  /** Office of the Company Registrar company registration number. */
  companyNumber: null as string | null, // TODO(client): firm registration number
  /** Inland Revenue Department PAN. */
  pan: null as string | null, // TODO(client): PAN
  /** Year the firm commenced practice. */
  established: null as string | null, // TODO(client): year established
} as const;

export const CONTACT = {
  address: {
    /** Street / tole. */
    line1: null as string | null, // TODO(client): street / tole
    /** Ward number, e.g. "Ward 11". */
    ward: 'Ward 23',
    city: 'Lalitpur',
    country: 'Nepal',
    postalCode: null as string | null, // TODO(client): postal code
  },
  /** Google Maps place URL or coordinates link. */
  mapUrl: null as string | null, // TODO(client): Google Maps link
  /** Landline, in +977 international format. */
  phoneLandline: null as string | null, // TODO(client): landline
  /** Mobile, also used for the Viber deep link. */
  phoneMobile: '9845411590',
  /** WhatsApp number in international format, digits only for the deep link. */
  whatsapp: '9845411590',
  email: 'stratumlawassociates@gmail.com',
  /**
   * Free text, e.g. "Sunday–Friday, 10:00–17:00". Null is a deliberate
   * choice here rather than a gap: the firm does not publish fixed hours, so
   * every consumer omits the line entirely.
   */
  officeHours: null as string | null,
} as const;

/**
 * The firm's real, final domain. Used for metadata, sitemap and OG image URLs
 * on a production build.
 */
export const PRODUCTION_URL = 'https://stratumlaw.com.np'; // TODO(client): confirm domain

/**
 * Where this particular build is being deployed.
 *
 * While the site is on a preview domain for the owner to review, set
 * NEXT_PUBLIC_SITE_URL to that domain at build time:
 *
 *   NEXT_PUBLIC_SITE_URL=https://preview.example.com npm run build
 *
 * Unset, it falls back to the production domain. This matters because the
 * sitemap, canonical tags and OG image URLs are absolute — a build that
 * hardcodes the live domain while sitting on a preview host tells Google the
 * wrong thing about both.
 *
 * `||` rather than `??` is deliberate: CI passes this through from a
 * repository variable, and an unset variable arrives as an empty string, not
 * as undefined. `??` would keep that empty string and hand `new URL('')` to
 * metadataBase, which throws ERR_INVALID_URL at build time.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL;

/**
 * Whether this build should be indexed by search engines.
 *
 * Any deployment that is not on the production domain is treated as a preview
 * and blocked — via robots.txt and a noindex meta tag — so a staging copy
 * cannot be indexed and later compete with the real site as duplicate
 * content. Going live needs no code change: build without
 * NEXT_PUBLIC_SITE_URL (or set it to PRODUCTION_URL) and indexing turns
 * itself back on.
 */
export const IS_INDEXABLE = SITE_URL === PRODUCTION_URL;

/**
 * The compliance disclaimer required in the footer and on /legal-notice.
 * Wording is fixed — do not paraphrase.
 */
export const DISCLAIMER =
  'The contents of this website are for general information only and do not ' +
  'constitute legal advice or solicitation of work. Transmission of information ' +
  'does not create a lawyer–client relationship.';

/** Nepal's calling code, without the leading +. */
const COUNTRY_CODE = '977';

/**
 * Digits-only helper for tel:, Viber and WhatsApp deep links.
 *
 * Numbers are STORED and DISPLAYED the way Nepali clients write them —
 * "9845411590", no country code, no punctuation. But a dialled link needs the
 * international form: WhatsApp rejects a local number outright, and a tel:
 * link without a country code fails for anyone calling from abroad, which is
 * precisely the foreign-investor audience this firm is for.
 *
 * So display and link are deliberately different: this normalises whatever is
 * stored into +977XXXXXXXXXX, while the page still shows the local form.
 * A number already carrying a country code is left as it is.
 */
export const digitsOnly = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (value.trim().startsWith('+') || digits.startsWith(COUNTRY_CODE)) {
    return `+${digits}`;
  }
  // A local mobile is 10 digits (98XXXXXXXX); anything else is passed through
  // unprefixed rather than guessed at.
  return digits.length === 10 ? `+${COUNTRY_CODE}${digits}` : digits;
};
