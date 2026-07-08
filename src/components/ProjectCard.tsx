import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { Badge } from "@/components/Badge";
import type { Project } from "@/content/projects";

/** Subtle per-project accent, revealed only on hover. Keyed by project tag. */
const tagAccents: Record<string, string> = {
  SaaS: "#2563eb",
  Web3: "#7c3aed",
  DevTools: "#059669",
};

export function ProjectCard({ project }: { project: Project }) {
  const accent = tagAccents[project.tag] ?? "var(--foreground)";

  return (
    <article
      style={{ ["--card-accent" as string]: accent }}
      className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card/70 p-5 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--card-accent)] hover:shadow-[0_14px_44px_-20px_var(--card-accent)]"
    >
      {/* Faint colored wash — fades in on hover only. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[var(--card-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]"
      />

      <div className="relative">
        {project.image && (
          <div className="relative mb-5 h-44 w-full overflow-hidden rounded-[var(--radius-lg)] border border-border">
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              sizes="(max-width: 672px) 100vw, 640px"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-medium text-foreground">{project.name}</h3>
            <span className="mt-0.5 block font-mono text-xs text-muted transition-colors group-hover:text-[color:var(--card-accent)]">
              {project.tag}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
            >
              <GithubIcon size={16} />
            </Link>
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
            >
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-strong">{project.description}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.detail}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s}>
              <Badge>{s}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
