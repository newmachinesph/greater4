"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-reveal. v2 leans into the Framer-template rhythm where sections
 * settle in as you reach them, so this is used more liberally than v1's single
 * hero entrance — but still fires once, never re-triggers, and collapses to a
 * plain fade under reduced motion so it can't drift for anyone sensitive to it.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * The page's orchestrated entrance.
 *
 * Children stagger by DOM index, capped well under 500ms total. This fires on
 * mount, not on scroll. (v1 kept it as the site's only reveal; v2 also uses
 * the scroll-linked `Reveal` above, deliberately — see DECISIONS.md
 * 2026-07-24. Don't "restore" v1 by deleting reveals.)
 */
export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const reduce = useReducedMotion();

  const parent: Variants = {
    hidden: {},
    shown: {
      transition: { staggerChildren: reduce ? 0 : gap, delayChildren: 0.05 },
    },
  };

  return (
    <motion.div
      className={className}
      variants={parent}
      initial="hidden"
      animate="shown"
    >
      {children}
    </motion.div>
  );
}

/** A single line/block inside a Stagger. */
export function Item({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const child: Variants = {
    // Reduced motion collapses spatial movement to a plain crossfade.
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    shown: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.7, ease: EASE },
    },
  };

  return (
    <motion.div className={className} variants={child}>
      {children}
    </motion.div>
  );
}

/**
 * Masked line-rise for display headlines. The mask is the parent's overflow;
 * the child slides up out of it.
 */
export function RiseLine({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  const child: Variants = {
    hidden: { y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 },
    shown: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduce ? 0.2 : 0.95, ease: EASE },
    },
  };

  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span className="block" variants={child}>
        {children}
      </motion.span>
    </span>
  );
}
