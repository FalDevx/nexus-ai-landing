"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 top-0 left-0 h-full w-full z-[9999] flex items-center justify-center bg-[var(--color-bg)]"
    >
      <motion.div
        initial={{ opacity: 0, letterSpacing: "0.3em" }}
        animate={{ opacity: 1, letterSpacing: "0.5em" }}
        exit={{ opacity: 0, letterSpacing: "0.7em" }}
        transition={{ duration: 0.8 }}
        className="font-serif text-2xl tracking-[0.5em] text-[var(--color-text-primary)]"
      >
        NEXUS{" "}
        <span className="text-[var(--color-accent)]">AI</span>
      </motion.div>

      {/* subtle shimmer bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        style={{ originX: 0 }}
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
      />
    </motion.div>
  );
}
