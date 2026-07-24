import Link from "next/link";
import Wordmark from "./Wordmark";
import Court from "./Court";
import Badge from "./Badge";

const LINKS = [
  { href: "/paddles", label: "Paddles" },
  { href: "/apparel", label: "Court Wear" },
  { href: "/the-four", label: "The Four" },
  { href: "/stockists", label: "Stockists" },
  { href: "/stockists#clubs", label: "Clubs" },
  { href: "/stockists", label: "Warranty" },
];

/**
 * Statement footer, rounded.
 *
 * v2 keeps v1's decision to close on the argument rather than a four-column
 * sitemap the site doesn't have — but seats it in a rounded ink card so the
 * paper peeks past its top corners, the way the reference templates cap a page.
 */
export default function Footer() {
  return (
    <footer
      className="relative grain grain-invert"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        borderRadius: "var(--r-2xl) var(--r-2xl) 0 0",
      }}
    >
      <div className="shell pt-[var(--section-tight)] pb-10">
        <Badge inverted>Manila · Est. 2026</Badge>

        <p
          className="display max-w-[16ch] mt-8"
          style={{ fontSize: "clamp(2.25rem,7vw,5.5rem)" }}
        >
          The court was built for four.
        </p>

        <div className="grid12 gap-y-12 mt-14">
          {/* Newsletter */}
          <form className="col-span-12 lg:col-span-5" action="#">
            {/* ponytail: no backend yet — wire to your ESP, then remove this. */}
            <label htmlFor="email" className="data block mb-4" style={{ color: "var(--mute-inv)" }}>
              Drops and restocks
            </label>
            <div
              className="flex items-center gap-3 pl-5 pr-2 py-2"
              style={{
                border: "1px solid var(--rule-inv)",
                borderRadius: "var(--r-pill)",
                background: "var(--card-inv)",
              }}
            >
              <input
                id="email"
                type="email"
                required
                placeholder="you@court.ph"
                className="bg-transparent flex-1 outline-none placeholder:opacity-55 text-[1.05rem] min-w-0"
              />
              <button type="submit" className="btn btn-inv data !py-2.5 !px-5 shrink-0">
                Subscribe
              </button>
            </div>
            <p className="data mt-4" style={{ color: "var(--mute-inv)" }}>
              Twice a month at most.
            </p>
          </form>

          {/* Index */}
          <nav className="col-span-6 lg:col-span-3 lg:col-start-7" aria-label="Footer">
            <p className="data mb-5" style={{ color: "var(--mute-inv)" }}>
              Index
            </p>
            <ul className="flex flex-col gap-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="link whitespace-nowrap">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Court mark */}
          <div className="col-span-6 lg:col-span-3 lg:col-start-10 flex items-start justify-end opacity-45">
            <Court
              uid="footer"
              className="w-full h-auto max-w-[240px]"
              dimensions={false}
              inverted
            />
          </div>
        </div>

        {/* Meta row */}
        <div
          className="mt-16 pt-7 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4"
          style={{ borderTop: "1px solid var(--rule-inv)" }}
        >
          <Link href="/" className="text-[1.5rem]">
            <Wordmark />
          </Link>
          <p className="data nums" style={{ color: "var(--mute-inv)" }}>
            © {new Date().getFullYear()} · Manila · Conforms to USA Pickleball 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
