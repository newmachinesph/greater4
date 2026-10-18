"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

/**
 * Scroll-velocity marquee.
 *
 * Baseline drift, plus the scroll gesture pushing the track faster and
 * flipping its direction on scroll-up. The strip reports which way the page
 * is moving, which is the only reason it earns motion at all — a strip that
 * slides at a constant rate forever is wallpaper.
 *
 * Under reduced motion it doesn't move: the copy renders as a static row.
 */
export default function Marquee({
  items,
  dark = false,
  baseVelocity = 2.2,
}: {
  items: string[];
  dark?: boolean;
  baseVelocity?: number;
}) {
  const reduce = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });

  // Two copies, so -50% lands the seam exactly back at the start.
  // The reduced-motion branch lives *inside* the transform rather than
  // swapping `style` to undefined — unbinding a motion value leaves the last
  // transform on the node instead of clearing it.
  const x = useTransform(baseX, (v) => (reduce ? "0%" : `${wrap(-50, 0, v)}%`));
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;

    let moveBy = direction.current * baseVelocity * (delta / 1000);

    // Scroll direction steers the track.
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;

    moveBy += moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  const run = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-5 border-y select-none"
      style={{
        borderColor: dark ? "var(--rule-inv)" : "var(--rule)",
        background: dark ? "var(--ink)" : "transparent",
        color: dark ? "var(--paper)" : "inherit",
      }}
      aria-hidden="true"
    >
      <motion.div className="flex w-max" style={{ x }}>
        {run.map((item, i) => (
          <span key={i} className="data flex items-center whitespace-nowrap">
            {item}
            <span className="mx-8 opacity-30">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
