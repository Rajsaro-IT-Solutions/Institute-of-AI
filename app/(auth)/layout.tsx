import type { Metadata } from "next";
import type { ReactNode } from "react";
import AuthLayoutShell from "@/features/authentication/components/AuthLayoutShell";

export const metadata: Metadata = {
  title: "Account Access",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <AuthLayoutShell>{children}</AuthLayoutShell>;
}
