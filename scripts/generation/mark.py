"""Rasterize the Greater4 lockup SVG (public/brand/greater4-lockup.svg) at any
width, anti-aliased via 4x supersampling, as an RGBA layer for compositing onto
generated product imagery. Pure PIL; parses the trace's M/L/Q path data directly
(even-odd fill), so no SVG renderer is needed on Windows.

Usage:
    from mark import render_mark
    layer = render_mark(width_px=380, color=(12, 11, 9))    # ink
    layer = render_mark(width_px=380, color=(246, 244, 238))  # paper
    img.alpha_composite(layer, (x, y))
"""
import os
import re
from PIL import Image, ImageDraw, ImageChops

SVG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        "..", "..", "public", "brand", "greater4-lockup.svg")
SS = 4  # supersample factor

# Path data glues commands to numbers ("M1189.44 0.29C1202..."), so tokenise
# rather than split on whitespace. Absolute M/L/H/V/C/Q/Z only — that is what
# the traced lockup emits; a relative command would be a silent wrong shape,
# so it raises instead.
_TOK = re.compile(r"([A-Za-z])|(-?\d*\.?\d+(?:[eE][-+]?\d+)?)")


def _subpaths(d):
    toks = [(a or b) for a, b in _TOK.findall(d)]
    out, cur, cmd = [], [], None
    i = 0
    while i < len(toks):
        t = toks[i]
        if t.isalpha():
            cmd, i = t, i + 1
            if cmd == "Z":
                continue
            if cmd.islower():
                raise ValueError(f"relative path command {cmd!r} not supported")
        n = lambda k: float(toks[i + k])  # noqa: E731
        if cmd == "M":
            if cur:
                out.append(cur)
            cur, i = [(n(0), n(1))], i + 2
            cmd = "L"  # implicit lineto for any repeated pairs
        elif cmd == "L":
            cur.append((n(0), n(1)))
            i += 2
        elif cmd in ("H", "V"):
            x, y = cur[-1]
            cur.append((n(0), y) if cmd == "H" else (x, n(0)))
            i += 1
        elif cmd in ("C", "Q"):
            x0, y0 = cur[-1]
            if cmd == "C":
                c1x, c1y, c2x, c2y, x1, y1 = (n(k) for k in range(6))
                i += 6
            else:  # a quadratic is a cubic with both controls pulled in
                cx, cy, x1, y1 = (n(k) for k in range(4))
                c1x, c1y = x0 + 2 / 3 * (cx - x0), y0 + 2 / 3 * (cy - y0)
                c2x, c2y = x1 + 2 / 3 * (cx - x1), y1 + 2 / 3 * (cy - y1)
                i += 4
            for s in range(1, 13):
                u = s / 12
                v = 1 - u
                cur.append((
                    v ** 3 * x0 + 3 * v * v * u * c1x + 3 * v * u * u * c2x + u ** 3 * x1,
                    v ** 3 * y0 + 3 * v * v * u * c1y + 3 * v * u * u * c2y + u ** 3 * y1,
                ))
        else:
            raise ValueError(f"unhandled path command {cmd!r}")
    if cur:
        out.append(cur)
    return out


def render_mark(width_px, color=(12, 11, 9)):
    svg = open(SVG_PATH).read()
    vb = re.search(r'viewBox="([\d.\s-]+)"', svg).group(1).split()
    VB_W, VB_H = float(vb[2]), float(vb[3])
    paths = re.findall(r'd="([^"]+)"', svg)
    scale = width_px * SS / VB_W
    w = int(VB_W * scale)
    h = int(VB_H * scale)
    mask = Image.new("1", (w, h), 0)
    for d in paths:
        for sp in _subpaths(d):
            layer = Image.new("1", (w, h), 0)
            ImageDraw.Draw(layer).polygon([(x * scale, y * scale) for x, y in sp], fill=1)
            mask = ImageChops.logical_xor(mask, layer)
    alpha = mask.convert("L").resize((width_px, int(VB_H / VB_W * width_px)), Image.LANCZOS)
    out = Image.new("RGBA", alpha.size, color + (0,))
    out.putalpha(alpha)
    return out


if __name__ == "__main__":
    m = render_mark(600)
    bg = Image.new("RGBA", (700, 140), (246, 244, 238, 255))
    bg.alpha_composite(m, (50, 30))
    bg.save("mark.selfcheck.png")
    assert m.size[0] == 600 and m.getchannel("A").getextrema()[1] > 200
    print("mark self-check ok", m.size)
