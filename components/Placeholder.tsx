"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type Props = {
  uid: string;
  /** Composition variant — keeps repeated placeholders from looking cloned. */
  variant?: 1 | 2 | 3 | 4;
  ratio?: string;
  label?: string;
  caption?: string;
  className?: string;
  dark?: boolean;
  /**
   * Inner-layer drift, as a fraction of frame height. The frame stays put and
   * the image travels inside it — that is what reads as depth; moving the
   * whole block just makes the layout feel loose. 0 disables.
   */
  parallax?: number;
};

/**
 * Stand-in for photography.
 *
 * Halftone field plus a geometric form, in the brand's monochrome language —
 * so an unshot page still reads as designed. Replace with real court and
 * player photography before launch; that is the single biggest lift available
 * to this site.
 */
export default function Placeholder({
  uid,
  variant = 1,
  ratio = "4 / 5",
  label = "Image",
  caption,
  className = "",
  dark = false,
  parallax = 0,
}: Props) {
  const ink = dark ? "var(--paper)" : "var(--ink)";
  const bg = dark ? "var(--ink)" : "var(--wash)";
  const p = (s: string) => `${s}-${uid}`;

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
  // The reduced-motion branch lives in the transform, never in the markup —
  // gating what renders on a media query hydration-mismatches.
  const y = useTransform(raw, (v) => (reduce ? "0%" : `${v}%`));
  // Over-tall by more than its travel, so the frame never shows an edge.
  const overhang = travel * 1.35;

  return (
    <figure className={`relative grain ${dark ? "grain-invert" : ""} ${className}`}>
      <div
        ref={frame}
        style={{ aspectRatio: ratio, background: bg }}
        className="overflow-hidden relative"
      >
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
        <svg
          viewBox="0 0 400 500"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={p("halftone")}
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="5" cy="5" r="3.1" fill={ink} opacity="0.5" />
            </pattern>
            {/* Luminance mask — white/black here are alpha stops, not palette. */}
            <linearGradient id={p("fade")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id={p("mask")}>
              <rect width="400" height="500" fill={`url(#${p("fade")})`} />
            </mask>
          </defs>

          <rect
            width="400"
            height="500"
            fill={`url(#${p("halftone")})`}
            mask={`url(#${p("mask")})`}
            opacity="0.5"
          />

          {/* Tonal, not solid — these stand in for photographs, and a page of
              flat black blobs reads heavier than the images will. */}
          {variant === 1 && (
            <>
              <circle cx="200" cy="250" r="128" fill={ink} opacity="0.72" />
              <path d="M0 500 L200 190 L400 500 Z" fill={ink} opacity="0.12" />
            </>
          )}

          {variant === 2 && (
            <>
              <rect x="52" y="96" width="296" height="330" fill={ink} opacity="0.7" />
              <circle cx="200" cy="200" r="66" fill={dark ? "var(--ink)" : "var(--paper)"} />
            </>
          )}

          {variant === 3 && (
            <>
              <path
                d="M-40 420 Q200 140 440 400 L440 500 L-40 500 Z"
                fill={ink}
                opacity="0.74"
              />
              <circle cx="288" cy="140" r="52" stroke={ink} strokeWidth="2" fill="none" />
              <circle cx="288" cy="140" r="22" fill={ink} opacity="0.5" />
            </>
          )}

          {variant === 4 && (
            <>
              <rect x="0" y="286" width="400" height="214" fill={ink} opacity="0.72" />
              <rect
                x="118"
                y="60"
                width="164"
                height="330"
                rx="82"
                fill={ink}
                opacity="0.28"
              />
            </>
          )}
        </svg>
        </motion.div>
      </div>

      {/* Corner slug — pinned to the frame, so it does not drift with the
          image. Reads as a contact sheet, not a broken asset. */}
      <figcaption
        className="absolute top-3 left-3 data px-2 py-1"
        style={{
          background: dark ? "var(--ink)" : "var(--paper)",
          color: dark ? "var(--paper)" : "var(--ink)",
          opacity: 0.72,
        }}
      >
        {label}
      </figcaption>

      {caption && (
        <p className="data mt-4" style={{ color: "var(--mute)" }}>
          {caption}
        </p>
      )}
    </figure>
  );
}
