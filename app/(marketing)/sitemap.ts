import type { MetadataRoute } from "next";
import { BRAND } from "@/constants/brand";

const routes = [
  "",
  "/about",
  "/programs",
  "/courses",
  "/workshops",
  "/corporate-training",
  "/pricing",
  "/blog",
  "/contact",
  "/careers",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BRAND.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
