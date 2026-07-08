"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type BlurFadeProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds — pass index * step for sequential entrances. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Animate once when scrolled into view (default) vs. immediately on mount. */
  inView?: boolean;
  as?: "div" | "span" | "li";
};

/**
 * Signature blur-fade-up entrance: elements start slightly below, transparent,
 * and softly blurred, then settle on scroll into view. Honors reduced-motion.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  y = 8,
  inView = true,
  as = "div",
}: BlurFadeProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const animateProps = inView
    ? {
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: { once: true, margin: "-8% 0px -8% 0px" },
      }
    : { animate: { opacity: 1, y: 0, filter: "blur(0px)" } };

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...animateProps}
    >
      {children}
    </MotionTag>
  );
}
