"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "border border-slate-200 bg-white text-slate-900 shadow-xl",
      }}
    />
  );
}
