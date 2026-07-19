"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Scroll-linked depth.
 *
 * Rules this is built to, because parallax is a documented vestibular trigger:
 *
 *  1. `prefers-reduced-motion` kills it outright — the branch lives inside
 *     useTransform, never in the markup, or it hydration-mismatches.
 *  2. Restrained travel. `speed` is a fraction of the element's own height;
 *     0.10–0.16 reads as depth, 0.4 reads as a fairground.
 *  3. Never applied to running body copy. Media and diagrams drift; text the
 *     reader is tracking stays exactly where they left it.
 *
 * The spring takes the raw scroll edge off so the layer settles instead of
 * snapping frame-to-frame with the wheel.
 */
export default function Parallax({
  children,
  speed = 0.12,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  const pct = speed * 100;
  const y = useTransform(smooth, [0, 1], [-pct, pct]);
  const yOut = useTransform(y, (v) => (reduce ? "0%" : `${v}%`));

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: yOut }}>{children}</motion.div>
    </div>
  );
}
