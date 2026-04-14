"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-32 px-6 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6,  }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-xs tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-6 font-sans">
              FREQUENTLY REQUESTED
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] leading-tight mb-6">
              Questions{" "}
              <em className="italic text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                worth asking.
              </em>
            </h2>
            <p className="text-[var(--color-text-muted)] text-base leading-relaxed font-sans max-w-sm">
              Everything you need to know about how Nexus works, where your data
              lives, and what implementation really looks like in practice.
            </p>
            <div className="mt-10 w-12 h-px bg-[var(--color-accent)] opacity-50" />
          </motion.div>

          {/* Right Column — Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="divide-y divide-[var(--color-border)]"
          >
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-[var(--color-border)] first:border-t first:border-[var(--color-border)]"
                >
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span className="text-[var(--color-text-primary)] text-base font-sans pr-4 transition-colors duration-200 group-hover:text-[var(--color-accent)] font-normal">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0 w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.35,  },
                          opacity: { duration: 0.25,  },
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="pb-6 text-[var(--color-text-muted)] text-sm leading-relaxed font-sans">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
