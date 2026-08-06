/**
 * Content model.
 *
 * These types are the contract between content and components. Today the data
 * lives in typed TS files next to this one; a CMS can replace the source later
 * by satisfying these same shapes, with no component changes.
 *
 * Nullable fields are unsourced facts. Null is deliberate: it forces every
 * consumer to handle the missing case, and the UI renders a visible
 * TODO(client) marker rather than silently omitting. Nothing about a real
 * lawyer's credentials may be invented.
 */

export type PracticeArea = {
  slug: string;
  /** Sentence case. Appears in nav, rows, and page titles. */
  title: string;
  /** One line, used on the index row and in metadata descriptions. */
  summary: string;
  /** Order on the homepage and index. Corporate first, criminal last. */
  order: number;
  /** Marks the one page where the `bars` motif and oxblood surface appear. */
  isLitigation?: boolean;
  /** Body paragraphs describing what the area covers. */
  overview: string[];
  /** Concrete services offered within the area. */
  services: string[];
  /** Nepali statutes and regulators relevant to the area. Precision is credibility. */
  statutes: { name: string; note?: string }[];
  regulators: { name: string; note?: string }[];
  /** Slugs of lawyers who work in this area. */
  people: string[];
};

export type Person = {
  slug: string;
  /** TODO(client) until supplied — never invent a name. */
  fullName: string | null;
  designation: string | null;
  /** Nepal Bar Council licence number. */
  licenceNumber: string | null;
  education: { institution: string; qualification: string; year: string }[];
  /** Year first called, e.g. "2015". */
  calledYear: string | null;
  /** Practice area slugs. */
  practiceAreas: string[];
  /** Industry sectors, distinct from practice areas. */
  sectors: string[];
  languages: string[];
  email: string | null;
  /** Path under /public. Null renders the placeholder portrait frame. */
  photograph: string | null;
  /** 150-250 words on experience and specialisation. Never outcomes or achievements. */
  bio: string[] | null;
};

export type Publication = {
  slug: string;
  title: string;
  /** ISO 8601, e.g. "2026-05-14". */
  date: string;
  /** Practice area slug, used for filtering. */
  practiceArea: string;
  /** Person slug. Null where the firm publishes without a named byline. */
  author: string | null;
  /** Standfirst shown on cards and used as the meta description. */
  summary: string;
  readingMinutes: number;
  /** True for seeded index entries with no article body behind them yet. */
  isStub?: boolean;
  /** Set on seeded drafts the client must review before publishing. */
  needsReview?: boolean;
};

export type Role = {
  slug: string;
  title: string;
  /** e.g. "Full time", "Internship". */
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** Null means applications are open with no stated closing date. */
  closingDate: string | null;
};
