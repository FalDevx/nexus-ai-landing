"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { footerColumns } from "@/lib/data";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentYear = mounted ? new Date().getFullYear() : "";

  return (
    <footer className="bg-[var(--color-bg)] border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">

          {/* Logo + Tagline — spans 1 col */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl text-[var(--color-text-primary)] tracking-tight">
                Nexus<span className="text-[var(--color-accent)]">AI</span>
              </span>
            </Link>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed font-sans max-w-[180px]">
              Intelligence that anticipates before you ask.
            </p>
          </div>

          {/* 4 link columns — span remaining 4 cols */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[var(--color-text-primary)] text-xs font-sans font-semibold tracking-[0.15em] uppercase mb-4">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 text-sm font-sans"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)] mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-[var(--color-text-muted)] text-sm font-sans">
            &copy; {currentYear} Nexus AI, Inc. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {/* X (Twitter) */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
