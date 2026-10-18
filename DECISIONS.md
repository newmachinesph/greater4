# Decisions

Append-only. Newest last.

## 2026-07-19 — Brand thesis is a verifiable fact, not a slogan
"Greater4" refers to the four players in doubles. Rather than assert it, the
site argues it from the rulebook: the court is 20×44 ft for singles *and*
doubles (USAP 2.A.1 — tennis shrinks, pickleball never has), and 90% of all
rated play logged worldwide is doubles (DUPR).

The 90% figure is the only rigorous format split in the public record — SFIA and
USA Pickleball publish participation by age/gender/region, never by format. A
weaker 60% "players prefer doubles" number circulates via aggregators; it was
deliberately **not** used, because citing it invites a comparison that
undercuts the stronger claim.

## 2026-07-19 — Refuse to compete on price
TecniQ's "Making Pickleball Affordable for All" caps its ceiling permanently;
Pelago hedges by folding price into a "trifecta". Greater4 competes on neither.
Copy states this outright: "not the affordable option — that is a ceiling, not
a position." Prices are published in pesos on every card, because at a premium
price point confident pricing *is* positioning.

## 2026-07-19 — Filipino lexicon of partnership, not weapons
Palakol names paddles after blades (palakol, machete, tomahawk) — the sharpest
culturally-specific naming in the competitive set, but it is a singles/combat
metaphor. Greater4 borrows the mechanism and inverts the meaning: **Bayanihan**
(a neighbourhood carrying one house together), **Sulong** (advance), **Kasama**
(the one you came with). Partnership words for a doubles brand.

