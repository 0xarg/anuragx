"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Top bar (reference): logo left, centered availability pill with a live green
 * dot, location right. Gains a blurred background once the page scrolls.
 */
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
        scrolled ? "border-b border-line bg-bg/70 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-4 px-5 py-4 sm:grid-cols-3">
        <Link
          href="#top"
          className="font-display text-xl font-semibold uppercase tracking-tight text-text transition-colors hover:text-accent"
        >
          Anurag
        </Link>

        <div className="hidden justify-center sm:flex">
          <span className="glass inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-4 py-2 text-sm text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {site.available}
          </span>
        </div>

        <span className="justify-self-end text-right text-sm leading-tight text-muted">
          {site.location}
        </span>
      </nav>
    </header>
  );
}
