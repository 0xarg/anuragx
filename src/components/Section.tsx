import type { ReactNode } from "react";
import { PlusMark } from "@/components/PlusMark";

/**
 * A single band of the framed page column. Every section but the first carries
 * a thin top divider with crosshair marks where the divider meets the frame
 * rails — the minimalist "separator line with corners" between sections.
 * Horizontal padding keeps content clear of the rails.
 */
export function Section({
  id,
  children,
  className = "",
  first = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  first?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative px-6 py-10 sm:px-8 sm:py-12 ${
        first ? "" : "border-t border-border"
      } ${className}`}
    >
      {!first && (
        <>
          <PlusMark className="left-0 top-0" />
          <PlusMark className="right-0 top-0" />
        </>
      )}
      {children}
    </section>
  );
}
