# Prompt book — Greater4 photography + hero flight

Copy-paste text for every generated asset on the site. **Source of truth is
`prompts.py` (images) and `flight.py` (video)** — reroll from those so the
style preamble stays byte-identical across the set. This file is the readable
mirror: use it to paste into another model, or to see the whole set at once.

Model settings shipped: images `gemini-3-pro-image` (Nano Banana Pro), video
`veo-3.1-generate-001`, 16:9, 8s, 1080p, no audio.

Constraints that are load-bearing, not decoration:
- **No text, no logo, no signage anywhere in frame** — except the paddle's own
  wordmark, which arrives by vector composite (`mark.py`), never by generation.
  See the paddle system below.
- **No identifiable faces** — turned away, backlit, in shadow, or motion-blurred.
- **Tonal separation that survives black-and-white**, because the site is monochrome.
- Product frames must match the `LINES` specs in `lib/catalog.ts` (core mm,
  face material, handle length). Those are the brand argument.

---

## Style preamble (prepended verbatim to every image prompt)

```
Editorial sport-documentary photograph. Available light only, honest deep contrast, subtle 35mm film grain, natural reportage framing, the look of a printed magazine photo essay, not glossy stock photography. Philippine pickleball culture: converted gymnasiums, covered community courts, harsh tropical daylight. Strong tonal value separation so the frame still reads clearly when converted to black and white. Absolutely no text, no lettering, no numbers, no logos, no signage, no printed graphics, no brand marks anywhere in the frame. No identifiable faces: any people are turned away, backlit, in deep shadow, or motion-blurred. Subject:
```

---

# The paddle system

The nine PDP frames are the product. They get their own three-stage pipeline,
because text alone cannot pin an object: describing "a black edge guard" nine
times produces nine different edge guards. The first pass proved it — the three
face frames shipped with different guards, different grips, different weave and
one of them warm-toned while the others were neutral. Three brands, not one.

**Rule change, stated openly:** the mark now sits on the **face**, not the
throat. MODERNIZE.md §2.6 kept it off the hitting face because generated type
garbles. The plate method solves that — the mark is composited as vector onto a
flat, square-on plate, and every scene frame inherits it from that plate. If you
revert to text-only generation, revert this rule with it.

## Design language (byte-identical in every paddle prompt)

```
Greater4 industrial design, identical in every frame: a squared-off rounded-rectangle hitting face inside a uniform eight millimetre matte black edge guard of even width all the way round, a bare unpainted face with no paint fill and no colour graphics, one wordmark screen-printed in flat off-white ink across the lower third of the face, nothing else printed on the face, a matte black throat with no printing, a mid-grey perforated wrap grip, and a flat matte black butt cap. Nothing chromed, no gloss clearcoat, no gradient, no stripe, no swoosh, no second colour, no model name on the face
```

Everything above is fixed across the range. Only four things change down the
line-up, and all four are spec, not styling:

| | Shape | Core | Face | Handle |
|---|---|---|---|---|
| Bayanihan | standard | 16 mm | raw carbon twill | 5.3 in |
| Sulong | elongated, longer and narrower | 14 mm | raw carbon twill | 5.5 in |
| Kasama | wide standard | 16 mm | woven fibreglass, finer and tighter | 5.0 in |

## Stage 1 — the master plate (one per line)

A flat catalogue plate, dead square, blank face, seamless grey. Not for the
site: this is the reference object every scene frame is generated from.

Prefix, verbatim:

```
Studio product photograph on a plain seamless mid-grey background, soft even light from a large source, no dramatic shadow, the whole paddle centred with even margin on all sides, perfectly square to the camera with no perspective distortion, sharp edge to edge, neutral and catalogue-accurate. No text, no lettering, no logo, no printed graphics anywhere: the face is left completely blank. Subject:
```

Then one of — 4:5 / 2K each:

```
Dead-on front elevation of a pickleball paddle with a standard shape, a sixteen millimetre thick core visible at the edge, a raw unpainted carbon fibre hitting face showing its natural woven twill texture, and a five point three inch handle. [DESIGN LANGUAGE].
```
```
Dead-on front elevation of an elongated pickleball paddle, noticeably longer and narrower than a standard shape, with a thin fourteen millimetre core visible at the edge, a raw unpainted carbon fibre hitting face showing its natural woven twill texture, and a longer five point five inch handle. [DESIGN LANGUAGE].
```
```
Dead-on front elevation of a pickleball paddle with a wide standard shape, a sixteen millimetre thick core visible at the edge, a woven fibreglass composite hitting face with a fine glassy weave, lighter and tighter than carbon twill, and a five inch handle. [DESIGN LANGUAGE].
```

