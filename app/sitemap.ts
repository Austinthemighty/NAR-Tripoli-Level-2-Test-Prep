import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tripoli",
    "/tripoli/practice",
    "/tripoli/quiz",
    "/tripoli/flashcards",
    "/tripoli/study",
    "/nar",
    "/nar/practice",
    "/nar/quiz",
    "/nar/flashcards",
    "/nar/study",
    "/about",
    "/resources",
  ];
  const now = new Date();
  return routes.map((r) => ({
    url: `${SITE.url}${r}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1.0 : r.includes("practice") ? 0.9 : 0.7,
  }));
}
