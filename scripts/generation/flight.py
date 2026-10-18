"""Veo 3.1 hero-flight chain (architecture A: one continuous forward take).

Each leg's start image = previous leg's ACTUAL last frame (ffmpeg-extracted),
no end image, per the scroll-world seam method. Sequential by design.

Usage:
    python flight.py leg <i>          # generate leg i (needs legs/leg{i-1}_last.png for i>0)
    python flight.py extract <i>      # extract legs/leg{i}_last.png from legs/leg{i}.mp4
"""
import base64
import json
import os
import sys
import time
import urllib.request
import urllib.error

from gen import PROJECT, token

LOC = "us-central1"
MODEL = "veo-3.1-generate-001"
BASE = (f"https://{LOC}-aiplatform.googleapis.com/v1/projects/{PROJECT}"
        f"/locations/{LOC}/publishers/google/models/{MODEL}")

STYLE_TAIL = (
    " Documentary sport-cinema look, available light, honest contrast, subtle "
    "film grain, strong tonal separation that survives black-and-white "
    "conversion. No text, no lettering, no logos, no signage anywhere. No "
    "identifiable faces: players distant, turned away, or motion-blurred. "
    "Smooth, graceful, slow constant motion, subtle parallax. No cuts."
)

LEGS = [
    # Leg 0 starts from the generated flight-open still.
    ("Single continuous cinematic camera move, no cuts. A slow, steady forward "
     "glide toward a covered Philippine community pickleball court in late "
     "afternoon: the camera drifts forward under the long metal roof, past a "
     "chain-link fence, toward the bright painted court where four players "
     "rally at a distance. In the final second, settle into a slow, steady "
     "forward glide toward the near baseline." + STYLE_TAIL),
    ("Single continuous cinematic camera move, no cuts. Continue the same "
     "slow, steady forward glide: the camera moves low over the painted court "
     "surface toward the net, the four players at the far kitchen line "
     "exchanging soft shots, hard shafts of tropical light raking the "
     "concrete. In the final second, settle into a slow, steady forward glide "
     "toward the net tape." + STYLE_TAIL),
    # No product close-up in the flight: a close paddle frame would trigger the
    # §2.6 traceability/composite rules, which can't be honoured in video.
    # NEVER moves backward: the first render pulled back from the net, which
    # reverses velocity across the seam and reads as a rewind.
    ("Single continuous cinematic camera move, no cuts. The camera NEVER "
     "moves backward and never pulls away. Continue the same slow, steady "
     "forward glide toward the net a few metres ahead, rising in a gentle "
     "arc to clear it, the net passing below and out of frame, then "
     "descending and gliding forward deep into the far court toward the "
     "players and the far baseline, shafts of late light raking the "
     "concrete. In the final second, settle into a slow, steady forward "
     "glide slowing toward a near hold." + STYLE_TAIL),
]


def _post(url, body, timeout=120):
    req = urllib.request.Request(
        url, data=json.dumps(body).encode(),
        headers={"Authorization": "Bearer " + token(),
                 "Content-Type": "application/json",
                 "x-goog-user-project": PROJECT})
    return json.loads(urllib.request.urlopen(req, timeout=timeout).read())


def gen_leg(i, start_image):
    with open(start_image, "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode()
    mime = "image/png" if start_image.endswith(".png") else "image/jpeg"
    body = {
        "instances": [{
            "prompt": LEGS[i],
            "image": {"bytesBase64Encoded": img_b64, "mimeType": mime},
        }],
        "parameters": {
            "aspectRatio": "16:9",
            "durationSeconds": 8,
            "resolution": "1080p",
            "sampleCount": 1,
            "generateAudio": False,
            "personGeneration": "allow_adult",
        },
    }
    op = _post(BASE + ":predictLongRunning", body)
    name = op["name"]
    print("operation:", name, flush=True)
    while True:
        time.sleep(20)
        res = _post(BASE + ":fetchPredictOperation", {"operationName": name})
        if res.get("done"):
            if "error" in res:
                raise RuntimeError(json.dumps(res["error"])[:500])
            vids = res["response"].get("videos") or res["response"].get(
                "generatedSamples") or []
            if not vids:
                raise RuntimeError("no video in response: " +
                                   json.dumps(res["response"])[:500])
            v = vids[0]
            b64 = (v.get("bytesBase64Encoded")
                   or v.get("video", {}).get("bytesBase64Encoded"))
            if not b64:
                raise RuntimeError("no bytes in video payload: " +
                                   json.dumps(v)[:300])
            out = f"legs/leg{i}.mp4"
            with open(out, "wb") as f:
                f.write(base64.b64decode(b64))
            print("wrote", out, os.path.getsize(out) // 1024, "KB", flush=True)
            return out
        print("  ...rendering", flush=True)


def extract_last(i):
    src = f"legs/leg{i}.mp4"
    out = f"legs/leg{i}_last.png"
    code = os.system(f'ffmpeg -y -loglevel error -sseof -0.15 -i {src} -frames:v 1 -q:v 2 {out}')
    if code != 0 or not os.path.exists(out):
        raise RuntimeError("frame extraction failed")
    print("extracted", out)
    return out


if __name__ == "__main__":
    os.makedirs("legs", exist_ok=True)
    cmd, i = sys.argv[1], int(sys.argv[2])
    if cmd == "leg":
        start = "legs/flight-open.png" if i == 0 else f"legs/leg{i-1}_last.png"
        gen_leg(i, start)
    elif cmd == "extract":
        extract_last(i)
