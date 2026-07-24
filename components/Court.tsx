"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Props = {
  /** Unique per instance — namespaces the clip id. Several courts render
      on a single page, so a shared id would collide. */
  uid: string;
  className?: string;
  /** The four player marks. Solid, so they still read when dimmed. */
  players?: boolean;
  /** Dimension callouts. Turn off below ~400px wide — the type stops being
      legible and reads as noise. */
  dimensions?: boolean;
  inverted?: boolean;
  /**
   * Draw the court on first view: lines ink themselves in, then the four
   * players arrive. One-shot. The sequence *is* the argument — an empty
   * rectangle, then the thing that makes it a doubles court.
   */
  draw?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Court({
  uid,
  className,
  players: showPlayers = true,
  dimensions = true,
  inverted,
  draw = false,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  // Reduced motion, or a static instance: render the finished state outright.
  const still = !draw || reduce;
  const on = still || inView;

  const ink = inverted ? "var(--paper)" : "var(--ink)";
  const dot = inverted ? "var(--ink)" : "var(--paper)";
  const F = 10; // units per foot
  const W = 44 * F;
  const H = 20 * F;
  const net = W / 2;
  const kitchen = 7 * F;

  // Four players, held at the kitchen line — where doubles is actually played.
  const players = [
    { x: net - kitchen - 22, y: H * 0.27 },
    { x: net - kitchen - 22, y: H * 0.73 },
    { x: net + kitchen + 22, y: H * 0.27 },
    { x: net + kitchen + 22, y: H * 0.73 },
  ];

  /** Ink a stroke on. pathLength stays animate-driven in every case (framer
      paints it via stroke-dasharray, and a value it once controlled can't be
      handed back to `style`). A still instance just targets pathLength 1 with a
      zero-duration transition, so reduced motion and static courts render the
      finished frame instead of being stranded at the pathLength:0 initial. */
  const line = (delay: number) => ({
    initial: { pathLength: still ? 1 : 0 },
    animate: { pathLength: on ? 1 : 0 },
    transition: still ? { duration: 0 } : { duration: 0.9, delay, ease: EASE },
  });

  const fade = (delay: number, to = 0.3) =>
    still
      ? {}
      : {
          initial: { opacity: 0 },
          animate: on ? { opacity: to } : { opacity: 0 },
          transition: { duration: 0.5, delay, ease: EASE },
        };

  return (
    <svg
      ref={ref}
      viewBox={`-34 -46 ${W + 68} ${H + 92}`}
      className={className}
      role="img"
      aria-label="Regulation pickleball court, 44 by 20 feet, with the 7-foot non-volley zone on each side of the net and four players positioned at the kitchen line"
      fill="none"
      stroke={ink}
    >
      {/* Perimeter */}
      <motion.rect x="0" y="0" width={W} height={H} strokeWidth="2" {...line(0)} />

      {/* Non-volley zone lines */}
      <motion.line
        x1={net - kitchen}
        y1="0"
        x2={net - kitchen}
        y2={H}
        strokeWidth="1.2"
        {...line(0.55)}
      />
      <motion.line
        x1={net + kitchen}
        y1="0"
        x2={net + kitchen}
        y2={H}
        strokeWidth="1.2"
        {...line(0.55)}
      />

      {/* Service court centrelines — stop at the kitchen, as they do in life */}
      <motion.line
        x1="0"
        y1={H / 2}
        x2={net - kitchen}
        y2={H / 2}
        strokeWidth="1.2"
        {...line(0.7)}
      />
      <motion.line
        x1={net + kitchen}
        y1={H / 2}
        x2={W}
        y2={H / 2}
        strokeWidth="1.2"
        {...line(0.7)}
      />

      {/* Kitchen hatch — clipped to the non-volley zone so it cannot bleed
          into the service courts. */}
      <defs>
        <clipPath id={`nvz-${uid}`}>
          <rect x={net - kitchen} y="0" width={kitchen * 2} height={H} />
        </clipPath>
      </defs>
      <motion.g
        strokeWidth="0.6"
        opacity={still ? 0.3 : undefined}
        clipPath={`url(#nvz-${uid})`}
        {...fade(0.95)}
      >
        {Array.from({ length: 32 }, (_, i) => (
          <line
            key={i}
            x1={net - kitchen - H + i * 9}
            y1={H}
            x2={net - kitchen + i * 9}
            y2="0"
          />
        ))}
      </motion.g>

      {/* Net */}
      <motion.line
        x1={net}
        y1="-14"
        x2={net}
        y2={H + 14}
        strokeWidth="2.4"
        strokeDasharray="3 3"
        {...line(1.05)}
      />

      {/* The four arrive last — the point of the whole diagram */}
      {showPlayers &&
        players.map((pt, i) => (
          <motion.g
            key={i}
            initial={still ? false : { opacity: 0, scale: 0.4 }}
            animate={on ? { opacity: 1, scale: 1 } : undefined}
            transition={{
              duration: 0.45,
              delay: 1.3 + i * 0.11,
              ease: EASE,
            }}
            style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
          >
            <circle cx={pt.x} cy={pt.y} r="9.5" fill={ink} stroke="none" />
            <text
              x={pt.x}
              y={pt.y + 3.4}
              textAnchor="middle"
              fill={dot}
              stroke="none"
              fontFamily="var(--font-jetbrains), monospace"
              fontSize="9"
              fontWeight="600"
            >
              {i + 1}
            </text>
          </motion.g>
        ))}

      {dimensions && (
        <motion.g
          stroke={ink}
          strokeWidth="0.75"
          opacity={still ? 0.6 : undefined}
          fontFamily="var(--font-jetbrains), monospace"
          fontSize="10"
          letterSpacing="1.4"
          {...fade(1.75, 0.6)}
        >
          <line x1="0" y1={H + 20} x2={W} y2={H + 20} />
          <line x1="0" y1={H + 15} x2="0" y2={H + 25} />
          <line x1={W} y1={H + 15} x2={W} y2={H + 25} />
          <text
            x={W / 2}
            y={H + 36}
            textAnchor="middle"
            fill={ink}
            stroke="none"
            opacity="0.85"
          >
            44 FT
          </text>

          <line x1="-20" y1="0" x2="-20" y2={H} />
          <line x1="-25" y1="0" x2="-15" y2="0" />
          <line x1="-25" y1={H} x2="-15" y2={H} />
          <text
            x="-26"
            y={H / 2 + 3}
            textAnchor="middle"
            fill={ink}
            stroke="none"
            opacity="0.85"
            transform={`rotate(-90 -26 ${H / 2 + 3})`}
          >
            20 FT
          </text>

          {/* 7 ft, net to kitchen line — measured, not floated */}
          <line x1={net - kitchen} y1="-16" x2={net} y2="-16" />
          <line x1={net - kitchen} y1="-21" x2={net - kitchen} y2="-11" />
          <line x1={net} y1="-21" x2={net} y2="-11" />
          <text
            x={net - kitchen / 2}
            y="-27"
            textAnchor="middle"
            fill={ink}
            stroke="none"
            opacity="0.85"
          >
            7 FT
          </text>
        </motion.g>
      )}
    </svg>
  );
}
