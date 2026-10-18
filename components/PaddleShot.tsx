type Props = {
  slug: string;
  name: string;
  className?: string;
  /** The hero card is the one paddle worth fetching eagerly. */
  priority?: boolean;
  /** Reverse face: the same shot, flipped. A real paddle is symmetrical. */
  reversed?: boolean;
};

/**
 * The product shot. Replaces the drawn `Paddle` art in every card and in the
 * PDP viewer, on explicit request — photography of the real object, carrying
 * the mark on its face.
 *
 * The source is a cut-out plate (`scripts/generation/run.py cutouts`): the
 * paddle keyed off a white seamless onto transparency and padded to one
 * 900x1950 canvas, so all three lines share an intrinsic size and sit on the
 * card's own wash instead of bringing a background rectangle with them.
 */
export default function PaddleShot({
  slug,
  name,
  className,
  priority,
  reversed,
}: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/photos/${slug}-product.webp`}
      alt={`${name} paddle${reversed ? ", reverse face" : ""}`}
      width={900}
      height={1950}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={reversed ? { transform: "scaleX(-1)" } : undefined}
    />
  );
}