## 2026-07-19 — Three type families, three jobs
Archivo (grotesque display + body), Bodoni Moda (editorial voice, used only for
the brand's opinions), JetBrains Mono (spec tables, indices, labels). This
exceeds the usual two-family budget; the exception is deliberate — the whole
competitive set is all-caps sans, so an editorial serif is the cheapest
available differentiator, and technical data genuinely wants mono.

## 2026-07-19 — Drawn placeholders, never stock photos or grey boxes
`Paddle.tsx` draws a true paddle silhouette; `Court.tsx` draws a regulation
court to real proportion (10 units per foot, 7 ft NVZ). A grey box reads as
unfinished and a stock photo reads as generic; a drawing in the brand's own
monochrome language reads as intentional. The court diagram doubles as the
brand argument, so its geometry is correct rather than decorative.

## 2026-07-19 — Publish the full specification
No competitor in the surveyed set ships a comparison table, and only one puts
any description on a product card. Greater4 publishes core, face, thickness,
weight, handle, shape and conformance on the PDP *and* in a side-by-side table.
This is both a conversion tool and the credibility claim the copy makes
("a brand that hides its specification is telling you something about its
specification").

## 2026-07-19 — Footer spacing lives on the page, not the footer
`main > section:last-child { padding-bottom: var(--section) }` instead of a top
margin on `<footer>`. A page ending on a dark section (`/the-four`) otherwise
showed a white seam between it and the dark footer.

## 2026-07-19 — Anti-slop audit applied (Hallmark + anti-ai-slop-writing)

Ran both installed skills against the finished site. Twelve findings, ten fixed.

**Structure.** The site had shipped the two most-cited AI-templated tells at
once: a numbered mono-cap eyebrow on every section (`[ 01 ] The thesis`), and
the tag-left / heading-right two-column section head that Hallmark bans
outright as gate 54. Both are gone; section heads are now S2 Hanging, heading
alone in negative space.

**Chrome.** The nav was the canonical AI fingerprint (wordmark left, inline
links, action right, sticky, hairline border) and the footer was the canonical
AI footer (four link columns, social row, copyright tail) on a site with no
sitemap to catalogue. Replaced with N6 Newspaper masthead and Ft5 Statement.
The masthead can only belong to an editorial brand; the old nav could have
belonged to anyone.

**Italic headings.** `BUILT FOR *four*` and `DRESSED FOR *thirty-four*` used an
italic emphasis word inside an upright display heading — gate 38a, one of the
most reliable tells. Emphasis now comes from the face swap plus weight, both
explicitly sanctioned. Italic survives only as body copy (the paddle meaning
lines). The wordmark's italic numeral stays: a logotype is artwork, not a
heading.

**Motion.** Thirty-five scroll reveals across five pages meant every section
faded in and the page never settled. Cut to one orchestrated entrance on the
hero. `.rise` was also made safe outside a reveal wrapper, so deleting a
`<Reveal>` can never strand a heading translated off its own mask.

**Em dashes.** 38 across 2,513 rendered words against a budget of 5 (one per
500). Now zero, replaced with colons, semicolons, parentheses, and full stops.
Contractions added where the voice allows. Banned-vocabulary scan: clean.

**Knowingly not fixed.** Pure `#000` / `#fff` trips Hallmark's "pure black,
pure white" gate. The client mandated monochrome, so it stays, recorded as a
deliberate exception in the CSS stamp rather than silently ignored.

## 2026-07-19 — Motion 12, and where 3D does not earn its place

Added `motion` v12 (the package Framer Motion became; import path `motion/react`).

**Three primitives per page, not more.** Hallmark caps a page at three distinct
animation primitives, and the 2026–27 trend reporting agrees with it: motion is
structural now, and "the end of visual theatrics" shows up in nearly every
forecast. So the additions are narrow.

- *Home* — the hero's one orchestrated entrance (staggered mask-rise); the
  court drawing itself; the marquee. The card hover was cut from two signals
  (lift + rule) to one, so it stays a state rather than becoming a fourth.
- *Paddles* — spec bars fill once on first view. Three bars filling to
  different lengths reads as a comparison faster than three static bars do.
- *Product page* — the drag-to-inspect paddle.

**The court drawing itself is the one piece of motion that carries meaning.**
Perimeter inks in, kitchen hatches, net, then the four players arrive last.
That sequence *is* the brand argument: an empty rectangle, then the thing that
makes it a doubles court. One-shot, never re-fires.

**No Three.js.** A paddle is a flat object. Two faces and an edge in CSS 3D
cost 0 KB and deliver the whole interaction — rotate it, read the spec etched
on the back. A WebGL renderer would cost ~150 KB gzipped, which is this site's
entire JS budget, to do the same job. Hallmark's own test is "if the user can't
manipulate it, it doesn't justify Three.js"; the inverse also holds — if CSS
can manipulate it, WebGL is dead weight. The honest boundary: real geometry
(true 16mm edge thickness, material response to light) is where a renderer
would start earning its place, and that needs a real 3D model, which we don't
have.

**LazyMotion was tried and reverted.** `LazyMotion` + `m` is the documented way
to shrink Motion, but every page here is already interactive, so the feature
bundle lands in the shared chunk regardless. Measured: plain `motion` 196.6 KB,
LazyMotion sync 202.7 KB, LazyMotion async 231.3 KB. The async form *duplicated*
the module. Kept the plain import — smallest and simplest.

**Two bugs the motion work introduced, both caught by testing rather than
reading.** The marquee kept its transform under reduced motion, because
swapping a motion value's `style` to `undefined` leaves the last transform on
the node instead of clearing it; the branch had to move inside `useTransform`.
And the drag hint was gated on `useReducedMotion()`, which hydration-mismatched
(React #418) — the server has no media query so it emitted the hint, and a
reduced-motion client didn't. That broke hydration for precisely the users the
accessibility path exists to serve.

**JS budget: over, knowingly.** 196.6 KB on the landing page against a 150 KB
target. React 19 + Next 16 baseline is ~159 KB of that; Motion adds ~38 KB. The
budget is not reachable on this stack without dropping the App Router or the
animation library. Recorded rather than quietly ignored.

## 2026-07-19 — Parallax added, against the installed design system

The client asked for site-wide parallax. Hallmark bans it in three places, and
on accessibility grounds rather than taste:

> *"Parallax on scroll. Different layers moving at different speeds.
> Vestibular trigger; rarely serves the content."* — microinteractions.md
> *"Use it only for reveal-once effects. No parallax."* — motion.md

Built anyway, at the client's explicit and repeated request, with the ban's
actual objection engineered out rather than ignored:

1. **`prefers-reduced-motion` kills it dead.** Measured: travel goes from
   120.6px to 0px. The branch lives inside `useTransform`, never in the
   markup — gating what renders on a media query hydration-mismatches.
2. **Restrained travel.** 5–16% of element height. The hero court and the
   closing court sit at 5–7%; media runs 7–16%. Displacement never exceeds the
   over-scan, so a frame can't show its edge.
3. **Never on running body copy.** Only media, and the two court diagrams.
   Text the reader is tracking stays exactly where they left it. This is the
   constraint that answers "rarely serves the content" — the frames hold still
   and the images move inside them, which is depth rather than drift.

Home is now at four primitives rather than three (hero entrance, court draw,
marquee, parallax). That is over Hallmark's cap and is the real cost of this
decision. If the site ever feels busy, parallax is the first thing to remove:
delete the `parallax` prop from the Placeholder call sites and unwrap
`<Parallax>` — nothing else depends on it.

**A regression it caused.** `inline-flex` on the apparel headline made each
word its own flex item, so the line could not wrap at the space and
`overflow-wrap: anywhere` broke *inside* a word — "DEGRE / ES". Fixed by
returning the headline to plain inline text and switching to
`overflow-wrap: break-word`, which only breaks a word that genuinely cannot
fit. Verified at 1440 / 768 / 390.

**Not added: smooth-scroll hijacking (Lenis).** It is the other half of the
"awwwards" look, but it overrides native scrolling — which breaks scroll-to-
find, changes scrollbar behaviour, and is a second vestibular trigger on top
of the first. Parallax alone gives the depth; the hijack is the part users
complain about. Say the word if you want it.

JS on `/` moved 196.6 KB → 207.3 KB.

## 2026-07-24 — v2 redesign: the Framer-template grammar, on the brand's terms

Brief: study four modern Framer marketing templates (Goalz, Starlight Camp,
Galileo Club, Expanded Priority) and rebuild every page in that idiom, with
real imagery. Those templates share a vocabulary — floating pill nav,
badge-pill eyebrows, big rounded photography, feature bento, animated stat
bands, testimonials, FAQ accordion, a closing CTA band, generous rounded
geometry. v2 adopts all of it, but routed through the parts of Greater4 that
are load-bearing rather than replacing them.

**What stayed non-negotiable.** The brand argument is a set of sourced facts
(20×44 ft, 90% doubles, 0.43 PBCoR) and a Filipino partnership lexicon; none
of that moved. The drawn court and paddle stay drawn — they *are* the argument,
so they are the one thing a template's stock-photo hero would have cheapened.

**Monochrome held; warmth added.** The client mandate is monochrome and it is
the brand's clearest differentiator in an all-caps-sans category, so v2 keeps
it: no chromatic tokens. It only warms the neutrals (paper `#fff`→`#f6f4ee`,
ink `#000`→`#0c0b09`), which reads as uncoated stock and pairs with the
photography. Real photos would break monochrome, so `Photo.tsx` desaturates
them (`grayscale(1) contrast(1.04)`); grayscale sport photography is a premium
editorial look in its own right, and it resolves the tension between "use real
images" and "monochrome only" instead of picking one.

**Rounded geometry is the biggest visible shift.** v1 was hard-edged editorial;
the reference set is soft and rounded. A radius scale plus pill buttons and
badge chips is the cheapest, most monochrome-safe way to read as "one of those
sites". Elevation, which normally rides a coloured shadow, is carried by a wash
fill plus a hairline ring — a real surface without leaving the palette.

**Departures from v1 rules, taken deliberately.**
- *Eyebrows are back, as status pills.* v1 removed numbered mono eyebrows as an
  AI tell. The badge pill is different in kind: it carries a live fact or status
  ("90% of rated play is doubles", "USAP 2026 conforming"), never a section
  index, so it argues rather than decorates.
- *Scroll reveals are back.* v1 held to one orchestrated hero entrance because
  "a page where every section fades in never settles." The template look depends
  on sections settling in on scroll, so v2 uses a `Reveal` wrapper widely — but
  once-only, and collapsed to a plain fade under reduced motion.
- *Photography replaces drawn placeholders* for lifestyle/scene/apparel, per the
  explicit brief. A drawn halftone backdrop sits behind every photo, so a slow
  or blocked image host still renders a branded field, not a broken box.

**Two bugs the rebuild surfaced, both caught by testing, not reading.**
1. *Unlayered component CSS beat Tailwind utilities.* In Tailwind v4, plain
   (unlayered) `.btn { display }` overrides a utility `hidden`/`md:inline-flex`,
   so the header's Bag/Shop leaked onto mobile and widened the page. Fix: wrap
   the component classes in `@layer components` so the utilities layer wins.
2. *The `draw` court went invisible under reduced motion.* Framer paints
   `pathLength` with `stroke-dasharray`; a court that initialised at
   `pathLength:0` and then flipped to its static branch after hydration kept the
   `0px 1px` dasharray and drew nothing — for exactly the reduced-motion users
   the static branch exists to serve. Fix: keep pathLength animate-driven in
   every case (target 1 with a 0s transition when still), never hand it back to
   `style`, which framer ignores once it owns the value.

**Also fixed:** the 3D paddle viewer escaped its `overflow:hidden` stage
(preserve-3d subtrees aren't clipped by overflow) and widened the PDP; a
`clip-path: inset(0 round …)` clips across the 3D boundary where overflow can't.

## 2026-07-24 — Audit pass: the served HTML has to be true before JS runs

Full audit of the v2 site. The build was red (a stale `/gear` route validator
against an empty `app/gear/` directory), and two findings were about the same
underlying thing: **what the page says before hydration.**

**The numbers rendered as zero.** `Counter` initialised at `useState(0)` and only
reached the real figure after hydration *and* scroll-into-view, so the static
HTML published "0% of all rated pickleball logged worldwide is doubles" and "0
member clubs". That is the exact opposite of the house rule that the figures are
load-bearing. The counter now holds `null` until a tween starts and renders the
real value in the meantime; a mount effect drops it to zero off-screen so the
tween still has somewhere to start. SSR and no-JS both publish the true number.

**26 elements shipped at `opacity: 0`.** Reveals are animated in by Motion, so
without JS the page below the hero is blank. A `<noscript>` style block unhides
anything carrying an inline `opacity:0` or a translate. Cheaper and more
reliable than making every reveal render twice.

**The count-up was wired by string match.** `fact.figure === "90%"` in the page
meant editing `FACTS` would silently drop the animation. `count` and `suffix`
now live on the fact itself, next to the number they animate.

**SEO scaffolding was missing entirely** — no sitemap, no robots, no JSON-LD, no
social card. Added: `sitemap.ts` and `robots.ts` (both reading a single `SITE`
constant from the catalog), Organization markup site-wide, Product +
BreadcrumbList on every PDP built from the same catalog fields the spec table
renders, and an `opengraph-image`.

**The social card does not use the brand's faces, deliberately.** Satori ships
one sans and falls back silently, so `font-family: Georgia` on the numeral
rendered as the same sans as everything else and the wordmark's serif/grotesque
contrast just vanished. Rather than add a build-time font fetch, the card is
built on the court diagram: real proportion, 10 units per foot, four players.
It is the brand argument, it needs no font, and it cannot be mistaken for a
generic template card.

**The closing CTA's secondary button had no hover state.** A bare `.btn` on an
ink panel fills with `var(--ink)` — ink on ink, invisible — and an inline
`color` outranked the `:hover` rule. It uses `btn-inv` plus a new
`.btn-ghost-inv` for the hairline ring, so it fills with paper like everything
else on that panel.

**`role="slider"` on the paddle viewer was a lie.** `aria-valuenow` was
hardcoded to 0 and never moved as the paddle rotated, with no min or max. It is
a focusable `group` with arrow-key rotation and two buttons; that is what it now
says it is.

**Bento that didn't tile.** The four pillars ran 6/3/3 then a lone 3, leaving
nine dead columns on the second row. The lead card now spans two rows down the
left and the other three fill the right; its copy is anchored to the base so the
extra height reads as space rather than a gap.

**`.display` carries `overflow-wrap: break-word`**, which split "0.43" into
"0.4 / 3" once the geometry column got tight. Figures set their column's width,
not the reverse: that number is `whitespace-nowrap` with `overflow-wrap: normal`.

**Also:** the mobile drawer's offset was a hardcoded `top-[76px]` against a bar
that measures 69px and moves with breakpoint padding and user font size — it is
measured with a `ResizeObserver` now, and the drawer closes on Escape and returns
focus to its toggle. Footer "Warranty" pointed at `/stockists`, a page that never
mentions the warranty; it points at the FAQ that does. The copyright year was
`new Date().getFullYear()` inside a prerendered server component, which freezes
at build time, so the year is gone rather than wrong. Dead weight removed:
`Placeholder.tsx` (zero imports), the five Next starter SVGs in `public/`,
`.shell-tight`, `.hairline`, and a duplicated `main > section:last-child` rule.

**Left alone, knowingly.** The testimonials are still invented people with
stand-in portraits. They are flagged on the page, but they are the item most
likely to ship by accident, and replacing them is a permissions question rather
than a code one.

## 2026-07-25 — The raster logo is scoped to product marking; Wordmark.tsx stays authoritative

A `logo.png` (1408×768, opaque white background) sat orphaned in the project
root: an all-caps sans "GREATER4" lockup whose 4 carries a drawn pickleball in
its counter. Processed in the fixed order (border-connected knockout →
crop to the measured 922×118 content box → traced at 2× to SVG, 21 paths,
6.2 KB, verified against the source bitmap at 2.8% edge-pixel mismatch) and
saved as `public/brand/greater4-lockup.svg`, fills set to `currentColor` so it
renders as ink-on-paper or inverted and nothing else.

**Disposition: scoped, not a replacement.** The site's wordmark stays the
type-set `Wordmark.tsx` (Archivo 800 + Bodoni italic 4) everywhere on the site,
`icon.svg` and the OG card included. The recorded rationale for that mark is
that the editorial serif 4 is the argument, in a category that is wall-to-wall
all-caps sans; the raster lockup is precisely an all-caps sans, so promoting it
site-wide would undo that decision. The vectorized lockup instead becomes the
**product-marking lockup**: the compositing source for the brand mark on all
generated product imagery (paddle throat / edge guard / butt cap, apparel
chest / cap / sleeve), where a single-weight vector mark survives small sizes
and photographic perspective in a way a two-family webfont composition cannot.
This is a deliberate two-tier mark system (site logotype vs product lockup),
recorded here rather than left as two marks quietly coexisting. The orphan
rasters were removed from the project root.

## 2026-07-25 — Photography: one generated set, one preamble, marks composited in post

Every `picsum.photos` stand-in is replaced by a generated brand set (Vertex AI,
`gemini-3-pro-image` / Nano Banana Pro, resolved against the live API at
execution time). One style preamble — editorial sport-documentary, available
light, Philippine court vernacular, tonal separation that survives grayscale,
no text/logos/faces — is reused byte-identical across every prompt; only the
subject varies. Paddle frames are generated per model against the `LINES`
spec (shape, core thickness at the edge, handle, face material), with the
hitting face bare in every frame; each model's triptych is prompted from one
shared verbatim object description so it stays the same object across
surfaces. The brand mark is never generated: it lands by composite from the
§2A vectorized lockup (ink or paper by surface), on throat/end-cap/flat
surfaces only, never a hitting face. Frames that grew borders, magazine-spread
framings, or product damage were rejected and rerolled rather than patched.
`Photo.tsx` now resolves `seed` to `/photos/{seed}.webp` (drawn halftone
backdrop kept as the loading fallback) and, with parallax gone, is a server
component again. Testimonial avatars became monochrome initial discs: a
generated portrait under an invented quote manufactures an endorsement, so no
face renders until a real, permissioned quote exists.

## 2026-07-25 — Commerce states made honest until a backend exists

"Add to bag" did nothing and the header carried a permanent "Bag (0)". The PDP
primary action is now "Hold one at a stockist" (a real, working promise) with
"Online checkout at launch" noted beside it, and the bag indicator left the
header. Both revert in one small diff when a cart backend lands. A dead
primary button on a specification-forward brand undercuts exactly the
credibility the spec table builds.

## 2026-07-25 — The hero flight replaces parallax; home stays at four primitives

The scroll-scrubbed hero flight is a fifth animation primitive on a page
already one over the cap. Decision: **the trade.** The flight replaces the
hero photo frame and its parallax, and parallax is cut site-wide, per its
standing designation as first-to-cut. The `parallax` prop leaves the `Photo`
call sites, and the two `<Parallax>`-wrapped court diagrams unwrap; nothing
else depends on it (recorded 2026-07-19). Home lands back at four: flight,
hero entrance (the staggered type stays, above the flight), court self-draw,
marquee. ~10 KB of parallax JS leaves the bundle, which partially funds the
flight's scrub code.

## 2026-07-25 — Flight architecture: sticky scrub, not the engine's fixed layers

The flight is one continuous forward take (scroll-world architecture A):
sequential Veo clips (`veo-3.1-generate-001`, resolved live) where each leg's
start image is the previous leg's actual extracted last frame, no end-image,
so seams are frame-identical and the camera never reverses across one. Clips
encode per the scrub spec: native res, crf 20, GOP 8, faststart, audio
stripped. `HeroFlight.tsx` keeps the engine's load/scrub mechanics — blob
object-URLs (seekable regardless of host byte-range support), rAF-lerped
`currentTime`, seek-coalescing, a short seam crossfade as insurance — but
mounts with `position: sticky` inside the hero's own scroll span instead of
the engine's `position: fixed` full-viewport layers. Sticky needs no teardown
when the hero scrolls past, can't be orphaned by an ancestor opacity creating
a containing block, and adds no second scroll container: the three failure
modes of the fixed approach, avoided structurally rather than defensively.
The poster (the first clip's first frame) ships in the SSR HTML as the LCP,
the no-JS render, and the reduced-motion state; the reduced-motion gate lives
in the effect (clips are never even fetched), never in the markup. The clips
carry the same `grayscale(1) contrast(1.04) brightness(0.98)` grade as
`.photo img`, so film and stills read as one language. No product close-up
appears in the flight: a close paddle frame would owe the §2.6 traceability
and composite rules, which video can't honour.

## 2026-07-25 — Client direction: the lockup replaces the type-set wordmark in site chrome

Supersedes the "scoped, not a replacement" disposition above, at the client's
explicit request. `Wordmark.tsx` now renders the vectorized lockup inline
(currentColor, height keyed to the parent font-size), so the header masthead
and the footer meta row carry the drawn GREATER4 mark with the pickleball in
the 4 — the same mark composited onto product imagery, which restores a
single mark across site and product. Two deliberate carve-outs, kept from
the earlier entry's reasoning: `app/icon.svg` stays the italic-4 tile (a
7.8:1 lockup cannot survive a square favicon), and the OG card stays the
court diagram (its Satori font-fallback rationale is unchanged). The type-set
composition survives only in the drawn `Paddle.tsx` face art, which is
artwork, not chrome.

## 2026-08-01 — The paddle is photographed; the mark is never stamped on
Two reversals, both on explicit request.

**The drawn paddle is retired.** `Paddle.tsx` encoded true per-model geometry
and was kept deliberately (2026-07-25: "the drawn court and paddle stay drawn —
they *are* the argument"). `PaddleShot.tsx` now serves a photographed cut-out in
every card and in the PDP viewer. What that buys: a real object carrying a real
mark on its face, consistent with the photography around it. What it costs: the
silhouette no longer encodes the spec. The generated plates for the standard and
elongated shapes came back within ~1% of each other in aspect, so Sulong's
elongation — a genuine 16.5×7.5 vs 16.0×7.9 difference — now lives only in the
spec table, not in the picture. `Court.tsx` stays drawn. The `art` field on
`Line` went with it; nothing else read it.

**The lockup is generated into the image, not composited over it.** The old
apparel frames stamped a flat vector on the chest of a garment that was folded,
angled and raking-lit; it read as a sticker sitting on top of the photograph.
Apparel is now generated with the lockup as a reference image and a prompt that
asks for it printed *into* the cloth — bending across folds, dimming into the
same shadow, ink sunk into the weave. Paddles get the same treatment one step
earlier: the mark is composited onto the flat, square-on master plate, and every
scene frame inherits it in perspective. `finish.py`'s `COMPOSITE` map is now
empty; the machinery stays for any genuinely flat surface.

Consequence worth knowing: both fixes depend on reference-image conditioning, so
the mark's letterforms are *redrawn* by the model rather than pasted. They are
faithful at the sizes shipped, but a frame that puts the mark much larger should
be checked letter by letter before it goes out.
