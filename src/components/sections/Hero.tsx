import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { site } from "@/content/site";
import { Briefcase } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

const socials = [
  { href: site.socials.github, label: "GitHub", Icon: GithubIcon },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: site.socials.upwork, label: "Upwork", Icon: Briefcase },
];

const marks = ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "AWS"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[82svh] w-full max-w-6xl flex-col justify-center px-5 pt-28 pb-8"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Left — type-forward */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-[var(--radius-pill)] py-1.5 pl-1.5 pr-4 text-sm text-muted">
              <span className="relative flex h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={site.photo}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-cover object-top"
                />
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {site.available}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="font-display mt-6 text-6xl font-medium uppercase leading-[0.92] text-text sm:text-7xl lg:text-8xl">
              Full-Stack
              <br />
              <span className="text-gradient">Software</span>
              <br />
              Engineer
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
              {site.positioning}
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#work">View my work</Button>
            <Button href={site.resume} variant="secondary" download arrow={false}>
              Résumé
            </Button>
          </Reveal>

          <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            {marks.map((m) => (
              <span key={m} className="flex items-center gap-2 text-sm text-faint">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {m}
              </span>
            ))}
          </Reveal>
        </div>

        {/* Right — glass photo, floating */}
        <Reveal delay={0.1} y={0} className="relative order-1 mx-auto w-full max-w-[300px] lg:order-2 lg:ml-auto lg:mr-0 sm:max-w-[340px]">
          <div
            aria-hidden
            className="glow-orange animate-glow pointer-events-none absolute -inset-8 -z-10 blur-2xl"
          />
          <div className="animate-float glass rounded-[var(--radius-card)] p-2">
            <div className="relative overflow-hidden rounded-[22px]">
              <Image
                src={site.photo}
                alt={`${site.name} — ${site.title}`}
                width={2667}
                height={4000}
                priority
                sizes="(max-width: 640px) 300px, 340px"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-soft-light"
                style={{
                  background: "linear-gradient(to top, rgba(255,91,38,0.6), transparent 55%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
              />
              <span className="font-script pointer-events-none absolute inset-x-0 bottom-2 text-center text-5xl text-white/95 drop-shadow-lg">
                {site.firstName}
              </span>
            </div>
          </div>

          {/* Floating social chips on the glass frame */}
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass glass-hover flex h-10 w-10 items-center justify-center rounded-full text-muted hover:text-accent"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
