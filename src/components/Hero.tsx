"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { heroContent } from "@/lib/data";

function renderHeadline(text: string) {
  const key = "Before";
  const i = text.indexOf(key);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <em className="font-serif italic text-[var(--color-accent)]">{key}</em>
      {text.slice(i + key.length)}
    </>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 200]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-32">
      {/* Parallax radial glow */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,213,183,0.07)_0%,transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: textY }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-block rounded-full border border-[var(--color-border)] px-4 py-1 text-xs font-medium tracking-widest text-[var(--color-text-muted)]">
            NEXT-GENERATION COGNITION
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mt-8 font-serif text-5xl font-normal leading-tight text-[var(--color-text-primary)] md:text-7xl"
        >
          {renderHeadline(heroContent.headline)}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)] md:text-xl"
        >
          {heroContent.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={heroContent.primaryCta.href}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3 font-medium text-[var(--color-accent-fg)] transition-opacity duration-300 hover:opacity-90"
          >
            {heroContent.primaryCta.label}
          </Link>
          <Link
            href={heroContent.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-muted)] px-8 py-3 text-[var(--color-text-muted)] transition-[color,border-color] duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {heroContent.secondaryCta.label}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
