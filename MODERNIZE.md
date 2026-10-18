# Greater4 — site-wide modernization brief

You are modernizing the Greater4 marketing site end to end: all six page types
(`/`, `/paddles`, `/paddles/[slug]` ×3, `/apparel`, `/the-four`, `/stockists`),
not just the home page. The two headline deliverables are (1) real generated
brand photography replacing every placeholder image, and (2) a scroll-scrubbed
hero flight on `/`: one continuous forward camera take through a Philippine
pickleball court, driven by scroll position. Around those sit a motion audit, a
performance pass, and the launch blockers already catalogued in PROJECT.md.

**Out of scope:** building a cart/checkout backend, an email service, or a form
handler. Those stay inert; your job for them is to leave clean integration
points and to make sure nothing placeholder can ship *unflagged*. Also out of
scope: changing the brand argument, the sourced figures, the drawn Court and
Paddle marks, or the monochrome mandate. Those are the site.

**Stack:** Next.js 16.2.10 (App Router, Turbopack), React 19.2.4, Tailwind v4
(CSS-first, `@theme inline` in `app/globals.css`), Motion 12 imported from
`motion/react`, TypeScript. Fully static: 14 prerendered routes (11 pages plus
`robots.txt`, `sitemap.xml`, `opengraph-image`). That route count is a floor.

---

## 0. Read before you touch anything

**Run this brief on the Fable model.** The work spans the whole site at once:
this brief, PROJECT.md, DECISIONS.md, the six page files, and fifteen
components have to be held in context simultaneously, and the house rules are
cross-cutting enough that losing them mid-task is the main failure mode.
Per-stage subagents for mechanical fan-out are fine; the agent holding this
brief and making the calls runs on Fable.

In this order, in full:

1. `PROJECT.md` — current state, the placeholder list, house rules, gotchas.
2. `DECISIONS.md` — the design rationale, append-only. This is the single most
   important file in the repo. Nearly every "obvious improvement" you will be
   tempted to make was already tried, measured, and deliberately rejected
   there (LazyMotion, Three.js, smooth-scroll hijacking, the 60% doubles
   figure, italic emphasis in headings). Do not undo a recorded decision
   without recording why.
3. `AGENTS.md` — house rules; `CLAUDE.md` just imports it. It also warns that
   this Next.js version differs from training data: read
   `node_modules/next/dist/docs/` before writing framework code.
4. `lib/catalog.ts` — the single source of truth for products, facts, copy
   blocks, and the `SITE` origin constant.
5. `app/globals.css` — every design token. There is no `tailwind.config.js`.
6. Every file in `components/`: `Accordion`, `Badge`, `CTA`, `Counter`,
   `Court`, `Footer`, `Header`, `Marquee`, `Paddle`, `PaddleViewer`,
   `Parallax`, `Photo`, `Reveal` (exports `Reveal`, `Stagger`, `Item`,
   `RiseLine`), `SpecBar`, `Wordmark`.
7. `~/.claude/skills/scroll-world/SKILL.md` and its `references/` directory —
   the scroll-scrub engine and the seam method for the hero flight.

---

## 1. Non-negotiables

State of these is not yours to relitigate. Each carries its reason, because a
rule without its reason gets undone by the next person.

- **Monochrome only. No chromatic tokens, ever.** Warm paper `#f6f4ee`, warm
  ink `#0c0b09`, plus the derived rules/washes/mutes in `:root`. The
  competitive set is all-caps sans with accent colours; monochrome is the
  brand's clearest differentiator. If you reach for a colour, the answer is
  scale, weight, tracking, radius, or a wash. Photography is desaturated by
  `.photo img { filter: grayscale(1) contrast(1.04) brightness(0.98) }` so it
  reads in the same language.
- **The numbers are load-bearing and sourced.** 20×44 ft (USA Pickleball
  Rulebook 2.A.1), 90% doubles (DUPR logged match data), 0.43 PBCoR ceiling,
  277 PPF member clubs, 86 courts across 29 SM malls (SM Active Hub). They
  live in `lib/catalog.ts` and in page copy. Verify against source before
  editing any of them; the brand argument collapses if they drift. And note:
  **paddle core thickness is unregulated.** 16mm is a design choice. If any
  caption, alt text, or generated-image prompt frames 16mm as a compliance
  number, the site publishes a false claim in its own area of claimed
  expertise.
- **The drawn `Court.tsx` and `Paddle.tsx` marks stay drawn.** They are the
  brand argument rendered as geometry (10 units per foot, 7 ft NVZ, four
  players arriving last), not placeholder decoration. Photography replaces
  `Photo.tsx` stand-ins only. Replacing the drawings with photos deletes the
  argument.
- **The copy test.** Swap a competitor's logo into any headline; if it still
  works, rewrite it. This applies to any copy you write, including captions
  under new photography.
- **No numbered section eyebrows, no tag-left/heading-right section heads.**
  Both were removed deliberately as the category's clearest AI-template tells.
  The `Badge` pill is different in kind: it carries a live fact or status
  ("90% of rated play is doubles · DUPR"), never a section index. Keep it that
  way.
- **Headings stay roman.** Italic is body copy only (the paddle meaning lines,
  editorial pull quotes). Emphasis inside a display heading is the `.accent`
  face swap to Bodoni, explicitly roman. The wordmark's italic numeral is
  exempt: a logotype is artwork.
