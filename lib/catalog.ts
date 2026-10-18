/**
 * Catalog + brand facts.
 *
 * Every regulatory figure here is sourced from the USA Pickleball Official
 * Rulebook / Equipment Standards Manual, and every Philippine figure from
 * PPF, SM Active Hub, or DUPR reporting. Marketing copy may be opinionated;
 * the numbers may not. If a number changes upstream, change it here — this
 * is the only place they live.
 */

/** Canonical origin. Metadata, sitemap and robots all read it from here. */
export const SITE = "https://greater4.ph";

export type Line = {
  slug: string;
  index: string;
  name: string;
  meaning: string;
  role: string;
  /** One-line card description — nobody else in the category ships this. */
  blurb: string;
  price: number;
  core: string;
  face: string;
  thickness: string;
  weight: string;
  handle: string;
  shape: string;
  /** 0-100, drives the spec bars. Relative within the range, not absolute. */
  control: number;
  power: number;
  spin: number;
  copy: string[];
  /** Face pattern id for the paddle illustration. */
};

export const LINES: Line[] = [
  {
    slug: "bayanihan",
    index: "001",
    name: "Bayanihan",
    meaning:
      "A whole neighbourhood lifting one house and carrying it somewhere better.",
    role: "Control / the doubles paddle",
    blurb:
      "16mm control build for the soft game. Made for the third shot, the reset, and the long dink exchange you eventually win.",
    price: 9800,
    core: "16mm polypropylene honeycomb",
    face: "Toray T700 raw carbon fibre",
    thickness: "16 mm",
    weight: "7.9 – 8.2 oz",
    handle: "5.3 in",
    shape: "Standard · 16.0 × 7.9 in",
    control: 94,
    power: 62,
    spin: 88,
    copy: [
      "Doubles isn't singles with a partner. It's a different sport played on the same rectangle, and it's decided in the seven feet either side of the net.",
      "Bayanihan is built for that seven feet. A thicker 16mm polypropylene core absorbs pace instead of returning it, which is exactly what you want when the point isn't to win the rally but to survive it on your terms.",
      "The raw T700 face is left unpainted. Paint fills the weave and kills the friction that makes spin, so we leave it off.",
    ],
  },
  {
    slug: "sulong",
    index: "002",
    name: "Sulong",
    meaning: "Forward. Not a retreat, not a hold. Advance.",
    role: "All-court / forward pressure",
    blurb:
      "14mm all-court build. Faster off the face for players who take the net early and refuse to give it back.",
    price: 9800,
    core: "14mm polypropylene honeycomb",
    face: "Toray T700 raw carbon fibre",
    thickness: "14 mm",
    weight: "8.0 – 8.3 oz",
    handle: "5.5 in",
    shape: "Elongated · 16.5 × 7.5 in",
    control: 78,
    power: 91,
    spin: 90,
    copy: [
      "Two millimetres isn't a rounding error. A 14mm core gives the ball back faster, which shortens your opponent's decision window and lengthens yours.",
      "The elongated shape moves the sweet spot up and away from your hand: more reach at the net, more purchase on the drive, and a punch volley that arrives before the answer does.",
      "A longer 5.5in handle leaves room for two hands on the backhand. Take it. The two-handed backhand roll is the most under-used shot in Philippine doubles.",
    ],
  },
  {
    slug: "kasama",
    index: "003",
    name: "Kasama",
    meaning: "The one you came with. Companion, partner, the other half of four.",
    role: "Club / first serious paddle",
    blurb:
      "16mm fibreglass build at a club price. Your first paddle that is genuinely a paddle, not a placeholder.",
    price: 5400,
    core: "16mm polypropylene honeycomb",
    face: "Woven fibreglass composite",
    thickness: "16 mm",
    weight: "7.8 – 8.1 oz",
    handle: "5.0 in",
    shape: "Standard · 15.9 × 8.0 in",
    control: 82,
    power: 74,
    spin: 66,
    copy: [
      "Most players' first paddle is a decision somebody else made for them: whatever came bundled with the court booking, whatever was on the rack.",
      "Kasama is the first one you choose. Fibreglass face, forgiving 16mm core, wide standard shape, generous sweet spot. It flatters a developing swing instead of punishing it.",
      "It's the cheapest paddle we make and it's still a real paddle. Those two things are allowed to be true at once.",
    ],
  },
];

export const APPAREL = [
  {
    slug: "kitchen-tee",
    index: "A01",
    name: "Seven Feet Tee",
    blurb:
      "Heavyweight 240gsm cotton, boxy cut, screen-printed court diagram at the back hem.",
    price: 1650,
    variant: "Court Wear",
  },
  {
    slug: "club-polo",
    index: "A02",
    name: "Club Polo",
    blurb:
      "Recycled piqué with a mesh underarm panel. Built for 34°C at 2pm on an uncovered court.",
    price: 2400,
    variant: "Court Wear",
  },
  {
    slug: "four-cap",
    index: "A03",
    name: "Four Cap",
    blurb: "Unstructured six-panel, cotton twill, embroidered numeral 4.",
    price: 1250,
    variant: "Lifestyle",
  },
  {
    slug: "rally-short",
    index: "A04",
    name: "Rally Short",
    blurb: "7in inseam, four-way stretch, two zip pockets that hold a phone still.",
    price: 2200,
    variant: "Court Wear",
  },
  {
    slug: "warmup-crew",
    index: "A05",
    name: "Warm-Up Crew",
    blurb: "Loopback fleece, dropped shoulder, for the hour before and the hour after.",
    price: 3100,
    variant: "Lifestyle",
  },
  {
    slug: "paddle-sleeve",
    index: "A06",
    name: "Paddle Sleeve",
    blurb: "Felt-lined canvas cover. Stops the edge guard wrecking everything else in the bag.",
    price: 980,
    variant: "Gear",
  },
];

