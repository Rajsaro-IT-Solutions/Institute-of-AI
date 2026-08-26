"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/constants/brand";
import {
  ADMIN_PASSWORD,
  useAdminAuthStore,
} from "@/features/admin/utils/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAdminAuthStore((s) => s.login);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (login(password)) {
      setError(null);
      router.replace("/admin/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-12 text-slate-900">
      <div className="w-full max-w-md">
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_52%,#7c3aed_100%)] text-lg font-bold text-white shadow-lg shadow-blue-200">
              {BRAND.monogram}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Admin sign in</h1>
            <p className="mt-2 text-sm text-slate-500">
              Restricted area · {BRAND.name}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError(null);
                  }}
                  placeholder="Enter admin password"
                  className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            {error ? (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Sign in to admin
            </Button>
          </form>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3">
            <p className="flex items-center gap-2 text-xs font-medium text-blue-700">
              <ShieldCheck className="h-4 w-4" />
              Demo access
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Use the demo password{" "}
              <code className="rounded bg-white px-1.5 py-0.5 font-mono text-blue-700">
                {ADMIN_PASSWORD}
              </code>{" "}
              to explore the panel.
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 block text-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </main>
  );
}