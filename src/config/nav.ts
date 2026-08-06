/** Primary navigation. Single source for the header, footer, and sitemap. */
export const NAV_ITEMS = [
  { href: '/about', label: 'About' },
  { href: '/people', label: 'People' },
  { href: '/practice', label: 'Practice' },
  { href: '/publications', label: 'Publications' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
] as const;

/** Routes that exist but sit outside the primary nav. */
export const SECONDARY_NAV_ITEMS = [{ href: '/legal-notice', label: 'Legal notice' }] as const;
