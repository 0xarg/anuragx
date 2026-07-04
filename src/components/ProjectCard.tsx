import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import type { Project } from "@/content/projects";

/** Per-card gradient backdrops used when a project has no screenshot yet. */
const gradients = [
  "linear-gradient(135deg, #ff8a3d 0%, #ff3d2e 100%)",
  "linear-gradient(135deg, #2a2320 0%, #ff5b26 130%)",
  "linear-gradient(135deg, #1a1714 0%, #ff8a3d 160%)",
];

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const gradient = gradients[index % gradients.length];

  return (
    <article className="group glass glass-hover relative overflow-hidden rounded-[var(--radius-card)]">
      {/* Visual header — screenshot if provided, else gradient backdrop */}
      <div className="relative h-52 w-full overflow-hidden sm:h-60">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full w-full items-end p-8 transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ background: gradient }}
          >
            <span className="font-display text-5xl font-semibold uppercase text-white/90 sm:text-6xl">
              {project.name}
            </span>
          </div>
        )}
        <span className="absolute right-4 top-4 rounded-[var(--radius-pill)] border border-white/25 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.tag}
        </span>
      </div>

      <div className="p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-3xl font-medium text-text">{project.name}</h3>
          <Link
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name} live`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-text transition-colors hover:border-accent hover:bg-accent hover:text-white"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <p className="mt-4 text-base leading-relaxed text-text">{project.description}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.detail}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-[var(--radius-pill)] bg-surface-3 px-3 py-1 text-xs font-medium text-muted"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-center gap-5 border-t border-line pt-5 text-sm">
          <Link
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 font-medium text-text transition-colors hover:text-accent"
          >
            Live
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Link>
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-text"
          >
            <GithubIcon size={15} /> GitHub
          </Link>
        </div>
      </div>
    </article>
  );
}
