import type { Person } from './types';

/**
 * People. No lawyer names, credentials, education, or bios have been supplied
 * by the client, so every field below is null — which renders as a visible
 * TODO(client) marker per the compliance rules. Nothing here is invented.
 *
 * Four placeholder slots exist so /people and the homepage's people section
 * have real routes and real layout to review, matching the brief's four-name
 * suggestion for the homepage. The client supplies real people; this file's
 * shape does not change when they do.
 */

export const PEOPLE: Person[] = [
  {
    slug: 'lawyer-one',
    fullName: null,
    designation: null,
    licenceNumber: null,
    education: [],
    calledYear: null,
    practiceAreas: ['foreign-direct-investment', 'corporate-commercial'],
    sectors: [],
    languages: [],
    email: null,
    photograph: null,
    bio: null,
  },
  {
    slug: 'lawyer-two',
    fullName: null,
    designation: null,
    licenceNumber: null,
    education: [],
    calledYear: null,
    practiceAreas: ['banking-finance', 'mergers-acquisitions'],
    sectors: [],
    languages: [],
    email: null,
    photograph: null,
    bio: null,
  },
  {
    slug: 'lawyer-three',
    fullName: null,
    designation: null,
    licenceNumber: null,
    education: [],
    calledYear: null,
    practiceAreas: ['energy-infrastructure', 'dispute-resolution-arbitration'],
    sectors: [],
    languages: [],
    email: null,
    photograph: null,
    bio: null,
  },
  {
    slug: 'lawyer-four',
    fullName: null,
    designation: null,
    licenceNumber: null,
    education: [],
    calledYear: null,
    practiceAreas: ['criminal-white-collar', 'employment-labour'],
    sectors: [],
    languages: [],
    email: null,
    photograph: null,
    bio: null,
  },
];

export const getPerson = (slug: string): Person | undefined =>
  PEOPLE.find((p) => p.slug === slug);
