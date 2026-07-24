import Link from "next/link";
import Court from "./Court";
import Badge from "./Badge";
import { Reveal } from "./Reveal";

/**
 * Closing call-to-action band. Every one of the reference templates ends a
 * page on a big inverted panel with one clear action; this is ours, with the
 * court mark carrying the brand argument in the corner instead of a stock hero.
 */
export default function CTA({
  eyebrow = "Built for four",
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="shell pt-[var(--section)]">
      <Reveal className="relative grain grain-invert surface-ink round-xl overflow-hidden">
        <div
          className="absolute -right-16 -bottom-24 w-[520px] max-w-[70%] opacity-[0.16] pointer-events-none"
          aria-hidden="true"
        >
          <Court uid="cta" className="w-full h-auto" dimensions={false} players={false} inverted />
        </div>

        <div className="relative px-[clamp(1.5rem,5vw,5rem)] py-[clamp(3rem,7vw,6rem)] max-w-[46rem]">
          <Badge inverted>{eyebrow}</Badge>
          <h2
            className="display mt-7"
            style={{ fontSize: "var(--t-head)" }}
          >
            {title}
          </h2>
          <p className="lead mt-6" style={{ color: "var(--mute-inv)", maxWidth: "44ch" }}>
            {body}
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link href={primary.href} className="btn btn-inv data">
              {primary.label}
              <span className="arw" aria-hidden="true">→</span>
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="btn data"
                style={{ borderColor: "var(--rule-inv)", color: "var(--paper)" }}
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
