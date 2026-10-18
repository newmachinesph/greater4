"""Generate the whole asset set into one folder: out/.

    python run.py plates    # 3 blank paddle plates  -> out/
    python run.py mark      # composite lockup onto plates -> refs/*-master.png
    python run.py paddles   # 9 PDP frames, each conditioned on its plate
    python run.py scenes    # the 12 non-paddle photographs
    python run.py still     # hero flight opening frame -> legs/flight-open.png
    python run.py <seed>... # any subset by name

Video legs are flight.py's job (sequential, each fed the previous last frame).
Everything is skipped if the output already exists, so a rerun after a failure
costs nothing for what already landed.
"""
import os
import sys

from gen import gen_image
from prompts import CUTOUTS, MASTERS, REF, SET, build

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")

PAPER = (246, 244, 238)
INK = (12, 11, 9)

# Lockup placement per plate: centre x, centre y on the lower third of the
# face, width as a fraction of plate width (≈0.45 of the face width), and ink
# colour. Measured off the actual plates — the faces differ in size, and
# Kasama's fibreglass face is pale, so its mark goes dark.
MARK = {
    "bayanihan": (0.50, 0.47, 0.20, PAPER),
    "sulong": (0.50, 0.49, 0.20, PAPER),
    "kasama": (0.50, 0.50, 0.24, INK),
}


