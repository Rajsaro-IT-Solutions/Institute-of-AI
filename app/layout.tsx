import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/providers/AppProvider";
import { BRAND, SEO } from "@/constants/brand";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage],
  },
  authors: [
    {
      name: BRAND.name,
      url: BRAND.url,
    },
  ],
  creator: BRAND.name,
  publisher: BRAND.name,
  metadataBase: new URL(BRAND.url),
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.className} ${manrope.variable} bg-[var(--background)] text-slate-900 antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
