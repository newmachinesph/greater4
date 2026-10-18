import type { ReactNode } from "react";

/**
 * Section eyebrow — a retro editorial kicker: tracked mono caps sitting on a
 * heavy baseline rule, the way an old catalogue or broadsheet tags a section.
 * Replaces the status-pill eyebrow (bordered pill + pulsing dot) that read as
 * generic SaaS-template chrome. The `.badge` pill lives on for genuine live
 * status chips over imagery ("USAP 2026 conforming"); those are not eyebrows.
 */
export default function Badge({
  children,
  inverted = false,
  className = "",
}: {
  children: ReactNode;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <span className={`kicker data ${inverted ? "kicker-inv" : ""} ${className}`}>
      {children}
    </span>
  );
}
