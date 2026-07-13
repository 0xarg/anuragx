import type { MDXComponents } from "mdx/types";

/**
 * Required by `@next/mdx` in the App Router. Global styling for MDX blog posts —
 * maps raw markdown elements to the site's typographic system (Geist, muted
 * neutrals, mono inline code) so a post reads like the rest of the site without
 * a plugin. Applied wherever MDX is rendered (see /writing/[slug]).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="tracking-tight-heading mt-12 text-xl font-semibold text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-base font-medium text-foreground">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 text-[15px] leading-relaxed text-muted-strong">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-foreground underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 flex flex-col gap-2 pl-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-4 flex list-decimal flex-col gap-2 pl-5 marker:font-mono marker:text-muted">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-[15px] leading-relaxed text-muted-strong">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-border pl-4 text-[15px] italic text-muted">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[13px] text-foreground">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mt-6 overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-card p-4 font-mono text-[13px] leading-relaxed text-foreground">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-10 border-border" />,
    ...components,
  };
}
