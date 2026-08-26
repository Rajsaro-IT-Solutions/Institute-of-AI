import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import AppProvider from "@/components/providers/AppProvider";
import JsonLd from "@/components/seo/JsonLd";
import { BRAND, SEO } from "@/constants/brand";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  applicationName: BRAND.name,
  title: {
    default: SEO.title,
    template: `%s | ${BRAND.name}`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  category: "education",
  alternates: {
    canonical: BRAND.url,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: BRAND.url,
    siteName: BRAND.name,
    locale: "en_US",
    title: SEO.title,
    description: SEO.description,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: BRAND.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SEO.twitterSite,
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
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <AppProvider>{children}</AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
