import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiSupabase,
  SiDocker,
  SiGithubactions,
  SiSolidity,
  SiAnthropic,
} from "react-icons/si";
import { BlurFade } from "@/components/BlurFade";
import { Section } from "@/components/Section";
import { techstack, type TechIcon } from "@/content/techstack";

const icons: Record<TechIcon, IconType> = {
  typescript: SiTypescript,
  nextjs: SiNextdotjs,
  react: SiReact,
  nodejs: SiNodedotjs,
  nestjs: SiNestjs,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  docker: SiDocker,
  githubactions: SiGithubactions,
  solidity: SiSolidity,
  claude: SiAnthropic,
};

/** Real brand color revealed on hover. Monochrome brands (Next.js, Solidity)
 *  map to the theme foreground so they read as "activated" in both modes. */
const brandColors: Record<TechIcon, string> = {
  typescript: "#3178C6",
  nextjs: "var(--foreground)",
  react: "#61DAFB",
  nodejs: "#5FA04E",
  nestjs: "#E0234E",
  postgresql: "#4169E1",
  supabase: "#3FCF8E",
  docker: "#2496ED",
  githubactions: "#2088FF",
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
