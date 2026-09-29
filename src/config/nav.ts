import { orderedPracticeAreas } from '@/content/practice-areas';

export type NavItem = {
  href: string;
  label: string;
  /**
   * Submenu entries. Present only on Practice today, where the ten areas each
   * have their own page — the homepage no longer lists them, so the menu is
   * where a visitor discovers them.
   */
  children?: { href: string; label: string }[];
};

/**
 * Primary navigation. Single source for the header, footer, and sitemap.
 *
 * The practice submenu is derived from the practice-area content rather than
 * written out here, so adding an area adds its menu entry automatically and
 * the two can never disagree.
 */
export const NAV_ITEMS: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/people', label: 'People' },
  {
    href: '/practice',
    label: 'Practice areas',
    children: orderedPracticeAreas().map((area) => ({
      href: `/practice/${area.slug}`,
      label: area.title,
    })),
  },
  { href: '/publications', label: 'Publications' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

/** Routes that exist but sit outside the primary nav. */
export const SECONDARY_NAV_ITEMS = [{ href: '/legal-notice', label: 'Legal notice' }] as const;
