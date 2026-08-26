import { cn } from "@/utils/cn";

export default function ProgressBar({
  value,
  className,
}: Readonly<{
  value: number;
  className?: string;
}>) {
  const bounded = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}>
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all",
          bounded === 100 && "from-emerald-500 to-emerald-400"
        )}
        style={{ width: `${bounded}%` }}
      />
    </div>
  );
}