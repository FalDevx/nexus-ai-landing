"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronRight, Menu, X, TerminalSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import CodeBlock from "@/components/CodeBlock";
import { docsData } from "@/lib/docsData";

export default function DocsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // By default, expand all sections or just the first one
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    docsData.forEach((section) => {
      initialState[section.slug] = true;
    });
    return initialState;
  });

  const [activeItemSlug, setActiveItemSlug] = useState(() => {
    return docsData[0]?.items[0]?.slug || "";
  });

  // Derived state to find active item details
  const activeDetails = useMemo(() => {
    for (const section of docsData) {
      for (const item of section.items) {
        if (item.slug === activeItemSlug) {
          return { section, item };
        }
      }
    }
    return null;
  }, [activeItemSlug]);

  const toggleSection = (sectionSlug: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionSlug]: !prev[sectionSlug],
    }));
  };

  const handleSelectItem = (slug: string) => {
    setActiveItemSlug(slug);
    setMobileMenuOpen(false);
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Next/Prev navigation
  const flatItems = useMemo(() => {
    const items: { section: string; slug: string; title: string }[] = [];
    docsData.forEach((section) => {
      section.items.forEach((item) => {
        items.push({ section: section.title, slug: item.slug, title: item.title });
      });
    });
    return items;
  }, []);

  const currentIndex = flatItems.findIndex((i) => i.slug === activeItemSlug);
  const prevItem = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const nextItem = currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row">
        {/* Mobile Header / Controls */}
        <div className="sticky top-[4rem] z-30 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 md:hidden">
          <span className="font-serif text-lg text-[var(--color-text-primary)]">
            Documentation
          </span>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-text-primary)]"
            aria-label="Open documentation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {(mobileMenuOpen || typeof window === "undefined" || window.innerWidth >= 768) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg)] md:sticky md:top-[5rem] md:flex md:h-[calc(100vh-5rem)] ${
                mobileMenuOpen ? "flex" : "hidden"
              }`}
            >
              <div className="flex items-center justify-between px-6 py-5 md:hidden">
                <span className="font-serif text-xl tracking-tight text-[var(--color-text-primary)]">
                  Docs
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="hidden px-6 pb-4 pt-8 md:block">
                <h2 className="font-serif text-xl tracking-tight text-[var(--color-text-primary)]">
                  Documentation
                </h2>
              </div>

              <div className="px-4 pb-4 md:px-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type="text"
                    placeholder="Search docs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-9 pr-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
              </div>

               <div className="flex-1 overflow-y-auto px-4 pb-8 md:px-6">
                {docsData.map((section) => {
                  // filter items by search query if any
                  const filteredItems = section.items.filter(item => 
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    item.content.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                  
                  if (searchQuery && filteredItems.length === 0) return null;

                  return (
                    <div key={section.slug} className="mb-4">
                      <button
                        onClick={() => toggleSection(section.slug)}
                        className="flex w-full items-center justify-between rounded-md py-2 font-medium text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {section.title}
                        <ChevronDown
                          className={`h-4 w-4 text-[var(--color-text-muted)] transition-transform ${
                            expandedSections[section.slug] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedSections[section.slug] && (
                          <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-1 space-y-1 overflow-hidden"
                          >
                            {(searchQuery ? filteredItems : section.items).map((item) => {
                              const isActive = activeItemSlug === item.slug;
                              return (
                                <li key={item.slug}>
                                  <button
                                    onClick={() => handleSelectItem(item.slug)}
                                    className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                                      isActive
                                        ? "border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] text-[var(--color-accent)]"
                                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                                    }`}
                                  >
                                    {item.title}
                                  </button>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Backdrop */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 px-4 py-8 sm:px-8 md:px-12 md:py-12 lg:px-16">
          <div className="mx-auto max-w-3xl">
            {activeDetails ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItemSlug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase">
                    Docs <span className="mx-2">/</span> {activeDetails.section.title}{" "}
                    <span className="mx-2">/</span> {activeDetails.item.title}
                  </div>

                  <h1 className="mb-8 font-serif text-3xl tracking-tight text-[var(--color-text-primary)] md:text-4xl">
                    {activeDetails.item.title}
                  </h1>

                  <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
                    {activeDetails.item.content.split("\n\n").map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {activeDetails.item.codeExample && (
                    <CodeBlock 
                      code={activeDetails.item.codeExample} 
                      language="typescript"
                      filename="example.ts"
                    />
                  )}

                  {/* Prev/Next Navigation */}
                  <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row">
                    {prevItem ? (
                      <button
                        onClick={() => handleSelectItem(prevItem.slug)}
                        className="group flex flex-1 flex-col items-start rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)] text-left"
                      >
                        <span className="mb-2 text-xs font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">
                          Previous
                        </span>
                        <span className="text-lg font-medium text-[var(--color-text-primary)]">
                          {prevItem.title}
                        </span>
                      </button>
                    ) : (
                      <div className="flex-1" />
                    )}
                    {nextItem ? (
                      <button
                         onClick={() => handleSelectItem(nextItem.slug)}
                        className="group flex flex-1 flex-col items-end rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)] text-right sm:ml-auto"
                      >
                        <span className="mb-2 text-xs font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">
                          Next
                        </span>
                        <span className="text-lg font-medium text-[var(--color-text-primary)] flex items-center justify-end">
                          {nextItem.title} <ChevronRight className="ml-1 h-5 w-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
                        </span>
                      </button>
                    ) : (
                      <div className="flex-1" />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
