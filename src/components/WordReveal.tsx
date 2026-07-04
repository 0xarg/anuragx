"use client";

import { motion, useReducedMotion } from "framer-motion";

type WordRevealProps = {
  text: string;
  className?: string;
  /** Per-word stagger in seconds. */
  stagger?: number;
};

/**
 * Reveals a paragraph word-by-word on scroll into view (reference's big intro
 * paragraphs). Honors prefers-reduced-motion by rendering the text statically.
 */
export function WordReveal({ text, className = "", stagger = 0.03 }: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <p className={className}>{text}</p>;
  }

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
