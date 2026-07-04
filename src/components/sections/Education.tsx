import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/Card";
import { WordReveal } from "@/components/WordReveal";
import { education } from "@/content/education";
import { GraduationCap, Award } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
      <Reveal className="eyebrow mb-8 flex items-center gap-2 text-sm uppercase tracking-wide">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Education & Recognition
      </Reveal>

      <WordReveal
        text="Learning and credentials that back the work — from IIT Madras to a Top Rated track record."
        className="font-display mb-12 max-w-3xl text-3xl font-light leading-tight text-text sm:text-4xl"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((c, i) => {
          const Icon = c.title === "Top Rated" ? Award : GraduationCap;
          return (
            <Reveal key={c.title} delay={(i % 2) * 0.06}>
              <Card interactive className="flex h-full items-start gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-surface-3 text-accent">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-text">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">{c.detail}</p>
                  <p className="eyebrow mt-2 text-xs uppercase tracking-wide">{c.meta}</p>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
