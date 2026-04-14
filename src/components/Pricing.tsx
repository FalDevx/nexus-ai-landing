"use client";

import { useState } from "react";
import { Check, Zap, Timer, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { pricingPlans } from "@/lib/data";

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="bg-[var(--color-bg)] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.3 }}
           transition={{ duration: 0.6 }}
           className="text-center"
        >
          <p className="text-xs font-medium tracking-widest text-[var(--color-text-muted)]">
            INVESTMENT STRUCTURE
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal text-[var(--color-text-primary)] md:text-5xl">
            Scale your <em className="font-serif italic">cognitive capacity</em>.
          </h2>

          {/* Billing Toggle */}
          <div className="mt-12 flex items-center justify-center">
            <div className="flex rounded-full border border-[var(--color-border)] p-1">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={[
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300",
                  billing === "monthly"
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                    : "text-[var(--color-text-muted)]",
                ].join(" ")}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling("yearly")}
                className={[
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300",
                  billing === "yearly"
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]"
                    : "text-[var(--color-text-muted)]",
                ].join(" ")}
              >
                Yearly
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Banner Row */}
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mt-16 bg-[#1C1B1B] rounded-xl p-4 mb-10 border border-[#E8D5B7]/10 text-center"
        >
          <p className="text-[#CFC5B9] text-sm mb-4">
            Most teams replace 3–5 tools with this template
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12">
            <div className="flex items-center gap-2 text-[#E8D5B7] text-[10px] uppercase tracking-widest font-['Inter']">
              <Zap size={12} className="text-[#E8D5B7]" />
              10+ hrs saved/week
            </div>
            <div className="hidden md:block h-3 w-px bg-[#E8D5B7]/20" />
            <div className="flex items-center gap-2 text-[#E8D5B7] text-[10px] uppercase tracking-widest font-['Inter']">
              <Timer size={12} className="text-[#E8D5B7]" />
              Deploy in under 1 hour
            </div>
            <div className="hidden md:block h-3 w-px bg-[#E8D5B7]/20" />
            <div className="flex items-center gap-2 text-[#E8D5B7] text-[10px] uppercase tracking-widest font-['Inter']">
              <Users size={12} className="text-[#E8D5B7]" />
              500+ teams use this
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const price = billing === "monthly" ? plan.price.monthly : plan.price.yearly;
            const highlighted = plan.highlighted;

            return (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
                className={[
                  "relative rounded-2xl border bg-[var(--color-surface)] p-8",
                  highlighted ? "border-[var(--color-accent)]" : "border-[var(--color-border)]",
                ].join(" ")}
              >
                {highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-accent)] px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-fg)]">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-[var(--color-text-primary)]">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-serif text-[var(--color-text-primary)]">${price}</span>
                    <span className="text-sm text-[var(--color-text-muted)]">/mo</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-accent)]" />
                      <span className="text-sm text-[var(--color-text-primary)]">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={plan.cta.href}
                  className={[
                    "mt-8 flex w-full items-center justify-center rounded-full py-3 text-center text-sm font-medium transition-colors duration-300",
                    highlighted
                      ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:opacity-90"
                      : "border border-[var(--color-border-muted)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
                  ].join(" ")}
                >
                  {plan.cta.label}
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
