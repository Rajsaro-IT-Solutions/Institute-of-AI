import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Badge({
  className,
  children,
  ...props
}: Readonly<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
