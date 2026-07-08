import { BlurFade } from "@/components/BlurFade";
import { Section } from "@/components/Section";
import { GitHubGraph } from "@/components/GitHubGraph";

export function Contributions() {
  return (
    <Section id="github">
      <BlurFade>
        <span className="eyebrow">github</span>
      </BlurFade>

      <BlurFade delay={0.05}>
        <p className="mt-4 text-sm text-muted">
          What I&rsquo;ve been building lately — hover to bring it to life.
        </p>
      </BlurFade>

      <BlurFade delay={0.1}>
        <div className="mt-6">
          <GitHubGraph />
        </div>
      </BlurFade>
    </Section>
  );
}