## Stage 2 — mark the plate

Composite `public/brand/greater4-lockup.svg` onto each plate with `mark.py`,
then save as `refs/<line>-master.png` (`python run.py mark`). The plate is flat
and square, so the vector lands crisp with no warp. As-run values, measured off
the actual plates and living in `run.py`'s `MARK`:

| | centre x | centre y | width (of plate) | ink |
|---|---|---|---|---|
| Bayanihan | 0.50 | 0.47 | 0.20 | paper `#f6f4ee` |
| Sulong | 0.50 | 0.49 | 0.20 | paper `#f6f4ee` |
| Kasama | 0.50 | 0.50 | 0.24 | ink `#0c0b09` |

Each works out to ≈0.45 of that plate's face width. Kasama's fibreglass face is
pale, so its mark is the only dark one — read the surface, don't copy a value.

**Review the three marked plates side by side before generating anything
else.** They are the product. If the guard widths or grips differ between the
plates, reroll the plate — every downstream frame inherits the error nine times.

## Stage 3 — scene frames, conditioned on the plate

Every frame below is sent with its line's marked plate as a reference image
(`gen_image(..., refs=["refs/bayanihan-master.png"])`). The preamble changes in
one place — text is banned everywhere **except** the paddle's own wordmark:

```
… No text, no lettering, no numbers, no logos, no signage and no printed graphics anywhere in the frame except the single wordmark printed on the paddle's own face, which is reproduced exactly as it appears in the reference image. No identifiable faces: any people are turned away, backlit, in deep shadow, or motion-blurred. Subject:
```

And every paddle subject opens with the lock, verbatim:

```
The paddle is the exact object in the reference image, unchanged: same silhouette, same edge guard width, same face weave, same grip, same butt cap, and the same wordmark in the same place on the face at the same size. Do not redesign it, do not restyle the mark, do not add anything to the face.
```

## Stage 4 — resharpen the mark in post

Conditioned generation places the mark correctly but softens the letterforms.
On the two frames per line where the face is near-flat to camera (`-face`,
`-court`), overlay the vector again in `finish.py` at the position it landed:
`w_frac ≈ 0.30` of image width, PAPER, rotation matched to the paddle's tilt.
Re-tune each number against the actual render — the old config's 0.065–0.11 is
why the mark currently reads as an accident.

---

## Images

Format: `seed` — aspect / size, then the subject that follows the preamble.

### Home

**`court-hero`** — 21:9 / 2K
```
An indoor pickleball doubles rally in a converted Philippine gymnasium: all four players standing at the non-volley line in a two-up two-up formation, mid soft-dink exchange, shot low from behind one baseline. Shafts of afternoon light from high louvred windows, dust in the air, the dark hall falling away behind the far court.
```

**`cebu-gym`** — 4:3 / 2K
```
A converted basketball gymnasium in Cebu set up for pickleball open play: two portable nets across the court, benches along the wall with kit bags and water bottles, a few players waiting seen from behind, late afternoon light through the doorway.
```

### PDP frames — all nine, 1:1 / 1K, each with `[LOCK]` prepended

The three lines share one grammar: face, grip, court — same angle, same light,
same crop. The only thing that changes down the range is the product. That is
what makes a range look like a range.

**`bayanihan-face`** · ref `refs/bayanihan-master.png`
```
[LOCK] A standard-shape paddle, sixteen millimetre core. It stands upright against a bare concrete wall on a worn gym floor, the face square to the camera and filling most of the frame, the printed wordmark on the lower third of the face fully visible, level and unobstructed. One hard raking light from the left so the carbon twill reads in relief and the edge guard throws a clean line of shadow; the wall behind falls off to near black. Full-bleed photograph filling the entire frame edge to edge, no border, no matte, no frame.
```

