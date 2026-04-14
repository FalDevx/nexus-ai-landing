"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts } from "@/lib/blogData";
import { ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const featured = blogPosts.find((p) => p.featured)!;
  const rest = blogPosts.filter((p) => !p.featured);

  if (!mounted) {
    return <div className="min-h-screen bg-[var(--color-bg)]" />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6,  }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="text-xs font-medium tracking-widest text-[var(--color-text-muted)]">
            THE NEXUS JOURNAL
          </p>
          <h1 className="mt-4 font-serif text-5xl font-normal text-[var(--color-text-primary)] md:text-6xl">
            Insights from{" "}
            <em className="font-serif italic text-[var(--color-accent)]">
              the frontier.
            </em>
          </h1>
        </motion.div>
      </section>

      <div className="mx-auto max-w-5xl px-6 pb-32">
        {/* Featured post */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Link href={`/blog/${featured.slug}`} className="block group">
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 transition-colors duration-300 hover:border-[var(--color-accent)]">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-[10px] font-medium tracking-widest text-[var(--color-accent)] uppercase">
                  {featured.category}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {featured.readTime}
                </span>
              </div>
              <h2 className="font-serif text-3xl text-[var(--color-text-primary)] md:text-4xl mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-[var(--color-text-muted)] text-base leading-relaxed max-w-3xl mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-muted)] bg-[var(--color-surface-alt)]">
                    <span className="text-xs font-medium text-[var(--color-accent)]">
                      {featured.author.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {featured.author.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {formatDate(featured.date)}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {rest.map((post) => (
            <motion.div key={post.slug} variants={card}>
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <article className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-colors duration-300 hover:border-[var(--color-accent)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-[10px] font-medium tracking-widest text-[var(--color-accent)] uppercase">
                      {post.category}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--color-border)]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-muted)] bg-[var(--color-surface-alt)]">
                      <span className="text-[10px] font-medium text-[var(--color-accent)]">
                        {post.author.initials}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[var(--color-text-primary)]">
                        {post.author.name}
                      </p>
                      <p className="text-[10px] text-[var(--color-text-muted)]">
                        {formatDate(post.date)}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
