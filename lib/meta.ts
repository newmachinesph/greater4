import type { Metadata } from "next";
import { SITE } from "./catalog";

/**
 * Per-route metadata.
 *
 * Declaring `openGraph` on a route replaces the root layout's block wholesale
 * — including the file-based card from app/opengraph-image.tsx — so every
 * field, the image included, has to be restated. One helper rather than the
 * same fifteen lines on each page.
 *
 * `path` is root-relative and doubles as the canonical.
 */
export function pageMeta(
  title: string,
  description: string,
  path: string,
): Metadata {
  const social = `${title} · Greater4`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: social,
      description,
      type: "website",
      url: `${SITE}${path}`,
      locale: "en_PH",
      siteName: "Greater4",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: social }],
    },
    twitter: { card: "summary_large_image", title: social, description },
  };
}
