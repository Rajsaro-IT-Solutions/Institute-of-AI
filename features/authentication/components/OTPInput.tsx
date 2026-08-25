"use client";

import { useRef } from "react";
import { cn } from "@/utils/cn";

type OTPInputProps = {
  error?: string;
  onChange: (value: string) => void;
  value: string;
};

export default function OTPInput({
  error,
  onChange,
  value,
}: Readonly<OTPInputProps>) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length: 6 }, (_, index) => value[index] ?? "");

  return (
    <div>
      <div className="flex gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              refs.current[index] = element;
            }}
            className={cn(
              "h-14 w-12 rounded-2xl border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 outline-none transition-colors focus:border-blue-400",
              error && "border-rose-400"
            )}
            inputMode="numeric"
            maxLength={1}
            onChange={(event) => {
              const nextDigit = event.target.value.replace(/\D/g, "").slice(-1);
              const nextValue = digits.map((current, currentIndex) =>
                currentIndex === index ? nextDigit : current
              );
              onChange(nextValue.join(""));

              if (nextDigit && refs.current[index + 1]) {
                refs.current[index + 1]?.focus();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !digit && refs.current[index - 1]) {
                refs.current[index - 1]?.focus();
              }
            }}
            onPaste={(event) => {
              const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
              if (pasted.length > 0) {
                event.preventDefault();
                onChange(pasted);
              }
            }}
            value={digit}
          />
        ))}
      </div>
      {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}