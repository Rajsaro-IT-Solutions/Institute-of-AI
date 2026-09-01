import type { Metadata } from "next";
import AdminShell from "@/features/admin/components/AdminShell";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel",
    template: "%s | Admin | Institute of AI",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}