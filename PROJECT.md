# Greater4 — status

Marketing site for a Philippine premium pickleball brand. Next.js 16.2.10 (App
Router, Turbopack), React 19.2, Tailwind v4. Static — 11 prerendered routes.

## Brand in one line
The court is 20×44 ft for singles *and* doubles; 90% of rated play is doubles
(DUPR). The game was built for four. So is the brand.

## State — 2026-07-24 (v2 redesign)
- Six pages: `/`, `/paddles`, `/paddles/[slug]` (×3), `/apparel`, `/the-four`, `/stockists`
- Build green, `tsc` clean, ESLint clean, 11 static routes
- 0 horizontal overflow at 1440px and 390px (verified with headless Chromium)
- **v2 direction:** learned from modern Framer marketing templates (Goalz,
  Starlight Camp, Galileo Club, Expanded Priority) and rebuilt every page in
  their grammar — floating pill masthead, badge-pill eyebrows, rounded/pill
  geometry, full-bleed grayscale photography, feature bento, animated stat
  band, testimonials, FAQ accordion, closing CTA band. See DECISIONS.md.
- **Still monochrome**, warmed: paper `#f6f4ee`, ink `#0c0b09`. No chromatic
  tokens. Photography is desaturated to read in the same language.
- Motion 12 (`motion/react`). Court draws itself, hero staggers, spec bars and
  stat counters fill, product page paddle drags to rotate in CSS 3D, sections
  reveal on scroll (v2 leans into this where v1 deliberately didn't). All
  reduced-motion safe. No Three.js — see DECISIONS.md.
- Scroll-linked parallax on media + court diagrams. Off under
  `prefers-reduced-motion` (branch lives inside `useTransform`, never markup).

## Placeholders to replace before launch
1. **Photography** — `components/Photo.tsx` pulls deterministic grayscale
   stand-ins from `picsum.photos` (seeded), over a drawn halftone backdrop that
   shows if the host is slow or blocked. Swap `src` for brand-shot photography;
   the API is stable. Product art (`Paddle.tsx`) and the court (`Court.tsx`)
   stay drawn — those are the brand argument, not decoration.
2. **Commerce** — "Add to bag" and Bag (0) are inert. No cart, no checkout.
3. **Forms** — newsletter (footer) and club enquiry (`/stockists`) post to `#`.
4. **Stockist list** — invented locations, flagged on the page itself.
5. **Testimonials** — placeholder voices in `lib/catalog.ts`, flagged on the
   home page. Replace with real, permissioned player quotes.

## Facts are load-bearing
Every figure in `lib/catalog.ts` and the page copy is sourced (USAP rulebook,
DUPR, PPF, SM Active Hub). The brand argument collapses if these drift — check
against source before editing. Note: **paddle core thickness is unregulated**;
16mm is a design choice, not a compliance number.

## House rules that are easy to undo by accident
- **No numbered section eyebrows** and no tag-left/heading-right section heads.
  Both were removed deliberately; they are the category's clearest AI tells.
- **Headings stay roman.** Italic is body-copy only. The wordmark is exempt.
- **Home is at four animation primitives** (hero entrance, court draw,
  marquee, parallax) — one over Hallmark's cap, accepted deliberately.
  Parallax is the first thing to cut if the page ever feels busy.
- **Parallax never touches body copy.** Media and diagrams only; text the
  reader is tracking must stay put.
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
