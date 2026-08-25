import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export function Card({
  className,
  children,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "glass-panel aurora-border rounded-[1.75rem] p-6 text-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
