import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export function Work() {
  return (
    <section id="work" className="py-20 sm:py-28">
      {/* "Selected work" marquee heading */}
      <div className="mb-14 border-y border-line py-6">
        <Marquee duration={28}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-display flex items-center gap-6 pr-6 text-5xl font-medium uppercase text-text sm:text-7xl"
            >
              Selected work
              <span className="h-3 w-3 rounded-full bg-accent" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            delay={(i % 2) * 0.08}
            className={
              i === projects.length - 1 && projects.length % 2 === 1 ? "md:col-span-2" : ""
            }
          >
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
