import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { BlurFade } from "@/components/BlurFade";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { GithubIcon } from "@/components/BrandIcons";
import { site } from "@/content/site";
import type { Project } from "@/content/projects";

/** Small mono section label matching the homepage `.eyebrow` treatment. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

/**
 * Full case-study page body for /work/<slug>. Renders inside the shared framed
 * column, reusing the site's eyebrow / badge / button language so a deep page
 * feels of a piece with the homepage.
 */
export function CaseStudyView({ project }: { project: Project }) {
  const cs = project.caseStudy!;

  return (
    <main className="px-6 pt-28 pb-16 sm:px-8 sm:pt-32">
      <BlurFade inView={false}>
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={13} /> selected work
        </Link>
      </BlurFade>

      <BlurFade inView={false} delay={0.05}>
        <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted">
          <span className="text-[color:var(--foreground)]">{project.tag}</span>
          <span aria-hidden>·</span>
          <span>{cs.timeline}</span>
        </div>
      </BlurFade>

      <BlurFade inView={false} delay={0.1}>
        <h1
          style={{ viewTransitionName: `project-${project.slug}` }}
          className="tracking-tight-heading mt-3 text-4xl font-semibold text-foreground sm:text-5xl"
        >
          {project.name}
        </h1>
      </BlurFade>

      <BlurFade inView={false} delay={0.15}>
        <p className="mt-4 text-lg leading-relaxed text-muted-strong">
          {cs.summary}
        </p>
      </BlurFade>

      <BlurFade inView={false} delay={0.2}>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="font-mono text-xs text-muted">{cs.role}</span>
          <div className="flex items-center gap-2">
            <Button href={project.live} external>
              Live <ArrowUpRight size={15} />
            </Button>
            <Button href={project.github} variant="secondary" external>
              <GithubIcon size={15} /> Code
            </Button>
          </div>
        </div>
      </BlurFade>

      <BlurFade inView={false} delay={0.25}>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s}>
              <Badge>{s}</Badge>
            </li>
          ))}
        </ul>
      </BlurFade>

      {/* Problem */}
      <section className="mt-14">
        <BlurFade>
          <Eyebrow>the problem</Eyebrow>
        </BlurFade>
        {cs.problem.map((p, i) => (
          <BlurFade key={i} delay={0.05 + i * 0.05}>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-strong">
              {p}
            </p>
          </BlurFade>
        ))}
      </section>

      {/* Approach sections */}
      <section className="mt-14">
        <BlurFade>
          <Eyebrow>approach</Eyebrow>
        </BlurFade>
        <div className="mt-6 flex flex-col gap-10">
          {cs.sections.map((s, i) => (
            <BlurFade key={s.heading} delay={i * 0.05}>
              <div>
                <h2 className="text-base font-medium text-foreground">
                  {s.heading}
                </h2>
                {s.body?.map((b, j) => (
                  <p
                    key={j}
                    className="mt-3 text-[15px] leading-relaxed text-muted-strong"
                  >
                    {b}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-[15px] leading-relaxed text-muted-strong"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Architecture pipeline */}
      <section className="mt-14">
        <BlurFade>
          <Eyebrow>architecture</Eyebrow>
        </BlurFade>
        <BlurFade delay={0.05}>
          <ol className="mt-6 flex flex-col">
            {cs.architecture.map((step, i) => {
              const [head, ...rest] = step.split(" — ");
              const last = i === cs.architecture.length - 1;
              return (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-xs text-muted-strong">
                      {i + 1}
                    </span>
                    {!last && <span className="w-px flex-1 bg-border" />}
                  </div>
                  <div className={last ? "pb-0" : "pb-6"}>
                    <span className="font-mono text-sm text-foreground">
                      {head}
                    </span>
                    {rest.length > 0 && (
                      <p className="mt-0.5 text-sm text-muted">
                        {rest.join(" — ")}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </BlurFade>
      </section>

      {/* Outcomes */}
      <section className="mt-14">
        <BlurFade>
          <Eyebrow>outcomes</Eyebrow>
        </BlurFade>
        <BlurFade delay={0.05}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cs.outcomes.map((o) => (
              <div
                key={o.label}
                className="rounded-[var(--radius-card)] border border-border bg-card/60 p-4"
              >
                <div className="tracking-tight-heading text-2xl font-semibold text-foreground">
                  {o.value}
                </div>
                <div className="mt-1 font-mono text-[11px] leading-tight text-muted">
                  {o.label}
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* CTA */}
      <BlurFade delay={0.1}>
        <div className="mt-16 rounded-[var(--radius-card)] border border-border bg-card/50 p-6 text-center">
          <p className="text-[15px] text-muted-strong">
            Want something like this shipped for your product?
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button href={`mailto:${site.email}`}>Get in touch</Button>
            <Button href="/#work" variant="secondary">
              More work
            </Button>
          </div>
        </div>
      </BlurFade>
    </main>
  );
}
