import type { MetadataRoute } from "next";
import { getAllValidSlugs } from "@/lib/slug-resolver";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getAllValidSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: slug.includes("-") ? 0.8 : 0.9
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    ...pages
  ];
}
