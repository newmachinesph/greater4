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
 * N6 · Newspaper masthead.
 *
 * Not the sticky wordmark-left / links-right / CTA-right shape — that layout
 * lands identically on a bakery, a B2B SaaS and a manifesto, which is exactly
 * why it reads as generated. A broadsheet masthead can only belong to an
 * editorial brand.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock scroll while the drawer is open. Closing on navigation happens in the
  // link handler — an effect for that is a state-sync anti-pattern.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="shell pt-5">
      {/* Issue line */}
      <div className="flex items-baseline justify-between gap-4">
        <p className="data" style={{ color: "var(--mute)" }}>
          Manila · Est. 2026
        </p>
        <div className="flex items-center gap-6">
          <Link href="/paddles" className="data link">
            Bag (0)
          </Link>
          <button
            type="button"
            className="md:hidden data"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Wordmark */}
      <Link
        href="/"
        className="block text-center mt-4 text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9]"
      >
        <Wordmark />
      </Link>

      {/* Link row */}
      <nav
        className="hidden md:flex justify-center gap-10 mt-5"
        aria-label="Primary"
      >
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="data link whitespace-nowrap"
              style={{ opacity: active ? 1 : 0.72 }}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Double rule — the masthead's signature */}
      <div
        className="mt-5 h-[4px]"
        style={{
          borderTop: "1px solid var(--ink)",
          borderBottom: "1px solid var(--ink)",
        }}
        aria-hidden="true"
      />

      {/* Mobile disclosure */}
      <div id="mobile-nav" hidden={!open} className="md:hidden">
        <nav className="py-4 flex flex-col" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 border-b display text-[1.75rem]"
              style={{ borderColor: "var(--rule)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
