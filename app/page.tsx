import Link from "next/link";
import { Stagger, Item, RiseLine, Reveal } from "@/components/Reveal";
import Court from "@/components/Court";
import PaddleShot from "@/components/PaddleShot";
import Photo from "@/components/Photo";
import HeroFlight from "@/components/HeroFlight";
import Marquee from "@/components/Marquee";
import Badge from "@/components/Badge";
import Counter from "@/components/Counter";
import Accordion from "@/components/Accordion";
import CTA from "@/components/CTA";
import { LINES, FACTS, PARTNERS, PILLARS, TESTIMONIALS, FAQ, SITE, peso } from "@/lib/catalog";

/**
 * Bento placement for the four pillars. Card 01 runs two rows deep on the
 * left; 02 takes the top right, 03 and 04 split the row underneath it. Every
 * cell of the 12-column grid is occupied at every breakpoint.
 */
const BENTO = [
  "col-span-12 md:col-span-6 md:row-span-2",
  "col-span-12 md:col-span-6",
  "col-span-12 sm:col-span-6 md:col-span-3",
  "col-span-12 sm:col-span-6 md:col-span-3",
];

/**
 * Home structured data. The FAQ is the highest-value node: answer engines
 * (Google AI Overviews, Perplexity, ChatGPT) lift Question/Answer pairs
 * verbatim, and the copy already answers them on the page — this just marks
 * it machine-readable. The WebSite node ties the site to the Organization in
 * app/layout.tsx so the brand resolves as one entity across the graph.
 */
const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Greater4",
      inLanguage: "en-PH",
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  const [hero, ...rest] = LINES;

  return (
    <>
      <script
        type="application/ld+json"
        // Static, catalog-derived — nothing user-supplied.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_SCHEMA) }}
      />
      {/* HERO — the one orchestrated entrance, then a wide rounded photo */}
      <section className="relative">
        <div className="shell pt-[clamp(2rem,5vw,4rem)] pb-[var(--section-tight)]">
          <Stagger className="grid12 items-end gap-y-10">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="display" style={{ fontSize: "var(--t-mega)" }}>
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

        {/* The hero flight: one continuous forward take through a covered
            Philippine court, scrubbed by scroll. Replaces the hero photo frame
            and its parallax (DECISIONS.md 2026-07-25). The poster is the SSR,
            no-JS, and reduced-motion render. */}
        <div className="shell">
          <HeroFlight
            clips={["/flight/leg0.mp4", "/flight/leg1.mp4", "/flight/leg2.mp4"]}
            poster="/flight/poster.webp"
            alt="A covered Philippine community court in late afternoon, four players rallying at the kitchen line"
          >
            <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 flex flex-wrap gap-3">
              <span className="badge badge-inv data" style={{ color: "var(--paper)" }}>
                <span className="badge-dot" aria-hidden="true" /> 20 × 44 FT · SINGLES AND DOUBLES ALIKE
              </span>
              <span className="badge badge-inv data" style={{ color: "var(--paper)" }}>
                <span className="badge-dot" aria-hidden="true" /> USAP 2026 CONFORMING
              </span>
            </div>
          </HeroFlight>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <div className="mt-[var(--section-tight)]">
        <p className="shell data mb-5" style={{ color: "var(--mute)" }}>
          Played and stocked across the Philippine game
        </p>
        {/* One home for the list: PARTNERS in lib/catalog.ts. */}
        <Marquee items={PARTNERS.map((p) => p.toUpperCase())} />
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
              sport, decided in the seven feet either side of the net.
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

        {/* Bento that actually tiles: the lead card spans two rows down the
            left, the other three fill the right column and the row beneath it.
            The old 6/3/3 + 3 left nine dead columns on the second row. */}
        <div className="grid12 mt-14 gap-5">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.k}
              delay={i * 0.06}
              className={`${BENTO[i] ?? "col-span-12 md:col-span-3"} min-h-0`}
            >
              <div className="surface h-full p-7 flex flex-col">
                <p className="data" style={{ color: "var(--mute)" }}>
                  {p.k}
                </p>
                <h3
                  className={`display mt-6 leading-[1.02] ${
                    i === 0 ? "text-[2rem] sm:text-[2.75rem]" : "text-[1.3rem]"
                  }`}
                >
                  {p.t}
                </h3>
                {/* The lead card is two rows tall. Its copy sits at the base so
                    the extra height reads as deliberate space rather than a gap
                    left over at the bottom of the card. */}
                <p
                  className={
                    i === 0
                      ? "text-[1.05rem] max-w-[40ch] mt-auto pt-10"
                      : "text-[0.95rem] mt-4"
                  }
                  style={{ color: "var(--mute)" }}
                >
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
                  <div key={n} className="flex gap-5 sm:gap-6">
                    {/* .display carries overflow-wrap:break-word, which split
                        "0.43" into "0.4 / 3" once the column got tight. These
                        are figures: they set the column width, not the reverse. */}
                    <div className="shrink-0 w-[6.5rem]">
                      <p
                        className="display nums whitespace-nowrap"
                        style={{ fontSize: "clamp(1.75rem,4vw,2.75rem)", overflowWrap: "normal" }}
                      >
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
              <Court uid="home" draw className="w-full h-auto" />
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
                <PaddleShot
                  slug={hero.slug}
                  name={hero.name}
                  priority
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
                      <PaddleShot
                        slug={line.slug}
                        name={line.name}
                        className="card-art w-[62%] max-w-[110px] h-auto"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
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
                <p
                  className="display nums"
                  style={{ fontSize: "clamp(2.25rem,4.5vw,3.5rem)" }}
                >
                  {fact.count !== undefined ? (
                    <Counter value={fact.count} suffix={fact.suffix} />
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
                  {/* An initial disc, not a photograph: a generated portrait
                      under an invented quote would manufacture an endorsement.
                      Real faces arrive with real, permissioned quotes. */}
                  <span
                    className="display flex items-center justify-center shrink-0 select-none"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--r-pill)",
                      background: "var(--ink)",
                      color: "var(--paper)",
                      fontSize: "1.1rem",
                    }}
                    aria-hidden="true"
                  >
                    {t.name[0]}
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
              w={1600}
              h={1200}
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
      <section id="faq" className="shell pt-[var(--section)] scroll-mt-28">
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
