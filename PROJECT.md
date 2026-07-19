# Greater4 — status

Marketing site for a Philippine premium pickleball brand. Next.js 16.2.10 (App
Router, Turbopack), React 19.2, Tailwind v4. Static — 11 prerendered routes.

## Brand in one line
The court is 20×44 ft for singles *and* doubles; 90% of rated play is doubles
(DUPR). The game was built for four. So is the brand.

## State — 2026-07-19
- Six pages: `/`, `/paddles`, `/paddles/[slug]` (×3), `/apparel`, `/the-four`, `/stockists`
- Build green, `tsc` clean, ESLint clean
- axe-core: **0 WCAG 2.1/2.2 AA violations** across all six pages
- 0 horizontal overflow at 1440px and 390px
- Monochrome only. No colour tokens exist; hierarchy is scale/weight/tracking.
- Anti-slop pass applied 2026-07-19 (Hallmark design + anti-ai-slop writing).
  Nav is N6 masthead, footer is Ft5 statement, zero section eyebrows,
  0 em dashes in ~2,530 words. See DECISIONS.md.
- Motion 12 (`motion/react`). Court draws itself, hero staggers, spec bars
  fill, product page paddle drags to rotate in CSS 3D. No Three.js — see
  DECISIONS.md for why, and for the upgrade path if real 3D assets arrive.
- Scroll-linked parallax on media + the court diagrams. Off entirely under
  `prefers-reduced-motion` (measured 120.6px travel → 0px).
- **JS 207.3 KB on `/` vs a 150 KB target.** ~159 KB is React+Next baseline,
  ~38 KB Motion, ~11 KB parallax. Known miss, not an oversight.

## Placeholders to replace before launch
1. **Photography** — `components/Placeholder.tsx` draws SVG stand-ins. Biggest
   single upgrade available. Product art (`Paddle.tsx`) likewise.
2. **Commerce** — "Add to bag" and Bag (0) are inert. No cart, no checkout.
3. **Forms** — newsletter (footer) and club enquiry (`/stockists`) post to `#`.
4. **Stockist list** — invented locations, flagged on the page itself.

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
