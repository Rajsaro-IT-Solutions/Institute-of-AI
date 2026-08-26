import type { ReactNode } from "react";
import Link from "next/link";
import { BrainCircuit, ShieldCheck, Sparkles, Trophy } from "lucide-react";

const highlights = [
  {
    title: "AI-first learning",
    description: "Mentorship, projects, and adaptive guidance in one premium system.",
    icon: BrainCircuit,
  },
  {
    title: "Trusted access",
    description: "Secure sign-in flows built for students, instructors, and teams.",
    icon: ShieldCheck,
  },
  {
    title: "Outcome focused",
    description: "Every path is designed to move learners toward visible progress.",
    icon: Trophy,
  },
];

export default function AuthLayoutShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[92rem] items-center gap-10 px-6 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <section className="hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-white to-blue-50/60 p-10 shadow-lg shadow-blue-100/50 lg:block">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs uppercase tracking-[0.28em] text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            Authentication Module
          </div>
          <h2 className="mt-8 max-w-lg text-5xl font-semibold leading-[1.02] tracking-tight text-slate-900">
            Secure access for the next generation of AI builders.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
            Sign in, register, recover passwords, and verify identity through a
            polished experience designed for University Of AI learners and enterprise cohorts.
          </p>

          <div className="mt-10 space-y-4">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <div
                  key={highlight.title}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 inline-flex rounded-2xl bg-blue-100 p-3 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{highlight.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            <Link href="/" className="hover:text-slate-700">
              Back to homepage
            </Link>
            <span className="h-px flex-1 bg-slate-200" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-[36rem]">{children}</section>
      </div>
    </div>
  );
}