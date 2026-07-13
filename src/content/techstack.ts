/** Icon keys resolved to react-icons/Simple-Icons glyphs in the TechStack section. */
export type TechIcon =
  | "typescript"
  | "javascript"
  | "nextjs"
  | "react"
  | "nodejs"
  | "express"
  | "nestjs"
  | "graphql"
  | "postgresql"
  | "mysql"
  | "supabase"
  | "firebase"
  | "googlecloud"
  | "docker"
  | "nginx"
  | "vercel"
  | "railway"
  | "githubactions"
  | "git"
  | "posthog"
  | "sentry"
  | "pm2"
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
  { name: "JavaScript", blurb: "The language under everything", icon: "javascript" },
  { name: "Next.js", blurb: "App Router, SSR & production SaaS", icon: "nextjs" },
  { name: "React", blurb: "Component UIs & interactive frontends", icon: "react" },
  { name: "Node.js", blurb: "Express & NestJS backend services", icon: "nodejs" },
  { name: "Express", blurb: "Lightweight REST API services", icon: "express" },
  { name: "NestJS", blurb: "Modular-monolith REST backends", icon: "nestjs" },
  { name: "GraphQL", blurb: "Typed API queries & schemas", icon: "graphql" },
  { name: "PostgreSQL", blurb: "Schema design & query optimization", icon: "postgresql" },
  { name: "MySQL", blurb: "Relational data & automated migrations", icon: "mysql" },
  { name: "Supabase", blurb: "Auth, Postgres & realtime data", icon: "supabase" },
  { name: "Firebase", blurb: "Auth, Firestore & Cloud Functions", icon: "firebase" },
  { name: "Google Cloud", blurb: "Cloud Functions & managed infra", icon: "googlecloud" },
  { name: "Docker", blurb: "Containerized services & deploys", icon: "docker" },
  { name: "Nginx", blurb: "Reverse proxy, HTTPS & routing", icon: "nginx" },
  { name: "Vercel", blurb: "Edge deploys for Next.js apps", icon: "vercel" },
  { name: "Railway", blurb: "Managed service & DB hosting", icon: "railway" },
  { name: "GitHub Actions", blurb: "CI/CD pipelines, push-to-deploy", icon: "githubactions" },
  { name: "Git", blurb: "Version control & code review", icon: "git" },
  { name: "PostHog", blurb: "Product analytics & funnels", icon: "posthog" },
  { name: "Sentry", blurb: "Error tracking & monitoring", icon: "sentry" },
  { name: "PM2", blurb: "Node process management on VPS", icon: "pm2" },
  { name: "Solidity", blurb: "Upgradeable smart contracts (UUPS)", icon: "solidity" },
  { name: "Claude API", blurb: "AI-driven product workflows", icon: "claude" },
];
