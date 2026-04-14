"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { nexusToast } from "@/lib/sweetalert";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      nexusToast.fire({
        icon: "warning",
        title: "Please fill in all fields",
      });
      return;
    }
    if (password !== confirmPassword) {
      nexusToast.fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return;
    }
    if (!terms) {
      nexusToast.fire({
        icon: "warning",
        title: "You must agree to the Terms",
      });
      return;
    }
    
    // Success Simulation
    nexusToast.fire({
      icon: "success",
      title: "Account created successfully!",
    });
    router.push("/dashboard");
  };

  const handleGoogleSso = () => {
    nexusToast.fire({
      icon: "success",
      title: "Signed up with Google!",
    });
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />
      {/* Radial gold glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,213,183,0.06)_0%,transparent_50%)]"
        aria-hidden
      />

      {/* Back to home */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-10 max-w-md w-full shadow-xl"
      >
        {/* Logo */}
        <Link href="/" className="block text-center mb-2">
          <span className="font-serif text-2xl text-[var(--color-text-primary)] tracking-tight">
            Nexus<span className="text-[var(--color-accent)]">AI</span>
          </span>
        </Link>

        {/* Heading */}
        <h1 className="font-serif text-3xl text-[var(--color-text-primary)] text-center mb-2">
          Create your account
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm text-center mb-8">
          Start your journey with intelligent automation
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="register-name"
              className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-2"
            >
              Full Name
            </label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
              className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] w-full focus:border-[var(--color-accent)] outline-none transition-colors duration-300 text-sm placeholder:text-[var(--color-border-muted)]"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="register-email"
              className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-2"
            >
              Email
            </label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text-primary)] w-full focus:border-[var(--color-accent)] outline-none transition-colors duration-300 text-sm placeholder:text-[var(--color-border-muted)]"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="register-password"
              className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl pl-4 pr-10 py-3 text-[var(--color-text-primary)] w-full focus:border-[var(--color-accent)] outline-none transition-colors duration-300 text-sm placeholder:text-[var(--color-border-muted)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="register-confirm"
              className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="register-confirm"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl pl-4 pr-10 py-3 text-[var(--color-text-primary)] w-full focus:border-[var(--color-accent)] outline-none transition-colors duration-300 text-sm placeholder:text-[var(--color-border-muted)]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3 pt-1">
            <input
              id="register-terms"
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--color-border)] bg-[var(--color-bg)] accent-[var(--color-accent)] cursor-pointer"
            />
            <label
              htmlFor="register-terms"
              className="text-[var(--color-text-muted)] text-xs leading-relaxed cursor-pointer"
            >
              I agree to the{" "}
              <Link href="/docs" className="text-[var(--color-accent)] hover:opacity-80 transition-opacity">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/docs" className="text-[var(--color-accent)] hover:opacity-80 transition-opacity">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[var(--color-accent)] text-[var(--color-accent-fg)] rounded-full py-3 font-medium hover:opacity-90 transition-opacity duration-300 text-sm mt-2 cursor-pointer shadow-md"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[var(--color-border)]" />
          <span className="text-xs text-[var(--color-text-muted)]">or continue with</span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>

        {/* Google SSO */}
        <button
          type="button"
          onClick={handleGoogleSso}
          className="w-full flex items-center justify-center gap-3 rounded-full border border-[var(--color-border)] py-3 text-sm text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        {/* Bottom link */}
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--color-accent)] hover:opacity-80 transition-opacity"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
