import type { MetadataRoute } from "next";

/**
 * /sitemap.xml — auto-emitted at build time by Next.js.
 *
 * Pages indexed: homepage (with all its hash-anchored sections treated as a
 * single URL — single-page marketing site), privacy, editorial.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://www.menaclimate.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.menaclimate.com/privacy",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.menaclimate.com/editorial",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
