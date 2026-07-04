import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds a subtle hover lift + accent border. */
  interactive?: boolean;
  /** Frosted-glass surface (default). Set false for a solid surface card. */
  glass?: boolean;
};

/**
 * Rounded surface primitive — the building block for the bento/stats/tech grids.
 * Defaults to a frosted-glass surface; `interactive` adds a lift on hover.
 */
export function Card({
  children,
  className = "",
  interactive = false,
  glass = true,
}: CardProps) {
  const surface = glass ? "glass" : "border border-line bg-surface-1";
  const hover = interactive
    ? glass
      ? "glass-hover"
      : "transition-colors duration-300 hover:border-line-strong hover:bg-surface-2"
    : "";

  return (
    <div className={`rounded-[var(--radius-card)] ${surface} ${hover} ${className}`}>
      {children}
    </div>
  );
}
