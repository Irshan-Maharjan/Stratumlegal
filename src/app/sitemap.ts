import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/firm';
import { PRACTICE_AREAS } from '@/content/practice-areas';
import { PEOPLE } from '@/content/people';
import { PUBLICATIONS } from '@/content/publications';

const STATIC_ROUTES = [
  '',
  '/about',
  '/people',
  '/practice',
  '/publications',
  '/careers',
  '/contact',
  '/legal-notice',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  const practiceEntries = PRACTICE_AREAS.map((area) => ({
    url: `${SITE_URL}/practice/${area.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const peopleEntries = PEOPLE.filter((p) => p.fullName).map((p) => ({
    url: `${SITE_URL}/people/${p.slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const publicationEntries = PUBLICATIONS.filter((p) => !p.isStub).map((p) => ({
    url: `${SITE_URL}/publications/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...practiceEntries, ...peopleEntries, ...publicationEntries];
}
