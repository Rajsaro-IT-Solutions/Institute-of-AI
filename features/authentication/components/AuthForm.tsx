import type { FormHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export default function AuthForm({
  children,
  className,
  ...props
}: Readonly<FormHTMLAttributes<HTMLFormElement> & { children: ReactNode }>) {
  return (
    <form className={cn("space-y-5", className)} {...props}>
      {children}
    </form>
  );
}
