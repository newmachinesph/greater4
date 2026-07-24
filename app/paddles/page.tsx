import type { Metadata } from "next";
import Link from "next/link";
import Paddle from "@/components/Paddle";
import SpecBar from "@/components/SpecBar";
import Badge from "@/components/Badge";
import { Reveal } from "@/components/Reveal";
import CTA from "@/components/CTA";
import { LINES, peso } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Paddles",
  description:
    "Three paddles built for doubles. Full specifications published — core, face, weight, handle, shape — on every one.",
};

const ROWS = [
  ["Core", "core"],
  ["Face", "face"],
  ["Thickness", "thickness"],
  ["Weight", "weight"],
  ["Handle", "handle"],
  ["Shape", "shape"],
] as const;

export default function PaddlesPage() {
  return (
    <>
      <section className="shell pt-[clamp(2rem,5vw,4rem)]">
        <div className="grid12 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Badge>Three builds · one argument</Badge>
            <h1 className="display mt-7" style={{ fontSize: "var(--t-display)" }}>
              The paddles
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="lead" style={{ maxWidth: "36ch" }}>
              Every specification is on this page. If a brand will not tell you
              the core thickness before you buy, ask yourself why.
            </p>
          </div>
        </div>
      </section>

      {/* Product rows in rounded surfaces */}
      <section className="shell mt-[var(--section-tight)] flex flex-col gap-6">
        {LINES.map((line, i) => (
          <Reveal key={line.slug} delay={i * 0.05}>
            <article className="surface round-xl overflow-hidden p-[clamp(1.25rem,3vw,2.5rem)]">
              <div className="grid12 gap-y-10 items-center">
                <div
                  className={`col-span-12 md:col-span-5 ${
                    i % 2 ? "md:order-2 md:col-start-8" : ""
                  }`}
                >
                  <Link href={`/paddles/${line.slug}`} className="card block">
                    <div className="surface-wash grain relative round-xl overflow-hidden flex items-center justify-center py-14">
                      <span className="badge data absolute top-4 left-4" style={{ color: "var(--mute)" }}>
                        <span className="badge-dot" aria-hidden="true" /> {line.index}
                      </span>
                      <Paddle
                        uid={`list-${line.slug}`}
                        art={line.art}
                        elongated={line.slug === "sulong"}
                        label={`${line.name} paddle`}
                        className="card-art w-[44%] max-w-[240px] h-auto"
                      />
                    </div>
                  </Link>
                </div>

                <div
                  className={`col-span-12 md:col-span-6 ${
                    i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-7"
                  }`}
                >
                  <p className="data" style={{ color: "var(--mute)" }}>
                    {line.role}
                  </p>
                  <h2 className="display mt-4" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                    {line.name}
                  </h2>
                  {/* Italic is fine here — body copy, not a heading. */}
                  <p className="editorial mt-5 text-[1.15rem] italic opacity-70">
                    {line.meaning}
                  </p>
                  <p className="lead mt-6" style={{ maxWidth: "44ch" }}>
                    {line.blurb}
                  </p>

                  <div className="mt-9 space-y-3 max-w-[420px]">
                    <SpecBar label="Control" value={line.control} />
                    <SpecBar label="Power" value={line.power} delay={0.08} />
                    <SpecBar label="Spin" value={line.spin} delay={0.16} />
                  </div>

                  <Link href={`/paddles/${line.slug}`} className="btn btn-solid data nums mt-9">
                    {peso(line.price)} · Details
                    <span className="arw" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Comparison table — the thing none of the competition ships */}
      <section className="shell pt-[var(--section)]">
        <Badge>Side by side</Badge>
        <h2 className="display mt-6" style={{ fontSize: "var(--t-head)" }}>
          Full specifications
        </h2>

        <div className="mt-10 surface round-xl overflow-hidden p-[clamp(1.25rem,3vw,2.5rem)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[640px] nums">
              <caption className="sr-only">
                Specification comparison across all three Greater4 paddle lines
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="data text-left align-bottom pb-5 border-b w-[22%]"
                    style={{ borderColor: "var(--ink)", color: "var(--mute)" }}
                  >
                    Specification
                  </th>
                  {LINES.map((line) => (
                    <th
                      key={line.slug}
                      scope="col"
                      className="text-left align-bottom pb-5 border-b pl-6"
                      style={{ borderColor: "var(--ink)" }}
                    >
                      <Link href={`/paddles/${line.slug}`} className="link display text-[1.5rem]">
                        {line.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, key]) => (
                  <tr key={key}>
                    <th
                      scope="row"
                      className="data text-left py-5 border-b align-top"
                      style={{ borderColor: "var(--rule)", color: "var(--mute)" }}
                    >
                      {label}
                    </th>
                    {LINES.map((line) => (
                      <td
                        key={line.slug}
                        className="py-5 border-b pl-6 align-top text-[0.95rem]"
                        style={{ borderColor: "var(--rule)" }}
                      >
                        {line[key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th
                    scope="row"
                    className="data text-left py-5 align-top"
                    style={{ color: "var(--mute)" }}
                  >
                    Price
                  </th>
                  {LINES.map((line) => (
                    <td key={line.slug} className="py-5 pl-6 align-top">
                      <span className="display text-[1.25rem]">{peso(line.price)}</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p
          className="data mt-8 max-w-[80ch]"
          style={{ color: "var(--mute)", letterSpacing: "0.08em" }}
        >
          All models conform to USA Pickleball 2026 equipment standards:
          combined length and width under 24 in, length under 17 in, surface
          roughness within Rz 30 µm. Core thickness is unregulated, so ours is a
          design choice rather than a compliance figure.
        </p>
      </section>

      <CTA
        eyebrow="Not sure which"
        title="Control, pressure, or your first real paddle"
        body="Bayanihan resets the soft game, Sulong pressures the net, Kasama flatters a developing swing. Hold one at a stockist before you commit."
        primary={{ href: "/stockists", label: "Find a stockist" }}
        secondary={{ href: "/the-four", label: "Why doubles" }}
      />
    </>
  );
}