def _gen(seed, out_dir=OUT):
    prompt, aspect, size, refs = build(seed)
    path = os.path.join(out_dir, seed + ".png")
    if os.path.exists(path):
        print("skip (exists):", seed, flush=True)
        return path
    missing = [r for r in refs if not os.path.exists(r)]
    if missing:
        raise SystemExit(f"{seed} needs {missing} — run `python run.py mark` first")
    print("generating:", seed, aspect, size, "ref" if refs else "", flush=True)
    gen_image(prompt, path, aspect, size, refs=refs)
    print("  wrote", path, os.path.getsize(path) // 1024, "KB", flush=True)
    return path


def mark_plates():
    from PIL import Image
    from mark import render_mark
    os.makedirs("refs", exist_ok=True)
    for line, (cx, cy, wf, colour) in MARK.items():
        plate = os.path.join(OUT, f"{line}-master.png")
        img = Image.open(plate).convert("RGBA")
        w, h = img.size
        layer = render_mark(int(w * wf), color=colour)
        img.alpha_composite(layer, (int(cx * w - layer.size[0] / 2),
                                    int(cy * h - layer.size[1] / 2)))
        out = f"refs/{line}-master.png"
        img.convert("RGB").save(out)
        print("marked", out, flush=True)


def lockup_ref():
    """The lockup as a plain reference plate, black on white. Apparel frames
    are conditioned on this so the print lands in the cloth's own drape and
    light instead of being stamped on flat afterwards."""
    from PIL import Image
    from mark import render_mark
    os.makedirs("refs", exist_ok=True)
    m = render_mark(1400, color=INK)
    bg = Image.new("RGB", (m.width + 160, m.height + 160), (255, 255, 255))
    bg.paste(m, (80, 80), m)
    bg.save("refs/lockup.png")
    print("wrote refs/lockup.png", bg.size, flush=True)


# Cut-out mark placement, same meaning as MARK but measured on the white
# plates. Set after looking at them — see PROMPTS.md stage 2.
CUT_MARK = {
    "bayanihan": (0.50, 0.47, 0.20, PAPER),
    "sulong": (0.50, 0.49, 0.20, PAPER),
    "kasama": (0.50, 0.50, 0.24, INK),
}


def cutouts():
    """Key the white background out of each cut plate, composite the mark, and
    write a transparent WebP the product cards can sit on their own wash."""
    from PIL import Image, ImageDraw, ImageFilter
    from mark import render_mark
    pub = os.path.join(HERE, "..", "..", "public", "photos")
    for line, (cx, cy, wf, colour) in CUT_MARK.items():
        img = Image.open(os.path.join(OUT, f"{line}-cut.png")).convert("RGBA")
        w, h = img.size
        layer = render_mark(int(w * wf), color=colour)
        img.alpha_composite(layer, (int(cx * w - layer.width / 2),
                                    int(cy * h - layer.height / 2)))
        # Key the background by flood fill from the corners, not by luminance.
        # The plates come back at 248-255 with a soft vignette, and Kasama's
        # fibreglass face is pale enough that any global threshold that kills
        # the background eats the face too. A connected fill can't reach the
        # face — the black edge guard encloses it.
        probe = img.convert("RGB")
        KEY = (255, 0, 255)  # impossible in a monochrome plate
        for corner in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
            ImageDraw.floodfill(probe, corner, KEY, thresh=18)
        keyed = probe.load()
        alpha = Image.new("L", (w, h), 255)
        ap = alpha.load()
        for y in range(h):
            for x in range(w):
                if keyed[x, y] == KEY:
                    ap[x, y] = 0
        # Feather the 1px fill boundary so the edge guard keeps its antialiasing
        alpha = alpha.filter(ImageFilter.GaussianBlur(0.8))
        img.putalpha(alpha)
        img = img.crop(img.getbbox())
        # Every line lands on the same 900x1950 canvas so the product cards
        # share one aspect ratio and one width/height pair — three different
        # intrinsic sizes would mean three CLS boxes for one row of cards.
        CANVAS = (900, 1950)
        scale = min(CANVAS[0] / img.width, CANVAS[1] / img.height)
        img = img.resize((int(img.width * scale), int(img.height * scale)),
                         Image.LANCZOS)
        canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
        canvas.paste(img, ((CANVAS[0] - img.width) // 2,
                           (CANVAS[1] - img.height) // 2))
        img = canvas
        out = os.path.join(pub, f"{line}-product.webp")
        img.save(out, "WEBP", quality=88, method=6)
        print(f"{line}-product: {img.size[0]}x{img.size[1]} "
              f"{os.path.getsize(out)//1024}KB", flush=True)


STILL = (
    "Editorial sport-documentary photograph. Available light only, honest deep "
    "contrast, subtle 35mm film grain, natural reportage framing, the look of a "
    "printed magazine photo essay, not glossy stock photography. Philippine "
    "pickleball culture: covered community courts, harsh tropical daylight. "
    "Strong tonal value separation so the frame still reads clearly when "
    "converted to black and white. Absolutely no text, no lettering, no "
    "numbers, no logos, no signage, no printed graphics, no brand marks "
    "anywhere in the frame. No identifiable faces: any people are turned away, "
    "backlit, in deep shadow, or motion-blurred. Subject: The approach to a "
    "covered Philippine community pickleball court in late afternoon, seen from "
    "outside the long metal roof: a chain-link fence in the near foreground, "
    "the bright painted court beyond it, four players rallying at a distance as "
    "small backlit figures. Wide, level, eye-height framing on a straight axis "
    "down the court, deep space receding to the far baseline. Full-bleed "
    "photograph filling the entire frame edge to edge, not a printed page, not "
    "a magazine, no border, no matte, no frame."
)
# Without that last clause the still comes back as a bordered print, and Veo
# inherits the matte into the first ~20 frames of leg 0.

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    cmd = sys.argv[1]
    if cmd == "plates":
        for s in MASTERS:
            _gen(s)
    elif cmd == "mark":
        mark_plates()
    elif cmd == "lockup":
        lockup_ref()
    elif cmd == "cuts":
        for s in CUTOUTS:
            _gen(s)
    elif cmd == "cutouts":
        cutouts()
    elif cmd == "paddles":
        for s in REF:
            _gen(s)
    elif cmd == "scenes":
        for s in SET:
            if s not in REF:
                _gen(s)
    elif cmd == "still":
        os.makedirs("legs", exist_ok=True)
        if os.path.exists("legs/flight-open.png"):
            print("skip (exists): flight-open")
        else:
            gen_image(STILL, "legs/flight-open.png", "16:9", "2K")
            print("wrote legs/flight-open.png")
    else:
        for s in sys.argv[1:]:
            _gen(s)
