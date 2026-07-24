"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";

const NAV = [
  { href: "/paddles", label: "Paddles" },
  { href: "/apparel", label: "Court Wear" },
  { href: "/the-four", label: "The Four" },
  { href: "/stockists", label: "Stockists" },
];

/**
 * Floating pill masthead.
 *
 * v2 trades v1's broadsheet masthead for the Framer-template floating bar: a
 * rounded, blurred pill that detaches from the page and rides the scroll. The
 * wordmark still anchors it, so it can't be mistaken for a generic SaaS nav —
 * the editorial numeral is doing the identity work.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // A hair of extra weight once the page has moved, so the bar reads as
  // floating over content rather than sitting in the header band.
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 pt-3 sm:pt-4">
      <div className="shell">
        <div
          className="flex items-center justify-between gap-4 pl-5 pr-3 py-2.5 transition-[background,box-shadow,border-color] duration-300"
          style={{
            borderRadius: "var(--r-pill)",
            border: "1px solid var(--rule)",
            background: lifted ? "rgba(246,244,238,0.82)" : "rgba(246,244,238,0.5)",
            boxShadow: lifted ? "0 1px 0 var(--rule), 0 18px 40px -32px rgba(12,11,9,0.5)" : "none",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <Link href="/" className="text-[1.55rem] leading-none shrink-0" aria-label="Greater4 home">
            <Wordmark />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="data link whitespace-nowrap"
                  style={{ opacity: active ? 1 : 0.66 }}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/paddles" className="data link hidden sm:inline-block pr-1" style={{ opacity: 0.66 }}>
              Bag (0)
            </Link>
            <Link href="/paddles" className="btn btn-solid data hidden md:inline-flex !py-2.5 !px-5">
              Shop
              <span className="arw" aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              className="md:hidden data btn btn-ghost !py-2.5 !px-5"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="md:hidden fixed inset-x-0 top-[76px] bottom-0 z-40"
        style={{ background: "var(--paper)" }}
      >
        <nav className="shell pt-6 flex flex-col" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-4 border-b display text-[2rem]"
              style={{ borderColor: "var(--rule)" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/paddles"
            onClick={() => setOpen(false)}
            className="btn btn-solid data mt-8 justify-center"
          >
            Shop the paddles
            <span className="arw" aria-hidden="true">→</span>
          </Link>
          <p className="data mt-10" style={{ color: "var(--mute)" }}>
            Manila · Est. 2026
          </p>
        </nav>
      </div>
    </header>
  );
}
