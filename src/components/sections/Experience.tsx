import { Reveal } from "@/components/Reveal";
import { WordReveal } from "@/components/WordReveal";
import { experiences, experienceIntro } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
      <Reveal className="eyebrow mb-8 flex items-center gap-2 text-sm uppercase tracking-wide">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Experience
      </Reveal>

      <WordReveal
        text={experienceIntro}
        className="font-display max-w-4xl text-3xl font-light leading-tight text-text sm:text-5xl"
      />

      <ul className="mt-14 border-t border-line">
        {experiences.map((exp, i) => (
          <Reveal key={`${exp.company}-${i}`} delay={i * 0.05}>
            <li className="group border-b border-line">
              <div className="flex flex-col gap-3 py-6 transition-colors sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow text-sm tabular-nums">
                    0{experiences.length - i}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-text transition-colors group-hover:text-accent sm:text-3xl">
                      {exp.role}
                      <span className="text-muted"> · {exp.company}</span>
                    </h3>
                    <p className="mt-1 text-sm text-muted">{exp.context}</p>
                  </div>
                </div>
                <span className="inline-flex w-fit items-center rounded-[var(--radius-pill)] border border-line px-4 py-1.5 text-sm text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                  {exp.period}
                </span>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
