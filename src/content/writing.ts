import type { ComponentType } from "react";

export type Post = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingTime: string;
  excerpt: string;
};

/**
 * Blog post index metadata. The prose for each post lives in a matching
 * `src/content/writing/<slug>.mdx` file, wired below. Add a post by adding an
 * entry here plus its `.mdx` file and a loader line.
 */
export const posts: Post[] = [
  {
    slug: "shipping-solo",
    title: "Shipping production SaaS as a solo engineer",
    date: "2026-06-20",
    readingTime: "4 min read",
    excerpt:
      "What owning the whole lifecycle — design, APIs, schema, tests, deploy — actually looks like when there's no one to hand the hard parts to.",
  },
];

/**
 * Explicit slug → MDX loader map. Kept explicit (rather than a dynamic
 * `import(`...${slug}`)`) so the bundler statically knows every post module.
 */
export const postLoaders: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "shipping-solo": () => import("@/content/writing/shipping-solo.mdx"),
};

/** Newest first, for the index. */
export const postsByDate = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
