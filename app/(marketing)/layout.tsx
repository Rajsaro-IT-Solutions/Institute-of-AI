import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/features/home/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
