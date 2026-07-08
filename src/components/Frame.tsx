import type { ReactNode } from "react";
import { PlusMark } from "@/components/PlusMark";
import { SideMarquee } from "@/components/SideMarquee";
import { site } from "@/content/site";

/**
 * The framed content column: two continuous vertical rails (`border-x`) running
 * the full height of everything inside, with crosshair marks at the four outer
 * corners. Vertical marquee ribbons flank it in the gutters on wider screens.
 */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <SideMarquee side="left" text={site.marquee} />
      <SideMarquee side="right" text={site.marquee} />

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
