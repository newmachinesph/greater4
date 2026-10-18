"""Prompt set for the Greater4 brand photography (see MODERNIZE.md §2).

One style preamble, byte-identical in every prompt. Subjects vary. Products are
traceable to LINES in lib/catalog.ts and render with clean unmarked surfaces;
the brand mark arrives by composite in post (mark.py), never by generation.
"""

PREAMBLE = (
    "Editorial sport-documentary photograph. Available light only, honest deep "
    "contrast, subtle 35mm film grain, natural reportage framing, the look of a "
    "printed magazine photo essay, not glossy stock photography. Philippine "
    "pickleball culture: converted gymnasiums, covered community courts, harsh "
    "tropical daylight. Strong tonal value separation so the frame still reads "
    "clearly when converted to black and white. Absolutely no text, no "
    "lettering, no numbers, no logos, no signage, no printed graphics, no brand "
    "marks anywhere in the frame. No identifiable faces: any people are turned "
    "away, backlit, in deep shadow, or motion-blurred."
)

# Product frames say "no text anywhere" would kill the paddle's own wordmark,
# which the reference plate carries. Everything else in the frame stays clean.
PREAMBLE_PRODUCT = PREAMBLE.replace(
    "Absolutely no text, no lettering, no numbers, no logos, no signage, no "
    "printed graphics, no brand marks anywhere in the frame.",
    "No text, no lettering, no numbers, no logos, no signage and no printed "
    "graphics anywhere in the frame except the single wordmark printed on the "
    "paddle's own face, which is reproduced exactly as it appears in the "
    "reference image.",
)

# The design language. Byte-identical in every paddle prompt: this is what
# makes three lines read as one product family instead of three brands.
DESIGN = (
    "Greater4 industrial design, identical in every frame: a squared-off "
    "rounded-rectangle hitting face inside a uniform eight millimetre matte "
    "black edge guard of even width all the way round, a bare unpainted face "
    "with no paint fill and no colour graphics, one wordmark screen-printed "
    "in flat off-white ink across the lower third of the face, nothing else "
    "printed on the face, a matte black throat with no printing, a mid-grey "
    "perforated wrap grip, and a flat matte black butt cap. Nothing chromed, "
    "no gloss clearcoat, no gradient, no stripe, no swoosh, no second colour, "
    "no model name on the face"
)

# Shared, verbatim product descriptions so each model is the same object in
# every frame it appears in (MODERNIZE.md §2.6). Only the spec deltas differ.
BAYANIHAN = (
    "a pickleball paddle with a standard shape, a sixteen millimetre thick "
    "core visible at the edge, a raw unpainted carbon fibre hitting face "
    "showing its natural woven twill texture, and a five point three inch "
    "handle. " + DESIGN
)
SULONG = (
    "an elongated pickleball paddle, noticeably longer and narrower than a "
    "standard shape, with a thin fourteen millimetre core visible at the "
    "edge, a raw unpainted carbon fibre hitting face showing its natural "
    "woven twill texture, and a longer five point five inch handle. " + DESIGN
)
KASAMA = (
    "a pickleball paddle with a wide standard shape, a sixteen millimetre "
    "thick core visible at the edge, a woven fibreglass composite hitting "
    "face with a fine glassy weave, lighter and tighter than carbon twill, "
    "and a five inch handle. " + DESIGN
)

# Stage 1 of the paddle pipeline: one flat catalogue plate per line, shot dead
# square on seamless grey. The vector lockup is composited onto the plate (see
# PROMPTS.md), and every scene frame below is then generated *from* that plate,
# so the object is the same object everywhere.
PLATE_STYLE = (
    "Studio product photograph on a plain seamless mid-grey background, soft "
    "even light from a large source, no dramatic shadow, the whole paddle "
    "centred with even margin on all sides, perfectly square to the camera "
    "with no perspective distortion, sharp edge to edge, neutral and "
    "catalogue-accurate. No text, no lettering, no logo, no printed graphics "
    "anywhere: the face is left completely blank. Subject: "
)

def _blank(desc):
    """Plate version: the face is empty. The mark arrives by composite."""
    return desc.replace(
        "one wordmark screen-printed in flat off-white ink across the lower "
        "third of the face, nothing else printed on the face",
        "a completely blank face with nothing printed on it at all")


MASTERS = {
    "bayanihan-master": (f"Dead-on front elevation of {_blank(BAYANIHAN)}.", "4:5", "2K"),
    "sulong-master": (f"Dead-on front elevation of {_blank(SULONG)}.", "4:5", "2K"),
    "kasama-master": (f"Dead-on front elevation of {_blank(KASAMA)}.", "4:5", "2K"),
}

