import type { Metadata } from "next";
import Link from "next/link";
import Paddle from "@/components/Paddle";
import SpecBar from "@/components/SpecBar";
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
      <section className="shell pt-[clamp(2.5rem,6vw,4.5rem)]">
        <div className="grid12 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="display" style={{ fontSize: "var(--t-display)" }}>
              Three paddles.
              <br />
              One argument.
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

      {/* Alternating editorial rows */}
      <section className="shell mt-[var(--section-tight)]">
        {LINES.map((line, i) => (
          <article
            key={line.slug}
            className="border-t py-[clamp(3rem,6vw,5.5rem)]"
            style={{ borderColor: "var(--rule)" }}
          >
            <div className="grid12 gap-y-12 items-center">
              <div
                className={`col-span-12 md:col-span-5 ${
                  i % 2 ? "md:order-2 md:col-start-8" : ""
                }`}
              >
                <Link href={`/paddles/${line.slug}`} className="card block">
                  <div
                    className="relative grain flex items-center justify-center py-14"
                    style={{ background: "var(--wash)" }}
                  >
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
                <h2
                  className="display mt-4"
                  style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}
                >
                  {line.name}
                </h2>
                {/* Italic is fine here — this is body copy, not a heading. */}
                <p className="editorial mt-5 text-[1.15rem] italic opacity-70">
                  {line.meaning}
                </p>
                <p className="lead mt-6" style={{ maxWidth: "44ch" }}>
                  {line.blurb}
                </p>

                <div className="mt-10 space-y-3 max-w-[420px]">
                  <SpecBar label="Control" value={line.control} />
                  <SpecBar label="Power" value={line.power} delay={0.08} />
                  <SpecBar label="Spin" value={line.spin} delay={0.16} />
                </div>

                <Link href={`/paddles/${line.slug}`} className="btn data nums mt-10">
                  {peso(line.price)} · Details
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Comparison table — the thing none of the competition ships */}
      <section className="shell pt-[var(--section)]">
        <h2
          className="display border-t pt-10"
          style={{ fontSize: "var(--t-head)", borderColor: "var(--ink)" }}
        >
          Full specifications
        </h2>

        <div className="mt-12 overflow-x-auto">
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
                  className="data text-left py-5 border-b align-top"
                  style={{ borderColor: "var(--rule)", color: "var(--mute)" }}
                >
                  Price
                </th>
                {LINES.map((line) => (
                  <td
                    key={line.slug}
                    className="py-5 border-b pl-6 align-top"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    <span className="display text-[1.25rem]">{peso(line.price)}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p
          className="data mt-10 max-w-[80ch]"
          style={{ color: "var(--mute)", letterSpacing: "0.08em" }}
        >
          All models conform to USA Pickleball 2026 equipment standards:
          combined length and width under 24 in, length under 17 in, surface
          roughness within Rz 30 µm. Core thickness is unregulated, so ours is a
          design choice rather than a compliance figure.
        </p>
      </section>
    </>
  );
}
