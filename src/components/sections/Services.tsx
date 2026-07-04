import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { services } from "@/content/services";
import { Globe } from "lucide-react";

export function Services() {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
      <div className="glass rounded-[var(--radius-card)] p-7 sm:p-12">
        <Reveal className="eyebrow mb-10 flex items-center gap-2 text-sm uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          What I do
        </Reveal>

        <ul className="divide-y divide-line border-y border-line">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <li className="group relative py-6 sm:py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                  <h3 className="font-display text-4xl font-medium text-faint transition-colors duration-300 group-hover:text-text sm:text-6xl">
                    {service.title}
                  </h3>
                  <span className="eyebrow text-sm tabular-nums">
                    [0{i + 1}]
                  </span>
                </div>
                {/* Sub-items revealed on hover */}
                <div className="grid grid-rows-[0fr] overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-4 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                  <ul className="flex min-h-0 flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <Globe size={16} /> Available worldwide
          </span>
          <Button href="#contact" variant="secondary">
            Contact me
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
