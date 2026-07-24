"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type Props = {
  /** Deterministic image seed — same seed always returns the same photo. */
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
  /** Inner-layer drift as a fraction of frame height. The frame holds; the
      image travels inside it. 0 disables. Killed under reduced motion. */
  parallax?: number;
  /** Requested pixel dimensions from the image service. */
  w?: number;
  h?: number;
  /** Overlaid content — floating stat chips, labels. */
  children?: ReactNode;
};

/**
 * Grayscale photography, framed like a contact sheet.
 *
 * v2 replaces v1's drawn SVG placeholders with real photographs (client
 * request), pulled from a deterministic stand-in service and desaturated so
 * they read in the brand's monochrome language. Swap the `src` for shot
 * photography before launch; the API stays the same. The drawn Court and
 * Paddle marks stay drawn — those are the brand argument, not decoration.
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
  parallax = 0,
  w = 1100,
  h = 1400,
  children,
}: Props) {
  const src = `https://picsum.photos/seed/g4-${seed}/${w}/${h}?grayscale`;

  // Deterministic backdrop variant from the seed, so a slow or blocked image
  // still shows a branded monochrome field (halftone + form) rather than a
  // flat box — the drawn language survives, the photo layers on top.
  const hash = Array.from(seed).reduce((a, c) => a + c.charCodeAt(0), 0);
  const variant = (hash % 4) + 1;
  const pid = `ph-${seed}`;

  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });
  const travel = parallax * 100;
  const raw = useTransform(smooth, [0, 1], [-travel, travel]);
  const y = useTransform(raw, (v) => (reduce ? "0%" : `${v}%`));
  const overhang = travel * 1.35;

  return (
    <figure className={className}>
      <div
        ref={frame}
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

        <motion.div
          style={
            parallax
              ? {
                  y,
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `-${overhang}%`,
                  height: `${100 + overhang * 2}%`,
                }
              : { position: "absolute", inset: 0 }
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        </motion.div>

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
