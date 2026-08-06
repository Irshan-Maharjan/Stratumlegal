import type { MDXComponents } from 'mdx/types';

/**
 * Global MDX component overrides. Required by @next/mdx for the App Router.
 * Left empty: <Prose> supplies all typographic styling via descendant
 * selectors (.prose-stratum h2, etc.) on the plain HTML elements MDX emits,
 * so no per-element component swap is needed here.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
