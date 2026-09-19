import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  /**
   * Static export. The site is deployed to Hostinger shared hosting, which
   * serves files through Apache/LiteSpeed and cannot run a Node process, so
   * `next start` is not available there. Every route here is already static
   * or SSG — there are no route handlers, server actions or middleware — so
   * exporting loses no behaviour.
   *
   * `next build` now emits an `out/` directory; upload its CONTENTS (not the
   * folder) to public_html.
   */
  output: 'export',

  /**
   * Emit `/about/index.html` rather than `/about.html`, so Apache serves
   * every route from a directory index. Without this, a visitor loading
   * /about directly gets a 404 — the server has no rewrite rule mapping the
   * extensionless path to the .html file.
   */
  trailingSlash: true,

  images: {
    // Required in Next 16: unrestricted quality access is otherwise blocked.
    qualities: [75],

    /**
     * next/image's optimiser is a server feature and cannot run on static
     * hosting. Unoptimised means each file is served exactly as it sits in
     * /public — no resizing, no WebP conversion. The source images are
     * pre-sized and compressed for their slots to compensate; anything added
     * later must be sized before it is committed, since the build will no
     * longer do it.
     */
    unoptimized: true,
  },
};

// @next/mdx does not strip YAML frontmatter by default. remark-frontmatter
// alone parses the `---` block into a yaml AST node but still emits it as
// visible content; remark-mdx-frontmatter converts that node into an
// `export const frontmatter = {...}` instead, which is what actually removes
// it from the rendered article body. Turbopack requires plugins named as
// strings (functions can't cross the JS->Rust boundary), not imported and
// passed directly. The article's real field VALUES (title, date,
// practiceArea, etc.) are read separately, server-side, via gray-matter in
// src/content/publications.ts — these plugins only keep the raw block out of
// the rendered page.
const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter', 'remark-mdx-frontmatter'],
  },
});

export default withMDX(nextConfig);
