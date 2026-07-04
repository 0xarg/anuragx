import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <Section id="about" index="01" label="About">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <p className="font-display text-3xl font-medium leading-tight text-text sm:text-4xl">
            I own the full lifecycle as sole engineer for international clients
            — system design, REST APIs, database schema, testing, and CI/CD
            deployment — with a focus on scalable architecture, security
            hardening, and reliable zero-to-one delivery.
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            Sole engineer across 4+ international clients on Upwork, $7,000+
            earned with a Top Rated badge in my first 6 months. Currently a
            final-year B.Sc. Data Science &amp; Programming student at IIT Madras
            (CGPA 8.5/10).
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4">
          <dl className="flex flex-col gap-6 border-t border-line pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            {[
              { k: "Based in", v: "Hisar, Haryana, India" },
              { k: "Hours", v: "Works EST for US clients" },
              { k: "Education", v: "IIT Madras — CGPA 8.5/10" },
              { k: "Upwork", v: "Top Rated · $7,000+ earned" },
            ].map((row) => (
              <div key={row.k}>
                <dt className="eyebrow text-xs uppercase tracking-wide">
                  {row.k}
                </dt>
                <dd className="mt-1 text-base text-text">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
