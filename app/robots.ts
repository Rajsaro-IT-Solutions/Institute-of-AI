import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login", "/register", "/forgot-password", "/reset-password", "/verify-email"],
    },
    sitemap: `${BRAND.url}/sitemap.xml`,
    host: BRAND.url,
  };
}
