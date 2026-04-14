"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { nexusToast, nexusAlert } from "@/lib/sweetalert";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      nexusToast.fire({
        icon: "warning",
        title: "Please fill in all fields",
      });
      return;
    }
    // Simulation
    nexusToast.fire({
      icon: "success",
      title: "Signed in successfully!",
    });
    router.push("/dashboard");
  };

  const handleGoogleSso = () => {
    nexusToast.fire({
      icon: "success",
      title: "Signed in with Google!",
    });
    router.push("/dashboard");
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    nexusAlert.fire({
      title: "Reset Password",
      input: "email",
      inputLabel: "Enter your email address",
      inputPlaceholder: "you@company.com",
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        nexusToast.fire({
          icon: "success",
          title: "Reset link sent!",
        });
      }
    });
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
          Welcome back
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm text-center mb-8">
          Enter your credentials to access your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-2"
            >
              Email
            </label>
            <input
              id="login-email"
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
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="login-password"
                className="block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-widest"
              >
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-[var(--color-accent)] hover:opacity-80 transition-opacity"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[var(--color-accent)] text-[var(--color-accent-fg)] rounded-full py-3 font-medium hover:opacity-90 transition-opacity duration-300 text-sm mt-2 cursor-pointer shadow-md"
          >
            Sign In
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
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-[var(--color-accent)] hover:opacity-80 transition-opacity"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
