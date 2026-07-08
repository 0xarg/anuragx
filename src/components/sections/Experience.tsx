import { BlurFade } from "@/components/BlurFade";
import { Section } from "@/components/Section";
import { experiences } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience">
      <BlurFade>
        <span className="eyebrow">experience</span>
      </BlurFade>

      <ul className="mt-6 flex flex-col">
        {experiences.map((exp, i) => (
          <BlurFade as="li" key={`${exp.company}-${i}`} delay={i * 0.06}>
            <div className="group flex flex-col gap-1 border-t border-border py-5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <h3 className="text-base font-medium text-foreground">
                  {exp.role} <span className="text-muted">· {exp.company}</span>
                </h3>
                <p className="mt-0.5 text-sm text-muted">{exp.context}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted transition-colors group-hover:text-foreground">
                {exp.period}
              </span>
            </div>
          </BlurFade>
        ))}
      </ul>
    </Section>
  );
}
