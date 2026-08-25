import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  hint?: string;
  label: string;
  rightSlot?: ReactNode;
};

export default function AuthField({
  className,
  error,
  hint,
  label,
  rightSlot,
  id,
  ...props
}: Readonly<AuthFieldProps>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <span
        className={cn(
          "flex items-center rounded-2xl border border-slate-200 bg-white px-4 transition-colors focus-within:border-blue-400",
          error && "border-rose-400"
        )}
      >
        <input
          id={id}
          className={cn(
            "h-13 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none",
            className
          )}
          {...props}
        />
        {rightSlot}
      </span>
      {error ? (
        <span className="mt-2 block text-sm text-rose-600">{error}</span>
      ) : hint ? (
        <span className="mt-2 block text-sm text-slate-400">{hint}</span>
      ) : null}
    </label>
  );
}