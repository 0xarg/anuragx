"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

// Root-anchored (`/#…`) so they resolve from case-study / writing sub-pages too.
const links = [
  { href: "/#about", label: "about" },
  { href: "/#work", label: "work" },
  { href: "/writing", label: "writing" },
  { href: "/#contact", label: "contact" },
];

/** Minimal top bar: mono wordmark left, anchor links + theme toggle right.
 *  Gains a blurred, bordered background once the page scrolls. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          anurag<span className="text-muted">.dev</span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="mr-1 hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
