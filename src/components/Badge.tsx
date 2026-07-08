import type { ReactNode } from "react";

/** Small rounded pill for skills / tech tags. */
export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] border border-border bg-card px-3 py-1 font-mono text-xs text-muted-strong ${className}`}
    >
      {children}
    </span>
  );
}
