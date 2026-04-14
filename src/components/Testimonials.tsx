"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

const STARS = "★".repeat(5);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6,  },
  },
};

export default function Testimonials() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6,  }}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="text-xs font-medium tracking-widest text-[var(--color-text-muted)]">
          CLIENT PERSPECTIVES
        </p>
        <h2 className="mt-4 font-serif text-4xl font-normal text-[var(--color-text-primary)] md:text-5xl">
          The standard of{" "}
          <em className="font-serif italic">computational trust</em>.
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3"
      >
        {testimonials.map((item, index) => (
          <motion.article
            key={`${item.name}-${item.company}`}
            variants={cardVariant}
            whileHover={{
              y: -6,
              transition: { type: "spring", stiffness: 300, damping: 22 },
            }}
            className={[
              "rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 hover:border-[var(--color-accent)]",
              index === 0 ? "md:col-span-2" : "",
            ].join(" ")}
          >
            <div
              className="mb-6 text-sm tracking-wider text-[var(--color-accent)]"
              aria-label="5 out of 5 stars"
            >
              {STARS}
            </div>
            <blockquote className="font-serif text-base italic leading-relaxed text-[var(--color-text-primary)]">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-muted)] bg-[var(--color-surface-alt)]">
                <span className="text-sm font-medium text-[var(--color-accent)]">
                  {item.initials}
                </span>
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{item.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {item.role} · {item.company}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
