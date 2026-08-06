import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    // Required in Next 16: unrestricted quality access is otherwise blocked.
    qualities: [75],
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
