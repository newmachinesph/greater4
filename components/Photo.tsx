import type { ReactNode } from "react";

type Props = {
  /** Asset id — resolves to /photos/{seed}.webp under public/. */
  seed: string;
  alt: string;
  ratio?: string;
  /** Contact-sheet slug pinned to the frame's corner. */
  label?: string;
  /** Line printed beneath the frame — used to flag stand-in imagery. */
  caption?: string;
  className?: string;
  rounded?: string;
  /** Darken the base so overlaid chips/captions read. */
  veil?: boolean;
  /** Eager-load above the fold. */
  priority?: boolean;
  /** Intrinsic pixel dimensions of the served asset. */
  w?: number;
  h?: number;
  /** Overlaid content — floating stat chips, labels. */
  children?: ReactNode;
};

/**
 * Grayscale photography, framed like a contact sheet.
 *
 * Serves the generated brand set from public/photos/ (one file per seed,
 * see DECISIONS.md 2026-07-25 on the photography pipeline). The drawn
 * halftone backdrop stays: it is the loading and failure fallback, so a slow
 * connection still shows a branded monochrome field rather than a flat box.
 * The drawn Court stays drawn — that one is the brand argument, not
 * decoration. The paddle no longer is: `PaddleShot` serves a photographed
 * cut-out instead, on explicit request (DECISIONS.md 2026-08-01).
 * Parallax was removed with the hero-flight trade (DECISIONS.md
 * 2026-07-25): the frame and the image now hold still together.
 */
export default function Photo({
  seed,
  alt,
  ratio = "4 / 5",
  label,
  caption,
  className = "",
  rounded = "var(--r-lg)",
  veil = false,
  priority = false,
  w = 1100,
  h = 1400,
  children,
}: Props) {
  const src = `/photos/${seed}.webp`;

  // Deterministic backdrop variant from the seed, so a slow image still shows
  // a branded monochrome field (halftone + form) rather than a flat box.
  const hash = Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);
  const variant = (hash % 4) + 1;
  const pid = `ph-${seed}`;

  return (
    <figure className={className}>
      <div
        className={`photo ${veil ? "photo-veil" : ""}`}
        style={{ aspectRatio: ratio, borderRadius: rounded }}
      >
        {/* Branded backdrop — visible until/unless the photo paints over it. */}
        <svg
          viewBox="0 0 400 500"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <pattern id={`${pid}-h`} width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="3" fill="var(--ink)" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="500" fill={`url(#${pid}-h)`} opacity="0.4" />
          {variant === 1 && <circle cx="200" cy="250" r="128" fill="var(--ink)" opacity="0.5" />}
          {variant === 2 && <rect x="60" y="100" width="280" height="320" fill="var(--ink)" opacity="0.5" />}
          {variant === 3 && (
            <path d="M-40 440 Q200 150 440 420 L440 500 L-40 500 Z" fill="var(--ink)" opacity="0.5" />
          )}
          {variant === 4 && (
            <rect x="120" y="60" width="160" height="330" rx="80" fill="var(--ink)" opacity="0.42" />
          )}
        </svg>

        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            width={w}
            height={h}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
          />
        </div>

        {label && (
          <figcaption
            className="absolute top-3 left-3 data px-2 py-1 z-10"
            style={{
              background: "var(--paper)",
              color: "var(--ink)",
              opacity: 0.86,
              borderRadius: "var(--r-xs)",
            }}
          >
            {label}
          </figcaption>
        )}

        {children}
      </div>

      {caption && (
        <p className="data mt-4" style={{ color: "var(--mute)" }}>
          {caption}
        </p>
      )}
    </figure>
  );
}
