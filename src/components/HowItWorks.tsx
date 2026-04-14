"use client";

import { motion } from "framer-motion";

const howItWorksSteps = [
  {
    number: 1,
    title: "Ingest & Index",
    description: "Nexus securely connects to your institutional data, mapping context across every repository in real-time.",
  },
  {
    number: 2,
    title: "Cognitive Synthesis",
    description: "Our neural intent engine processes workflows, identifying bottlenecks and predicting optimal paths forward.",
  },
  {
    number: 3,
    title: "Autonomous Action",
    description: "Nexus executes decisions and automates entire workflows, surfacing only what requires human judgment.",
  },
];

const stepVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function HowItWorks() {
  return (
    <section id="architecture" className="bg-[var(--color-bg)] px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="text-xs font-medium tracking-widest text-[var(--color-text-muted)]">
            SYSTEM ARCHITECTURE
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal text-[var(--color-text-primary)] md:text-5xl">
            How intelligence <em className="font-serif italic">actually scales</em>.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-16">
          {howItWorksSteps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="relative flex flex-col md:flex-row gap-8 md:items-start"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] font-serif text-3xl font-medium text-[var(--color-accent)]">
                {step.number}
              </span>
              <div className="max-w-2xl pt-2">
                <h3 className="mb-3 text-xl font-medium text-[var(--color-text-primary)]">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
                  {step.description}
                </p>
              </div>
              {/* Optional connector line for desktop */}
              {index < howItWorksSteps.length - 1 && (
                <div className="absolute left-8 top-16 -z-10 h-16 w-px bg-[var(--color-border)] hidden md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