**`sulong-face`** · ref `refs/sulong-master.png`
```
[LOCK] An elongated paddle, visibly longer and narrower than a standard shape, fourteen millimetre core. It stands upright against a bare concrete wall on a worn gym floor, the face square to the camera and filling most of the frame, the printed wordmark on the lower third of the face fully visible, level and unobstructed. One hard raking light from the left so the carbon twill reads in relief and the edge guard throws a clean line of shadow; the wall behind falls off to near black. Full-bleed photograph filling the entire frame edge to edge, no border, no matte, no frame.
```

**`kasama-face`** · ref `refs/kasama-master.png`
```
[LOCK] A wide standard-shape paddle, sixteen millimetre core, brand new and unmarked. It stands upright against a bare concrete wall on a worn gym floor, the face square to the camera and filling most of the frame, the printed wordmark on the lower third of the face fully visible, level and unobstructed. One hard raking light from the left so the fine fibreglass weave reads in relief and the edge guard throws a clean line of shadow; the wall behind falls off to near black. Full-bleed photograph filling the entire frame edge to edge, no border, no matte, no frame.
```

**`bayanihan-grip`** / **`sulong-grip`** / **`kasama-grip`** — same frame, three handles (5.3 in · 5.5 in two-handed · 5.0 in)
```
[LOCK] Close still-life of the five point three inch handle. The wrapped grip runs diagonally across the frame, the flat matte black butt cap facing the camera straight on and evenly lit, the perforations in the wrap sharp, shallow depth of field, gym floor falling away into bokeh behind.
```

**`bayanihan-court`** / **`sulong-court`** / **`kasama-court`** — identical text for all three
```
[LOCK] The paddle lies flat and face-up on the painted concrete of a covered outdoor court beside a single perforated pickleball, photographed from directly overhead, square to the frame, filling about half of it, the wordmark on the face level and readable. Hard tropical light and one crisp shadow. Full-bleed photograph filling the entire frame edge to edge, not a printed page, not a magazine, no border, no matte, no frame.
```

## Cut-outs for the product cards

`python run.py cuts` renders the same three paddles on **pure white, no cast
shadow**; `python run.py cutouts` marks them, keys the background out and writes
`public/photos/{slug}-product.webp` — transparent, padded to one 900×1950
canvas so all three cards share an intrinsic size. These replaced the drawn
`Paddle.tsx` art (DECISIONS.md 2026-08-01).

Key by **flood fill from the four corners**, not by luminance threshold. The
plates come back at 248–255 with a soft vignette, and Kasama's fibreglass face
is pale enough that any global threshold which kills the background eats the
face too. A connected fill can't reach the face — the black edge guard encloses
it. Caveat carried forward: the generated silhouettes for the standard and
elongated shapes differ by ~1%, so Sulong's elongation does not read in the
cut-outs the way the drawn art made it read.

## Apparel: the mark is generated, not stamped

Every apparel frame is conditioned on `refs/lockup.png` (`python run.py
lockup` — the vector on plain white) and asks for the mark printed *into* the
cloth. The clause, verbatim:

```
The wordmark in the reference image is screen-printed on the garment. Reproduce those exact letterforms — same typeface, same spacing, the pickleball inside the 4 — but lying on the cloth: following its drape and perspective, bending across every fold and seam, dimming into shadow and brightening in the light exactly as the fabric under it does, the ink sunk slightly into the weave with the texture showing through. Print it once only, at the size and place described. No other text anywhere.
```

