# Greater4

[![License: MIT](https://img.shields.io/badge/license-MIT-black.svg)](LICENSE)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-black?logo=react)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-black?logo=tailwindcss)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-black?logo=typescript)

Marketing site for a Philippine premium pickleball brand built around doubles:
three paddles, a six-piece apparel line, the brand story, and a stockist page.
The thesis is a sourced fact (the court is the same 20×44 ft for singles and
doubles, and most rated play is doubles), so every figure on the site traces to
the USAP rulebook, DUPR, PPF, or SM Active Hub. Monochrome, prerendered, with
generated brand photography and a scroll-scrubbed hero flight on the home page.

Next.js 16 App Router · React 19 · Tailwind v4 · Motion 12 · fully static, no
runtime services.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, every route prerendered
npm run start    # serve the production build
npm run lint     # ESLint (eslint-config-next)
```

There is no test suite. Build and lint are the checks.

## Pages

| Route | What it is |
|---|---|
| `/` | Thesis, hero flight, the three paddles, testimonials, FAQ |
| `/paddles` | The paddle range with control / power / spin bars |
| `/paddles/[slug]` | Product pages for `bayanihan`, `sulong`, `kasama`: full spec, drag-to-rotate paddle |
| `/apparel` | Six apparel pieces |
| `/the-four` | Brand story and the history of Philippine pickleball |
| `/stockists` | Where to hold a paddle before buying, plus club enquiries |

Also generated: `sitemap.xml`, `robots.txt`, the Open Graph image and the app
icons; `public/llms.txt` is static. Organization JSON-LD ships site-wide,
Product and BreadcrumbList JSON-LD on every product page, FAQPage on the home
page. All origins read `SITE` from `lib/catalog.ts`, so the domain changes in
one place.

## Structure

```
app/                  routes, layout, metadata, OG image, sitemap, robots
  globals.css         every design token (there is no tailwind.config)
components/           Court, HeroFlight, PaddleViewer, Photo, Wordmark, ...
lib/catalog.ts        paddles, apparel, testimonials, FAQ, sourced figures
lib/meta.ts           per-route metadata helper
public/photos/        generated brand photography (WebP)
public/flight/        hero flight clips (MP4) and poster
public/brand/         the GREATER4 lockup (SVG)
scripts/generation/   Vertex AI pipeline that produced photos/ and flight/
```

The generation pipeline is Python (Pillow, `google-auth`) and calls paid
Vertex AI image and video models with your own gcloud ADC credentials. It is
not needed to run or build the site. See `scripts/generation/README.md`.

## Before you edit

- `PROJECT.md`: current state, and what is still a placeholder (no cart or
  checkout, forms post to `#`, invented stockist list, placeholder
  testimonials).
- `DECISIONS.md`: why the brand and design are the way they are.
- `AGENTS.md`: house rules (monochrome only, numbers are sourced, the copy
  test).

## License

Code is released under the [MIT License](LICENSE). The Greater4 name and
lockup identify the project and are not covered by the license.