- **Home is at four animation primitives** (hero entrance, court self-draw,
  marquee, parallax), one over the house cap of three, accepted deliberately.
  Parallax is the designated first cut if the page ever feels busy. The scroll
  flight is a fifth. **You must make and record an explicit trade here** — see
  §3. Silently adding a fifth primitive is the one outcome this brief forbids.
- **Parallax never touches body copy.** Media and diagrams only; text the
  reader is tracking stays put. Travel stays in the 5–16% band already used.
- **Anything gated on `useReducedMotion()` must not change markup.** The
  server has no media query, so a markup branch hydration-mismatches (React
  #418), and it breaks for precisely the users the accessibility path serves.
  Gate styles and motion values (the branch lives inside `useTransform`, as
  `Parallax.tsx` and `Marquee.tsx` demonstrate), never whether an element
  renders. This rule already caught two shipped bugs; it will catch yours.
- **The prerendered HTML must be true before JS runs.** `Counter` renders its
  real figure server-side (`null` display state until a tween starts); a
  `<noscript>` style block in `app/layout.tsx` unhides anything carrying
  inline `opacity:0` or a translate. Both were broken until the 2026-07-24
  audit. Any new revealed element must be covered by that rule, and the video
  hero must ship its poster in the SSR HTML, or the page's first paint (and
  its no-JS render, and its LCP) is a blank band.
- **Em-dash budget: one per 500 words** of rendered copy. Reach for a colon or
  a full stop. The last audit took the count from 38 to zero; do not creep it
  back.
- **Quality gates:** build green, `tsc` clean, ESLint clean, 14 routes, zero
  horizontal overflow and zero console errors on every route at 1440px and
  390px, verified against `next start`.
- **Record decisions.** Anything non-obvious gets an appended `DECISIONS.md`
  entry. That is the project convention and the reason the repo is still
  coherent.

---

## 2. Workstream: photography (Gemini image generation)

The single biggest gap. Every photograph on the site is a deterministic
grayscale stand-in from `picsum.photos`, layered over a drawn halftone SVG
backdrop inside `components/Photo.tsx`. Replace the stand-ins with a generated
brand set using Google's Gemini image model (Nano Banana Pro) via Google Cloud
ADC.

**Policy, stated plainly: `picsum.photos` leaves the codebase entirely.**
Every stand-in is replaced by generated brand imagery, and when this
workstream is done a repo-wide grep for `picsum` must return nothing. That
grep is a definition-of-done item, and it exists because there are **two**
call sites; a sweep of `Photo.tsx` alone misses one:

1. `components/Photo.tsx`, which builds the URL from a seed.
2. The testimonial avatars in `app/page.tsx`, which hit picsum directly with
   a plain `<img>`.

The one exception to "replaced by generated imagery" is those avatars, and
the reasoning stays attached: they do **not** get generated faces. A
synthetic portrait under an invented quote is a manufactured endorsement, and
PROJECT.md already flags invented testimonials as the single most likely
thing to ship by accident. Removing picsum from that call site means deleting
the photographic treatment (§2.1), not replacing it with a generated face.

### 2.1 Inventory the call sites first

`Photo` is used with these seeds (grep to confirm before you start; the seed
is the identity of each shot):

- `/`: `court-hero` (21/9, priority, the hero frame), `cebu-gym` (4/3 story
  strip).
- `/paddles/[slug]`: `{slug}-face`, `{slug}-grip`, `{slug}-court` — a 1/1
  detail triptych per PDP, nine images across three slugs.
- `/apparel`: `apparel-campaign` (16/10), `apparel-detail` (4/5), and
  `apparel-{slug}` for all six pieces in `APPAREL`.
- `/the-four`: `four-workshop` (4/3).
- `/stockists`: `stockist-map` (4/5).

Plus one call site that does **not** go through `Photo`: the testimonial
avatars in `app/page.tsx` hit `picsum.photos/seed/g4-{t.seed}` directly with a
plain `<img>`. Those are portraits of invented people. Do not generate faces
for them: generating a realistic portrait to sit under an invented name and
quote manufactures a fake endorsement. Until real, permissioned player quotes
exist (see §8), replace the avatar with a monochrome initial disc or the
drawn-halftone treatment. Note the picsum grayscale querystring dies with this
workstream: after it, `picsum.photos` must appear nowhere in the repo.

### 2.2 The replacement mechanism: change the src, not the API

`Photo`'s public props (`seed`, `alt`, `ratio`, `label`, `caption`,
`rounded`, `veil`, `priority`, `parallax`, `w`, `h`, `children`) are stable
and every page depends on them. Keep them. Replace the internal
`https://picsum.photos/...` URL construction with a seed→asset lookup (a
`Record<string, string>` mapping each seed to a file under `public/photos/`,
or a naming convention `public/photos/{seed}.webp` with a build-time
existence check). The drawn halftone backdrop stays: it is the loading and
failure fallback, and it keeps the brand language on screen while a photo
decodes. Remove the `caption="Placeholder photography · …"` flags at the call
sites only for images that have genuinely been replaced.

Serve AVIF or WebP at roughly the `w`/`h` each call site already requests
(the hero asks for 1920×840; the PDP details for 500×500). Do not ship one
4K master everywhere. Explicit dimensions are already enforced via
`aspectRatio` on the frame, so CLS stays at zero.

