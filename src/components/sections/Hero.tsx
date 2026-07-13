import Image from "next/image";
import { BlurFade } from "@/components/BlurFade";
import { Button } from "@/components/Button";
import { Magnetic } from "@/components/Magnetic";
import { HeroGlobe } from "@/components/HeroGlobe";
import { site } from "@/content/site";
import { Briefcase, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/BrandIcons";

/** `color` is each service's brand hue, revealed on hover. Monochrome brands
 *  (GitHub, X) map to the theme foreground so they read as "activated" in both
 *  light and dark. */
const socials = [
  { href: `mailto:${site.email}`, label: "Email", Icon: Mail, color: "#EA4335" },
  { href: site.socials.github, label: "GitHub", Icon: GithubIcon, color: "var(--foreground)" },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon, color: "#0A66C2" },
  { href: site.socials.x, label: "X", Icon: XIcon, color: "var(--foreground)" },
  { href: site.socials.upwork, label: "Upwork", Icon: Briefcase, color: "#14A800" },
];

export function Hero() {
  return (
    <section id="top" className="px-6 pt-28 pb-14 sm:px-8 sm:pt-32">
      <BlurFade inView={false}>
        <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border bg-card px-3 py-1 font-mono text-xs text-muted-strong">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {site.available}
        </span>
      </BlurFade>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div className="min-w-0">
          <BlurFade inView={false} delay={0.05}>
            <div className="flex items-center gap-3">
              <Image
                src={site.photo}
                alt={site.name}
                width={80}
                height={80}
                priority
                className="h-10 w-10 shrink-0 rounded-full border border-border object-cover object-top"
              />
              <h1 className="tracking-tight-heading text-3xl font-semibold text-foreground sm:text-4xl">
                {site.name}
              </h1>
            </div>
          </BlurFade>
          <BlurFade inView={false} delay={0.1}>
            <p className="mt-2 font-mono text-sm text-muted">{site.title}</p>
          </BlurFade>
          <BlurFade inView={false} delay={0.2}>
            <p className="mt-6 text-[15px] leading-relaxed text-muted-strong sm:text-base">
              {site.positioning}
            </p>
          </BlurFade>
        </div>

        <BlurFade inView={false} delay={0.15}>
          <div className="w-40 shrink-0 sm:w-56">
            <HeroGlobe />
          </div>
        </BlurFade>
      </div>

      <BlurFade inView={false} delay={0.25}>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Button href="#work">View my work</Button>
          </Magnetic>
          <Button href={site.resume} variant="secondary" external>
            Résumé
          </Button>
          <div className="flex items-center gap-1">
            {socials.map(({ href, label, Icon, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                style={{ ["--brand" as string]: color }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-[color:var(--brand)]"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
