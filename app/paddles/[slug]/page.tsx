import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Paddle from "@/components/Paddle";
import PaddleViewer from "@/components/PaddleViewer";
import Placeholder from "@/components/Placeholder";
import { LINES, peso } from "@/lib/catalog";

export function generateStaticParams() {
  return LINES.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata(
  props: PageProps<"/paddles/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const line = LINES.find((l) => l.slug === slug);
  if (!line) return {};

  return {
    title: line.name,
    description: line.blurb,
  };
}

const SPECS = [
  ["Core", "core"],
  ["Face", "face"],
  ["Thickness", "thickness"],
  ["Weight", "weight"],
  ["Handle length", "handle"],
  ["Shape", "shape"],
] as const;

export default async function PaddlePage(props: PageProps<"/paddles/[slug]">) {
  const { slug } = await props.params;
  const line = LINES.find((l) => l.slug === slug);
  if (!line) notFound();

  const others = LINES.filter((l) => l.slug !== slug);

  return (
    <>
      <section className="shell pt-8">
        <div>
          <nav className="data flex items-center gap-3" style={{ color: "var(--mute)" }}>
            <Link href="/paddles" className="link">
              Paddles
            </Link>
            <span aria-hidden="true">/</span>
            <span style={{ color: "var(--ink)" }}>{line.name}</span>
          </nav>
        </div>
      </section>

      <section className="shell mt-10">
        <div className="grid12 gap-y-14">
          {/* Product art — sticky on desktop */}
          <div className="col-span-12 lg:col-span-6">
            <div className="lg:sticky lg:top-[104px]">
              <PaddleViewer line={line} />

              <div className="grid grid-cols-3 gap-3 mt-3">
                {([1, 2, 4] as const).map((v) => (
                  <Placeholder
                    key={v}
                    uid={`pdp-${line.slug}-${v}`}
                    variant={v}
                    ratio="1 / 1"
                    label={`0${v}`}
                    parallax={0.08}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Detail column */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div>
              <h1 className="display" style={{ fontSize: "clamp(2.75rem,6vw,4.5rem)" }}>
                {line.name}
              </h1>
              <p className="editorial italic mt-5 text-[1.2rem] opacity-70">
                {line.meaning}
              </p>

              <p className="display nums mt-10" style={{ fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>
                {peso(line.price)}
              </p>

              <button
                type="button"
                className="btn btn-solid data mt-8 w-full justify-center"
                // ponytail: no cart yet — wire to your commerce backend.
              >
                Add to bag
              </button>
              <p className="data mt-4" style={{ color: "var(--mute)" }}>
                Free nationwide shipping over ₱3,000 · 30-day returns
              </p>
            </div>

            <div className="mt-14 prose-g4">
              {line.copy.map((para, i) => (
                <p key={i} className={i === 0 ? "lead" : ""} style={i > 0 ? { color: "var(--mute)" } : undefined}>
                  {para}
                </p>
              ))}
            </div>

            {/* Spec table */}
            <div className="mt-14">
              <p className="data pb-4 border-b" style={{ borderColor: "var(--ink)" }}>
                Specification
              </p>
              <dl className="nums">
                {SPECS.map(([label, key]) => (
                  <div
                    key={key}
                    className="flex items-baseline justify-between gap-6 py-4 border-b"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    <dt className="data" style={{ color: "var(--mute)" }}>
                      {label}
                    </dt>
                    <dd className="text-right text-[0.95rem]">{line[key]}</dd>
                  </div>
                ))}
                <div
                  className="flex items-baseline justify-between gap-6 py-4 border-b"
                  style={{ borderColor: "var(--rule)" }}
                >
                  <dt className="data" style={{ color: "var(--mute)" }}>
                    Conformance
                  </dt>
                  <dd className="text-right text-[0.95rem]">
                    USA Pickleball 2026, PBCoR &lt; 0.43
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="shell mt-[var(--section)]">
        <div>
          <div
            className="border-t pt-10 flex flex-wrap items-end justify-between gap-6"
            style={{ borderColor: "var(--rule)" }}
          >
            <h2 className="display" style={{ fontSize: "var(--t-sub)" }}>
              The other two
            </h2>
            <Link href="/paddles" className="data link">
              Compare specifications →
            </Link>
          </div>
        </div>

        <div className="grid12 mt-12 gap-y-12">
          {others.map((other) => (
            <div key={other.slug} className="col-span-12 sm:col-span-6">
              <Link href={`/paddles/${other.slug}`} className="card block">
                <div
                  className="relative grain flex items-center justify-center py-14"
                  style={{ background: "var(--wash)" }}
                >
                  <Paddle
                    uid={`x-${other.slug}`}
                    art={other.art}
                    elongated={other.slug === "sulong"}
                    label={`${other.name} paddle`}
                    className="card-art w-[34%] max-w-[170px] h-auto"
                  />
                </div>
                <div className="pt-5 pb-6 flex items-baseline justify-between gap-4">
                  <h3 className="display text-[1.5rem]">{other.name}</h3>
                  <p className="data nums">{peso(other.price)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