### 2.3 Art direction

The CSS grade (`grayscale(1) contrast(1.04) brightness(0.98)`) does the final
desaturation, so generate for **tonality, not colour**: images must survive
grayscale conversion with clear value separation. Direct every prompt toward:

- Philippine context, specifically the world the copy names: indoor courts,
  converted gyms, covered outdoor courts, harsh 2pm tropical light for the
  apparel set. The copy says Pasig, Cebu, Ortigas, a Tuesday night; the
  photography should look like those places, not a Florida retirement
  community.
- Doubles, always. Four players, kitchen-line exchanges, two-up formations.
  A photograph of a lone player mid-overhead contradicts the thesis on the
  same page that states it.
- Editorial sport-documentary framing: available light, real grain, honest
  contrast. Not glossy stock-sport. The site's texture layer (`.grain`) and
  warm paper already set that register.

### 2.4 Prompt construction and set consistency

- Write one **style preamble** (light, lens, grade, mood, era) and reuse it
  verbatim in every prompt of the set. Per-image prompts vary only the
  subject. Mixing preambles reads as stock photography from three agencies.
- Generate the whole set with **one model at one quality tier**. Model
  character differs between models and versions; a mixed set drifts.
- Resolve the current Nano Banana Pro model ID against live docs (Context7 or
  ai.google.dev) at execution time. The repo's own rule: never trust training
  memory for versioned APIs. Do not hardcode an ID from this brief.
- **People in frame:** no likeness of any real or identifiable person; faces
  generic or turned/motion-blurred where possible. Apparel on players is
  *generated* unbranded; the brand mark arrives by composite in post (§2.6),
  and a hallucinated competitor mark is a legal problem. **No legible text
  anywhere in frame at generation time**: generated signage and jersey type
  render as garble and read as AI instantly. Prompt for "no text, no logos,
  no lettering" and reject any output that grew some anyway.
- Review the set as a set before wiring any of it: same world, same light
  family, same grade response. Regenerate outliers individually.

### 2.5 Cost discipline

Image generation is paid. Before rendering the full set: confirm ADC auth
(`gcloud auth application-default login`), quota project, and that
`aiplatform.googleapis.com` is enabled; then generate one probe image and
check billing behaviour before batching ~20+ finals plus rerolls.

### 2.6 Product fidelity: generated imagery must depict the right paddle

Three paddle models exist with contradictory physical characteristics, and
any generated frame that mixes them contradicts spec text printed on the
same page. From `LINES` in `lib/catalog.ts`:

| slug | name | shape | thickness | handle | face | art |
|---|---|---|---|---|---|---|
| `bayanihan` | Bayanihan | Standard · 16.0 × 7.9 in | 16 mm | 5.3 in | Toray T700 raw carbon fibre | `weave` |
| `sulong` | Sulong | Elongated · 16.5 × 7.5 in | 14 mm | 5.5 in | Toray T700 raw carbon fibre | `grid` |
| `kasama` | Kasama | Standard · 15.9 × 8.0 in | 16 mm | 5.0 in | Woven fibreglass composite | `solid` |

`components/Paddle.tsx` already encodes the shape difference in geometry:
`elongated` switches the face box from `{x:16,y:14,w:188,h:282,r:26}` to
`{x:30,y:8,w:160,h:300,r:30}`, and the call sites set it with
`elongated={line.slug === "sulong"}`. The three `art` values are three
distinct drawn face patterns: `weave` is a 45-degree carbon twill, `grid` a
technical grid, `solid` a fibreglass stipple. Hold the generated photography
to the same discipline the drawing already keeps:

- **Every generated frame depicting a paddle is traceable to one specific
  model in `LINES`**, and matches that model on all of: shape (elongated vs
  standard, and only Sulong is ever elongated), visible core thickness at
  the edge (14 mm reads visibly thinner than 16 mm in a close-up), handle
  length, and face material. Kasama is woven fibreglass, not carbon:
  generating a carbon twill face for it contradicts the copy that calls it
  the forgiving first paddle.
- **The hitting face is bare. This is the one that will break silently.**
  Bayanihan's own copy states the raw T700 face is left unpainted because
  paint fills the weave and kills the friction that makes spin, and that is
  also how raw carbon paddles are actually built: manufacturers put branding
  on the throat, the edge guard, and the butt cap, never on the hitting
  surface. Image models default to branded sporting goods with printed
  graphics, logos, and colour; a generated paddle with a painted or printed
  face refutes the product argument printed beside it. Explicitly: no paint,
  no printed graphics, no logos, no legible text on any paddle face, in
  stills and in video alike. The rule is not "no branding on paddles"; it is
  "no branding on the face, mark composited at the throat, edge guard, or
  butt cap" (compositing rules below).
- **Consistency is cross-surface, not per-image.** The same model appears on
  `/`, on `/paddles`, on its own PDP, and potentially in the hero flight. It
  must be recognisably the same object everywhere: same proportions, same
  face treatment. Generate each model's imagery as a set in one pass and
  review the set together before accepting any of it, the same discipline
  §2.4 applies to the wider set.
- **The photography must not contradict the drawn `Paddle.tsx` mark.** The
  two appear on the same pages. If a generated paddle's proportions read
  differently from the drawn silhouette, one of them is wrong, and it is not
  the drawn one.
