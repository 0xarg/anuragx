"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Briefcase,
  LayoutGrid,
  User,
  Cpu,
  HelpCircle,
  Mail,
} from "lucide-react";

const items = [
  { id: "top", label: "Home", Icon: Home },
  { id: "experience", label: "Experience", Icon: User },
  { id: "work", label: "Work", Icon: Briefcase },
  { id: "services", label: "Services", Icon: LayoutGrid },
  { id: "tech", label: "Tech Stack", Icon: Cpu },
  { id: "faq", label: "FAQ", Icon: HelpCircle },
  { id: "contact", label: "Contact", Icon: Mail },
];

/**
 * Floating right-side vertical icon rail (reference detail). Scroll-jumps to
 * sections and highlights the one currently in view via IntersectionObserver.
 * Hidden on small screens where it would crowd the layout.
 */
export function NavRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 min-[1300px]:block"
    >
      <ul className="glass flex flex-col items-center gap-1 rounded-[var(--radius-pill)] p-2">
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
                  isActive
                    ? "bg-white text-bg"
                    : "text-muted hover:bg-surface-2 hover:text-text"
                }`}
              >
                <Icon size={18} />
                <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-text opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
