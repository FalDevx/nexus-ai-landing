"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass =
    "sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-300 ease-out";
  const headerState = scrolled
    ? "border-[var(--color-border)] bg-[var(--color-bg)]"
    : "border-transparent bg-transparent";

  const linkClass =
    "text-sm text-[var(--color-text-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-accent)]";

  const ctaClass =
    "inline-flex items-center justify-center rounded-full border border-[var(--color-accent)] px-5 py-2 text-sm font-medium text-[var(--color-accent)] transition-colors duration-300 ease-out hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-fg)]";

  return (
    <header className={`${headerClass} ${headerState}`}>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-center px-6">
        {/* Logo */}
        <Link
          href="/"
          className="absolute left-4 font-serif text-lg tracking-tight text-[var(--color-text-primary)] transition-opacity duration-300 ease-out hover:opacity-80 sm:left-6 lg:left-8"
        >
          Nexus AI
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA & Theme */}
        <div className="absolute right-4 hidden items-center gap-4 sm:right-6 md:flex lg:right-8">
          <ThemeToggle />
          <Link href="/#pricing" className={ctaClass}>
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="absolute right-4 block transition-colors duration-300 ease-out hover:text-[var(--color-accent)] md:hidden sm:right-6"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={[
          "md:hidden fixed inset-0 top-20 z-40 bg-[var(--color-bg)] px-6 py-10 transition-transform duration-500 ease-in-out",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-2xl font-serif text-[var(--color-text-primary)] transition-colors duration-300 hover:text-[var(--color-accent)]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#pricing"
            className={[ctaClass, "w-fit py-3 px-8 text-lg"].join(" ")}
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
          <div className="pt-4 border-t border-[var(--color-border)]">
             <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">Appearance</span>
                <ThemeToggle />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
