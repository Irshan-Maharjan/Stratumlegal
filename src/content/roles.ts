import type { Role } from './types';

/**
 * Open roles. No hiring plan has been supplied by the client, so this is a
 * single realistic placeholder role plus an open internship listing — enough
 * for /careers to have real structure to review. Replace with the firm's
 * actual openings; remove the placeholder role once real ones exist.
 */

export const ROLES: Role[] = [
  {
    slug: 'associate-corporate-commercial',
    title: 'Associate, corporate & commercial',
    type: 'Full time',
    location: 'Kathmandu',
    summary:
      'Working across foreign investment, company formation, and commercial contract matters for corporate clients.',
    responsibilities: [
      'Drafting and reviewing commercial agreements, shareholder documentation, and corporate filings',
      'Supporting foreign investment approval applications and company incorporation',
      'Legal research on Nepali statute and regulatory practice',
      'Direct client contact under partner supervision',
    ],
    requirements: [
      'Bachelor of Laws (LLB) from a recognised institution',
      'Nepal Bar Council licence, or eligibility to obtain one',
      'Strong written English',
      'Comfortable working with statute and regulatory text in both English and Nepali',
    ],
    closingDate: null,
  },
];

export const getRole = (slug: string): Role | undefined => ROLES.find((r) => r.slug === slug);
