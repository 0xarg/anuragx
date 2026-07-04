import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  SHOW_TESTIMONIALS,
  testimonials,
} from "@/content/testimonials";

/**
 * Testimonials section — matches the reference card style but is gated OFF via
 * SHOW_TESTIMONIALS (brief §5). It renders nothing until real, verified reviews
 * land. Do NOT populate with placeholder content. When ready: set the flag,
 * fill src/content/testimonials.ts, and add a nav link in Nav.tsx.
 */
export function Testimonials() {
  if (!SHOW_TESTIMONIALS || testimonials.length === 0) return null;

  return (
    <Section id="testimonials" index="04" label="Testimonials">
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.author} delay={(i % 2) * 0.08}>
            <figure className="flex h-full flex-col border border-line bg-surface-1 p-8">
              <blockquote className="font-display text-xl leading-snug text-text">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-5">
                <span className="block text-base font-medium text-text">
                  {t.author}
                </span>
                <span className="eyebrow text-sm">{t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
