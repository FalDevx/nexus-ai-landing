"use client";

import {
  Brain,
  Gauge,
  LineChart,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { features } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
  workflow: Workflow,
  gauge: Gauge,
  "line-chart": LineChart,
};

function FeatureIcon({ name }: { name: string }) {
  const Icon = iconMap[name] ?? Brain;
  return <Icon className="h-6 w-6 text-[var(--color-accent)]" strokeWidth={1.75} aria-hidden />;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6,  },
  },
};

export default function Features() {
  return (
    <section id="solutions" className="bg-[var(--color-bg)] px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6,  }}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="text-xs font-medium tracking-widest text-[var(--color-text-muted)]">
          CAPABILITIES
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-normal text-[var(--color-text-primary)] md:text-5xl">
          Everything You Need to{" "}
          <em className="font-serif italic">Move Faster</em>
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            variants={cardVariant}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-colors duration-300 hover:border-[var(--color-accent)]"
          >
            <div className="mb-6 w-fit rounded-lg bg-[var(--color-surface-alt)] p-3">
              <FeatureIcon name={feature.icon} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-medium text-[var(--color-text-primary)]">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{feature.description}</p>
            </div>
            <p className="mt-6 text-[10px] font-medium uppercase tracking-widest text-[var(--color-accent)] mt-auto">
              {feature.label ?? String(index + 1).padStart(2, "0")}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
