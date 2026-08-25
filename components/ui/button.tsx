"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

import { cn } from "@/utils/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gradient"
  | "danger";

type ButtonSize =
  | "sm"
  | "md"
  | "lg"
  | "icon";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200 hover:from-blue-700 hover:to-cyan-600",

  secondary:
    "bg-slate-900 text-white hover:bg-slate-800",

  outline:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",

  ghost:
    "text-slate-700 hover:bg-slate-100",

  gradient:
    "bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 text-white hover:opacity-90",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",

  md: "h-11 px-6",

  lg: "h-14 px-8 text-lg",

  icon: "h-11 w-11",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const buttonClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-blue-500",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  return (
    <Comp
      className={buttonClassName}
      {...(!asChild ? { disabled: disabled || loading } : {})}
      {...props}
    >
      {loading ? (
        <Loader2
          className="animate-spin"
          size={18}
        />
      ) : (
        leftIcon
      )}

      <Slottable>{children}</Slottable>

      {!loading && rightIcon}
    </Comp>
  );
}

export default Button;
