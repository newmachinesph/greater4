"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

type Props = {
  /** Ordered clip URLs; each later clip starts on the previous one's last frame. */
  clips: string[];
  /** SSR poster — the first clip's first frame. The LCP and the no-JS render. */
  poster: string;
  alt: string;
  /** Total scrub distance in viewport-heights. */
  scrollLength?: number;
  /** Overlaid content — floating stat chips. Rides the sticky frame. */
  children?: ReactNode;
};

/**
 * Scroll-scrubbed hero flight: one continuous forward camera take through a
 * Philippine court, scrubbed by scroll position (see DECISIONS.md 2026-07-25).
 *
 * Adapted from the scroll-world scrub engine's architecture — blob-loaded
 * clips (always seekable regardless of host byte-range support), rAF-lerped
 * currentTime, seek-coalescing, frame-matched seams with a short crossfade —
 * but mounted with `position: sticky` inside the hero's own scroll span
 * instead of the engine's fixed full-viewport layers. Sticky needs no
 * teardown when the hero scrolls past, cannot be orphaned by an ancestor's
 * opacity creating a containing block, and spawns no second scroll container.
 *
 * Reduced motion: the clips are never fetched and the poster holds. The gate
 * lives in the effect, never the markup, so SSR and client render the same
 * tree (React #418).
 */
export default function HeroFlight({
  clips,
  poster,
  alt,
  scrollLength = 230,
  children,
}: Props) {
  const span = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const reduce = useReducedMotion();
  const n = clips.length;

  useEffect(() => {
    if (reduce || n === 0) return;

    const state = clips.map(() => ({
      loading: false,
      ready: false,
      painted: false,
      cur: 0,
      target: 0,
      url: "",
    }));

    const load = (i: number) => {
      const s = state[i];
      if (s.loading) return;
      s.loading = true;
      fetch(clips[i])
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
        .then((blob) => {
          const v = videos.current[i];
          if (!v) return;
          s.url = URL.createObjectURL(blob);
          v.src = s.url;
          v.addEventListener("loadedmetadata", () => {
            s.ready = true;
          });
          v.addEventListener(
            "seeked",
            () => {
              s.painted = true;
            },
            { once: true },
          );
        })
        .catch(() => {
          s.loading = false;
        });
    };

    // Only the first clip touches initial load; later clips arrive when the
    // scrub approaches them.
    load(0);

    let progress = 0;
    let ticking = false;

    const read = () => {
      ticking = false;
      const el = span.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      for (let i = 0; i < n; i++) {
        const s = state[i];
        const start = i / n;
        const end = (i + 1) / n;
        if (!s.loading && progress > start - 0.5 / n) load(i);
        s.target = Math.min(1, Math.max(0, (progress - start) / (end - start)));
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(read);
      }
    };

    let raf = 0;
    const FADE = 0.035; // seam crossfade width, in overall-progress units
    const tick = () => {
      const active = Math.min(n - 1, Math.floor(progress * n));
      for (let i = 0; i < n; i++) {
        const v = videos.current[i];
        const s = state[i];
        if (!v) continue;

        // Seam crossfade: insurance on top of frame-matched handoffs.
        if (s.painted) {
          const segStart = i / n;
          const segEnd = (i + 1) / n;
          let op = 0;
          if (i === active) op = 1;
          else if (i === active + 1 && segStart - progress < FADE)
            op = 1 - (segStart - progress) / FADE;
          else if (i === active - 1 && progress - segEnd < FADE)
            op = 1 - (progress - segEnd) / FADE;
          v.style.opacity = op.toFixed(3);
          v.style.zIndex = i === active ? "2" : "1";
        }

        if (!s.ready) continue;
        // Never queue a seek while the decoder is resolving the last one.
        if (v.seeking) continue;
        if (Math.abs(s.cur - s.target) < 0.0005 && i !== active) continue;
        s.cur += (s.target - s.cur) * 0.2;
        const t = Math.min(0.999, Math.max(0, s.cur)) * (v.duration || 1);
        if (Math.abs(v.currentTime - t) > 0.01) {
          try {
            v.currentTime = t;
          } catch {
            /* metadata not ready yet */
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    read();
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      state.forEach((s) => s.url && URL.revokeObjectURL(s.url));
    };
  }, [clips, n, reduce]);

  return (
    <div ref={span} style={{ height: `${scrollLength}vh` }}>
      <div className="sticky top-[88px]">
        <div
          // Phones: fill the viewport under the sticky bar (88px offset + a
          // 16px foot) rather than a 3:4 box that left a dead band below the
          // frame. Above `sm` the letterbox holds.
          className="photo relative overflow-hidden h-[calc(100dvh-104px)] sm:h-auto sm:aspect-[21/9]"
          style={{ borderRadius: "var(--r-xl)" }}
        >
          {/* Poster: SSR HTML, LCP candidate, the no-JS and reduced-motion render. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={alt}
            width={1400}
            height={787}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Veil above poster and clips, so overlaid chips stay legible.
              A plain overlay rather than .photo-veil: the videos carry
              z-indices, and the pseudo-element would slip beneath them. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 4,
              background:
                "linear-gradient(to top, rgba(12,11,9,0.55) 0%, rgba(12,11,9,0) 55%)",
            }}
          />
          {clips.map((_, i) => (
            <video
              key={i}
              ref={(el) => {
                videos.current[i] = el;
              }}
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: 0,
                // The CSS grade lives on `.photo img`; apply the same language
                // to the clips so film and stills read as one world.
                filter: "grayscale(1) contrast(1.04) brightness(0.98)",
              }}
            />
          ))}
          {children && (
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
