/** Icon keys resolved to react-icons/Simple-Icons glyphs in the TechStack section. */
export type TechIcon =
  | "typescript"
  | "nextjs"
  | "react"
  | "nodejs"
  | "nestjs"
  | "postgresql"
  | "supabase"
  | "docker"
  | "githubactions"
  | "solidity"
  | "claude";

export type Tech = {
  name: string;
  blurb: string;
  icon: TechIcon;
};

/**
 * Tech stack cards (reference "Tech Stack" bento). Names pulled from the résumé
 * SKILLS section. Rendered with real brand glyphs (monochrome) in glass tiles.
 */
export const techstack: Tech[] = [
  { name: "TypeScript", blurb: "Typed end-to-end across the stack", icon: "typescript" },
  { name: "Next.js", blurb: "App Router, SSR & production SaaS", icon: "nextjs" },
  { name: "React", blurb: "Component UIs & interactive frontends", icon: "react" },
  { name: "Node.js", blurb: "Express & NestJS backend services", icon: "nodejs" },
  { name: "NestJS", blurb: "Modular-monolith REST backends", icon: "nestjs" },
  { name: "PostgreSQL", blurb: "Schema design & query optimization", icon: "postgresql" },
  { name: "Supabase", blurb: "Auth, Postgres & realtime data", icon: "supabase" },
  { name: "Docker", blurb: "Containerized services & deploys", icon: "docker" },
  { name: "GitHub Actions", blurb: "CI/CD pipelines, push-to-deploy", icon: "githubactions" },
  { name: "Solidity", blurb: "Upgradeable smart contracts (UUPS)", icon: "solidity" },
  { name: "Claude API", blurb: "AI-driven product workflows", icon: "claude" },
];
