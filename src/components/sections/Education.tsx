import { BlurFade } from "@/components/BlurFade";
import { Section } from "@/components/Section";
import { education } from "@/content/education";

export function Education() {
  return (
    <Section id="education">
      <BlurFade>
        <span className="eyebrow">education &amp; recognition</span>
      </BlurFade>

      <ul className="mt-6 flex flex-col">
        {education.map((c, i) => (
          <BlurFade as="li" key={c.title} delay={i * 0.06}>
            <div className="group flex flex-col gap-1 border-t border-border py-5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <h3 className="text-base font-medium text-foreground">{c.title}</h3>
                <p className="mt-0.5 text-sm text-muted">{c.detail}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted transition-colors group-hover:text-foreground">
                {c.meta}
              </span>
            </div>
          </BlurFade>
        ))}
      </ul>
    </Section>
  );
}
