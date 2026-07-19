import type { Metadata } from "next";
import Link from "next/link";
import Court from "@/components/Court";
import Parallax from "@/components/Parallax";
import { Stagger, RiseLine } from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import Marquee from "@/components/Marquee";

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
      <section className="shell pt-[clamp(2.5rem,6vw,5rem)]">
        <Stagger>
          <h1 className="display" style={{ fontSize: "var(--t-display)" }}>
            <RiseLine>The court never</RiseLine>
            <RiseLine>gets smaller</RiseLine>
          </h1>
        </Stagger>

        <div className="grid12 mt-16 gap-y-10">
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
            <Parallax speed={0.05}>
              <Court uid="thefour" draw className="w-full h-auto" />
            </Parallax>
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

      {/* The gap — the section every competitor skips */}
      <section id="gap" className="shell pt-[var(--section)] scroll-mt-24">
        <div className="grid12 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <p className="data" style={{ color: "var(--mute)" }}>
              The gap
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="editorial" style={{ fontSize: "var(--t-head)" }}>
              We did not start this because the market needed another paddle. We
              started it because we kept buying the wrong ones.
            </h2>

            <div className="grid12 mt-14 gap-y-10">
              <div className="col-span-12 lg:col-span-6 prose-g4">
                <p style={{ color: "var(--mute)" }}>
                  The cheap paddles were honest about being cheap and dishonest
                  about everything else: no published core, no face material,
                  a weight range wide enough to drive a jeepney through.
                </p>
                <p style={{ color: "var(--mute)" }}>
                  The imported paddles were genuinely good and genuinely priced
                  for somewhere else. Add freight, add duty, add the distributor,
                  and a paddle designed for a retiree in Florida arrives here
                  costing more than a month of court fees.
                </p>
                <p style={{ color: "var(--mute)" }}>
                  In between there was nothing. No brand willing to publish a
                  full specification, price it openly in pesos, and admit that
                  the thing it makes is for four people standing at a kitchen
                  line in Pasig on a Tuesday night.
                </p>
              </div>

              <div className="col-span-12 lg:col-start-8 lg:col-span-5">
                <Placeholder
                  uid="four-workshop"
                  variant={1}
                  ratio="4 / 5"
                  parallax={0.13}
                  label="Workshop · Pasig"
                  caption="Placeholder · replace with founder and workshop photography"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="shell pt-[var(--section)]">
        <div>
          <div className="border-t pt-10" style={{ borderColor: "var(--ink)" }}>
            <p className="data mb-6" style={{ color: "var(--mute)" }}>
              What we hold to
            </p>
          </div>
        </div>

        <div className="grid12 mt-4">
          {[
            {
              n: "01",
              t: "The specification is the marketing",
              d: "Core, face, weight, handle, shape, conformance, published on the card, before you buy, on every model. A brand that hides its specification is telling you something about its specification.",
            },
            {
              n: "02",
              t: "Raw face, always",
              d: "Paint fills the weave of a carbon face and flattens the friction that makes spin. It photographs beautifully and it plays worse. We leave the T700 bare and let the paddle look like what it is.",
            },
            {
              n: "03",
              t: "Control over power",
              d: "USA Pickleball has cut the power ceiling twice since 2024 and outlawed grit treatments outright. The sport is legislating its way toward the soft game. Building for power now is building for a rulebook that is already gone.",
            },
            {
              n: "04",
              t: "Priced here, for here",
              d: "In pesos, on the page, no enquiry form. We would rather lose a sale to sticker shock than win one through ambiguity.",
            },
          ].map((p) => (
            <div
              key={p.n}
              className="col-span-12 md:col-span-6 lg:col-span-3"
            >
              <div
                className="border-t pt-6 pb-10 md:pr-8 h-full"
                style={{ borderColor: "var(--rule)" }}
              >
                <p className="data" style={{ color: "var(--mute)" }}>
                  {p.n}
                </p>
                <h3 className="display text-[1.35rem] mt-6 leading-[1.05]">{p.t}</h3>
                <p className="mt-4 text-[0.95rem]" style={{ color: "var(--mute)" }}>
                  {p.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mt-[var(--section)] relative grain grain-invert"
        style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="shell py-[var(--section)]">
          <div className="grid12 gap-y-10">
            <div className="col-span-12 md:col-span-3">
              <p className="data" style={{ color: "var(--mute-inv)" }}>
                Ten years
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="display" style={{ fontSize: "var(--t-head)" }}>
                From one clinic
                <br />
                to a federation
              </h2>
            </div>
          </div>

          <div className="mt-16">
            <ol>
              {TIMELINE.map(([year, event]) => (
                <li
                  key={year}
                  className="grid12 gap-y-2 py-6 border-t"
                  style={{ borderColor: "var(--rule-inv)" }}
                >
                  <p className="col-span-12 md:col-span-3 data" style={{ color: "var(--mute-inv)" }}>
                    {year}
                  </p>
                  <p className="col-span-12 md:col-span-9 lead" style={{ fontSize: "1.05rem" }}>
                    {event}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16">
            <p className="editorial" style={{ fontSize: "var(--t-sub)", maxWidth: "34ch" }}>
              Ten years from a single gym in Cebu to a recognised national sport.
              Someone should be making the equipment here.
            </p>
            <Link href="/paddles" className="btn btn-inv data mt-10">
              See the paddles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
