import type { ReactNode } from "react";

/**
 * Eyebrow pill. A live-status dot, a tracked mono label. The Framer templates
 * open almost every section with one; here it carries a fact or a status
 * ("USAP 2026 conforming", "90% doubles"), never a decorative section number.
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
    <span className={`badge data ${inverted ? "badge-inv" : ""} ${className}`}>
      <span className="badge-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
