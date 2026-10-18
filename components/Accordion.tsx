"use client";

import { useId, useState } from "react";

export type QA = { q: string; a: string };

/**
 * FAQ accordion. The Framer templates all ship one; here it answers the
 * questions the specification-forward copy invites (why raw carbon, why 16mm,
 * why priced in pesos). Single-open, keyboard-native (real <button>s), and the
 * panel animates via CSS grid-rows so there is no measured-height JS.
 */
export default function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b-${i}`;
        const panelId = `${base}-p-${i}`;
        return (
          <div key={item.q} className="accordion-item">
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-6 text-left py-6"
              >
                <span
                  className="display text-[1.15rem] sm:text-[1.4rem] leading-[1.1]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  data-open={isOpen}
                  className="accordion-sign relative mt-1 w-5 h-5 shrink-0"
                >
                  <span className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="accordion-panel"
              data-open={isOpen}
            >
              <div>
                <p
                  className="pb-7 max-w-[62ch] lead"
                  style={{ color: "var(--mute)", fontSize: "1.05rem" }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
