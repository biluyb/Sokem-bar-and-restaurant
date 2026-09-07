"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Shield, Lock, Mail, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { loginAction, LoginActionResult } from "@/lib/auth/actions";

function SignInFormInner() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<LoginActionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return; // Prevent duplicate submissions
    setIsPending(true);
    setResult(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const resolvedEmail = ((formData.get("email") as string) || email || "").trim();
    const resolvedPassword = (formData.get("password") as string) || password || "";

    try {
      const res = await loginAction({
        email: resolvedEmail,
        password: resolvedPassword,
        callbackUrl,
      });
      if (res.success && res.redirectTo) {
        window.location.href = res.redirectTo;
        return;
      }
      setResult(res);
    } catch {
      setResult({
        success: false,
        error: "An unexpected error occurred during sign in. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="border border-white/[0.12] bg-[#12151D]/90 backdrop-blur-xl shadow-2xl p-8 space-y-6 rounded-2xl">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="relative w-16 h-16 drop-shadow-[0_0_20px_rgba(245,158,11,0.35)] mx-auto mb-3">
          <Image
            src="/images/icon.png"
            alt="Sokem Bar & Restaurant"
            width={64}
            height={64}
            className="object-contain"
            priority
          />
        </div>
        <span className="text-[11px] uppercase font-bold tracking-widest text-gold">
          Sokem Management
        </span>
        <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
          Sign In
        </h1>
        <p className="text-xs text-gray-400">
          Enter your authorized credentials to access the management console.
        </p>
      </div>

      {/* Error Alert */}
      {result?.error && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-rose-200">Authentication Failed</p>
            <p>{result.error}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="signin-email"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-300"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              id="signin-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-white/[0.12] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            />
          </div>
          {result?.fieldErrors?.email && (
            <p className="text-[11px] text-rose-400">{result.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="signin-password"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              id="signin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/90 border border-white/[0.12] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            />
          </div>
          {result?.fieldErrors?.password && (
            <p className="text-[11px] text-rose-400">{result.fieldErrors.password[0]}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isPending}
          className="w-full justify-center mt-2"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* Security Notice */}
      <div className="pt-2 border-t border-white/[0.08] text-center">
        <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3 text-gold" />
          <span>Encrypted HTTP-only Session • Secure</span>
        </p>
      </div>
    </Card>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded px-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to public website</span>
        </Link>

        <Suspense
          fallback={
            <Card className="p-8 text-center text-gray-400 border border-white/[0.12] bg-[#12151D]/90">
              <div className="animate-pulse space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 mx-auto" />
                <div className="h-4 bg-slate-800 rounded w-1/2 mx-auto" />
                <div className="h-8 bg-slate-800 rounded" />
              </div>
            </Card>
          }
        >
          <SignInFormInner />
        </Suspense>
      </div>
    </div>
  );
}
