"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/layout/Container";
import { BRAND } from "@/constants/brand";
import { MARKETING_NAV_LINKS } from "@/constants/navigation";
import { cn } from "@/utils/cn";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex min-w-fit items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_52%,#7c3aed_100%)] text-base font-bold text-white shadow-lg shadow-blue-200">
            IA
          </div>
          <div className="leading-tight">
            <p className="text-[0.92rem] font-semibold uppercase tracking-[0.34em] text-slate-900">
              {BRAND.name}
            </p>
            <p className="text-[10px] text-slate-500">Learn AI. Build real projects. Lead the future.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {MARKETING_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-slate-700 transition-colors hover:text-blue-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="inline-flex min-w-[152px] items-center justify-center rounded-full bg-[linear-gradient(90deg,#2563eb_0%,#06b6d4_100%)] px-5 py-3 text-[13px] font-semibold text-white shadow-lg shadow-cyan-200 transition-transform hover:-translate-y-0.5"
          >
            Enroll Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 xl:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-slate-200 bg-white/95 transition-[max-height] duration-300 xl:hidden",
          mobileMenuOpen ? "max-h-[520px]" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-2 py-5">
          {MARKETING_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-3 border-t border-slate-200 pt-4">
            <Link
              href="/login"
              className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(90deg,#2563eb_0%,#06b6d4_100%)] px-4 py-3 text-sm font-semibold text-white"
            >
              Enroll Now
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
