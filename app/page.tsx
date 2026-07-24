import Link from "next/link";
import { Stagger, Item, RiseLine, Reveal } from "@/components/Reveal";
import Court from "@/components/Court";
import Paddle from "@/components/Paddle";
import Photo from "@/components/Photo";
import Marquee from "@/components/Marquee";
import Parallax from "@/components/Parallax";
import Badge from "@/components/Badge";
import Counter from "@/components/Counter";
import Accordion from "@/components/Accordion";
import CTA from "@/components/CTA";
import { LINES, FACTS, PILLARS, TESTIMONIALS, FAQ, peso } from "@/lib/catalog";

export default function Home() {
  const [hero, ...rest] = LINES;

  return (
    <>
      {/* HERO — the one orchestrated entrance, then a wide rounded photo */}
      <section className="relative">
        <div className="shell pt-[clamp(2rem,5vw,4rem)] pb-[var(--section-tight)]">
          <Stagger className="grid12 items-end gap-y-10">
            <div className="col-span-12 lg:col-span-8">
              <Item>
                <Badge>90% of rated play is doubles · DUPR</Badge>
              </Item>
              <h1 className="display mt-7" style={{ fontSize: "var(--t-mega)" }}>
                <RiseLine>Built</RiseLine>
                <RiseLine>
                  for <span className="accent">four</span>
                </RiseLine>
              </h1>
            </div>

            <Item className="col-span-12 lg:col-span-4 lg:pb-3">
              <p className="lead" style={{ maxWidth: "38ch" }}>
                Tennis shrinks its court for singles. Pickleball never has:
                twenty feet by forty-four, the same rectangle either way. The
                game was drawn for four people, and ninety per cent of rated
                play still is.
              </p>
              <p className="lead mt-4" style={{ maxWidth: "38ch", color: "var(--mute)" }}>
                We build for the ninety.
              </p>

              <div className="flex flex-wrap gap-3 mt-9">
                <Link href="/paddles" className="btn btn-solid data">
                  See the paddles
                  <span className="arw" aria-hidden="true">→</span>
                </Link>
                <Link href="/the-four" className="btn btn-ghost data">
                  Read the thesis
                </Link>
              </div>
            </Item>
          </Stagger>
        </div>

        {/* Wide hero frame with floating stat chips */}
        <Reveal className="shell" y={30}>
          <div className="relative">
            <Photo
              seed="court-hero"
              alt="Four players at the kitchen line during a doubles rally on an indoor court"
              ratio="21 / 9"
              rounded="var(--r-xl)"
              label="Helios · Pasig"
              priority
              parallax={0.06}
              w={1920}
              h={840}
              veil
              caption="Placeholder photography · replace with brand-shot court imagery"
            />
            <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 flex flex-wrap gap-3">
              <span className="badge badge-inv data" style={{ color: "var(--paper)" }}>
                <span className="badge-dot" aria-hidden="true" /> 20 × 44 FT · SINGLES AND DOUBLES ALIKE
              </span>
              <span className="badge badge-inv data" style={{ color: "var(--paper)" }}>
                <span className="badge-dot" aria-hidden="true" /> USAP 2026 CONFORMING
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TRUST MARQUEE */}
      <div className="mt-[var(--section-tight)]">
        <p className="shell data mb-5" style={{ color: "var(--mute)" }}>
          Played and stocked across the Philippine game
        </p>
        <Marquee
          items={[
            "HELIOS PICKLEBALL",
            "SM ACTIVE HUB",
            "THE PODIUM COURTS",
            "PHILIPPINE PICKLEBALL FEDERATION",
            "BGC SPORTS CENTRE",
            "CEBU PICKLEBALL CLUB",
            "PPA TOUR ASIA",
          ]}
        />
      </div>

      {/* THESIS + count-up */}
      <section className="shell pt-[var(--section)]">
        <div className="grid12 gap-y-14 items-center">
          <Reveal className="col-span-12 lg:col-span-7">
            <Badge>The thesis</Badge>
            <h2
              className="editorial max-w-[20ch] mt-7"
              style={{ fontSize: "var(--t-head)" }}
            >
              Doubles isn&rsquo;t singles with a partner. It&rsquo;s a different
              sport played on the same rectangle, and it&rsquo;s decided in the
              seven feet either side of the net.
            </h2>
            <div className="grid12 mt-12 gap-y-8 prose-g4">
              <p className="col-span-12 sm:col-span-6" style={{ color: "var(--mute)" }}>
                Most paddle brands are built around the highlight reel: the
                put-away, the overhead, the winner down the line. Those points
                exist. They are the minority of what happens on a court on a
                Tuesday night in Pasig.
              </p>
              <p className="col-span-12 sm:col-span-6" style={{ color: "var(--mute)" }}>
                What actually happens is four people, a soft ball, and a long
                patient exchange in the kitchen where whoever loses their nerve
                first loses the rally. That is the game we build for.
              </p>
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" delay={0.1}>
            <div className="surface-ink grain grain-invert relative round-xl px-8 py-10">
              <p
                className="display leading-[0.8]"
                style={{ fontSize: "clamp(5rem,13vw,9rem)" }}
              >
                <Counter value={90} suffix="%" />
              </p>
              <p className="lead mt-4">
                of all rated pickleball logged worldwide is doubles.
              </p>
              <p className="data mt-8" style={{ color: "var(--mute-inv)" }}>
                Source: DUPR match data
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS — feature bento */}
      <section className="shell pt-[var(--section)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Badge>What we hold to</Badge>
            <h2 className="display mt-6" style={{ fontSize: "var(--t-head)" }}>
              Four rules,
              <br />
              openly kept
            </h2>
          </div>
          <Link href="/the-four" className="data link">
            The full thesis →
          </Link>
        </div>

        <div className="grid12 mt-14 gap-5">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.k}
              delay={i * 0.06}
              className={i === 0 ? "col-span-12 md:col-span-6" : "col-span-12 sm:col-span-6 md:col-span-3"}
            >
              <div className="surface h-full p-7 flex flex-col">
                <p className="data" style={{ color: "var(--mute)" }}>
                  {p.k}
                </p>
                <h3
                  className={`display mt-6 leading-[1.02] ${i === 0 ? "text-[1.9rem]" : "text-[1.3rem]"}`}
                >
                  {p.t}
                </h3>
                <p className="mt-4 text-[0.95rem]" style={{ color: "var(--mute)" }}>
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GEOMETRY — the drawn court, still the brand argument */}
      <section className="shell pt-[var(--section)]">
        <div className="surface-wash grain relative round-xl overflow-hidden p-[clamp(1.5rem,4vw,3.5rem)]">
          <div className="grid12 gap-y-12 items-center">
            <div className="col-span-12 lg:col-span-5">
              <Badge>The geometry</Badge>
              <h2 className="display mt-6" style={{ fontSize: "var(--t-sub)" }}>
                What a fourth player does to a court
              </h2>
              <div className="mt-10 flex flex-col gap-8">
                {[
                  ["440", "sq ft each", "In singles one player covers 880 square feet. In doubles each covers 440: less ground, less running, more standing still at the net. Doubles is a hands game, not a legs game."],
                  ["7", "ft, both sides", "The non-volley zone removes 280 square feet, thirty-two per cent of the court, from volley play. Four players crowding that line is the defining picture of the sport."],
                  ["0.43", "PBCoR ceiling", "USA Pickleball dropped the power limit from 0.44 to 0.43 in November 2025 and banned spin treatments in 2024. The sport is being legislated toward control. We were already there."],
                ].map(([n, u, d]) => (
                  <div key={n} className="flex gap-6">
                    <div className="shrink-0 w-[5.5rem]">
                      <p className="display nums" style={{ fontSize: "clamp(2rem,4vw,2.75rem)" }}>
                        {n}
                      </p>
                      <p className="data mt-2" style={{ color: "var(--mute)" }}>
                        {u}
                      </p>
                    </div>
                    <p className="text-[0.95rem] pt-1" style={{ color: "var(--mute)" }}>
                      {d}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <Parallax speed={0.05}>
                <Court uid="home" draw className="w-full h-auto" />
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      {/* THE RANGE */}
      <section className="shell pt-[var(--section)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Badge>The range</Badge>
            <h2 className="display mt-6" style={{ fontSize: "var(--t-head)" }}>
              Three paddles.
              <br />
              One argument.
            </h2>
          </div>
          <Link href="/paddles" className="data link">
            Compare all specifications →
          </Link>
        </div>

        <div className="grid12 mt-14 gap-6">
          {/* Hero product */}
          <Reveal className="col-span-12 lg:col-span-7">
            <Link href={`/paddles/${hero.slug}`} className="card block group">
              <div className="surface-wash grain relative round-xl overflow-hidden flex items-center justify-center py-16 px-8">
                <span className="badge data absolute top-5 left-5" style={{ color: "var(--mute)" }}>
                  <span className="badge-dot" aria-hidden="true" /> {hero.role}
                </span>
                <Paddle
                  uid={hero.slug}
                  art={hero.art}
                  label={`${hero.name} paddle`}
                  className="card-art w-[44%] max-w-[300px] h-auto"
                />
              </div>
              <div className="pt-7 flex flex-wrap items-start justify-between gap-6">
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
          </Reveal>

          {/* Supporting products */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {rest.map((line, i) => (
              <Reveal key={line.slug} delay={0.06 + i * 0.06}>
                <Link href={`/paddles/${line.slug}`} className="card block">
                  <div className="surface flex items-center gap-6 p-5 pr-7">
                    <div className="surface-wash grain relative round overflow-hidden flex items-center justify-center w-[38%] max-w-[170px] py-8 shrink-0">
                      <Paddle
                        uid={line.slug}
                        art={line.art}
                        elongated={line.slug === "sulong"}
                        label={`${line.name} paddle`}
                        className="card-art w-[62%] max-w-[110px] h-auto"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="display text-[1.6rem]">{line.name}</h3>
                        <p className="data nums">{peso(line.price)}</p>
                      </div>
                      <p className="data mt-2" style={{ color: "var(--mute)", letterSpacing: "0.08em" }}>
                        {line.role}
                      </p>
                      <p className="mt-3 text-[0.95rem]" style={{ color: "var(--mute)" }}>
                        {line.blurb}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="shell pt-[var(--section)]">
        <Reveal>
          <div className="grid12 gap-y-10 surface round-xl p-[clamp(1.5rem,4vw,3rem)]">
            {FACTS.map((fact, i) => (
              <div
                key={fact.figure}
                className={`col-span-6 lg:col-span-3 ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}
                style={{ borderColor: "var(--rule)" }}
              >
                <p className="display nums" style={{ fontSize: "clamp(2.25rem,4.5vw,3.5rem)" }}>
                  {fact.figure === "90%" ? (
                    <Counter value={90} suffix="%" />
                  ) : fact.figure === "277" ? (
                    <Counter value={277} />
                  ) : fact.figure === "86" ? (
                    <Counter value={86} />
                  ) : (
                    fact.figure
                  )}
                </p>
                <p className="mt-3 text-[0.95rem]">{fact.label}</p>
                <p className="data mt-4" style={{ color: "var(--mute)" }}>
                  {fact.source}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="shell pt-[var(--section)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Badge>From the kitchen line</Badge>
            <h2 className="display mt-6" style={{ fontSize: "var(--t-head)" }}>
              Played, not
              <br />
              posed
            </h2>
          </div>
          <p className="data max-w-[26ch]" style={{ color: "var(--mute)" }}>
            Placeholder voices · replace with real, permissioned player quotes
          </p>
        </div>

        <div className="grid12 mt-14 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07} className="col-span-12 md:col-span-4">
              <figure className="surface h-full p-7 flex flex-col">
                <p className="editorial text-[1.35rem] leading-[1.28]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <figcaption className="mt-8 pt-6 flex items-center gap-4" style={{ borderTop: "1px solid var(--rule)" }}>
                  <span className="photo round-xl shrink-0" style={{ width: 48, height: 48, borderRadius: "var(--r-pill)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/g4-${t.seed}/96/96?grayscale`}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                  </span>
                  <span>
                    <span className="block font-[700] tracking-[-0.015em] leading-tight">{t.name}</span>
                    <span className="data block mt-1" style={{ color: "var(--mute)" }}>
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORY strip */}
      <section className="shell pt-[var(--section)]">
        <div className="grid12 gap-y-10 items-center">
          <Reveal className="col-span-12 lg:col-span-6">
            <Photo
              seed="cebu-gym"
              alt="An indoor court set up for open play in a converted gym"
              ratio="4 / 3"
              rounded="var(--r-xl)"
              label="Cebu · 2016"
              parallax={0.1}
            />
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8" delay={0.08}>
            <Badge>Ten years</Badge>
            <h2 className="display mt-6" style={{ fontSize: "var(--t-head)" }}>
              It started in a Cebu gym in 2016
            </h2>
            <p className="lead mt-7" style={{ maxWidth: "44ch", color: "var(--mute)" }}>
              One clinic in February. Street games in Ortigas by 2018. A
              federation by 2019, Olympic Committee recognition in 2024, a
              national championship in Marikina by 2025. This happened fast, and
              it happened here.
            </p>
            <Link href="/the-four" className="btn btn-ghost data mt-9">
              Read the ten-year story
              <span className="arw" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell pt-[var(--section)]">
        <div className="grid12 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <Badge>Questions</Badge>
            <h2 className="display mt-6" style={{ fontSize: "var(--t-head)" }}>
              The spec
              <br />
              answers back
            </h2>
            <p className="mt-6" style={{ color: "var(--mute)", maxWidth: "34ch" }}>
              Everything a specification-forward brand should be willing to say
              out loud, before you buy.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <Accordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Hold one before you buy"
        body="Three paddles built for the game Filipinos actually play. Full specification on every card, priced openly in pesos, warranted for two years."
        primary={{ href: "/paddles", label: "See the paddles" }}
        secondary={{ href: "/stockists", label: "Find a stockist" }}
      />
    </>
  );
}