- **Core-thickness close-ups are never captioned as compliance.** §1 carries
  the rule (core thickness is unregulated; 16mm is a design choice). A
  spec-looking macro shot is exactly where someone will add a regulatory
  caption, so re-check the §1 rule there rather than trusting memory of it.

**Products carry the brand mark, and the mark is never generated: it is
composited in post from the vectorized asset produced in §2A.** Image models
mangle marks and lettering. A malformed wordmark baked into a product frame
is not a cosmetic defect; it is a broken brand asset shipped as product
photography, unfixable without regenerating the whole frame. Compositing is
deterministic, crisp, and identical across every surface, which is exactly
the cross-surface consistency this section demands. Placement: paddles take
the mark at the throat, edge guard, or butt cap, never the face; apparel
takes it at the normal places (chest, cap front, sleeve), by the same
method.

Generate the frames to receive the composite; this changes the prompts:

- Products render with clean, unmarked surfaces. Any generated lettering or
  logo-like artifact is a defect: reject the frame, do not patch it.
- The surface receiving the mark must be readable for compositing:
  unobstructed, legible perspective, consistent lighting, not folded,
  creased, or blown out where the mark will land. A garment shot whose chest
  is deep in shadow or heavily wrinkled cannot take a clean composite.
- Prefer angles and framing that make the composite plausible. Extreme
  perspective on a paddle throat or a cap front forces an overlay distortion
  that reads as fake.
- The composited mark obeys the monochrome rule like everything else:
  `--ink` on light surfaces, `--paper` on dark, no third tone, no gradient,
  no drop shadow that implies a colour.

**Sequencing: §2A completes before any product imagery is finalised.** The
vectorized logo is the compositing source. Finalise the product set first
and discover the logo asset is not ready, and the choice is holding the
whole set or compositing a raster with white fringing. This also binds the
two decisions together: if the §2A disposition scopes the logo rather than
replacing the type-set wordmark, what gets composited onto products is
whichever mark that decision names. Do not make the two calls
independently.

**Apparel carries the same requirements.** `lib/catalog.ts` also holds the
apparel range (`kitchen-tee` Seven Feet Tee, `club-polo` Club Polo,
`four-cap` Four Cap, and the rest of `APPAREL`): a garment must be the same
garment on `/apparel` as anywhere else it appears, and it carries the mark
by the same composite method at the normal places. The photography itself
can still be described as placeholder until real shoots happen; the mark on
it is correct, not provisional.

**One stale comment to fix, same class as the `Stagger` one flagged in §4.**
`components/Paddle.tsx`'s doc comment calls the drawing "Placeholder product
art" and says to swap it for studio photography when it exists. That
directly contradicts PROJECT.md, which says the drawn `Court` and `Paddle`
marks stay drawn because they are the brand argument, not decoration. This
brief follows PROJECT.md. Correct the comment so nobody reads it as licence
to replace the drawn mark with a photo.

---

## 2A. Workstream: the logo asset (`logo.png`)

A `logo.png` sits loose in the project root. It has been measured; use these
numbers, do not re-derive them:

- 1408×768, `pix_fmt=rgba`, but the alpha channel is **fully opaque**
  (`alphaextract` + `signalstats` gives YMIN=255 across the whole plane).
  Despite being RGBA it carries no transparency: the white around the mark is
  real white pixels, not empty space. It needs a background knockout, not
  just a crop.
- Content bounding box, from `cropdetect` after a `negate` (white background
  inverts to black so cropdetect can find it): `crop=922:118:234:324`. The
  content is 922×118 at offset x=234, y=324. That is 324 px of padding above
  and 326 px below a mark only 118 px tall: the mark is ~15% of the image
  height, and the true lockup aspect is roughly 7.8:1, a wide horizontal
  wordmark.

Processing order is fixed: **knock out the white background to real alpha,
then crop to the content box, then vectorize.** Crop before knockout and a
white rectangle stays behind the mark; vectorize before cropping and the
padding bakes into the artboard.

For the knockout, use the existing script rather than writing a new one:
`~/.claude/skills/scroll-world/references/knockout.py`. It does a
border-connected flood fill from the image edges over pixels near the corner
colour, pure PIL, no numpy or ImageMagick, with a `TOL` env var (default 34)
to widen or narrow the background match. Border-connected is the right
algorithm here because it preserves any interior region that happens to match
the background colour instead of punching holes in the mark. Usage:
`python3 knockout.py logo.png` writes `logo.rgba.png`.

Three complications that matter more than the mechanics:

1. **`logo.png` is referenced by nothing.** A grep across the repo finds no
   import, no `src`, no reference of any kind. It is an orphan file someone
   dropped in the root.
2. **There is no `public/` directory at all.** Create one before any static
   asset can be served; the root is the wrong place, and Next will not serve
   from there. (The `public/photos/` path in §2.2 depends on the same
   creation.)
3. **The brand mark today is type-set, not a raster.** `components/Wordmark.tsx`
   composes it live: Archivo 800 uppercase "GREATER" with a Bodoni Moda
   italic "4" at 1.18em, and its own doc comment says the whole argument is
   that the 4 is the important part. `app/icon.svg` is a drawn SVG of that
   same italic 4 on an ink tile. A raster logo is therefore not a drop-in: it
   competes with an existing, deliberate, documented mark. Read the
   DECISIONS.md rationale behind the type-set wordmark before replacing
   anything with it. Then make one explicit choice and record it: either the
   vectorized logo **replaces** the type-set wordmark everywhere, `icon.svg`
   and `opengraph-image.tsx` included, or it is **scoped** to named surfaces
   and `Wordmark.tsx` stays authoritative. Two different brand marks quietly
   coexisting is the one outcome this section forbids. Whichever way it
   goes, append a DECISIONS.md entry.

