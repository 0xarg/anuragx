import { Marquee } from "@/components/Marquee";
import { site } from "@/content/site";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#tech", label: "Tech" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      {/* Marquee ticker */}
      <div className="border-b border-line py-8">
        <Marquee duration={24}>
          {Array.from({ length: 4 }).map((_, i) => (
            <a
              key={i}
              href={`mailto:${site.email}`}
              className="font-display flex items-center gap-6 pr-6 text-4xl font-medium uppercase text-text transition-colors hover:text-accent sm:text-6xl"
            >
              Let&rsquo;s work together
              <span className="text-accent">→</span>
            </a>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-lg font-semibold uppercase text-text">
          {site.name}
        </span>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-text">
              {l.label}
            </a>
          ))}
        </nav>
        <span className="eyebrow text-xs">
          © {year} · {site.location}
        </span>
      </div>
    </footer>
  );
}