/**
 * Verified facts. Each one carries its own source for the credibility rail.
 * `count` opts a figure into the count-up; without it the figure renders as
 * written. The pair lives here so editing a fact can't silently unwire its
 * animation the way a string match in the page would.
 */
export const FACTS: {
  figure: string;
  label: string;
  source: string;
  count?: number;
  suffix?: string;
}[] = [
  {
    figure: "90%",
    count: 90,
    suffix: "%",
    label: "of all rated pickleball is doubles",
    source: "DUPR logged match data",
  },
  {
    figure: "20 × 44",
    label: "feet. The court, identical for singles and doubles",
    source: "USA Pickleball Rulebook 2.A.1",
  },
  {
    figure: "277",
    count: 277,
    label: "member clubs under the Philippine Pickleball Federation",
    source: "PPF, October 2025",
  },
  {
    figure: "86",
    count: 86,
    label: "courts across 29 SM malls nationwide",
    source: "SM Active Hub, May 2026",
  },
];

export const peso = (n: number) =>
  "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 0 });

/* ------------------------------------------------------------------------
   v2 content — the section types the reference templates ship (trust strip,
   testimonials, FAQ). Numbers above are sourced; the material below is
   editorial or placeholder and is flagged as such on the pages that use it.
   ------------------------------------------------------------------------ */

/** Venues and bodies, for the trust marquee. Real names, public record. */
export const PARTNERS = [
  "Helios Pickleball",
  "SM Active Hub",
  "The Podium Courts",
  "Philippine Pickleball Federation",
  "BGC Sports Centre",
  "Cebu Pickleball Club",
  "PPA Tour Asia",
];

/** The three-part promise, for the home features band. */
export const PILLARS = [
  {
    k: "01",
    t: "The specification is the marketing",
    d: "Core, face, weight, handle, shape and conformance, published on the card before you buy. A brand that hides its spec is telling you something about its spec.",
  },
  {
    k: "02",
    t: "Raw face, always",
    d: "Paint fills the weave of a carbon face and flattens the friction that makes spin. We leave the T700 bare and let the paddle look like what it is.",
  },
  {
    k: "03",
    t: "Control over power",
    d: "USA Pickleball has cut the power ceiling twice since 2024 and banned grit treatments. The sport is legislating toward the soft game. We were already there.",
  },
  {
    k: "04",
    t: "Priced here, for here",
    d: "In pesos, on the page, no enquiry form. We would rather lose a sale to sticker shock than win one through ambiguity.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/** Placeholder voices — replace with real, permissioned player quotes. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The Bayanihan resets like nothing else I've held. The pace just dies on the face and drops in the kitchen. My third shot got two years better in a week.",
    name: "Marisol Reyes",
    role: "4.0 · Pasig",
  },
  {
    quote:
      "I take the net early and I don't give it back. Sulong punches through a hand battle before the other pair can answer. It plays as fast as it reads on paper.",
    name: "Emman Villanueva",
    role: "Open · Ortigas",
  },
  {
    quote:
      "First real paddle I've owned instead of whatever the court hands out. Kasama flatters a swing that's still learning, and it cost less than a month of bookings.",
    name: "Joy Tan",
    role: "3.5 · Mandaue",
  },
];

/** The questions the spec-forward copy invites. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "Why a raw carbon face and not a painted one?",
    a: "Paint fills the weave of a carbon face and flattens the micro-texture that grips the ball to make spin. Raw Toray T700 keeps that friction, within the USA Pickleball surface-roughness limit. It photographs less glossy and it plays better, so we leave it bare.",
  },
  {
    q: "Is 16mm thicker core better than 14mm?",
    a: "Neither is better in the abstract, they're different tools. A 16mm core absorbs pace for the soft control game (Bayanihan, Kasama); a 14mm core returns the ball faster for forward pressure at the net (Sulong). Core thickness is unregulated, so ours is a design choice, not a compliance figure.",
  },
  {
    q: "Are these paddles tournament legal?",
    a: "Yes. Every model conforms to USA Pickleball 2026 equipment standards: combined length and width under 24 in, length under 17 in, surface roughness within Rz 30 µm, and a power reading under the current 0.43 PBCoR ceiling.",
  },
  {
    q: "Why price everything openly in pesos?",
    a: "Because at a premium price point, confident pricing is positioning. No enquire-for-price, no landed-cost theatre. If the number gives you sticker shock, we'd rather you know now than feel misled later.",
  },
  {
    q: "What does the warranty cover?",
    a: "Two years against core delamination and face separation, the two failures that end a paddle's life early. Play with it for thirty days; if it's the wrong paddle for your game, send it back for a full refund.",
  },
];

