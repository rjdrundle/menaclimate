import type { MetadataRoute } from "next";

/**
 * /robots.txt — auto-emitted at build time by Next.js.
 *
 * Default policy: allow everything for everyone. The site is public marketing
 * material and we WANT to be crawled by all the AI search engines
 * (GPTBot, ClaudeBot, PerplexityBot, etc.) for GEO/AI discoverability.
 *
 * Block `/api/*` — the register endpoint should never be scraped or indexed.
 * Sitemap declared so crawlers pick it up. llms.txt is auto-discovered
 * via the <link rel="alternate" type="text/plain"> tag in <head> and
 * referenced by the /llms.txt URL itself.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: "https://www.menaclimate.com/sitemap.xml",
    host: "https://www.menaclimate.com",
  };
}
