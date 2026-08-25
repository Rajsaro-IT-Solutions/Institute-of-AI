import type { ReactNode } from "react";
import AuthLayoutShell from "@/features/authentication/components/AuthLayoutShell";

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AuthLayoutShell>{children}</AuthLayoutShell>;
}
