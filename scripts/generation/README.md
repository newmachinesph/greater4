# Generation pipeline (photography + hero flight)

Vertex AI pipeline that produced `public/photos/` and `public/flight/`.
Auth: gcloud ADC. Set `GOOGLE_CLOUD_PROJECT` to your billing project. Paid APIs — probe one
image and check spend before batching (see MODERNIZE.md §2.5).

- `gen.py` — Nano Banana Pro image calls (`gemini-3-pro-image`, global endpoint)
- `prompts.py` — the style preamble (byte-identical across the set) + per-seed subjects
- `finish.py` — border trim, mark compositing (placement config), WebP export
- `mark.py` — rasterizes `public/brand/greater4-lockup.svg` for compositing
- `flight.py` — Veo 3.1 leg chain (`veo-3.1-generate-001`); each leg starts on the
  previous leg's extracted last frame; inspect every handoff frame before the next leg

Reroll one image: delete `photos_raw/<seed>.png`, run `python gen_all.py <seed>`,
then re-export via `finish.py`. Encode settings for flight clips are in
DECISIONS.md 2026-07-25.
