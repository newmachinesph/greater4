import type { Metadata } from "next";
import { Archivo, Bodoni_Moda, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/catalog";

/**
 * Three families, three jobs:
 *   Archivo     — grotesque display + body. Authority, sports masthead.
 *   Bodoni Moda — editorial voice. Used sparingly, for the brand's opinions.
 *   JetBrains   — instrumentation. Spec tables, indices, labels.
 * Nothing else gets loaded.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

// Archivo is the first-paint face (display + body), so it keeps next/font's
// default preload. Bodoni and JetBrains are accents (the wordmark numeral,
// editorial pull quotes, mono data labels); preloading their four/two weights
// tripped "preloaded but not used within a few seconds". display:swap still
// loads them, just without the eager <link rel=preload>.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  alternates: { canonical: "/" },
  title: {
    default: "Greater4 · Built for Four",
    template: "%s · Greater4",
  },
  description:
    "Philippine pickleball paddles and court wear engineered for doubles, the format that accounts for 90% of all rated play. Designed in Pasig, played nationwide.",
  keywords: [
    "pickleball Philippines",
    "pickleball paddle Philippines",
    "doubles pickleball",
    "Greater4",
    "carbon fibre paddle",
  ],
  openGraph: {
    title: "Greater4 · Built for Four",
    description:
      "Paddles and court wear built around the way the game is actually played.",
    type: "website",
    url: SITE,
    locale: "en_PH",
    siteName: "Greater4",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greater4 · Built for Four",
    description:
      "Paddles and court wear built around the way the game is actually played.",
  },
};

/** Organization markup, so search and social resolve the brand, not the page. */
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Greater4",
  url: SITE,
  logo: `${SITE}/icon.svg`,
  description:
    "Philippine pickleball paddles and court wear engineered for doubles.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pasig",
    addressRegion: "Metro Manila",
    addressCountry: "PH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-PH"
      className={`${archivo.variable} ${bodoni.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <script
          type="application/ld+json"
          // Static object literal, not user input — nothing to sanitise.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
        />
        {/* Scroll reveals ship at opacity 0 and are animated in by Motion.
            Without JS they would never arrive, so unhide them outright. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="translate"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-4 focus:px-4 focus:py-2 data"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
