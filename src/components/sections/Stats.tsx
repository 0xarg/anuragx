import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/Card";
import { CountUp } from "@/components/CountUp";
import { site, stats } from "@/content/site";
import { Globe, Star } from "lucide-react";

export function Stats() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-4 sm:pb-24 sm:pt-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) * 0.06}>
            <Card interactive className="flex h-full flex-col justify-between gap-6 p-6">
              <span className="eyebrow inline-flex items-center gap-2 text-xs uppercase tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {s.label}
              </span>
              <CountUp
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="font-display text-5xl font-medium text-text sm:text-6xl"
              />
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Wide availability card */}
      <Reveal delay={0.1} className="mt-4">
        <Card className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </span>
            <span className="text-sm text-text">Top Rated on Upwork</span>
          </div>
          <div className="flex items-center gap-3 text-muted">
            <span className="text-sm">
              Available worldwide · {site.timezone}
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-text">
              <Globe size={18} />
            </span>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
