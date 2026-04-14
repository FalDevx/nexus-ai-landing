"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const related = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const paragraphs = post.content.split("\n\n");

  if (!mounted) {
    return <div className="min-h-screen bg-[var(--color-bg)]" />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-32">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-[10px] font-medium tracking-widest text-[var(--color-accent)] uppercase">
              {post.category}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-[var(--color-text-primary)] leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-muted)] bg-[var(--color-surface-alt)]">
              <span className="text-sm font-medium text-[var(--color-accent)]">
                {post.author.initials}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {post.author.name}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {formatDate(post.date)}
              </p>
            </div>
          </div>

          {/* Gold divider */}
          <div className="h-px w-full bg-[var(--color-accent)] opacity-30 mb-10" />
        </motion.header>

        {/* Article content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-[var(--color-text-muted)]"
            >
              {paragraph}
            </p>
          ))}
        </motion.article>

        {/* Bottom divider */}
        <div className="h-px w-full bg-[var(--color-border)] my-16" />

        {/* More articles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-2xl text-[var(--color-text-primary)] mb-8">
            More articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group block"
              >
                <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-colors duration-300 hover:border-[var(--color-accent)] h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-[10px] font-medium tracking-widest text-[var(--color-accent)] uppercase">
                      {rel.category}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {rel.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300 leading-snug flex-1">
                    {rel.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {formatDate(rel.date)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