The vectorized result must survive the monochrome rule: it renders as
`--ink` on `--paper` or inverted, no third tone, no gradient. As an SVG it
should be small enough to inline rather than fetch.

---

## 3. Workstream: the hero scroll flight (`/`)

The lead motion piece: a scroll-scrubbed, continuous forward camera take
through a Philippine court, generated with Google's Veo, scrubbed by scroll
position on the home hero. The `scroll-world` skill at
`~/.claude/skills/scroll-world/` (SKILL.md plus `references/scrub-engine.js`,
`references/pipeline.md`, `references/prompts.md`) supplies the scrub engine
and the seam method. Use its engine and its architecture; generate the clips
with Veo via the same Google Cloud ADC as §2.

### 3.1 The primitive-count decision comes first

Home runs four primitives against a house cap of three. A scroll flight is a
fifth. Before building anything, decide and record one of:

- **Trade (recommended):** the flight replaces the hero photo frame and its
  parallax, and parallax is cut site-wide per its standing designation as
  first-to-cut (delete the `parallax` prop at the `Photo` call sites, unwrap
  the two `<Parallax>` court diagrams; DECISIONS.md documents that nothing
  else depends on it). Home lands back at four: flight, hero entrance
  (staggered type is retained above/over the flight), court draw, marquee.
- **Accept five,** with the justification written down and the client's sign-off
  noted.

Either is defensible. Doing neither and shipping a silent fifth primitive is
not. Append the DECISIONS.md entry before the first clip renders.

### 3.2 Generating the take: the seam method

Architecture: one camera, gliding **forward only**, no cuts, rendered as N
sequential clips that chain into a single take. The chain rules, which are
the difference between a film and a slideshow:

- **Each later clip's start frame is the PREVIOUS clip's actual last frame**,
  extracted with:

  ```bash
  ffmpeg -sseof -0.15 -i clip_i.mp4 -frames:v 1 -q:v 2 clip_i_last.png
  ```

  Never a source still, never a job/operation ID. Every generation renders
  the same scene slightly differently; chaining from anything but the real
  rendered pixels produces a visible pop at the seam.
- **Pin each clip to an end-image** of the still it must arrive at. Without
  the end pin, the model invents a different building than the one the next
  segment was planned around, and the chain diverges shot by shot.
- **Render sequentially and inspect every handoff frame before starting the
  next clip.** The extracted last frame should look like a frame from a
  gentle forward glide; if the camera ended mid-swing or drifting backward,
  reroll that clip before spending the next one. A bad frame propagates
  through every remaining clip.
- The camera must never reverse across a seam: velocity reversal reads as a
  rewind stutter, and scroll-up plays everything backward too, so the seam
  has to hold in both directions.
- One model for the whole chain. Resolve the current Veo model ID against
  live docs at execution time, same rule as §2.4. Confirm billing/quota
  before the first render, not halfway: video generation is the expensive
  half of this brief.
- Content rules for the frames themselves inherit §2: Philippine court
  vernacular, monochrome-survivable tonality, no legible text, no
  identifiable people. Plan for content-filter rerolls on interior shots.

### 3.3 Encoding for scrubbing

Scrubbing sets `video.currentTime` from scroll, which changes the encode
target:

```bash
ffmpeg -i src.mp4 -an -vf "unsharp=5:5:0.8:5:5:0.0" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart out.mp4
```

Native resolution, small GOP (not all-intra: it triples file size for
nothing), audio stripped, faststart. The engine loads clips as Blobs and
plays from object URLs, which sidesteps hosts that don't serve byte ranges
(`video.seekable` pinned to `[0,0]` makes the video look frozen at frame 0).
Small crossfades at seams are insurance on top of frame-matched handoffs,
never a substitute for them.

### 3.4 Wiring it into this codebase: three failure modes, by name

The engine (`references/scrub-engine.js`) is self-contained vanilla JS that
builds its own DOM and injects its own CSS. Mount it in a client component on
`/` only. Three traps, each with its concrete failure:

1. **The engine's layers are `position: fixed; inset: 0`.** Scope them to the
   hero's scroll span and release them (unmount/teardown) once the hero
   scrolls past, or the fixed layers sit painted over the entire rest of the
   page: the thesis section, the bento, the FAQ, all unreachable behind a
   full-viewport video layer.
2. **Never set `opacity` below 1 on the engine's container** (e.g. to fade
   the hero out). An element with `opacity < 1` becomes the containing block
   for its own `position: fixed` descendants, so the pinned layers stop
   pinning and the video scrolls away mid-flight. Fade an overlay *inside*
   the container instead.
3. **Do not add `overflow-x: hidden` anywhere in the ancestor chain.**
   `overflow-x: hidden` forces `overflow-y: auto` on the same element, which
   spawns a second scroll container and a second scrollbar, and the engine's
   scroll math reads the wrong scroller. `body` already uses
   `overflow-x: clip` for exactly this reason; keep `clip`.

