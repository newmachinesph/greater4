"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Count-up figure for the stat band. Rolls from zero to the value on first
 * view, once. Reduced motion shows the final number outright — a spinning
 * odometer is exactly the kind of motion that setting exists to stop.
 *
 * The rendered value is always the real figure; only the tween is cosmetic,
 * so a static render (or a stalled frame) still reads correctly.
 */
export default function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    let start: number | null = null;
    const ms = duration * 1000;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / ms, 1);
      setDisplay(value * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className="nums">
      {prefix}
      {display.toLocaleString("en-PH", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
