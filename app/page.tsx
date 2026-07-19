import Link from "next/link";
import { Stagger, Item, RiseLine } from "@/components/Reveal";
import Court from "@/components/Court";
import Paddle from "@/components/Paddle";
import Placeholder from "@/components/Placeholder";
import Marquee from "@/components/Marquee";
import Parallax from "@/components/Parallax";
import { LINES, FACTS, peso } from "@/lib/catalog";

/**
 * Section rhythm is deliberately uneven — the geometry block runs tight
 * against the thesis, the range gets room, the scene closes wide. Uniform
 * section padding is what makes a page read as generated.
 */
export default function Home() {
  const [hero, ...rest] = LINES;

  return (
    <>
      {/* HERO — the one orchestrated entrance on the page */}
      <section className="relative grain">
        <div className="shell pt-[clamp(2.5rem,6vw,5rem)] pb-[var(--section-tight)]">
          <Stagger className="grid12 items-end gap-y-10">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="display" style={{ fontSize: "var(--t-mega)" }}>
                <RiseLine>Built</RiseLine>
                <RiseLine>
                  for <span className="accent">four</span>
                </RiseLine>
              </h1>
            </div>

            <Item className="col-span-12 lg:col-span-4 lg:pb-4">
              <p className="lead" style={{ maxWidth: "38ch" }}>
                Tennis shrinks its court for singles. Pickleball never has:
                twenty feet by forty-four, the same rectangle either way. The
                game was drawn for four people, and ninety per cent of rated
                play still is.
              </p>
              <p className="lead mt-5" style={{ maxWidth: "38ch" }}>
                We build for the ninety.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link href="/paddles" className="btn btn-solid data">
                  See the paddles
                </Link>
                <Link href="/the-four" className="btn data">
                  Read the thesis
                </Link>
              </div>
            </Item>
          </Stagger>
        </div>

        {/* The argument, drawn */}
        <div className="shell pb-[var(--section-tight)]">
          <div className="border-t pt-10" style={{ borderColor: "var(--rule)" }}>
            <Parallax speed={0.05}>
              <Court uid="home" draw className="w-full h-auto max-h-[52vh]" />
            </Parallax>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "20 × 44 FT · SINGLES AND DOUBLES ALIKE",
          "USAP 2026 CONFORMING",
          "TORAY T700 RAW CARBON",
          "DESIGNED IN PASIG",
          "90% OF RATED PLAY IS DOUBLES",
        ]}
      />

      {/* THESIS */}
      <section className="shell pt-[var(--section)]">
        <h2
          className="editorial max-w-[22ch]"
          style={{ fontSize: "var(--t-head)" }}
        >
          Doubles isn&rsquo;t singles with a partner. It&rsquo;s a different
          sport played on the same rectangle, and it&rsquo;s decided in the
          seven feet either side of the net.
        </h2>

        <div className="grid12 mt-16 gap-y-10">
          <div className="col-span-12 sm:col-span-7 lg:col-span-5 prose-g4">
            <p>
              Most paddle brands are built around the highlight reel: the
              put-away, the overhead, the winner down the line. Those points
              exist. They are also the minority of what happens on a court on a
              Tuesday night in Pasig.
            </p>
            <p>
              What actually happens is four people, a soft ball, and a long
              patient exchange in the kitchen where whoever loses their nerve
              first loses the rally. That is the game we build equipment for.
            </p>
          </div>

          <div className="col-span-12 lg:col-start-8 lg:col-span-5">
            <div className="border-t pt-6" style={{ borderColor: "var(--ink)" }}>
              <p
                className="display nums leading-[0.8]"
                style={{ fontSize: "clamp(5rem,14vw,11rem)" }}
              >
                90%
              </p>
              <p className="lead mt-4">
                of all rated pickleball logged worldwide is doubles.
              </p>
              <p className="data mt-6" style={{ color: "var(--mute)" }}>
                Source: DUPR match data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GEOMETRY — deliberately staggered, not three equal columns */}
      <section className="shell pt-[var(--section-tight)]">
        <h2
          className="display mt-16"
          style={{ fontSize: "var(--t-head)" }}
        >
          What a fourth player
          <br />
          does to a court
        </h2>

        <div className="grid12 mt-16 gap-y-14">
          <div className="col-span-12 md:col-span-6">
            <div
              className="border-t pt-6 md:pr-10"
              style={{ borderColor: "var(--ink)" }}
            >
              <p
                className="display nums"
                style={{ fontSize: "clamp(3.5rem,9vw,7rem)" }}
              >
                440
              </p>
              <p className="data mt-3" style={{ color: "var(--mute)" }}>
                square feet each
              </p>
              <h3 className="mt-8 text-[1.5rem] font-[700] tracking-[-0.02em]">
                The court halves
              </h3>
              <p className="mt-3 max-w-[46ch]" style={{ color: "var(--mute)" }}>
                In singles one player covers 880 square feet. In doubles each
                covers 440. Less ground means less running and more standing
                still at the net, which is why doubles is a hands game rather
                than a legs game.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8 md:mt-24 flex flex-col gap-14">
            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--rule-strong)" }}
            >
              <p className="display nums" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)" }}>
                7
              </p>
              <p className="data mt-3" style={{ color: "var(--mute)" }}>
                feet, both sides
              </p>
              <h3 className="mt-6 text-[1.25rem] font-[700] tracking-[-0.02em]">
                The kitchen dominates
              </h3>
              <p className="mt-3" style={{ color: "var(--mute)" }}>
                The non-volley zone removes 280 square feet (thirty-two per
                cent of the court) from volley play. Four players crowding that
                line is the defining picture of the sport, and the reason touch
                beats power.
              </p>
            </div>

            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--rule-strong)" }}
            >
              <p className="display nums" style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)" }}>
                0.43
              </p>
              <p className="data mt-3" style={{ color: "var(--mute)" }}>
                PBCoR ceiling
              </p>
              <h3 className="mt-6 text-[1.25rem] font-[700] tracking-[-0.02em]">
                The rules agree
              </h3>
              <p className="mt-3" style={{ color: "var(--mute)" }}>
                USA Pickleball dropped the power limit from 0.44 to 0.43 in
                November 2025, and banned spin-enhancing surface treatments in
                2024. The sport is being legislated toward control. We were
                already there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE RANGE */}
      <section className="shell pt-[var(--section)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display" style={{ fontSize: "var(--t-head)" }}>
            Three paddles.
            <br />
            One argument.
          </h2>
          <Link href="/paddles" className="data link">
            Compare all specifications →
          </Link>
        </div>

        <div className="grid12 mt-16 gap-y-16">
          {/* Hero product — 2× scale, breaking the uniform grid */}
          <div className="col-span-12 lg:col-span-7">
            <Link href={`/paddles/${hero.slug}`} className="card block">
              <div
                className="relative grain flex items-center justify-center py-16 px-8"
                style={{ background: "var(--wash)" }}
              >
                <span
                  className="data absolute top-5 left-5"
                  style={{ color: "var(--mute)" }}
                >
                  {hero.role}
                </span>
                <Paddle
                  uid={hero.slug}
                  art={hero.art}
                  label={`${hero.name} paddle`}
                  className="card-art w-[46%] max-w-[300px] h-auto"
                />
              </div>

              <div className="pt-7 pb-8 flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-[46ch]">
                  <h3 className="display" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                    {hero.name}
                  </h3>
                  <p className="mt-3" style={{ color: "var(--mute)" }}>
                    {hero.blurb}
                  </p>
                </div>
                <p className="data nums whitespace-nowrap">{peso(hero.price)}</p>
              </div>
            </Link>
          </div>

          {/* Supporting products */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col gap-14">
            {rest.map((line) => (
              <Link
                key={line.slug}
                href={`/paddles/${line.slug}`}
                className="card block"
              >
                <div
                  className="relative grain flex items-center justify-center py-10 px-6"
                  style={{ background: "var(--wash)" }}
                >
                  <Paddle
                    uid={line.slug}
                    art={line.art}
                    elongated={line.slug === "sulong"}
                    label={`${line.name} paddle`}
                    className="card-art w-[38%] max-w-[160px] h-auto"
                  />
                </div>
                <div className="pt-5 pb-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-[1.6rem]">{line.name}</h3>
                    <p className="data nums">{peso(line.price)}</p>
                  </div>
                  <p
                    className="data mt-2"
                    style={{ color: "var(--mute)", letterSpacing: "0.08em" }}
                  >
                    {line.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POSITION — inverted */}
      <section className="mt-[var(--section)] relative grain grain-invert"
        style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="shell py-[var(--section)]">
          <h2
            className="editorial max-w-[24ch]"
            style={{ fontSize: "var(--t-head)" }}
          >
            There is no shortage of paddles in this country. There is a shortage
            of paddles that admit what they are for.
          </h2>

          <div className="grid12 mt-14 gap-y-10">
            <div className="col-span-12 lg:col-span-6 prose-g4">
              <p style={{ color: "var(--mute-inv)" }}>
                The cheap end sells on price and stops there. The imported end
                sells on a professional&rsquo;s name and a singles highlight
                reel, then charges you a landed cost for the privilege. Both are
                selling a game most Filipinos will never play.
              </p>
              <p style={{ color: "var(--mute-inv)" }}>
                We&rsquo;re not interested in being the affordable option;
                that&rsquo;s a ceiling, not a position. We&rsquo;re interested
                in being the correct one.
              </p>
            </div>

            <div className="col-span-12 lg:col-start-8 lg:col-span-5">
              <ul>
                {[
                  [
                    "We publish every specification",
                    "Core, face, weight, handle, shape. On the card, not buried in a tab.",
                  ],
                  [
                    "We do not paint the face",
                    "Paint fills the weave and kills spin. Raw T700 or nothing.",
                  ],
                  [
                    "We price in pesos, openly",
                    "No enquire-for-price. No landed-cost theatre.",
                  ],
                  ["We build for the kitchen", "Not for the highlight reel."],
                ].map(([t, d]) => (
                  <li
                    key={t}
                    className="py-5 border-t last:border-b"
                    style={{ borderColor: "var(--rule-inv)" }}
                  >
                    <p className="font-[700] tracking-[-0.015em]">{t}</p>
                    <p
                      className="mt-1 text-[0.95rem]"
                      style={{ color: "var(--mute-inv)" }}
                    >
                      {d}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/the-four" className="btn btn-inv data mt-14">
            The full thesis
          </Link>
        </div>
      </section>

      {/* THE SCENE */}
      <section className="shell pt-[var(--section)]">
        <div className="grid12 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display" style={{ fontSize: "var(--t-head)" }}>
              It started in a Cebu
              <br />
              gym in 2016
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:pb-3">
            <p className="lead" style={{ maxWidth: "46ch" }}>
              One clinic in February. Street games in Ortigas by 2018. A
              federation by 2019, Olympic Committee recognition in 2024, and a
              national championship in Marikina by 2025. This happened fast, and
              it happened here.
            </p>
          </div>
        </div>

        <div className="grid12 mt-16 gap-y-10">
          <div className="col-span-12 md:col-span-7">
            <Placeholder
              uid="scene-1"
              variant={3}
              ratio="16 / 10"
              parallax={0.1}
              label="Court · Pasig"
              caption="Placeholder · replace with location photography"
            />
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col justify-end">
            <Placeholder
              uid="scene-2"
              variant={2}
              ratio="4 / 5"
              label="Players"
              parallax={0.16}
              dark
            />
          </div>
        </div>

        {/* Verified figures */}
        <div className="grid12 gap-y-8 mt-20">
          {FACTS.map((fact) => (
            <div
              key={fact.figure}
              className="col-span-6 lg:col-span-3 border-t pt-5"
              style={{ borderColor: "var(--rule-strong)" }}
            >
              <p
                className="display nums"
                style={{ fontSize: "clamp(2rem,4vw,3.25rem)" }}
              >
                {fact.figure}
              </p>
              <p className="mt-3 text-[0.95rem]">{fact.label}</p>
              <p className="data mt-4" style={{ color: "var(--mute)" }}>
                {fact.source}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TERMS */}
      <section className="shell pt-[var(--section-tight)]">
        <ul
          className="grid12 gap-y-8 border-t pt-8 mt-10"
          style={{ borderColor: "var(--ink)" }}
        >
          {[
            ["Two-year warranty", "Against core delamination and face separation."],
            ["Free nationwide shipping", "On orders over ₱3,000, Luzon to Mindanao."],
            ["Thirty-day returns", "Play with it. If it&rsquo;s wrong, send it back."],
          ].map(([t, d]) => (
            <li key={t} className="col-span-12 sm:col-span-4">
              <p className="data">{t}</p>
              <p className="mt-3" style={{ color: "var(--mute)" }}>
                {d}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