# Cut-out plates: same three paddles on pure white with no shadow, so the
# background keys out cleanly and the paddle can sit on a card's own wash.
# These replace the drawn Paddle.tsx art in the product cards.
PLATE_CUT = (
    "Studio product photograph on a pure white seamless background, flat even "
    "shadowless light, no cast shadow, no reflection, no floor line, no "
    "gradient in the background — a clean silhouette against uniform white. "
    "The whole paddle centred with even margin on all sides, perfectly square "
    "to the camera with no perspective distortion, sharp edge to edge, neutral "
    "and catalogue-accurate. No text, no lettering, no logo, no printed "
    "graphics anywhere: the face is left completely blank. Subject: "
)

CUTOUTS = {
    "bayanihan-cut": (f"Dead-on front elevation of {_blank(BAYANIHAN)}.", "4:5", "2K"),
    "sulong-cut": (f"Dead-on front elevation of {_blank(SULONG)}.", "4:5", "2K"),
    "kasama-cut": (f"Dead-on front elevation of {_blank(KASAMA)}.", "4:5", "2K"),
}

# Every paddle frame is conditioned on its line's marked plate.
REF = {
    "bayanihan-face": "refs/bayanihan-master.png",
    "bayanihan-grip": "refs/bayanihan-master.png",
    "bayanihan-court": "refs/bayanihan-master.png",
    "sulong-face": "refs/sulong-master.png",
    "sulong-grip": "refs/sulong-master.png",
    "sulong-court": "refs/sulong-master.png",
    "kasama-face": "refs/kasama-master.png",
    "kasama-grip": "refs/kasama-master.png",
    "kasama-court": "refs/kasama-master.png",
    # Apparel reads the lockup itself, so the print lands in the cloth.
    "apparel-detail": "refs/lockup.png",
    "apparel-kitchen-tee": "refs/lockup.png",
    "apparel-club-polo": "refs/lockup.png",
    "apparel-four-cap": "refs/lockup.png",
    "apparel-rally-short": "refs/lockup.png",
    "apparel-warmup-crew": "refs/lockup.png",
    "apparel-paddle-sleeve": "refs/lockup.png",
}

# Apparel: the mark is generated onto the cloth, not stamped on afterwards.
# A composited vector sits dead flat on a garment that is folded, angled and
# raking-lit, and reads as a sticker. Conditioning on the lockup plate lets the
# model wrap it into the drape and light it with the surrounding fabric.
PRINTED = (
    "The wordmark in the reference image is screen-printed on the garment. "
    "Reproduce those exact letterforms — same typeface, same spacing, the "
    "pickleball inside the 4 — but lying on the cloth: following its drape and "
    "perspective, bending across every fold and seam, dimming into shadow and "
    "brightening in the light exactly as the fabric under it does, the ink sunk "
    "slightly into the weave with the texture showing through. Print it once "
    "only, at the size and place described. No other text anywhere. "
)

SAME = (
    "The paddle is the exact object in the reference image, unchanged: same "
    "silhouette, same edge guard width, same face weave, same grip, same "
    "butt cap, and the same wordmark in the same place on the face at the "
    "same size. Do not redesign it, do not restyle the mark, do not add "
    "anything to the face. "
)

