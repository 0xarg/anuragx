"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { faqs } from "@/content/faq";
import { site } from "@/content/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-5 py-20 sm:py-28">
      <Reveal className="mb-12 text-center">
        <h2 className="font-display text-5xl font-medium uppercase text-text sm:text-7xl">FAQs</h2>
      </Reveal>

      <ul className="border-t border-line">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <li key={faq.q} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-lg font-medium text-text">{faq.q}</span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 ${
                    isOpen ? "rotate-45 border-accent text-accent" : "text-muted"
                  }`}
                >
                  <Plus size={18} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-12 text-base leading-relaxed text-muted">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <Reveal className="mt-10 text-center">
        <p className="text-muted">Do you have any other questions?</p>
        <div className="mt-4 flex justify-center">
          <Button href={`mailto:${site.email}`}>Ask me directly</Button>
        </div>
      </Reveal>
    </section>
  );
}
