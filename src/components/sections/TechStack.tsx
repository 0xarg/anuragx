import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiGooglecloud,
  SiDocker,
  SiNginx,
  SiVercel,
  SiRailway,
  SiGithubactions,
  SiGit,
  SiPosthog,
  SiSentry,
  SiPm2,
  SiSolidity,
  SiAnthropic,
} from "react-icons/si";
import { BlurFade } from "@/components/BlurFade";
import { Section } from "@/components/Section";
import { techstack, type TechIcon } from "@/content/techstack";

const icons: Record<TechIcon, IconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  nextjs: SiNextdotjs,
  react: SiReact,
  nodejs: SiNodedotjs,
  express: SiExpress,
  nestjs: SiNestjs,
  graphql: SiGraphql,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  supabase: SiSupabase,
  firebase: SiFirebase,
  googlecloud: SiGooglecloud,
  docker: SiDocker,
  nginx: SiNginx,
  vercel: SiVercel,
  railway: SiRailway,
  githubactions: SiGithubactions,
  git: SiGit,
  posthog: SiPosthog,
  sentry: SiSentry,
  pm2: SiPm2,
  solidity: SiSolidity,
  claude: SiAnthropic,
};

/** Real brand color revealed on hover. Monochrome brands (Next.js, Solidity)
 *  map to the theme foreground so they read as "activated" in both modes. */
const brandColors: Record<TechIcon, string> = {
  typescript: "#3178C6",
  javascript: "#F7DF1E",
  nextjs: "var(--foreground)",
  react: "#61DAFB",
  nodejs: "#5FA04E",
  express: "var(--foreground)",
  nestjs: "#E0234E",
  graphql: "#E10098",
  postgresql: "#4169E1",
  mysql: "#4479A1",
  supabase: "#3FCF8E",
  firebase: "#FFCA28",
  googlecloud: "#4285F4",
  docker: "#2496ED",
  nginx: "#009639",
  vercel: "var(--foreground)",
  railway: "var(--foreground)",
  githubactions: "#2088FF",
  git: "#F05032",
  posthog: "#1D4AFF",
  sentry: "#362D59",
  pm2: "#2B037A",
  solidity: "var(--foreground)",
  claude: "#D97757",
};

export function TechStack() {
  return (
    <Section id="tech">
      <BlurFade>
        <span className="eyebrow">skills</span>
      </BlurFade>

      <BlurFade delay={0.05}>
        <ul className="mt-6 flex flex-wrap gap-2">
          {techstack.map((tech) => {
            const Icon = icons[tech.icon];
            return (
              <li
                key={tech.name}
                style={{ ["--brand" as string]: brandColors[tech.icon] }}
                className="group inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border bg-card px-3 py-1.5 text-sm text-muted-strong transition-colors duration-200 hover:border-[color:var(--brand)] hover:text-foreground"
              >
                <Icon
                  size={15}
                  className="text-muted transition-colors duration-200 group-hover:text-[color:var(--brand)]"
                />
                {tech.name}
              </li>
            );
          })}
        </ul>
      </BlurFade>
    </Section>
  );
}