### 3.5 Poster, no-JS, and reduced motion

- The SSR HTML ships the flight's poster (the first clip's first frame,
  through the existing `Photo`/`.photo` treatment or an equivalent
  eager-loaded image with explicit dimensions). That poster is the LCP
  candidate and the no-JS render. A hero that is blank until a multi-MB video
  arrives fails both the audit rule in §1 and LCP.
- Under `prefers-reduced-motion`, the flight does not scrub: the poster
  holds. Gate this inside the engine/motion values, not by conditionally
  rendering markup (§1's hydration rule applies to the flight exactly as it
  does to the drag hint that broke before it).
- Clips below the first lazy-load; only the poster and the first clip may
  touch initial load.

---

## 4. Workstream: motion system, site-wide

Audit result, component by component. Most of this system is already right;
modernize means tightening, not replacing.

**Already right, keep as-is:**

- `Court.tsx` self-draw: pathLength stays animate-driven in every branch
  (a still instance targets 1 with a 0s transition). This encodes a real
  Framer/Motion bug fix; a court that flips to a static branch after
  hydration keeps its `0px 1px` dasharray and draws nothing. Don't "clean
  it up."
- `Counter.tsx`: SSR-true figure, `null`-until-tween, zero-drop on mount.
  Load-bearing per §1.
- `Marquee.tsx` and `Parallax.tsx`: reduced-motion branch inside
  `useTransform`. The pattern to copy for any new scroll-linked motion.
- `PaddleViewer.tsx`: CSS-3D drag with keyboard arrows, a Flip/Reset
  fallback, `role="group"` (deliberately not `role="slider"`),
  `clip-path: inset(0 round var(--r-xl))` because `overflow: hidden` cannot
  clip a preserve-3d subtree. No Three.js, ever: measured at ~150 KB gzipped
  to rotate a flat object CSS already rotates for free.
- `SpecBar.tsx` one-shot fills; `Accordion` grid-rows animation with no
  measured-height JS; `RiseLine` masked rises.

**Modernize / fix:**

- The `Stagger` doc comment in `components/Reveal.tsx` still claims "there is
  deliberately no scroll-reveal anywhere else on the site." That was v1; v2
  uses `Reveal` widely. Correct the comment so the next reader doesn't
  "restore" v1 by deleting reveals.
- `Reveal` density: v2 leans into settle-on-scroll, but reveals are once-only
  and must stay that way. If any page feels like everything fades in, thin
  reveals before touching anything else, and remember every revealed element
  ships `opacity:0` inline and therefore depends on the layout `<noscript>`
  rule.
- Parallax: resolved by the §3.1 decision. If it stays, it keeps its current
  constraints (5–16% travel, media/diagrams only, dead under reduced motion).
- Home's marquee items are hardcoded in `app/page.tsx` while `PARTNERS` in
  `lib/catalog.ts` holds the same names. Consolidate to the catalog so the
  list has one home.

---

## 5. Workstream: layout, type, geometry

The v2 grammar is established and consistent: `.shell` (110rem max, fluid
gutter) + `.grid12`; section rhythm on `--section` / `--section-tight`;
badge-pill eyebrows; rounded surfaces (`.surface`, `.surface-wash`,
`.surface-ink`) with elevation carried by wash fill plus hairline ring, never
a coloured shadow; the radius scale `--r-xs` 8px through `--r-2xl` 56px and
`--r-pill`; type scale `--t-mega` through `--t-data` with `.display` /
`.editorial` / `.data` / `.lead` as the four voices. Three fonts, three jobs:
Archivo (display+body), Bodoni Moda (editorial, the brand's opinions, the
only sanctioned italic and only in body copy), JetBrains Mono
(instrumentation).

Modernization here is refinement inside the system, not a new system:

- Keep component CSS inside `@layer components`. Unlayered component classes
  beat Tailwind utilities in v4 and this exact mistake previously leaked the
  header's Bag/Shop onto mobile.
- Keep `main > section:last-child { padding-bottom: var(--section) }`: footer
  spacing lives on the page so dark pages meet the dark footer without a
  seam.
- Figures never wrap: `.display` carries `overflow-wrap: break-word`, which
  once split "0.43" into "0.4 / 3". Numeric figures set
  `whitespace-nowrap` + `overflow-wrap: normal` (see the geometry column on
  `/`).
- The bento on `/` tiles fully (lead card spans two rows, copy anchored to
  the base). Any layout change must keep every cell of the 12-column grid
  occupied at every breakpoint.
- New sections adopt the existing grammar. Do not introduce a second radius
  language, a fourth type voice, or a new section-head pattern.

---

## 6. Workstream: performance

This is a static marketing site about to gain video. Known baseline, measured
and recorded: `/` ships ~207 KB gzipped JS against a 150 KB target; ~159 KB
is the React 19 + Next 16 floor, ~38 KB is Motion, ~10 KB was parallax. The
overage is recorded as accepted. Rules going forward:

- **JS may not grow materially.** The scrub engine is small vanilla JS; the
  clips are media, not bundle. No new runtime dependencies without a
  DECISIONS.md entry and a measured cost. LazyMotion was already tried and
  measured *worse* (async form duplicated the module); don't re-try it.
- **Media budgets:** hero poster ≤ 150 KB; first flight clip ≤ ~8 MB with
  only it loading eagerly, later clips lazy; each content photo ≤ 200 KB at
  its served size, AVIF/WebP.
