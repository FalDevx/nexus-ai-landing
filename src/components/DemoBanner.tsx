"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DemoBanner() {
  return (
    <section className="py-24 px-6 bg-[var(--color-surface-low)]">
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        <p className="font-['Inter'] text-[10px] uppercase tracking-widest text-[var(--color-accent)] mb-4">
          LIVE PREVIEW
        </p>
        <h2 className="font-['Noto_Serif'] text-4xl md:text-5xl text-[var(--color-text-primary)] font-normal">
          See it <em className="italic">in action.</em>
        </h2>
        <p className="mt-4 font-['Manrope'] text-[var(--color-text-muted)] text-base leading-relaxed">
          Explore the full dashboard, blog, and docs — all included in the template. No signup required.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-bold rounded-lg px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Explore Dashboard →
          </Link>
          <Link
            href="/blog"
            className="border border-[var(--color-accent)]/30 text-[var(--color-accent)] rounded-lg px-8 py-4 hover:border-[var(--color-accent)] transition-all"
          >
            View Blog & Docs
          </Link>
        </div>

        {/* Preview Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: DASHBOARD */}
          <div className="bg-[var(--color-bg)] border border-[var(--color-border)]/20 rounded-xl p-4 text-left">
            <p className="text-[10px] tracking-widest text-[var(--color-accent)] mb-3 uppercase">DASHBOARD</p>
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="font-['Noto_Serif'] text-lg text-[var(--color-text-primary)]">12.8K</p>
                <p className="text-[8px] text-[var(--color-text-muted)] uppercase">Visitors</p>
              </div>
              <div>
                <p className="font-['Noto_Serif'] text-lg text-[var(--color-text-primary)]">34</p>
                <p className="text-[8px] text-[var(--color-text-muted)] uppercase">Tasks</p>
              </div>
              <div>
                <p className="font-['Noto_Serif'] text-lg text-[var(--color-text-primary)]">99.2%</p>
                <p className="text-[8px] text-[var(--color-text-muted)] uppercase">Uptime</p>
              </div>
            </div>
            {/* Mini bar chart */}
            <div className="flex items-end gap-1 h-8 px-1">
              <div className="flex-1 bg-[var(--color-accent)]/40 rounded-sm h-[40%]" />
              <div className="flex-1 bg-[var(--color-accent)]/40 rounded-sm h-[70%]" />
              <div className="flex-1 bg-[var(--color-accent)]/40 rounded-sm h-[55%]" />
              <div className="flex-1 bg-[var(--color-accent)]/40 rounded-sm h-[90%]" />
              <div className="flex-1 bg-[var(--color-accent)]/40 rounded-sm h-[65%]" />
            </div>
          </div>

          {/* Card 2: BLOG */}
          <div className="bg-[var(--color-bg)] border border-[var(--color-border)]/20 rounded-xl p-4 text-left flex flex-col justify-between">
            <p className="text-[10px] tracking-widest text-[var(--color-accent)] mb-3 uppercase">BLOG</p>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-1.5 py-0.5 rounded uppercase">Logic</span>
                  <span className="text-[8px] text-[var(--color-text-muted)]">April 12</span>
                </div>
                <p className="text-[var(--color-text-primary)] text-xs font-['Noto_Serif'] leading-tight">Predicting the unpredictable.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-1.5 py-0.5 rounded uppercase">Ethics</span>
                  <span className="text-[8px] text-[var(--color-text-muted)]">April 10</span>
                </div>
                <p className="text-[var(--color-text-primary)] text-xs font-['Noto_Serif'] leading-tight">Can AI have a moral compass?</p>
              </div>
            </div>
          </div>

          {/* Card 3: DOCS */}
          <div className="bg-[var(--color-bg)] border border-[var(--color-border)]/20 rounded-xl p-4 text-left">
            <p className="text-[10px] tracking-widest text-[var(--color-accent)] mb-3 uppercase">DOCUMENTATION</p>
            <div className="space-y-2 mt-2">
              <div className="text-[var(--color-accent)] border-l-2 border-[var(--color-accent)] pl-2 text-xs font-medium">Getting Started</div>
              <div className="text-[var(--color-text-muted)] pl-2 text-xs">API Reference</div>
              <div className="text-[var(--color-text-muted)] pl-2 text-xs">Auth Providers</div>
              <div className="text-[var(--color-text-muted)] pl-2 text-xs">Deploying</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

  );
}
