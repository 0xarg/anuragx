"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/** Flips between light and dark. Both icons are always rendered (identical DOM
 *  on server and client, so no hydration mismatch); the pre-hydration `.dark`
 *  class next-themes sets decides which one is visible via CSS. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-strong transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
    >
      <Sun size={16} className="hidden dark:block" />
      <Moon size={16} className="block dark:hidden" />
    </button>
  );
}
