import type { Metadata } from "next";
import Placeholder from "@/components/Placeholder";
import { Stagger, Item, RiseLine } from "@/components/Reveal";
import { APPAREL, peso } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Court Wear",
  description:
    "Court wear and lifestyle pieces built for 34°C at two in the afternoon on an uncovered court in Metro Manila.",
};

const VARIANTS = [1, 2, 3, 4, 2, 1] as const;

export default function ApparelPage() {
  return (
    <>
      <section className="shell pt-[clamp(2.5rem,6vw,5rem)]">
        <Stagger className="grid12 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="display" style={{ fontSize: "var(--t-display)" }}>
              <RiseLine>Dressed for</RiseLine>
              <RiseLine>
                <span className="accent">thirty-four</span> degrees
              </RiseLine>
            </h1>
          </div>
          <Item className="col-span-12 lg:col-span-4">
            <p className="lead" style={{ maxWidth: "36ch" }}>
              Most performance apparel is designed for temperate autumn. Ours is
              designed for two in the afternoon on an uncovered court in Metro
              Manila, which is a different problem entirely.
            </p>
          </Item>
        </Stagger>
      </section>

      {/* Editorial pair — offset, not a banner. The placeholder compositions
          are built on a 4:5 canvas and fall apart when cropped ultrawide. */}
      <div className="shell mt-[var(--section-tight)]">
        <div className="grid12 gap-y-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <Placeholder
              uid="apparel-lead"
              variant={3}
              ratio="4 / 3"
              parallax={0.09}
              label="Campaign · SS26"
              dark
            />
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <Placeholder
              uid="apparel-lead-2"
              variant={1}
              ratio="4 / 5"
              parallax={0.15}
              label="Court wear"
              caption="Placeholder · replace with campaign photography"
            />
          </div>
        </div>
      </div>

      <section className="shell mt-[var(--section)]">
        <div>
          <div
            className="border-t pt-8 flex items-end justify-between gap-6"
            style={{ borderColor: "var(--ink)" }}
          >
            <h2 className="display" style={{ fontSize: "var(--t-sub)" }}>
              The range
            </h2>
            <p className="data" style={{ color: "var(--mute)" }}>
              {APPAREL.length} pieces
            </p>
          </div>
        </div>

        <div className="grid12 mt-14 gap-y-16">
          {APPAREL.map((item, i) => (
            <div
              key={item.slug}
              /* Deliberately uneven: the first piece runs wide, the rest sit
                 in a 4-col rhythm. Uniform grids are the category default. */
              className={
                i === 0
                  ? "col-span-12 md:col-span-8"
                  : "col-span-12 sm:col-span-6 md:col-span-4"
              }
            >
              <article className="card block">
                <Placeholder
                  uid={`ap-${item.slug}`}
                  variant={VARIANTS[i]}
                  ratio={i === 0 ? "16 / 11" : "4 / 5"}
                  label={item.index}
                  parallax={i % 2 ? 0.12 : 0.07}
                  className="card-art"
                />
                <div className="pt-6 pb-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-[1.4rem]">{item.name}</h3>
                    <p className="data whitespace-nowrap">{peso(item.price)}</p>
                  </div>
                  <p
                    className="data mt-2"
                    style={{ color: "var(--mute)", letterSpacing: "0.08em" }}
                  >
                    {item.variant}
                  </p>
                  {/* One line of copy per card — the competition ships none */}
                  <p className="mt-4 text-[0.95rem]" style={{ color: "var(--mute)" }}>
                    {item.blurb}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="shell mt-[var(--section)]">
        <div className="border-t pt-10" style={{ borderColor: "var(--rule)" }}>
          <p className="editorial max-w-[28ch]" style={{ fontSize: "var(--t-sub)" }}>
            Cut for Filipino bodies, then graded up, not the other way round.
            If the fit is wrong: thirty days, no argument.
          </p>
        </div>
      </section>
    </>
  );
}
