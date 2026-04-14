"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";

function NumberCounter({
  end,
  suffix,
  decimals = 0,
}: {
  end: number;
  suffix: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000;
      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(end * ease);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return (
    <div ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </div>
  );
}

const teamMembers = [
  {
    initials: "AR",
    name: "Alex Rivera",
    role: "CEO & Co-founder",
    quote: "Intelligence should be effortless.",
  },
  {
    initials: "SM",
    name: "Sarah Mitchell",
    role: "CTO",
    quote: "We build what others call impossible.",
  },
  {
    initials: "JK",
    name: "James Kim",
    role: "Head of AI Research",
    quote: "Every model learns, every day.",
  },
  {
    initials: "LP",
    name: "Luna Park",
    role: "Head of Design",
    quote: "Complexity hidden, beauty revealed.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeInOut" 
    } 
  },
};

export default function About() {
  return (
    <section id="about" className="bg-[var(--color-bg)] px-6 py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-label text-[10px] tracking-widest text-[var(--color-text-muted)] uppercase mb-4">
            Our Mission
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] max-w-3xl">
            Built for the teams that <em className="italic">move the world</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6 font-sans text-sm leading-relaxed text-[var(--color-text-muted)] mb-12">
              <p>
                Nexus AI was founded on a simple belief: the most important work in the world deserves the most intelligent tools. We build AI that understands context, anticipates needs, and acts with precision.
              </p>
              <p>
                From stealth startups to global enterprises, teams trust Nexus AI to handle the complexity so they can focus on what matters most — building the future.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-[var(--color-border)]/30 pt-8">
              <div>
                <div className="font-serif text-3xl md:text-4xl text-[var(--color-text-primary)] mb-1">
                  <NumberCounter end={2.4} suffix="K+" decimals={1} />
                </div>
                <div className="font-label text-[10px] tracking-widest text-[var(--color-text-muted)] uppercase">
                  Active Teams
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-[var(--color-text-primary)] mb-1">
                  <NumberCounter end={99.2} suffix="%" decimals={1} />
                </div>
                <div className="font-label text-[10px] tracking-widest text-[var(--color-text-muted)] uppercase">
                  Accuracy Rate
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-[var(--color-text-primary)] mb-1">
                  <NumberCounter end={48} suffix="hrs" decimals={0} />
                </div>
                <div className="font-label text-[10px] tracking-widest text-[var(--color-text-muted)] uppercase">
                  Avg Saved/Wk
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Team Grid) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-[var(--color-surface-low)] rounded-sm p-6 flex flex-col items-start hover:bg-[var(--color-surface-container)] transition-colors duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center justify-center bg-[var(--color-surface-container)] text-[var(--color-accent)] w-12 h-12 rounded-sm font-serif font-bold tracking-wider mb-4 group-hover:scale-105 transition-transform">
                  {member.initials}
                </div>
                <h3 className="font-sans text-sm font-semibold text-[var(--color-text-primary)]">
                  {member.name}
                </h3>
                <p className="font-label text-xs tracking-tight text-[var(--color-text-muted)] mb-3">
                  {member.role}
                </p>
                <p className="font-serif text-xs italic leading-relaxed text-[var(--color-text-muted)] mt-auto border-t border-[var(--color-border)]/30 pt-3 w-full group-hover:text-[var(--color-text-primary)] transition-colors">
                  &ldquo;{member.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 sm:mt-24 pt-8 border-t border-[var(--color-border)]/30 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <h3 className="font-serif text-xl text-[var(--color-text-primary)]">
            Want to join the team?
          </h3>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="flex-1 sm:flex-none text-center px-6 py-2.5 rounded-full border border-[var(--color-border)] text-sm font-medium text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              View Open Roles
            </Link>
            <Link
              href="/"
              className="flex-1 sm:flex-none text-center px-6 py-2.5 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
