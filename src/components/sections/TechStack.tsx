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
import { Reveal } from "@/components/Reveal";
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

export function TechStack() {
  return (
    <section id="tech" className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
      <Reveal className="mb-12 text-center">
        <span className="eyebrow inline-flex items-center gap-2 text-sm uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Tech Stack
        </span>
        <h2 className="font-display mt-3 text-5xl font-medium uppercase text-text sm:text-7xl">
          Tools I ship with
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {techstack.map((tech, i) => {
          const Icon = icons[tech.icon];
          return (
            <Reveal key={tech.name} delay={(i % 4) * 0.05}>
              <div className="glass glass-hover group flex h-full items-center gap-4 rounded-[var(--radius-card)] p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-white/5 text-text transition-colors duration-300 group-hover:text-accent">
                  <Icon size={24} />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-medium text-text">{tech.name}</h3>
                  <p className="mt-0.5 truncate text-xs text-muted">{tech.blurb}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
