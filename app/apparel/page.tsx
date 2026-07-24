import type { Metadata } from "next";
import Photo from "@/components/Photo";
import Badge from "@/components/Badge";
import { Stagger, Item, RiseLine, Reveal } from "@/components/Reveal";
import CTA from "@/components/CTA";
import { APPAREL, peso } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Court Wear",
  description:
    "Court wear and lifestyle pieces built for 34°C at two in the afternoon on an uncovered court in Metro Manila.",
};

export default function ApparelPage() {
  return (
    <>
      <section className="shell pt-[clamp(2rem,5vw,4rem)]">
        <Stagger className="grid12 gap-y-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Item>
              <Badge>Court wear · SS26</Badge>
            </Item>
            <h1 className="display mt-7" style={{ fontSize: "var(--t-display)" }}>
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

      {/* Editorial pair */}
      <section className="shell mt-[var(--section-tight)]">
        <div className="grid12 gap-6 items-end">
          <Reveal className="col-span-12 md:col-span-8">
            <Photo
              seed="apparel-campaign"
              alt="Two players walking off court, kit bags over shoulders"
              ratio="16 / 10"
              rounded="var(--r-xl)"
              label="Campaign · SS26"
              parallax={0.08}
              w={1600}
              h={1000}
              veil
            >
              <p
                className="data absolute left-6 bottom-6"
                style={{ color: "var(--paper)" }}
              >
                34°C · 2PM · UNCOVERED COURT
              </p>
            </Photo>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-4" delay={0.08}>
            <Photo
              seed="apparel-detail"
              alt="Detail of a heavyweight court tee with a screen-printed hem"
              ratio="4 / 5"
              rounded="var(--r-xl)"
              label="Court wear"
              parallax={0.14}
              caption="Placeholder photography · replace with campaign imagery"
            />
          </Reveal>
        </div>
      </section>

      {/* Range grid */}
      <section className="shell mt-[var(--section)]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Badge>The range</Badge>
            <h2 className="display mt-6" style={{ fontSize: "var(--t-head)" }}>
              Six pieces
            </h2>
          </div>
          <p className="data" style={{ color: "var(--mute)" }}>
            {APPAREL.length} pieces · SS26
          </p>
        </div>

        <div className="grid12 mt-14 gap-6">
          {APPAREL.map((item, i) => (
            <Reveal
              key={item.slug}
              delay={(i % 3) * 0.06}
              className={
                i === 0
                  ? "col-span-12 md:col-span-8"
                  : "col-span-12 sm:col-span-6 md:col-span-4"
              }
            >
              <article className="card block">
                <div className="surface round-xl overflow-hidden">
                  <Photo
                    seed={`apparel-${item.slug}`}
                    alt={`${item.name} — ${item.blurb}`}
                    ratio={i === 0 ? "16 / 11" : "4 / 5"}
                    rounded="0"
                    label={item.index}
                    parallax={i % 2 ? 0.1 : 0.06}
                    className="card-art block"
                  />
                  <div className="p-6">
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
                    <p className="mt-4 text-[0.95rem]" style={{ color: "var(--mute)" }}>
                      {item.blurb}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fit statement */}
      <section className="shell mt-[var(--section)]">
        <Reveal className="surface-wash grain relative round-xl p-[clamp(1.75rem,5vw,4rem)]">
          <Badge>The fit</Badge>
          <p className="editorial max-w-[26ch] mt-7" style={{ fontSize: "var(--t-sub)" }}>
            Cut for Filipino bodies, then graded up, not the other way round. If
            the fit is wrong: thirty days, no argument.
          </p>
        </Reveal>
      </section>

      <CTA
        eyebrow="On and off court"
        title="Kit for the whole session"
        body="The hour before, the two hours on court at thirty-four degrees, and the hour after. Cut for the climate you actually play in."
        primary={{ href: "/stockists", label: "Find a stockist" }}
        secondary={{ href: "/paddles", label: "See the paddles" }}
      />
    </>
  );
}
