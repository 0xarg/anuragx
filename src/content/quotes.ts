/**
 * Short "founder / CTO mindset" one-liners shown as particle text in the page
 * gutters — the contrast between someone who just writes code for money and
 * someone who owns outcomes and grows the business. Kept to 1–3 words so they
 * assemble cleanly from particles. Content varies per route.
 */
const quotesByPath: Record<string, string[]> = {
  home: ["own the outcome", "grow the business", "leverage > hours", "ship value"],
  about: ["systems over tasks", "build for scale", "think like an owner"],
  writing: ["clarity compounds", "write to think", "teach what you learn"],
  work: ["outcomes over output", "impact, not effort", "ship what matters"],
};

/** Map a pathname to its quote set (falls back to home). */
export function quotesForPath(pathname: string): string[] {
  if (pathname === "/") return quotesByPath.home;
  if (pathname.startsWith("/about")) return quotesByPath.about;
  if (pathname.startsWith("/writing")) return quotesByPath.writing;
  if (pathname.startsWith("/work")) return quotesByPath.work;
  return quotesByPath.home;
}
