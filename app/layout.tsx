import type { Metadata } from "next";
import { Archivo, Bodoni_Moda, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://greater4.ph"),
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
    locale: "en_PH",
    siteName: "Greater4",
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