Then each frame names its own placement and size ("across the chest in dark
ink, about an eighth of the frame wide, foreshortened by the angle of the
bench"). `finish.py`'s `COMPOSITE` map is empty as a result: a flat vector on a
folded, angled, raking-lit garment reads as a sticker, which is exactly what
the first pass shipped.

### As-run notes (first full pass)

- **Don't run two image batches at once.** Paddle frames + scene frames in
  parallel hit `429 RESOURCE_EXHAUSTED` on this project's low image RPM and
  killed the scene job three frames from the end. Run batches one at a time.
- **Carbon blows out to silver** under hard raking light, which made Sulong's
  face read like Kasama's fibreglass. The face prompts now carry an explicit
  luminance clause ("stays dark, clearly darker than the concrete behind it").
  Two rerolls before that clause; one after.
- `mark.py` could not read the lockup at all until this pass — it parsed only
  `M/L/Q` while the traced SVG is entirely cubic `C`, and its `VB_W/VB_H` were
  stale, so `render_mark` returned a fully transparent layer. Silent: nothing
  raised, the mark simply never appeared. Run `python mark.py` after any change
  to the lockup — it self-checks the alpha.

### Paddle QA — reject and reroll if any of these is true

- Edge guard width changes between the three lines, or around one paddle
- Grip tone differs line to line, or the butt cap is not flat matte black
- Anything printed on the face besides the one wordmark
- Face weave reads as burlap, mesh screen, or a printed pattern instead of woven fibre
- One frame is warm-toned while its siblings are neutral (check all nine as a contact sheet, not one at a time)
- The mark is smaller than roughly a third of the visible face width, or crosses the edge guard
- Core thickness at the edge contradicts the spec table (14 mm must read thinner than 16 mm)

### Apparel

**`apparel-campaign`** — 16:9 / 2K
```
Two pickleball players walking off an uncovered outdoor court at two in the afternoon, seen from behind, kit bags over their shoulders, plain unbranded athletic wear, heat haze and hard shadows on the painted court, chain-link fence and tropical sky beyond.
```

**`apparel-detail`** — 4:5 / 2K
```
Product detail of a heavyweight cotton tee in a plain warm off-white, boxy cut, hung against a concrete wall in window light: the fabric weight and drape are the subject, chest area smooth, unobstructed and evenly lit, plain hem, no print, no graphics. Full-bleed photograph filling the entire frame edge to edge, no border, no matte, no frame.
```

**`apparel-kitchen-tee`** — 3:2 / 2K
```
A heavyweight boxy-cut cotton tee in warm off-white, laid flat on a wooden gym bench in raking window light, sleeves folded square, chest area smooth, unobstructed and evenly lit, no print, no graphics. Full-bleed photograph filling the entire frame edge to edge, not a printed page, not a magazine, no border, no matte, no frame.
```

**`apparel-club-polo`** — 4:5 / 1K
```
A dark athletic polo shirt of recycled piqué with a visible mesh underarm panel, on a wooden hanger against a whitewashed gym wall, hard tropical light from a doorway, chest area smooth, unobstructed and evenly lit, no print, no graphics.
```

**`apparel-four-cap`** — 4:5 / 1K
```
An unstructured six-panel cotton twill cap in warm off-white on a gym bench, photographed level from the front, the front panel facing the camera squarely, smooth and evenly lit, plain, no embroidery, no print, no graphics.
```

**`apparel-rally-short`** — 4:5 / 1K
```
Dark athletic shorts with a seven inch inseam and two zip pockets, laid flat on painted court concrete in hard afternoon light, fabric smooth, no print, no graphics.
```

**`apparel-warmup-crew`** — 4:5 / 1K
```
A loopback fleece crewneck in warm grey with a dropped shoulder, folded on a bench in a dim gym corridor with one shaft of window light, chest area smooth, unobstructed and evenly lit, no print, no graphics. Full-bleed photograph filling the entire frame edge to edge, not a printed page, not a magazine, no border, no matte, no frame.
```

**`apparel-paddle-sleeve`** — 4:5 / 1K
```
A felt-lined waxed canvas paddle sleeve in dark olive-grey, lying on a wooden bench beside an unbranded paddle handle emerging from it, window light, the flat front face of the sleeve smooth, unobstructed and evenly lit, no print, no graphics. Full-bleed photograph filling the entire frame edge to edge, not a printed page, not a magazine, no border, no matte, no frame.
```

### The Four / Stockists

**`four-workshop`** — 4:3 / 2K
```
A paddle maker's workshop bench in Pasig: wide bare raw carbon fibre pickleball paddle face blanks, large rounded rectangles with no handles attached yet, laid out in a row before assembly, honeycomb core blanks stacked beside them, callipers and clamps, hands of a worker in soft focus at the edge of frame, afternoon light through a dusty window. This is the raw photograph itself, full-bleed, filling the entire frame edge to edge: not a printed page, not an open magazine, not a book, no caption, no border, no matte, no frame.
```

**`stockist-map`** — 4:5 / 2K
```
Aerial photograph looking straight down at a Philippine outdoor pickleball complex of four courts under a long metal roof, painted court rectangles clearly visible, players as small figures at the kitchen lines, late light raking long shadows across the concrete. Full-bleed photograph filling the entire frame edge to edge, not a printed page, not a magazine, no border, no matte, no frame.
```

---

## Hero flight (video)

Three Veo legs, 8s each, chained: **leg N starts on leg N−1's ffmpeg-extracted
last frame**, no end image. Never generate a leg from an idealised still — the
seam only disappears if the start frame is the real one. Inspect every handoff
frame before rendering the next leg. Velocity never reverses; a backward pull
across a seam reads as a rewind.

### Leg 0 start still (`legs/flight-open.png`) — 16:9 / 2K, image model

```
Editorial sport-documentary photograph. Available light only, honest deep contrast, subtle 35mm film grain, natural reportage framing, the look of a printed magazine photo essay, not glossy stock photography. Philippine pickleball culture: converted gymnasiums, covered community courts, harsh tropical daylight. Strong tonal value separation so the frame still reads clearly when converted to black and white. Absolutely no text, no lettering, no numbers, no logos, no signage, no printed graphics, no brand marks anywhere in the frame. No identifiable faces: any people are turned away, backlit, in deep shadow, or motion-blurred. Subject: The approach to a covered Philippine community pickleball court in late afternoon, seen from outside the long metal roof: a chain-link fence in the near foreground, the bright painted court beyond it, four players rallying at a distance as small backlit figures. Wide, level, eye-height framing on a straight axis down the court, deep space receding to the far baseline.
```

### Style tail (appended verbatim to all three legs)

```
Documentary sport-cinema look, available light, honest contrast, subtle film grain, strong tonal separation that survives black-and-white conversion. No text, no lettering, no logos, no signage anywhere. No identifiable faces: players distant, turned away, or motion-blurred. Smooth, graceful, slow constant motion, subtle parallax. No cuts.
```

### Leg 0 — approach

```
Single continuous cinematic camera move, no cuts. A slow, steady forward glide toward a covered Philippine community pickleball court in late afternoon: the camera drifts forward under the long metal roof, past a chain-link fence, toward the bright painted court where four players rally at a distance. In the final second, settle into a slow, steady forward glide toward the near baseline. [STYLE TAIL]
```

### Leg 1 — across the court

```
Single continuous cinematic camera move, no cuts. Continue the same slow, steady forward glide: the camera moves low over the painted court surface toward the net, the four players at the far kitchen line exchanging soft shots, hard shafts of tropical light raking the concrete. In the final second, settle into a slow, steady forward glide toward the net tape. [STYLE TAIL]
```

### Leg 2 — over the net

```
Single continuous cinematic camera move, no cuts. The camera NEVER moves backward and never pulls away. Continue the same slow, steady forward glide toward the net a few metres ahead, rising in a gentle arc to clear it, the net passing below and out of frame, then descending and gliding forward deep into the far court toward the players and the far baseline, shafts of late light raking the concrete. In the final second, settle into a slow, steady forward glide slowing toward a near hold. [STYLE TAIL]
```

No product close-up anywhere in the flight: a close paddle frame would trigger
the spec-traceability and mark-composite rules, and neither can be honoured in
video.

---

## Dialling it up

If a reroll should hit harder, change one variable at a time and keep the
preamble intact — the set reads as one shoot only because the preamble never
moves. Levers that work inside the monochrome system:

- **Light, not colour.** Ask for one hard source and let the rest go black:
  "a single hard shaft of light across the subject, the surrounding hall
  falling to near-black, no fill". Contrast is the only saturation available.
- **Atmosphere.** "dust and haze in the light beam", "heat shimmer off the
  concrete" — separates planes without adding a colour token.
- **A longer lens on the wide frames.** "shot on a 135mm from the far corner,
  compressed space, players stacked in depth" reads more deliberate than the
  reportage 35mm default.
- **Surface age on stills.** "sun-bleached paint, hairline cracks, a repainted
  line ghosting under the current one" — texture the eye trusts.
- **Emptiness.** For a hero, one figure and a lot of court beats four figures
  and a busy frame. The doubles argument is made in copy, not by crowding.

Do not add: colour grades, lens flare, tilt-shift, drone-swoop language on the
flight, or anything that puts type in frame. Those are the category's AI tells
and the reason this set was art-directed away from stock.
