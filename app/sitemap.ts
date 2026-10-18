import type { MetadataRoute } from "next";
import { LINES, SITE } from "@/lib/catalog";

/**
 * Every route the site has. Product pages come off the same catalog the pages
 * render from, so adding a paddle can't leave the sitemap behind.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, priority: 1 },
    { url: `${SITE}/paddles`, priority: 0.9 },
    ...LINES.map((line) => ({
      url: `${SITE}/paddles/${line.slug}`,
      priority: 0.8,
    })),
    { url: `${SITE}/apparel`, priority: 0.7 },
    { url: `${SITE}/the-four`, priority: 0.7 },
    { url: `${SITE}/stockists`, priority: 0.6 },
  ];
}
