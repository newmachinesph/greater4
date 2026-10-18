"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Relative spec bar. Ticks are the scale; the fill is the value.
 *
 * Fills once on first view. The motion is the point: three bars filling to
 * different lengths reads as a comparison faster than three static bars do.
 */
export default function SpecBar({
  label,
  value,
  delay = 0,
}: {
  label: string;
  value: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="data w-[64px] shrink-0" style={{ color: "var(--mute)" }}>
        {label}
      </span>
      <span
        className="relative flex-1 h-[3px]"
        style={{ background: "var(--wash-deep)" }}
        role="img"
        aria-label={`${label}: ${value} out of 100`}
      >
        <motion.span
          className="absolute inset-y-0 left-0 origin-left"
          style={{ width: `${value}%`, background: "var(--ink)" }}
          initial={reduce ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
      <span className="data nums w-[28px] text-right">{value}</span>
    </div>
  );
}
