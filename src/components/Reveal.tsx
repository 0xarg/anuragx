"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds — pass an index * step for sequential reveals. */
  delay?: number;
  /** Vertical travel distance in px (reference settles from ~10–18px). */
  y?: number;
};

/**
 * Framer-style "appear" entrance, tuned to match the Impressa reference:
 * elements start slightly below + transparent and settle on scroll into view.
 * Honors prefers-reduced-motion by disabling the translate/fade.
 */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1], // easeOutExpo-ish settle
      }}
    >
      {children}
    </motion.div>
  );
}
