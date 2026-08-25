import { cn } from "@/utils/cn";

export function Skeleton({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl border border-white/5 bg-white/[0.04]",
        className
      )}
    />
  );
}
