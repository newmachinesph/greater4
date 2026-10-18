# Greater4 — status

Marketing site for a Philippine premium pickleball brand. Next.js 16.2.10 (App
Router, Turbopack), React 19.2, Tailwind v4. Static — 11 prerendered routes.

## Brand in one line
The court is 20×44 ft for singles *and* doubles; 90% of rated play is doubles
(DUPR). The game was built for four. So is the brand.

## State — 2026-07-25 (modernization pass: photography, hero flight, parallax cut)
- Six pages: `/`, `/paddles`, `/paddles/[slug]` (×3), `/apparel`, `/the-four`, `/stockists`
- Build green, `tsc` clean, ESLint clean, 14 static routes (11 pages plus
  `robots.txt`, `sitemap.xml`, `opengraph-image`)
- **Photography is generated brand imagery**, served from `public/photos/`
  (one WebP per `Photo` seed; drawn halftone backdrop remains the loading
  fallback). Generated with Vertex AI Nano Banana Pro under one shared style
  preamble; product frames match `LINES` specs. **The mark is never composited
  on afterwards** — paddles inherit it from a marked master plate, apparel is
  generated with `public/brand/greater4-lockup.svg` as a reference image so the
  print wraps into the drape. Pipeline in `scripts/generation/PROMPTS.md`,
  rationale in DECISIONS.md 2026-07-25 and 2026-08-01. Only the court
  (`Court.tsx`) stays drawn now; the paddle is photographed (`PaddleShot.tsx`,
  transparent cut-outs at `/photos/{slug}-product.webp`).
- **Hero flight on `/`**: a scroll-scrubbed continuous forward camera take
  (three Veo clips, frame-matched seams) in `components/HeroFlight.tsx`,
  assets under `public/flight/`. Poster ships in SSR HTML as LCP/no-JS/
  reduced-motion state. Parallax is removed site-wide as its trade
  (`Parallax.tsx` deleted); home sits at four primitives again.
- **SEO:** sitemap, robots, Organization JSON-LD site-wide, Product +
  BreadcrumbList on every PDP, OG/Twitter card. All origins read `SITE` from
  `lib/catalog.ts` — change the domain in one place.
- **The prerendered HTML is correct without JS.** Counters render their real
  figure server-side, and a `<noscript>` rule unhides scroll reveals. See
  DECISIONS.md before touching either.
- **Still monochrome**, warmed: paper `#f6f4ee`, ink `#0c0b09`. No chromatic
  tokens. Photography and the flight clips are desaturated to read in the
  same language.
- Motion 12 (`motion/react`). Court draws itself, hero staggers, spec bars and
  stat counters fill, product page paddle drags to rotate in CSS 3D, sections
  reveal on scroll. All reduced-motion safe. No Three.js — see DECISIONS.md.

## Placeholders / open items before launch
1. **Commerce** — no cart or checkout. PDP primary action is stockist-forward
   ("Hold one at a stockist") and the header bag indicator is removed until a
   backend exists (DECISIONS.md 2026-07-25). Revert both when the cart lands.
2. **Forms** — newsletter (footer) and club enquiry (`/stockists`) post to `#`.
3. **Stockist list** — invented locations, flagged on the page itself.
4. **Testimonials** — placeholder voices in `lib/catalog.ts`, flagged on the
   home page; avatars are monochrome initial discs (no generated faces, no
   photograph until real, permissioned quotes exist).
5. **Social card** — `app/opengraph-image.tsx` is set in Satori's default sans,
   not Archivo/Bodoni, so it leans on the court diagram instead of the wordmark.
   Register real font buffers via `fonts:` if it ever has to match the site.
6. **Photography is generated, not shot.** It is brand-correct and consistent,
   but a real campaign shoot can replace any seed by overwriting its file in
   `public/photos/` — the `Photo` API is unchanged.

## Facts are load-bearing
Every figure in `lib/catalog.ts` and the page copy is sourced (USAP rulebook,
DUPR, PPF, SM Active Hub). The brand argument collapses if these drift — check
against source before editing. Note: **paddle core thickness is unregulated**;
16mm is a design choice, not a compliance number.

## House rules that are easy to undo by accident
- **No numbered section eyebrows** and no tag-left/heading-right section heads.
  Both were removed deliberately; they are the category's clearest AI tells.
- **Headings stay roman.** Italic is body-copy only. The wordmark is exempt.
- **Home is at four animation primitives** (hero entrance, hero flight,
  court draw, marquee) — one over Hallmark's cap, accepted deliberately.
  Parallax was cut as the flight's trade (DECISIONS.md 2026-07-25); do not
  reintroduce it alongside the flight.
- **Anything gated on `useReducedMotion()` must not change markup** — the
  server has no media query, so it hydration-mismatches. Gate styles, not
  whether an element renders.
- **Em-dash budget is one per 500 words.** Reach for a colon or a full stop.

## Gotchas
- `next start` on Windows: a dead port needs `Get-NetTCPConnection -LocalPort N
  | Stop-Process`; `pkill` does not reach it and the new server silently
  EADDRINUSEs while you screenshot stale output.
- Screenshot harness must run with `reducedMotion: "reduce"` — fast programmatic
  scrolling coalesces IntersectionObserver callbacks and reveals stay at opacity 0.
