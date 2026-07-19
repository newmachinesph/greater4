import Link from "next/link";
import Wordmark from "./Wordmark";
import Court from "./Court";

/** One flat row, not four columns of a sitemap the site doesn't have. */
const LINKS = [
  { href: "/paddles", label: "Paddles" },
  { href: "/apparel", label: "Court Wear" },
  { href: "/the-four", label: "The Four" },
  { href: "/stockists", label: "Stockists" },
  { href: "/stockists#clubs", label: "Clubs" },
  { href: "/stockists", label: "Warranty" },
];

/**
 * Ft5 · Statement.
 *
 * The four-column index footer (Product / Company / Resources / Legal) plus a
 * social row plus a copyright tail is the most-replicated footer on the web,
 * and this site has no sitemap that needs cataloguing. It closes with the
 * argument instead.
 */
export default function Footer() {
  return (
    <footer className="relative grain grain-invert"
      style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="shell pt-[var(--section-tight)] pb-10">
        {/* The closing line */}
        <p
          className="display max-w-[20ch]"
          style={{ fontSize: "clamp(2rem,6vw,4.5rem)" }}
        >
          The court was built for four.
        </p>

        <div className="grid12 gap-y-12 mt-16">
          {/* Newsletter */}
          <form className="col-span-12 lg:col-span-5" action="#">
            {/* ponytail: no backend yet — wire to your ESP, then remove this. */}
            <label
              htmlFor="email"
              className="data block mb-4"
              style={{ color: "var(--mute-inv)" }}
            >
              Drops and restocks
            </label>
            <div
              className="flex items-center gap-4 border-b pb-3"
              style={{ borderColor: "var(--rule-inv)" }}
            >
              <input
                id="email"
                type="email"
                required
                placeholder="you@court.ph"
                className="bg-transparent flex-1 outline-none placeholder:opacity-55 text-[1.05rem]"
              />
              <button type="submit" className="data link whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="data mt-4" style={{ color: "var(--mute-inv)" }}>
              Twice a month at most.
            </p>
          </form>

          {/* Court mark */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 opacity-45">
            <Court
              uid="footer"
              className="w-full h-auto max-w-[280px] lg:ml-auto"
              dimensions={false}
              inverted
            />
          </div>
        </div>

        {/* Meta row */}
        <div
          className="mt-20 pt-7 border-t"
          style={{ borderColor: "var(--rule-inv)" }}
        >
          <nav
            className="flex flex-wrap gap-x-7 gap-y-3"
            aria-label="Footer"
          >
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="data link whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <Link href="/" className="text-[1.5rem]">
              <Wordmark />
            </Link>
            <p className="data nums" style={{ color: "var(--mute-inv)" }}>
              © {new Date().getFullYear()} · Manila · Conforms to USA Pickleball 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
