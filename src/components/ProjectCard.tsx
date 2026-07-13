"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { GithubIcon } from "@/components/BrandIcons";
import { Badge } from "@/components/Badge";
import type { Project } from "@/content/projects";

/** Subtle per-project accent, revealed only on hover. Keyed by project tag. */
const tagAccents: Record<string, string> = {
  SaaS: "#2563eb",
  Web3: "#7c3aed",
  DevTools: "#059669",
};

const MAX_TILT = 5; // degrees

export function ProjectCard({ project }: { project: Project }) {
  const accent = tagAccents[project.tag] ?? "var(--foreground)";
  const reduce = useReducedMotion();

  // Normalised pointer (−0.5…0.5) → spring-eased tilt; raw px → spotlight.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useMotionValue(0), {
    stiffness: 200,
    damping: 20,
  });
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${px}px ${py}px, var(--card-accent), transparent 65%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    rotateY.set(nx * MAX_TILT * 2);
    rotateX.set(-ny * MAX_TILT * 2);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        ["--card-accent" as string]: accent,
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 900,
      }}
      className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card/70 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 [transform-style:preserve-3d] hover:border-[color:var(--card-accent)] hover:shadow-[0_18px_50px_-24px_var(--card-accent)]"
    >
      {/* Faint colored wash — fades in on hover only. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[var(--card-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05]"
      />
      {/* Cursor-tracking spotlight in the project's accent, hover-only. */}
      {!reduce && (
        <motion.span
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-normal transition-opacity duration-300 group-hover:opacity-[0.08]"
        />
      )}

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
            {project.caseStudy ? (
              <Link
                href={`/work/${project.slug}`}
                style={{ viewTransitionName: `project-${project.slug}` }}
                className="text-base font-medium text-foreground transition-colors hover:text-[color:var(--card-accent)] focus-visible:outline-none focus-visible:underline"
              >
                {project.name}
              </Link>
            ) : (
              <h3 className="text-base font-medium text-foreground">{project.name}</h3>
            )}
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

        {project.caseStudy && (
          <Link
            href={`/work/${project.slug}`}
            className="group/cs mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-[color:var(--card-accent)]"
          >
            Read case study
            <ArrowRight
              size={13}
              className="transition-transform group-hover/cs:translate-x-0.5"
            />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
