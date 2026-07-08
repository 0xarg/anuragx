import { BlurFade } from "@/components/BlurFade";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { site } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact" className="bg-card/60">
      <BlurFade>
        <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          available for freelance
        </span>
      </BlurFade>

      <BlurFade delay={0.05}>
        <h2 className="tracking-tight-heading mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
          Let&rsquo;s build something solid.
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-strong">
          Open to full-stack engineering work for international clients. The fastest way to reach
          me is email — send a short brief and I&rsquo;ll get back to you.
        </p>
      </BlurFade>

      <BlurFade delay={0.1}>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button href={`mailto:${site.email}`}>{site.email}</Button>
          <Button href={site.resume} variant="secondary" external>
            View résumé
          </Button>
        </div>
      </BlurFade>
    </Section>
  );
}
