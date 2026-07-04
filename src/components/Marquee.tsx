import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds per loop. */
  duration?: number;
  className?: string;
  /** Reverse direction. */
  reverse?: boolean;
};

/**
 * Infinite horizontal marquee via CSS (pure-CSS so it works without JS and is
 * disabled by prefers-reduced-motion in globals.css). The content is duplicated
 * and translated -50% for a seamless loop.
 */
export function Marquee({ children, duration = 22, className = "" }: MarqueeProps) {
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex min-w-full shrink-0 items-center"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="animate-marquee flex min-w-full shrink-0 items-center"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {children}
      </div>
    </div>
  );
}
