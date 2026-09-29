import type { Person } from './types';

/**
 * The team.
 *
 * Only what the client has actually supplied is recorded: name, designation
 * and a direct number. Everything else stays null and renders as a visible
 * TODO(client) marker. Nothing about a person's credentials is invented —
 * that rule matters more here than anywhere else on the site, because
 * misstating a lawyer's qualifications is a Bar Council problem, not a
 * copywriting one.
 *
 * Still outstanding for every person: photograph, email, education, languages
 * and bio. For Pranish, also the Bar Council licence number, year called and
 * practice areas — see isLegalPractitioner in types.ts for why those are only
 * asked of practitioners.
 */

export const PEOPLE: Person[] = [
  {
    slug: 'pranish-bhakta-uprety',
    fullName: 'Pranish Bhakta Uprety',
    designation: 'Managing Director',
    isLegalPractitioner: true,
    licenceNumber: null, // TODO(client): Nepal Bar Council licence number
    education: [], // TODO(client): education
    calledYear: null, // TODO(client): year first called
    practiceAreas: [], // TODO(client): which practice areas he leads
    sectors: [],
    languages: [], // TODO(client): languages
    email: null, // TODO(client): email
    phone: '+977 984-541-1590',
    photograph: null, // TODO(client): portrait
    bio: null, // TODO(client): bio
  },
  {
    slug: 'irshan-maharjan',
    fullName: 'Er. Irshan Maharjan',
    designation: 'Digital Associate',
    isLegalPractitioner: false,
    licenceNumber: null,
    education: [], // TODO(client): education
    calledYear: null,
    practiceAreas: [],
    sectors: [],
    languages: [],
    email: null, // TODO(client): email
    phone: '+977 984-428-9177',
    photograph: null, // TODO(client): portrait
    bio: null, // TODO(client): bio
  },
  {
    slug: 'kabin-tiwari',
    fullName: 'Er. Kabin Tiwari',
    designation: 'Tech Associate',
    isLegalPractitioner: false,
    licenceNumber: null,
    education: [], // TODO(client): education
    calledYear: null,
    practiceAreas: [],
    sectors: [],
    languages: [],
    email: null, // TODO(client): email
    phone: '+977 984-066-8256',
    photograph: null, // TODO(client): portrait
    bio: null, // TODO(client): bio
  },
];

export const getPerson = (slug: string): Person | undefined =>
  PEOPLE.find((p) => p.slug === slug);
