import type { ReactNode } from "react";
import Link from "next/link";
import { BRAND } from "@/constants/brand";

export default function AuthHeader({
  title,
  description,
  badge,
}: Readonly<{
  title: string;
  description: string;
  badge?: ReactNode;
}>) {
  return (
    <div className="mb-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-3 text-slate-900"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563eb_0%,#06b6d4_100%)] text-sm font-bold text-white">
          {BRAND.monogram}
        </span>
        <span>
          <span className="block text-xs uppercase tracking-[0.35em] text-slate-500">
            {BRAND.name}
          </span>
          <span className="block text-xs text-slate-400">
            Secure access for learners and teams
          </span>
        </span>
      </Link>
      {badge ? <div className="mb-4">{badge}</div> : null}
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">
        {description}
      </p>
    </div>
  );
}