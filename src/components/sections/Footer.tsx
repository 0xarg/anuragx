import { site } from "@/content/site";
import { Briefcase } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/BrandIcons";
import { PlusMark } from "@/components/PlusMark";

/** Brand hue revealed on hover; monochrome brands map to the theme foreground. */
const socials = [
  { href: site.socials.github, label: "GitHub", Icon: GithubIcon, color: "var(--foreground)" },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon, color: "#0A66C2" },
  { href: site.socials.x, label: "X", Icon: XIcon, color: "var(--foreground)" },
  { href: site.socials.upwork, label: "Upwork", Icon: Briefcase, color: "#14A800" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border">
      <PlusMark className="left-0 top-0" />
      <PlusMark className="right-0 top-0" />
      <div className="flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="font-mono text-xs text-muted">
          © {year} {site.name} · {site.location}
        </span>
        <div className="flex items-center gap-1">
          {socials.map(({ href, label, Icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ ["--brand" as string]: color }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-[color:var(--brand)]"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
