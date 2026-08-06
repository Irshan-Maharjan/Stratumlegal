import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Prose } from '@/components/Prose';
import { Rule } from '@/components/Rule';
import { formatDate } from '@/components/PublicationCard';
import { PUBLICATIONS, getPublication } from '@/content/publications';
import { getPracticeArea } from '@/content/practice-areas';
import { getPerson } from '@/content/people';
import { TodoClient } from '@/components/TodoClient';

/**
 * /publications/[slug] — the article template.
 *
 * Real articles are MDX files in content/publications/*.mdx, loaded via a
 * dynamic import keyed by slug (the pattern documented for App Router MDX
 * outside the app directory). Stub entries (seeded to exercise the index and
 * filtering before real volume exists) have no MDX file behind them and
 * render a clearly marked placeholder instead of a 404.
 */

export function generateStaticParams() {
  return PUBLICATIONS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) return {};
  return { title: pub.title, description: pub.summary };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = getPublication(slug);
  if (!pub) notFound();

  const area = getPracticeArea(pub.practiceArea);
  const author = pub.author ? getPerson(pub.author) : null;

  let ArticleBody: React.ComponentType | null = null;
  if (!pub.isStub) {
    try {
      const mod = await import(`../../../../content/publications/${slug}.mdx`);
      ArticleBody = mod.default;
    } catch {
      ArticleBody = null;
    }
  }

  return (
    <article data-surface="paper">
      <Section rhythm="md" index="01" railLabel="Article" as="header" measure>
        <Link
          href="/publications"
          className="text-body-sm text-paper-2 transition-colors duration-(--duration-hover) hover:text-paper"
        >
          ← All publications
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
          <Eyebrow>
            <time dateTime={pub.date}>{formatDate(pub.date)}</time>
          </Eyebrow>
          {area && (
            <>
              <span aria-hidden="true" className="text-paper-3">
                ·
              </span>
              <Link href={`/practice/${area.slug}`}>
                <Eyebrow>{area.title}</Eyebrow>
              </Link>
            </>
          )}
          <span aria-hidden="true" className="text-paper-3">
            ·
          </span>
          <Eyebrow>{pub.readingMinutes} min read</Eyebrow>
        </div>

        <h1
          className="mt-5 font-display text-display-2 leading-[1.05] text-paper"
          style={{ fontWeight: 300, letterSpacing: '-0.03em', fontVariationSettings: "'opsz' 48" }}
        >
          {pub.title}
        </h1>

        <p className="mt-6 font-display text-body-lg text-paper-2">{pub.summary}</p>

        <div className="mt-6">
          {author?.fullName ? (
            <Link
              href={`/people/${author.slug}`}
              className="text-body-sm text-paper-2 underline decoration-line-hi underline-offset-4 transition-colors duration-(--duration-hover) hover:text-paper hover:decoration-brass"
            >
              {author.fullName}
            </Link>
          ) : (
            <p className="text-body-sm text-paper-3">Stratum Legal</p>
          )}
        </div>

        {pub.needsReview && (
          <p className="mt-6">
            <TodoClient>review before publishing — see frontmatter note at foot of article</TodoClient>
          </p>
        )}

        <Rule className="mt-10" />
      </Section>

      <Section rhythm="sm" index="02" railLabel="Reading" measure>
        {pub.isStub ? (
          <div className="border border-line p-8" style={{ borderRadius: 'var(--radius-sm)' }}>
            <Eyebrow tone="accent">Stub entry</Eyebrow>
            <p className="mt-4 max-w-(--container-measure) font-display text-body-lg text-paper-2">
              This publication is a seeded placeholder used to test the index, filtering
              and pagination before the firm has published enough articles to exercise
              them naturally. No article exists behind it yet.
            </p>
          </div>
        ) : ArticleBody ? (
          <Prose>
            <ArticleBody />
          </Prose>
        ) : (
          <TodoClient>article body — MDX file not found for this slug</TodoClient>
        )}
      </Section>
    </article>
  );
}
