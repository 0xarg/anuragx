import { BlurFade } from "@/components/BlurFade";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export function Work() {
  return (
    <Section id="work">
      <BlurFade>
        <span className="eyebrow">selected work</span>
      </BlurFade>

      <div className="mt-6 flex flex-col gap-4">
        {projects.map((project, i) => (
          <BlurFade key={project.name} delay={i * 0.06}>
            <ProjectCard project={project} />
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