- **LCP is the hero poster**, eager + `fetchpriority="high"`, in the SSR
  HTML. Everything below the fold stays `loading="lazy"` (the `Photo`
  component already does this via `priority`).
- **CLS stays zero:** every image keeps explicit dimensions/aspect-ratio;
  the flight reserves its full height before any clip arrives.
- Fonts are already right (three `next/font` families, `display: swap`); do
  not add weights casually, Bodoni and JetBrains load two each.
- What must not regress: build green, 14 routes, zero horizontal overflow at
  1440/390, zero console errors, correct no-JS HTML.

---

## 7. Workstream: accessibility

Preserve what exists; it was hard-won:

- Skip link in `layout.tsx`; focus-visible outlines; the mobile drawer's
  measured `ResizeObserver` offset, Escape-to-close, and focus return to its
  toggle; `Accordion`'s real buttons with `aria-expanded`/`aria-controls`;
  `PaddleViewer`'s three input paths; `Court`'s prose `aria-label` describing
  the diagram; `SpecBar`'s `role="img"` value labels; the global
  reduced-motion kill in `globals.css` plus per-component gating.

Add / fix:

- The flight: poster alt text, reduced-motion static fallback, and the hero
  copy must remain real DOM text over the video, never baked into frames.
- The marquee is `aria-hidden` (correct: it's decorative and duplicates
  nothing critical), but confirm any content that matters is also available
  outside it if the trust strip ever becomes the only mention.
- Contrast: `--mute` at 0.6 alpha holds AA against paper and washes. Any new
  text-over-photo placement needs the `veil` gradient or equivalent; check
  the floating chips on the new hero imagery specifically.
- Keyboard-only pass on every page type: nothing the flight adds may trap or
  steal scroll from keyboard users.

---

## 8. Workstream: launch blockers (from PROJECT.md)

None of these is optional to *address*; several are content/permissions
questions where your job is the integration point plus an unmissable flag.

1. **Commerce is inert.** "Add to bag" on PDPs and "Bag (0)" in the header do
   nothing. Either wire a real backend (out of scope here) or make the
   states honest (e.g. a stockist-forward CTA) — decide with the client and
   record it. Do not ship a dead button unflagged.
2. **Forms post to `#`.** Footer newsletter and the `/stockists` club
   enquiry. Leave clean `action` seams and validation; flag remains until a
   handler exists.
3. **Stockist list is invented** and flagged on the page. Replace with the
   real dealer list before launch; the flag comes off only then.
4. **Testimonials are invented people** in `lib/catalog.ts`, flagged on the
   home page, with stand-in portraits. PROJECT.md calls this the single most
   likely thing to ship by accident. Replacing them is a permissions task,
   not a code task: your code task is §2.1's avatar rule and keeping the
   on-page flag until real quotes land.
5. **The OG card** (`app/opengraph-image.tsx`) is set in Satori's default
   sans because Satori silently falls back and destroyed the wordmark's
   serif/grotesque contrast; it deliberately leans on the court diagram
   instead. If the card must match the site, register real Archivo/Bodoni
   font buffers via `fonts:` in the `ImageResponse` options; otherwise the
   current card is a recorded, reasoned choice. Do not half-fix it back into
   the silent-fallback state.

SEO scaffolding is **done and correct**: `sitemap.ts` and `robots.ts` read
`SITE` from `lib/catalog.ts`; Organization JSON-LD is site-wide in
`layout.tsx`; every PDP ships Product + BreadcrumbList built from the same
catalog fields the spec table renders; PDP `generateMetadata` points
`openGraph.images` at `/opengraph-image` by hand because declaring
`openGraph` replaces the parent's wholesale. Keep all of that intact; new
imagery does not change the schema, but if the hero flight gets a public
poster URL, consider it for the OG image of `/`.

---

## 9. Environment and tooling

- **Windows.** A dead `next start` port needs
  `Get-NetTCPConnection -LocalPort 3000 | Stop-Process` (adjust port);
  `pkill` does not reach it, and the new server silently EADDRINUSEs while
  you screenshot the stale one.
- **QA against `next start`, never `next dev`**, and in a real browser via
  Playwright. Not an embedded preview pane: it reports the page as hidden
  and throttles `requestAnimationFrame` to zero, which makes a working scrub
  engine look broken.
- **Screenshot harness runs `reducedMotion: "reduce"`**, or fast
  programmatic scrolling coalesces IntersectionObserver callbacks and
  reveals sit at opacity 0 in every capture. That same flag disables the
  flight, so the flight gets a **separate normal-motion QA pass**: manual or
  scripted slow-scroll, checking seam continuity (near-identical frames just
  before/after each seam), `video.seekable.end(0) > 0`, and `currentTime`
  tracking scroll in both directions.
- **Google auth:** gcloud ADC (`gcloud auth application-default login`),
  quota project set, `aiplatform.googleapis.com` enabled. Image and video
  generation are both paid: verify billing and quota before rendering
  anything, not halfway through a chain.
- **Model IDs** for Nano Banana Pro and Veo: resolve against current live
  docs (Context7 or ai.google.dev) at execution time. House rule: never
  trust training memory for versioned APIs. This brief deliberately pins
  nothing.
- **`ffmpeg`/`ffprobe` on PATH** for all frame extraction and encoding.

