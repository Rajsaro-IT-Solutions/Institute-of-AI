"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import Container from "@/components/layout/Container";

export default function Announcement() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="border-b border-blue-100 bg-white/80 backdrop-blur">
      <Container className="flex min-h-12 items-center justify-between gap-3 py-2">
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <p>
            Cohort 08 applications are open for the AI Career Bootcamp.
            <Link href="/programs" className="ml-2 font-semibold text-blue-600">
              Explore programs
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </Container>
    </div>
  );
}
