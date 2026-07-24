import type { Metadata } from "next";
import Court from "@/components/Court";
import Parallax from "@/components/Parallax";
import Photo from "@/components/Photo";
import Badge from "@/components/Badge";
import { Stagger, RiseLine, Reveal } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CTA from "@/components/CTA";
import { PILLARS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The Four",
  description:
    "Why Greater4 exists: the court never shrinks for singles, 90% of rated play is doubles, and nobody was building equipment for the game Filipinos actually play.",
};

const TIMELINE = [
  ["Feb 2016", "The first pickleball clinic in the country runs in Cebu."],
  ["2018", "Street games take hold in Ortigas. No federation, no sanctioning, just courts drawn on whatever was flat."],
  ["Apr 2019", "The Philippine Pickleball Federation is founded."],
  ["2023", "The Philippines becomes a founding Class-A member of the Global Pickleball Federation, with full voting rights."],
  ["May 2024", "The Philippine Olympic Committee recognises the PPF as the National Sports Association."],
  ["Jun 2025", "The first national championship is held in Marikina. The Philippine team wins Season 1 of the Pickleball Champions League Asia in Shenzhen."],
  ["Oct 2025", "277 member clubs. 18,000 registered players. Over 100,000 on the booking apps."],
  ["2026", "86 courts across 29 SM malls. 25 pro-grade courts at Helios in Pasig. PPA Tour Asia signs to bring a stop here from 2027."],
];

export default function TheFourPage() {
  return (
    <>
      <section className="shell pt-[clamp(2rem,5vw,4rem)]">
        <Stagger>
          <Badge>The thesis</Badge>
          <h1 className="display mt-7" style={{ fontSize: "var(--t-display)" }}>
            <RiseLine>The court never</RiseLine>
            <RiseLine>gets smaller</RiseLine>
          </h1>
        </Stagger>

        <div className="grid12 mt-14 gap-y-12 items-start">
          <div className="col-span-12 lg:col-span-6 prose-g4">
            <p className="lead">
              A tennis court shrinks for singles. The alleys go dead, the space
              narrows, the sport adjusts itself to two people. Pickleball has
              never done this. Twenty feet by forty-four, the same rectangle,
              whether there are two of you on it or four.
            </p>
            <p style={{ color: "var(--mute)" }}>
              That is not an oversight. It is the clearest statement of intent
              in the rulebook. The game was drawn in 1965 on a badminton court
              for a group of families, and every dimension in it assumes company.
            </p>
            <p style={{ color: "var(--mute)" }}>
              Ninety per cent of all rated pickleball logged worldwide is
              doubles. Not sixty. Not a comfortable majority. Ninety. And yet
              almost every paddle sold in this country is marketed on a singles
              highlight reel, by a brand that has never said the word
              &ldquo;partner&rdquo; out loud.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="surface-wash grain relative round-xl p-6">
              <Parallax speed={0.05}>
                <Court uid="thefour" draw className="w-full h-auto" />
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-[var(--section)]">
        <Marquee
          items={[
            "FOUR PLAYERS",
            "ONE RECTANGLE",
            "TWENTY BY FORTY-FOUR",
            "SEVEN FEET EITHER SIDE",
          ]}
          dark
        />
      </div>

      {/* The gap */}
      <section id="gap" className="shell pt-[var(--section)] scroll-mt-28">
        <div className="grid12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <Badge>The gap</Badge>
            <h2 className="editorial mt-7" style={{ fontSize: "var(--t-head)" }}>
              We didn&rsquo;t start this because the market needed another
              paddle. We started it because we kept buying the wrong ones.
            </h2>
            <div className="mt-8">
              <Photo
                seed="four-workshop"
                alt="A workshop bench with raw carbon paddle faces laid out"
                ratio="4 / 3"
                rounded="var(--r-xl)"
                label="Workshop · Pasig"
                parallax={0.1}
                caption="Placeholder photography · replace with founder and workshop imagery"
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7 prose-g4 lg:pt-16">
            <p style={{ color: "var(--mute)" }}>
              The cheap paddles were honest about being cheap and dishonest
              about everything else: no published core, no face material, a
              weight range wide enough to drive a jeepney through.
            </p>
            <p style={{ color: "var(--mute)" }}>
              The imported paddles were genuinely good and genuinely priced for
              somewhere else. Add freight, add duty, add the distributor, and a
              paddle designed for a retiree in Florida arrives here costing more
              than a month of court fees.
            </p>
            <p style={{ color: "var(--mute)" }}>
              In between there was nothing. No brand willing to publish a full
              specification, price it openly in pesos, and admit that the thing
              it makes is for four people standing at a kitchen line in Pasig on
              a Tuesday night.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="shell pt-[var(--section)]">
        <Badge>What we hold to</Badge>
        <div className="grid12 mt-10 gap-5">
          {PILLARS.map((p, i) => (
            <Reveal key={p.k} delay={(i % 4) * 0.06} className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="surface h-full p-7">
                <p className="data" style={{ color: "var(--mute)" }}>
                  {p.k}
                </p>
                <h3 className="display text-[1.35rem] mt-6 leading-[1.05]">{p.t}</h3>
                <p className="mt-4 text-[0.95rem]" style={{ color: "var(--mute)" }}>
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="shell pt-[var(--section)]">
        <div
          className="surface-ink grain grain-invert relative round-2xl overflow-hidden px-[clamp(1.5rem,4vw,4rem)] py-[clamp(2.5rem,5vw,4.5rem)]"
        >
          <div className="grid12 gap-y-10">
            <div className="col-span-12 lg:col-span-4">
              <Badge inverted>Ten years</Badge>
              <h2 className="display mt-7" style={{ fontSize: "var(--t-head)" }}>
                From one clinic to a federation
              </h2>
            </div>

            <ol className="col-span-12 lg:col-span-7 lg:col-start-6">
              {TIMELINE.map(([year, event], i) => (
                <Reveal
                  key={year}
                  as="li"
                  delay={i * 0.03}
                  className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1 py-5"
                  y={14}
                >
                  <span className="data pt-1" style={{ color: "var(--mute-inv)" }}>
                    {year}
                  </span>
                  <span
                    className="lead"
                    style={{ fontSize: "1.05rem", borderTop: "1px solid var(--rule-inv)", paddingTop: "0.75rem" }}
                  >
                    {event}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>

          <p className="editorial mt-14 max-w-[34ch]" style={{ fontSize: "var(--t-sub)" }}>
            Ten years from a single gym in Cebu to a recognised national sport.
            Someone should be making the equipment here.
          </p>
        </div>
      </section>

      <CTA
        title="Built for the ninety per cent"
        body="Three paddles and a court-wear range for the game Filipinos actually play. Full specification on every card, priced openly in pesos."
        primary={{ href: "/paddles", label: "See the paddles" }}
        secondary={{ href: "/stockists", label: "Find a stockist" }}
      />
    </>
  );
}
