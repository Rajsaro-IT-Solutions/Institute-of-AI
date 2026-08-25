import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel aurora-border max-w-2xl rounded-[2rem] p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500/12 text-sky-300">
          <Compass className="h-8 w-8" />
        </div>
        <p className="mb-3 text-sm uppercase tracking-[0.32em] text-sky-300">404</p>
        <h1 className="mb-4 text-4xl font-semibold text-slate-50">Page not found</h1>
        <p className="mb-8 text-lg leading-8 text-slate-300">
          The page you requested is not part of the current Institute of AI experience.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to the homepage</Link>
        </Button>
      </div>
    </main>
  );
}
