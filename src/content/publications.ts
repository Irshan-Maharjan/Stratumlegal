import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Publication } from './types';

/**
 * Publications loader.
 *
 * Real articles live as MDX files in content/publications/*.mdx, with
 * frontmatter matching the Publication type below. Reading them via
 * gray-matter (rather than importing each .mdx as a page-level default
 * export) is what lets this list — used for the index, filtering, and the
 * homepage's three-most-recent — stay decoupled from the MDX rendering
 * pipeline. A future CMS can replace this loader with an API call and
 * nothing downstream changes, provided the returned shape matches.
 *
 * Twelve additional stub entries (isStub: true) exist purely to exercise
 * filtering and pagination before real publication volume exists. They have
 * no article body — /publications/[slug] renders a clearly marked
 * placeholder for them rather than a 404, which would otherwise be an odd
 * distinction between "real" and "future" content in the index.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content/publications');

function loadRealPublications(): Publication[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        practiceArea: data.practiceArea as string,
        author: (data.author as string | null) ?? null,
        summary: data.summary as string,
        readingMinutes: data.readingMinutes as number,
        needsReview: Boolean(data.needsReview),
      } satisfies Publication;
    });
}

const STUB_ENTRIES: Publication[] = [
  {
    slug: 'stub-transfer-pricing-documentation',
    title: 'Transfer pricing documentation: what the Inland Revenue Department expects',
    date: '2026-03-22',
    practiceArea: 'tax',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 6,
    isStub: true,
  },
  {
    slug: 'stub-ppa-negotiation-points',
    title: 'Power purchase agreements: the negotiation points that recur',
    date: '2026-03-10',
    practiceArea: 'energy-infrastructure',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 8,
    isStub: true,
  },
  {
    slug: 'stub-secured-transactions-registry',
    title: 'Registering security interests: a practical walkthrough',
    date: '2026-02-27',
    practiceArea: 'banking-finance',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 7,
    isStub: true,
  },
  {
    slug: 'stub-trademark-first-to-file',
    title: 'Why trademark clearance searches matter under a first-to-file system',
    date: '2026-02-14',
    practiceArea: 'intellectual-property',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 5,
    isStub: true,
  },
  {
    slug: 'stub-share-purchase-warranties',
    title: 'Warranty and indemnity structures in Nepali share purchase agreements',
    date: '2026-01-30',
    practiceArea: 'mergers-acquisitions',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 9,
    isStub: true,
  },
  {
    slug: 'stub-arbitration-seat-selection',
    title: 'Choosing a seat and institution in cross-border contracts with a Nepali counterparty',
    date: '2026-01-18',
    practiceArea: 'dispute-resolution-arbitration',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 8,
    isStub: true,
  },
  {
    slug: 'stub-termination-process-labour-act',
    title: 'Termination process under the Labour Act 2074: the steps that get skipped',
    date: '2025-12-19',
    practiceArea: 'employment-labour',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 7,
    isStub: true,
  },
  {
    slug: 'stub-branch-vs-subsidiary',
    title: 'Branch office or subsidiary: how foreign companies choose in Nepal',
    date: '2025-12-05',
    practiceArea: 'foreign-direct-investment',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 6,
    isStub: true,
  },
  {
    slug: 'stub-corporate-governance-subsidiaries',
    title: 'Corporate governance expectations for Nepali subsidiaries of foreign parents',
    date: '2025-11-21',
    practiceArea: 'corporate-commercial',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 6,
    isStub: true,
  },
  {
    slug: 'stub-hydropower-licensing-timeline',
    title: 'Survey to generation licence: a realistic hydropower timeline',
    date: '2025-11-08',
    practiceArea: 'energy-infrastructure',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 9,
    isStub: true,
  },
  {
    slug: 'stub-banking-offence-investigation-stage',
    title: 'What to do when a regulator requests documents before any charge is filed',
    date: '2025-10-25',
    practiceArea: 'criminal-white-collar',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 6,
    isStub: true,
  },
  {
    slug: 'stub-double-tax-treaty-application',
    title: 'When does a double taxation avoidance agreement actually reduce Nepali withholding',
    date: '2025-10-11',
    practiceArea: 'tax',
    author: null,
    summary: 'A stub entry seeded to exercise the publications filter and index before real volume exists.',
    readingMinutes: 8,
    isStub: true,
  },
];

export const PUBLICATIONS: Publication[] = [...loadRealPublications(), ...STUB_ENTRIES].sort(
  (a, b) => (a.date < b.date ? 1 : -1)
);

export const getPublication = (slug: string): Publication | undefined =>
  PUBLICATIONS.find((p) => p.slug === slug);

export const PRACTICE_AREA_FILTER_OPTIONS = Array.from(
  new Set(PUBLICATIONS.map((p) => p.practiceArea))
);
