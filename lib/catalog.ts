/**
 * Catalog + brand facts.
 *
 * Every regulatory figure here is sourced from the USA Pickleball Official
 * Rulebook / Equipment Standards Manual, and every Philippine figure from
 * PPF, SM Active Hub, or DUPR reporting. Marketing copy may be opinionated;
 * the numbers may not. If a number changes upstream, change it here — this
 * is the only place they live.
 */

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
  art: "weave" | "grid" | "solid";
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
    art: "weave",
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
    art: "grid",
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
    art: "solid",
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

/** Verified facts. Each one carries its own source for the credibility rail. */
export const FACTS = [
  {
    figure: "90%",
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
    label: "member clubs under the Philippine Pickleball Federation",
    source: "PPF, October 2025",
  },
  {
    figure: "86",
    label: "courts across 29 SM malls nationwide",
    source: "SM Active Hub, May 2026",
  },
];

export const peso = (n: number) =>
  "₱" + n.toLocaleString("en-PH", { minimumFractionDigits: 0 });
