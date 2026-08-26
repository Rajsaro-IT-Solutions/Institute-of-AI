"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="glass-panel aurora-border max-w-xl rounded-[2rem] p-10 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/12 text-rose-300">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h1 className="mb-3 text-3xl font-semibold">Something broke unexpectedly</h1>
          <p className="mb-8 text-base leading-7 text-slate-300">
            We hit an application error while loading this page. Try again, or head back
            to the homepage while we recover.
          </p>
          <pre className="mb-6 max-w-full overflow-x-auto rounded-lg bg-rose-950/50 p-4 text-left text-xs text-rose-300 whitespace-pre-wrap break-all">
            {error?.message}
            {"\n\n"}
            {error?.stack}
          </pre>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={reset} leftIcon={<RefreshCw className="h-4 w-4" />}>
              Try again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