# seed -> (subject, aspect_ratio, image_size)
SET = {
    # Home
    "court-hero": (
        "An indoor pickleball doubles rally in a converted Philippine gymnasium: "
        "all four players standing at the non-volley line in a two-up two-up "
        "formation, mid soft-dink exchange, shot low from behind one baseline. "
        "Shafts of afternoon light from high louvred windows, dust in the air, "
        "the dark hall falling away behind the far court.",
        "21:9", "2K"),
    "cebu-gym": (
        "A converted basketball gymnasium in Cebu set up for pickleball open "
        "play: two portable nets across the court, benches along the wall with "
        "kit bags and water bottles, a few players waiting seen from behind, "
        "late afternoon light through the doorway.",
        "4:3", "2K"),

    # PDP triptychs. The three lines share one grammar — face / grip / court,
    # same angle, same light, same crop — so the only thing that changes down
    # the range is the product. Each is generated from its line's plate (REF).
    "bayanihan-face": (
        f"{SAME}A standard-shape paddle, sixteen millimetre core. It stands "
        "upright against a bare concrete wall on a worn gym floor, the face "
        "square to the camera and filling most of the frame, the printed "
        "wordmark on the lower third of the face fully visible, level and "
        "unobstructed. One hard raking light from the left so the carbon "
        "twill reads in relief and the edge guard throws a clean line of "
        "shadow; the wall behind falls off to near black. Full-bleed "
        "photograph filling the entire frame edge to edge, no border, no "
        "matte, no frame.",
        "1:1", "1K"),
    "bayanihan-grip": (
        f"{SAME}Close still-life of the five point three inch handle. The "
        "wrapped grip runs diagonally across the frame, the flat matte black "
        "butt cap facing the camera straight on and evenly lit, the "
        "perforations in the wrap sharp, shallow depth of field, gym floor "
        "falling away into bokeh behind.",
        "1:1", "1K"),
    "bayanihan-court": (
        f"{SAME}The paddle lies flat and face-up on the painted concrete of a "
        "covered outdoor court beside a single perforated pickleball, "
        "photographed from directly overhead, square to the frame, filling "
        "about half of it, the wordmark on the face level and readable. Hard "
        "tropical light and one crisp shadow. Full-bleed photograph filling "
        "the entire frame edge to edge, not a printed page, not a magazine, "
        "no border, no matte, no frame.",
        "1:1", "1K"),

    "sulong-face": (
        f"{SAME}An elongated paddle, visibly longer and narrower than a "
        "standard shape, fourteen millimetre core. It stands upright against "
        "a bare concrete wall on a worn gym floor, the face square to the "
        "camera and filling most of the frame, the printed wordmark on the "
        "lower third of the face fully visible, level and unobstructed. One "
        "hard raking light from the left so the carbon twill reads in relief "
        "and the edge guard throws a clean line of shadow; the wall behind "
        "falls off to near black. The raw carbon face stays dark, clearly "
        "darker than the concrete behind it, the weave picked out by the light "
        "rather than blown out to silver. Full-bleed photograph filling the "
        "entire frame edge to edge, no border, no matte, no frame.",
        "1:1", "1K"),
    "sulong-grip": (
        f"{SAME}Close still-life of the longer five point five inch "
        "two-handed handle. The wrapped grip runs diagonally across the "
        "frame, the flat matte black butt cap facing the camera straight on "
        "and evenly lit, the perforations in the wrap sharp, shallow depth "
        "of field, gym floor falling away into bokeh behind.",
        "1:1", "1K"),
    "sulong-court": (
        f"{SAME}The paddle lies flat and face-up on the painted concrete of a "
        "covered outdoor court beside a single perforated pickleball, "
        "photographed from directly overhead, square to the frame, filling "
        "about half of it, the wordmark on the face level and readable. Hard "
        "tropical light and one crisp shadow. Full-bleed photograph filling "
        "the entire frame edge to edge, not a printed page, not a magazine, "
        "no border, no matte, no frame.",
        "1:1", "1K"),

    "kasama-face": (
        f"{SAME}A wide standard-shape paddle, sixteen millimetre core, brand "
        "new and unmarked. It stands upright against a bare concrete wall on "
        "a worn gym floor, the face square to the camera and filling most of "
        "the frame, the printed wordmark on the lower third of the face fully "
        "visible, level and unobstructed. One hard raking light from the left "
        "so the fine fibreglass weave reads in relief and the edge guard "
        "throws a clean line of shadow; the wall behind falls off to near "
        "black. Full-bleed photograph filling the entire frame edge to edge, "
        "no border, no matte, no frame.",
        "1:1", "1K"),
    "kasama-grip": (
        f"{SAME}Close still-life of the five inch handle. The wrapped grip "
        "runs diagonally across the frame, the flat matte black butt cap "
        "facing the camera straight on and evenly lit, the perforations in "
        "the wrap sharp, shallow depth of field, gym floor falling away into "
        "bokeh behind.",
        "1:1", "1K"),
    "kasama-court": (
        f"{SAME}The paddle lies flat and face-up on the painted concrete of a "
        "covered outdoor court beside a single perforated pickleball, "
        "photographed from directly overhead, square to the frame, filling "
        "about half of it, the wordmark on the face level and readable. Hard "
        "tropical light and one crisp shadow. Full-bleed photograph filling "
        "the entire frame edge to edge, not a printed page, not a magazine, "
        "no border, no matte, no frame.",
        "1:1", "1K"),

    # Apparel
    "apparel-campaign": (
        "Two pickleball players walking off an uncovered outdoor court at two "
        "in the afternoon, seen from behind, kit bags over their shoulders, "
        "plain unbranded athletic wear, heat haze and hard shadows on the "
        "painted court, chain-link fence and tropical sky beyond.",
        "16:9", "2K"),
    "apparel-detail": (
        f"{PRINTED}Product detail of a heavyweight cotton tee in a plain warm "
        "off-white, boxy cut, hung against a concrete wall in window light: "
        "the fabric weight and drape are the subject. The wordmark sits across "
        "the chest in dark ink, about a fifth of the frame wide, curving with "
        "the hang of the cloth. Full-bleed photograph filling the entire frame "
        "edge to edge, no border, no matte, no frame.",
        "4:5", "2K"),
    "apparel-kitchen-tee": (
        f"{PRINTED}A heavyweight boxy-cut cotton tee in warm off-white, laid "
        "flat on a wooden gym bench in raking window light, sleeves folded "
        "square. The wordmark sits across the chest in dark ink, about an "
        "eighth of the frame wide, foreshortened by the angle of the bench and "
        "broken by the creases running through it. Full-bleed photograph "
        "filling the entire frame edge to edge, not a printed page, not a "
        "magazine, no border, no matte, no frame.",
        "3:2", "2K"),
    "apparel-club-polo": (
        f"{PRINTED}A dark athletic polo shirt of recycled piqué with a visible "
        "mesh underarm panel, on a wooden hanger against a whitewashed gym "
        "wall, hard tropical light from a doorway. The wordmark sits on the "
        "left chest in pale ink, small — about an eighth of the frame wide — "
        "riding the soft vertical fold of the hanging shirt.",
        "4:5", "1K"),
    "apparel-four-cap": (
        f"{PRINTED}An unstructured six-panel cotton twill cap in warm "
        "off-white on a gym bench, photographed level from the front, the "
        "front panel facing the camera squarely. The wordmark is embroidered "
        "across the front panel in dark thread, about a sixth of the frame "
        "wide, curving with the round of the crown and following the twill.",
        "4:5", "1K"),
    "apparel-rally-short": (
        f"{PRINTED}Dark athletic shorts with a seven inch inseam and two zip "
        "pockets, laid flat on painted court concrete in hard afternoon light. "
        "The wordmark sits small on the left leg near the hem in pale ink, "
        "about a tenth of the frame wide, distorted by the fold of the fabric "
        "beneath it.",
        "4:5", "1K"),
    "apparel-warmup-crew": (
        f"{PRINTED}A loopback fleece crewneck in warm grey with a dropped "
        "shoulder, folded on a bench in a dim gym corridor with one shaft of "
        "window light. The wordmark sits across the chest in dark ink, about "
        "an eighth of the frame wide, half of it falling into the shadow that "
        "crosses the garment. Full-bleed photograph filling the entire frame "
        "edge to edge, not a printed page, not a magazine, no border, no "
        "matte, no frame.",
        "4:5", "1K"),
    "apparel-paddle-sleeve": (
        f"{PRINTED}A felt-lined waxed canvas paddle sleeve in dark olive-grey, "
        "lying on a wooden bench beside an unbranded paddle handle emerging "
        "from it, window light. The wordmark is printed on the flat front face "
        "of the sleeve in pale ink, about an eighth of the frame wide, angled "
        "with the sleeve as it lies and dulled where the waxed cotton has "
        "creased. Full-bleed photograph filling the entire frame edge to edge, "
        "not a printed page, not a magazine, no border, no matte, no frame.",
        "4:5", "1K"),

    # The Four / Stockists
    "four-workshop": (
        "A paddle maker's workshop bench in Pasig: wide bare raw carbon "
        "fibre pickleball paddle face blanks, large rounded rectangles with "
        "no handles attached yet, laid out in a row before assembly, "
        "honeycomb core blanks stacked beside them, callipers and clamps, "
        "hands of a worker in soft focus at the edge of frame, afternoon "
        "light through a dusty window. This is the raw photograph itself, "
        "full-bleed, filling the entire frame edge to edge: not a printed "
        "page, not an open magazine, not a book, no caption, no border, no "
        "matte, no frame.",
        "4:3", "2K"),
    "stockist-map": (
        "Aerial photograph looking straight down at a Philippine outdoor "
        "pickleball complex of four courts under a long metal roof, painted "
        "court rectangles clearly visible, players as small figures at the "
        "kitchen lines, late light raking long shadows across the concrete. Full-bleed photograph filling the entire frame edge to edge, not a printed page, not a magazine, no border, no matte, no frame.",
        "4:5", "2K"),
}


def build(seed):
    """(prompt, aspect, size, refs) for a seed, or for a *-master plate."""
    if seed in MASTERS:
        subject, aspect, size = MASTERS[seed]
        return PLATE_STYLE + subject, aspect, size, []
    if seed in CUTOUTS:
        subject, aspect, size = CUTOUTS[seed]
        return PLATE_CUT + subject, aspect, size, []
    subject, aspect, size = SET[seed]
    ref = REF.get(seed)
    pre = PREAMBLE_PRODUCT if ref else PREAMBLE
    return pre + " Subject: " + subject, aspect, size, [ref] if ref else []


if __name__ == "__main__":
    import sys
    for s in (sys.argv[1:] or list(MASTERS) + list(SET)):
        prompt, aspect, size, refs = build(s)
        print(f"\n=== {s}  [{aspect} {size}]" + (f"  ref: {refs[0]}" if refs else ""))
        print(prompt)
