import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/utils/cn";

export default function StatCard({
  label,
  value,
  delta,
  icon,
}: Readonly<{
  label: string;
  value: string;
  delta?: string;
  icon: ReactNode;
}>) {
  const trendingUp = delta?.startsWith("+");

  return (
    <Card className="border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
          {delta ? (
            <p
              className={cn(
                "mt-2 inline-flex items-center gap-1 text-xs font-medium",
                trendingUp ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {trendingUp ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {delta}
            </p>
          ) : null}
        </div>
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">{icon}</div>
      </div>
    </Card>
  );
}