import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Paddle from "@/components/Paddle";
import PaddleViewer from "@/components/PaddleViewer";
import Photo from "@/components/Photo";
import Badge from "@/components/Badge";
import SpecBar from "@/components/SpecBar";
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
      <section className="shell pt-6">
        <nav className="data flex items-center gap-3" style={{ color: "var(--mute)" }}>
          <Link href="/paddles" className="link">
            Paddles
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--ink)" }}>{line.name}</span>
        </nav>
      </section>

      <section className="shell mt-8">
        <div className="grid12 gap-y-14">
          {/* Product art — sticky on desktop */}
          <div className="col-span-12 lg:col-span-6">
            <div className="lg:sticky lg:top-[104px]">
              <PaddleViewer line={line} />

              <div className="grid grid-cols-3 gap-3 mt-3">
                {(["face", "grip", "court"] as const).map((tag, i) => (
                  <Photo
                    key={tag}
                    seed={`${line.slug}-${tag}`}
                    alt={`${line.name} paddle detail: ${tag}`}
                    ratio="1 / 1"
                    rounded="var(--r)"
                    label={`0${i + 1}`}
                    parallax={0.06}
                    w={500}
                    h={500}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Detail column */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Badge>{line.role}</Badge>
            <h1 className="display mt-6" style={{ fontSize: "clamp(2.75rem,6vw,4.5rem)" }}>
              {line.name}
            </h1>
            <p className="editorial italic mt-5 text-[1.2rem] opacity-70">
              {line.meaning}
            </p>

            <div className="surface round-xl p-6 mt-9">
              <div className="flex items-center justify-between gap-4">
                <p className="display nums" style={{ fontSize: "clamp(1.75rem,3vw,2.25rem)" }}>
                  {peso(line.price)}
                </p>
                <span className="data" style={{ color: "var(--mute)" }}>
                  {line.thickness}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-solid data mt-6 w-full"
                // ponytail: no cart yet — wire to your commerce backend.
              >
                Add to bag
                <span className="arw" aria-hidden="true">→</span>
              </button>
              <p className="data mt-4 text-center" style={{ color: "var(--mute)" }}>
                Free nationwide shipping over ₱3,000 · 30-day returns
              </p>
            </div>

            {/* Character bars */}
            <div className="mt-10 space-y-3 max-w-[420px]">
              <SpecBar label="Control" value={line.control} />
              <SpecBar label="Power" value={line.power} delay={0.08} />
              <SpecBar label="Spin" value={line.spin} delay={0.16} />
            </div>

            <div className="mt-12 prose-g4">
              {line.copy.map((para, i) => (
                <p
                  key={i}
                  className={i === 0 ? "lead" : ""}
                  style={i > 0 ? { color: "var(--mute)" } : undefined}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Spec table */}
            <div className="mt-12">
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
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display" style={{ fontSize: "var(--t-sub)" }}>
            The other two
          </h2>
          <Link href="/paddles" className="data link">
            Compare specifications →
          </Link>
        </div>

        <div className="grid12 mt-12 gap-6">
          {others.map((other) => (
            <div key={other.slug} className="col-span-12 sm:col-span-6">
              <Link href={`/paddles/${other.slug}`} className="card block">
                <div className="surface round-xl overflow-hidden p-4">
                  <div className="surface-wash grain relative round overflow-hidden flex items-center justify-center py-14">
                    <Paddle
                      uid={`x-${other.slug}`}
                      art={other.art}
                      elongated={other.slug === "sulong"}
                      label={`${other.name} paddle`}
                      className="card-art w-[34%] max-w-[170px] h-auto"
                    />
                  </div>
                  <div className="pt-5 px-2 pb-2 flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="display text-[1.5rem]">{other.name}</h3>
                      <p className="data mt-2" style={{ color: "var(--mute)" }}>
                        {other.role}
                      </p>
                    </div>
                    <p className="data nums">{peso(other.price)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
