import type { ReactNode } from "react";
import { PlusMark } from "@/components/PlusMark";

/**
 * The framed content column: two continuous vertical rails (`border-x`) running
 * the full height of everything inside, with crosshair marks at the four outer
 * corners. The empty gutters flanking it hold the ambient `GutterQuotes`
 * particle-text effect mounted globally in the root layout.
 */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative mx-auto w-full max-w-2xl border-x border-border">
        <PlusMark className="left-0 top-0" />
        <PlusMark className="right-0 top-0" />
        {children}
        <PlusMark className="left-0 bottom-0" />
        <PlusMark className="right-0 bottom-0" />
      </div>
    </>
  );
}
