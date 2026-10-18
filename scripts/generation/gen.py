"""Vertex AI generation helpers for the Greater4 brand set.

Images: gemini-3-pro-image (Nano Banana Pro), generateContent REST.
Video:  veo-3.1 family, predictLongRunning REST (used by flight.py).

Auth: Application Default Credentials (`gcloud auth application-default login`).
Set GOOGLE_CLOUD_PROJECT to the billing project. All calls are billed
to that project — probe first, batch second, per the brief's cost rule.
"""
import base64
import json
import os
import sys
import time
import urllib.request
import urllib.error

import google.auth
import google.auth.transport.requests

PROJECT = os.environ["GOOGLE_CLOUD_PROJECT"]
LOC = "us-central1"
IMG_MODEL = "gemini-3-pro-image"

_creds = None

def token():
    global _creds
    if _creds is None:
        _creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    if not _creds.valid:
        _creds.refresh(google.auth.transport.requests.Request())
    return _creds.token


def _post(url, body, timeout=300):
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={
            "Authorization": "Bearer " + token(),
            "Content-Type": "application/json",
            "x-goog-user-project": PROJECT,
        },
    )
    return json.loads(urllib.request.urlopen(req, timeout=timeout).read())


def gen_image(prompt, out_path, aspect="4:5", size="2K", retries=3, refs=()):
    # Gemini 3 image models are served from the global endpoint only.
    url = (f"https://aiplatform.googleapis.com/v1/projects/{PROJECT}"
           f"/locations/global/publishers/google/models/{IMG_MODEL}:generateContent")
    # Reference images come first: the model reads them as the object to keep,
    # the text as what to do with it. This is what makes the paddle the same
    # paddle in every frame (see PROMPTS.md, paddle system).
    parts = []
    for r in refs:
        with open(r, "rb") as f:
            parts.append({"inlineData": {
                "mimeType": "image/png" if r.endswith(".png") else "image/jpeg",
                "data": base64.b64encode(f.read()).decode()}})
    parts.append({"text": prompt})
    body = {
        "contents": [{"role": "user", "parts": parts}],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
            "imageConfig": {"aspectRatio": aspect, "imageSize": size},
        },
    }
    last = None
    for attempt in range(retries):
        try:
            resp = _post(url, body)
            for part in resp["candidates"][0]["content"]["parts"]:
                if "inlineData" in part:
                    data = base64.b64decode(part["inlineData"]["data"])
                    with open(out_path, "wb") as f:
                        f.write(data)
                    return out_path
            last = "no inlineData in response: " + json.dumps(resp)[:400]
            time.sleep(6)
        except urllib.error.HTTPError as e:
            body_txt = e.read()[:400].decode(errors="replace")
            last = f"HTTP {e.code}: {body_txt}"
            if e.code == 429:
                # Low default RPM quota on this project: wait it out.
                time.sleep(45 + 15 * attempt)
            else:
                time.sleep(6 * (attempt + 1))
        except Exception as e:  # transient network etc.
            last = repr(e)
            time.sleep(6 * (attempt + 1))
    raise RuntimeError(f"gen_image failed for {out_path}: {last}")


if __name__ == "__main__":
    # Probe: one image, verifies auth, endpoint, and billing behaviour.
    prompt = sys.argv[1] if len(sys.argv) > 1 else "A single fresh pickleball on a plain concrete floor, editorial photograph, available light, no text, no logos."
    out = sys.argv[2] if len(sys.argv) > 2 else "probe.png"
    aspect = sys.argv[3] if len(sys.argv) > 3 else "1:1"
    size = sys.argv[4] if len(sys.argv) > 4 else "1K"
    print(gen_image(prompt, out, aspect, size))