---

## 10. Prioritisation

**First (the site is wrong without them):**

1. The logo asset: knockout, crop, vectorize, and the disposition decision
   (§2A). This moves ahead of product image finalisation, not alongside it:
   the vectorized mark is the compositing source for every product frame
   (§2.6), so no product imagery can be finalised before it exists.
2. Photography pipeline + full set generation and wiring (§2). Biggest
   visible gap, and everything else QAs against real imagery.
3. The §3.1 primitive decision, recorded in DECISIONS.md.
4. Hero flight: generate, chain, encode, wire, QA (§3). Sequential renders
   make this the schedule's long pole; start its clip chain early.

**Then:**

5. Motion audit fixes (§4: stale comment, marquee consolidation, reveal
   density check).
6. Performance pass against §6 budgets on the finished pages.
7. Accessibility pass (§7) and the launch-blocker integration seams (§8).

**Cut first if budget (credits or time) runs short, in order:**

- The flight drops from N clips to a shorter chain (fewer scenes, same seam
  discipline) before it drops quality; below that, ship the generated hero
  *poster* as a static hero and record the flight as deferred. A seamful
  flight is worse than no flight.
- PDP detail triptychs can launch on fewer than three unique shots per slug
  (reuse across slugs) before any hero/campaign image is cut.
- The OG font registration (§8.5) can wait; the court-diagram card is a
  reasoned standing choice.

Never cut: the §1 list, the QA gates, the DECISIONS.md entries.

---

## 11. Definition of done

- [ ] `npm run build` green; `tsc` clean; ESLint clean; exactly 14 routes in
      the build output (11 pages + robots + sitemap + opengraph-image).
- [ ] A repo-wide grep for `picsum` returns nothing, which confirms both
      call sites were swept (`components/Photo.tsx` and the testimonial
      avatars in `app/page.tsx`); every `Photo` seed resolves to a local
      generated asset; testimonial avatars no longer depict invented people
      as photographs.
- [ ] `logo.png` was knocked out, cropped to `crop=922:118:234:324`, and
      vectorized, in that order; the disposition choice (replace
      `Wordmark.tsx` everywhere, or scoped surfaces with `Wordmark.tsx`
      authoritative) is made and recorded in DECISIONS.md; the SVG is
      monochrome and inlined; no orphan raster remains in the project root.
- [ ] Drawn `Court` and `Paddle` render exactly as before on `/`,
      `/paddles`, PDPs, `/the-four`, `/stockists`, footer, and CTA band.
- [ ] Generated set passes the monochrome grade (clear value separation
      under `grayscale(1)`), contains no legible text, no identifiable
      likenesses, no branded apparel; reads as one world.
- [ ] Product fidelity (§2.6): every generated paddle frame is traceable to
      one model in `LINES` and matches its shape, core thickness, handle,
      and face material; the paddle face is bare in every frame, stills and
      video, while the throat, edge guard, or butt cap carries the mark;
      each model is recognisably the same object on every surface it
      appears on and does not contradict the drawn `Paddle.tsx` mark;
      apparel is consistent across surfaces and carries the mark at chest,
      cap front, or sleeve.
- [ ] The brand mark on every product frame arrived by composite from the
      §2A vectorized asset, never by generation; no generated lettering or
      logo-like artifact survives anywhere in the set; the composited mark
      is monochrome-compliant on both light and dark surfaces; §2A
      vectorization completed before any product imagery was finalised.
- [ ] The stale `Paddle.tsx` "Placeholder product art / swap for studio
      photography" comment is corrected, alongside the stale `Stagger`
      comment from §4.
- [ ] Hero flight: every seam frame-matched (screenshot just-before /
      just-after each seam is near-identical, both scroll directions);
      poster in the SSR HTML and correct with JS disabled;
      `video.seekable.end(0) > 0`; engine layers released after the hero
      (elements below it are interactive); no second scrollbar; no
      containing-block collapse when the hero fades.
- [ ] The animation-primitive decision for `/` is appended to DECISIONS.md,
      and home's actual primitive count matches it.
- [ ] Reduced-motion pass: flight holds on its poster, court renders
      finished, counters show real figures, marquee is static, no
      hydration warnings in the console on any route.
- [ ] No-JS pass: every route's served HTML shows real figures (never "0%"),
      unhidden content below the hero, and the hero poster.
- [ ] Zero horizontal overflow and zero console errors on every route at
      1440px and 390px, against `next start`, in a real Playwright browser
      (reduced-motion harness for reveals, plus the separate normal-motion
      flight pass).
- [ ] LCP on `/` is the hero poster and lands under 2.5s on a throttled
      pass; JS on `/` has not grown materially past the recorded ~207 KB.
- [ ] Facts audit: 20×44, 90% (DUPR), 0.43 PBCoR, 277 clubs, 86 courts
      unchanged or re-verified against source; no caption or alt text
      presents 16mm as a regulation.
- [ ] Copy added by this work passes the competitor-logo test; em-dash count
      across rendered copy stays within one per 500 words.
- [ ] Placeholder flags (stockists, testimonials, forms, commerce) remain
      visible wherever the underlying placeholder remains.
- [ ] A DECISIONS.md entry exists for: the photography pipeline and its art
      direction, the flight architecture and encode settings, the primitive
      trade, the logo's disposition, and any other non-obvious call made
      along the way.
