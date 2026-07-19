"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The page's one orchestrated entrance.
 *
 * Children stagger by DOM index, capped well under 500ms total. This fires on
 * mount, not on scroll — there is deliberately no scroll-reveal anywhere else
 * on the site. A page where every section fades in never settles.
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
