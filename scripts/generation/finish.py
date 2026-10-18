"""Composite the brand mark onto product frames, then export the whole set as
WebP into public/photos/ at served sizes.

Placement config is per-frame and hand-set after visual review: (cx, cy) is
the mark's centre in fractional image coords, w is mark width as a fraction
of image width, color ink/paper by the landing surface, rot in degrees.
The mark never lands on a hitting face (MODERNIZE.md §2.6).
"""
import os
from PIL import Image, ImageFilter

from mark import render_mark

INK = (12, 11, 9)
PAPER = (246, 244, 238)

# seed -> (cx, cy, w_frac, color, rot_deg)
#
# Empty, and that is the point. Both halves of the set now carry the mark from
# generation: paddles inherit it from their marked plate, apparel is generated
# with the lockup as a reference image so the print wraps into the drape and
# takes the fabric's own light. A composited vector sits dead flat on folded,
# angled cloth and reads as a sticker — that was the old apparel look.
#
# Keep the machinery: a future flat surface may still want a stamped mark.
COMPOSITE = {}

EXPORT_W = {
    "court-hero": 1920, "cebu-gym": 1600,
    "bayanihan-face": 1000, "bayanihan-grip": 1000, "bayanihan-court": 1000,
    "sulong-face": 1000, "sulong-grip": 1000, "sulong-court": 1000,
    "kasama-face": 1000, "kasama-grip": 1000, "kasama-court": 1000,
    "apparel-campaign": 1600, "apparel-detail": 1200,
    "apparel-kitchen-tee": 1600, "apparel-club-polo": 1200,
    "apparel-four-cap": 1200, "apparel-rally-short": 1200,
    "apparel-warmup-crew": 1200, "apparel-paddle-sleeve": 1200,
    "four-workshop": 1600, "stockist-map": 1000,
}

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "out")
PUB = os.path.join(HERE, "..", "..", "public", "photos")


def trim_border(im, max_frac=0.12):
    """Crop baked-in film/matte borders: peel edge rows/cols that are
    near-uniform and near-WHITE, up to max_frac per side.

    White only, deliberately. Peeling near-black too ate the dark gym wall on
    bayanihan-face and left it 895x1018 instead of square — a dark, low-variance
    edge is ordinary photography, a white one is the print-matte artifact."""
    g = im.convert("L")
    w, h = g.size
    px = g.load()

    def row_uniform(y):
        vals = [px[x, y] for x in range(0, w, max(1, w // 200))]
        mean = sum(vals) / len(vals)
        var = sum((v - mean) ** 2 for v in vals) / len(vals)
        return var < 90 and mean > 235

    def col_uniform(x):
        vals = [px[x, y] for y in range(0, h, max(1, h // 200))]
        mean = sum(vals) / len(vals)
        var = sum((v - mean) ** 2 for v in vals) / len(vals)
        return var < 90 and mean > 235

    top = 0
    while top < h * max_frac and row_uniform(top):
        top += 1
    bottom = h
    while bottom > h * (1 - max_frac) and row_uniform(bottom - 1):
        bottom -= 1
    left = 0
    while left < w * max_frac and col_uniform(left):
        left += 1
    right = w
    while right > w * (1 - max_frac) and col_uniform(right - 1):
        right -= 1
    if (top, left, bottom, right) != (0, 0, h, w):
        # a couple of extra px past the soft border edge
        pad = 3
        im = im.crop((min(left + pad, w // 4), min(top + pad, h // 4),
                      max(right - pad, w * 3 // 4), max(bottom - pad, h * 3 // 4)))
    return im


def composite(seed, im):
    cfg = COMPOSITE.get(seed)
    if not cfg:
        return im
    cx, cy, w_frac, color, rot = cfg
    m = render_mark(int(im.width * w_frac), color)
    if rot:
        m = m.rotate(rot, expand=True, resample=Image.BICUBIC)
    # a hair of blur so the vector edge sits in the photo's own softness
    m = m.filter(ImageFilter.GaussianBlur(0.4))
    x = int(im.width * cx - m.width / 2)
    y = int(im.height * cy - m.height / 2)
    out = im.convert("RGBA")
    out.alpha_composite(m, (x, y))
    return out


def export():
    os.makedirs(PUB, exist_ok=True)
    for seed, target_w in EXPORT_W.items():
        src = os.path.join(RAW, seed + ".png")
        if not os.path.exists(src):
            print("MISSING", seed)
            continue
        im = Image.open(src).convert("RGBA")
        im = trim_border(im)
        im = composite(seed, im)
        if im.width > target_w:
            im = im.resize((target_w, int(im.height * target_w / im.width)), Image.LANCZOS)
        out = f"{PUB}/{seed}.webp"
        budget = 150 if seed == "court-hero" else 200
        # Quality first, down to 60. Below that WebP goes blotchy on concrete
        # and fabric, so trade pixels instead: shrink 15% and try again.
        rgb = im.convert("RGB")
        for _ in range(4):
            for q in range(80, 52, -8):
                rgb.save(out, "WEBP", quality=q, method=6)
                if os.path.getsize(out) / 1024 <= budget:
                    break
            if os.path.getsize(out) / 1024 <= budget or q > 60:
                break
            rgb = rgb.resize((int(rgb.width * 0.85), int(rgb.height * 0.85)),
                             Image.LANCZOS)
        print(f"{seed}: {rgb.size[0]}x{rgb.size[1]} q{q} {os.path.getsize(out)//1024}KB")


if __name__ == "__main__":
    export()
