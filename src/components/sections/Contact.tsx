import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { site } from "@/content/site";
import { Briefcase, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: "GitHub", value: "@0xarg", href: site.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", value: "anurag-poonia", href: site.socials.linkedin, Icon: LinkedinIcon },
  { label: "Upwork", value: "Top Rated", href: site.socials.upwork, Icon: Briefcase },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
      <div className="glass relative overflow-hidden rounded-[var(--radius-card)] p-7 sm:p-14">
        <div
          aria-hidden
          className="glow-orange pointer-events-none absolute -right-20 -top-20 h-80 w-80 blur-2xl"
        />

        <Reveal className="eyebrow mb-6 flex items-center gap-2 text-sm uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Contact for work
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-display max-w-3xl text-5xl font-medium uppercase text-text sm:text-7xl">
            Let&rsquo;s build something solid
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Open to full-stack engineering work for international clients. The fastest way to reach
            me is email — send a short brief and I&rsquo;ll get back to you.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={`mailto:${site.email}`}>{site.email}</Button>
          <Button href={site.resume} variant="secondary" download arrow={false}>
            Download résumé
          </Button>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {links.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group glass glass-hover flex items-center justify-between gap-4 rounded-[var(--radius-lg)] px-5 py-4"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} className="text-muted transition-colors group-hover:text-accent" />
                    <span className="eyebrow text-xs uppercase tracking-wide">{label}</span>
                  </span>
                  <span className="text-sm text-text transition-colors group-hover:text-accent">
                    {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
