"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import PaddleShot from "./PaddleShot";
import type { Line } from "@/lib/catalog";

/**
 * Drag-to-inspect paddle.
 *
 * A paddle is a flat object, so this is CSS 3D rather than WebGL — a real
 * renderer would cost ~150 KB gzipped to rotate two faces and an edge, which
 * is the entire JS budget for this page. See DECISIONS.md.
 *
 * Three input paths, because a drag-only affordance excludes keyboard and
 * reads as broken on touch: pointer drag, arrow keys when focused, and a Flip
 * button.
 */
export default function PaddleViewer({ line }: { line: Line }) {
  const reduce = useReducedMotion();
  const [hint, setHint] = useState(true);

  // Raw target angle; the spring is what the user actually sees.
  const angle = useMotionValue(-16);
  const smooth = useSpring(angle, reduce ? { duration: 0 } : { stiffness: 90, damping: 18 });
  const rotateY = useTransform(smooth, (v) => `${v}deg`);

  // The face that's currently pointing away gets dimmed, so depth reads even
  // in flat monochrome.
  const frontDim = useTransform(smooth, (v) => {
    const a = ((v % 360) + 360) % 360;
    return a > 90 && a < 270 ? 0 : 1;
  });
  const backDim = useTransform(frontDim, (v) => 1 - v);

  const dragging = useRef(false);

  const nudge = (deg: number) => {
    setHint(false);
    angle.set(angle.get() + deg);
  };

  return (
    <div className="relative">
      <motion.div
        className="relative grain round-xl overflow-hidden flex items-center justify-center py-[clamp(3rem,7vw,6rem)] cursor-grab active:cursor-grabbing touch-pan-y"
        // clip-path clips across the 3D boundary; plain overflow:hidden doesn't
        // clip a preserve-3d subtree, so the rotated paddle would poke out and
        // widen the page.
        style={{ background: "var(--wash)", perspective: 1400, clipPath: "inset(0 round var(--r-xl))" }}
        tabIndex={0}
        // Not role="slider": there is no value to report, and a slider whose
        // aria-valuenow never moves is worse than no widget role at all. It's
        // a focusable group with arrow-key rotation, and the Flip/Reset buttons
        // below give the same job a non-drag path.
        role="group"
        aria-label={`${line.name} paddle. Drag or use the arrow keys to rotate and inspect both faces.`}
        onPanStart={() => {
          dragging.current = true;
          setHint(false);
        }}
        onPan={(_, info) => {
          if (dragging.current) angle.set(angle.get() + info.delta.x * 0.55);
        }}
        onPanEnd={() => {
          dragging.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            nudge(30);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            nudge(-30);
          }
        }}
      >
        <motion.div
          className="relative w-[52%] max-w-[320px]"
          style={{ rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <motion.div style={{ opacity: frontDim, backfaceVisibility: "hidden" }}>
            <PaddleShot
              slug={line.slug}
              name={line.name}
              priority
              className="w-full h-auto"
            />
          </motion.div>

          {/* Back — carries the spec, so flipping it over is worth doing */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: backDim,
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <PaddleShot
              slug={line.slug}
              name={line.name}
              reversed
              className="w-full h-auto"
            />
            <div className="absolute inset-x-0 top-[38%] text-center px-6">
              <p className="data" style={{ color: "var(--mute)" }}>
                {line.thickness} · {line.weight}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <span className="data absolute top-5 left-5" style={{ color: "var(--mute)" }}>
          {line.role}
        </span>

        {/* Rendered regardless of motion preference. Gating it on
            useReducedMotion() hydration-mismatches: the server has no media
            query, so it emits the hint, and a reduced-motion client doesn't —
            which broke hydration for exactly the users we owe the most care.
            It's an affordance label, not decoration; everyone needs it. */}
        {hint && (
          <motion.span
            className="data absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{ color: "var(--mute)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Drag to inspect
          </motion.span>
        )}
      </motion.div>

      <div className="flex items-center gap-6 mt-4">
        <button type="button" onClick={() => nudge(180)} className="data link">
          Flip
        </button>
        <button
          type="button"
          onClick={() => {
            setHint(false);
            angle.set(-16);
          }}
          className="data link"
          style={{ color: "var(--mute)" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
