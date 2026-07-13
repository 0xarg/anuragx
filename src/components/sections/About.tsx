import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/BlurFade";
import { Section } from "@/components/Section";

const facts = [
  { k: "based in", v: "Hisar, Haryana, India" },
  { k: "hours", v: "Works EST for US clients" },
  { k: "education", v: "IIT Madras — CGPA 8.5/10" },
  { k: "upwork", v: "Top Rated · $7,000+ earned" },
];

export function About() {
  return (
    <Section id="about">
      <BlurFade>
        <span className="eyebrow">about</span>
      </BlurFade>

      <BlurFade delay={0.05}>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-strong sm:text-base">
          I own the full lifecycle as sole engineer for international clients — system design, REST
          APIs, database schema, testing, and CI/CD deployment — with a focus on scalable
          architecture, security hardening, and reliable zero-to-one delivery.
        </p>
      </BlurFade>

      <BlurFade delay={0.1}>
        <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
          Sole engineer across 4+ international clients on Upwork, $7,000+ earned with a Top Rated
          badge in my first 6 months. Currently a final-year B.Sc. Data Science &amp; Programming
          student at IIT Madras (CGPA 8.5/10).
        </p>
      </BlurFade>

      <BlurFade delay={0.15}>
        <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-2">
          {facts.map((row) => (
            <div key={row.k} className="flex flex-col gap-1">
              <dt className="font-mono text-xs text-muted">{row.k}</dt>
              <dd className="text-sm text-foreground">{row.v}</dd>
            </div>
          ))}
        </dl>
      </BlurFade>

      <BlurFade delay={0.2}>
        <Link
          href="/about"
          className="group mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
        >
          More about me
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </BlurFade>
    </Section>
  );
}
