"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom white-dot cursor follower (reference detail). Scales up and inverts
 * over interactive elements. Disabled on touch devices and reduced-motion —
 * in those cases the native cursor stays.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.classList.add("has-custom-cursor");
    // Defer the enable out of the synchronous effect body to avoid a cascading render.
    const raf = requestAnimationFrame(() => setEnabled(true));

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, [data-cursor='hover']"));
    };

    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        className="block rounded-full bg-white"
        animate={{
          width: active ? 44 : 12,
          height: active ? 44 : 12,
          x: active ? -22 : -6,
          y: active ? -22 : -6,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </motion.div>
  );
}
