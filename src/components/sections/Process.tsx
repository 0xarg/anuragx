import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { processSteps, type Step } from "@/content/process";

const icons: Record<Step["icon"], typeof Search> = {
  Search,
  PenTool,
  Code2,
  Rocket,
};

export function Process() {
  return (
    <section id="process" className="mx-auto w-full max-w-5xl px-5 py-20 sm:py-28">
      <Reveal className="mb-12 text-center">
        <h2 className="font-display text-5xl font-medium uppercase text-text sm:text-7xl">
          Work Process
        </h2>
        <p className="mt-3 text-muted">How I take a project from brief to production.</p>
      </Reveal>

      {/* Sticky-stacking cards */}
      <div className="flex flex-col gap-6">
        {processSteps.map((step, i) => {
          const Icon = icons[step.icon];
          return (
            <div
              key={step.title}
              className="sticky rounded-[var(--radius-card)] border border-line bg-surface-1 p-7 sm:p-10"
              style={{ top: `${96 + i * 18}px` }}
            >
              <div className="flex items-center justify-between gap-6">
                <div>
                  <span className="eyebrow text-sm uppercase tracking-wide">{step.step}</span>
                  <h3 className="font-display mt-3 text-3xl font-medium text-text sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {step.description}
                  </p>
                </div>
                <span
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent sm:h-28 sm:w-28"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(255,138,61,0.18), transparent 70%)",
                  }}
                >
                  <Icon size={36} strokeWidth={1.4} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
