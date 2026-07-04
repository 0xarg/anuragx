"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

/**
 * Counts a number from 0 → value when scrolled into view (reference stats).
 * Reduced-motion renders the final value immediately.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
  duration = 1.6,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Reduced-motion renders the final value directly (see `shown` below) —
    // no animation, no state churn.
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  const shown = reduce ? value : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
