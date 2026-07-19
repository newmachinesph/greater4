type Props = {
  /** Unique per instance — namespaces the pattern/clip ids. */
  uid: string;
  art?: "weave" | "grid" | "solid";
  /** Elongated shapes are narrower and taller. */
  elongated?: boolean;
  label?: string;
  className?: string;
  inverted?: boolean;
};

/**
 * Placeholder product art, drawn rather than photographed.
 *
 * A real paddle silhouette in the brand's own monochrome language reads as
 * intentional; a grey box or a stock photo reads as unfinished. Swap for
 * studio photography when it exists — the component API stays the same.
 */
export default function Paddle({
  uid,
  art = "weave",
  elongated = false,
  label,
  className,
  inverted = false,
}: Props) {
  const ink = inverted ? "var(--paper)" : "var(--ink)";
  const paper = inverted ? "var(--ink)" : "var(--paper)";

  // Face geometry differs by shape; the handle stays put.
  const face = elongated
    ? { x: 30, y: 8, w: 160, h: 300, r: 30 }
    : { x: 16, y: 14, w: 188, h: 282, r: 26 };

  const faceBottom = face.y + face.h;
  const p = (s: string) => `${s}-${uid}`;

  return (
    <svg
      viewBox="0 0 220 470"
      className={className}
      role="img"
      aria-label={label ?? "Greater4 paddle"}
      fill="none"
    >
      <defs>
        {/* Carbon twill */}
        <pattern
          id={p("weave")}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="14" height="14" fill={paper} />
          <path d="M0 0h7v7H0z" fill={ink} opacity="0.13" />
          <path d="M7 7h7v7H7z" fill={ink} opacity="0.13" />
        </pattern>

        {/* Technical grid */}
        <pattern id={p("grid")} width="11" height="11" patternUnits="userSpaceOnUse">
          <rect width="11" height="11" fill={paper} />
          <path
            d="M11 0v11M0 11h11"
            stroke={ink}
            strokeWidth="0.6"
            opacity="0.2"
          />
        </pattern>

        {/* Fibreglass stipple */}
        <pattern id={p("solid")} width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="9" height="9" fill={paper} />
          <circle cx="4.5" cy="4.5" r="1" fill={ink} opacity="0.16" />
        </pattern>

        <clipPath id={p("clip")}>
          <rect
            x={face.x}
            y={face.y}
            width={face.w}
            height={face.h}
            rx={face.r}
          />
        </clipPath>
      </defs>

      {/* Throat */}
      <path
        d={`M ${face.x + 46} ${faceBottom - 14}
            C ${face.x + 56} ${faceBottom + 42}, 88 ${faceBottom + 30}, 88 ${faceBottom + 60}
            L 132 ${faceBottom + 60}
            C 132 ${faceBottom + 30}, ${face.x + face.w - 56} ${faceBottom + 42}, ${face.x + face.w - 46} ${faceBottom - 14} Z`}
        fill={paper}
        stroke={ink}
        strokeWidth="1.6"
      />

      {/* Handle + grip wrap */}
      <rect
        x="88"
        y={faceBottom + 46}
        width="44"
        height="112"
        rx="8"
        fill={paper}
        stroke={ink}
        strokeWidth="1.6"
      />
      <g stroke={ink} strokeWidth="1" opacity="0.35">
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1="89"
            y1={faceBottom + 56 + i * 11}
            x2="131"
            y2={faceBottom + 50 + i * 11}
          />
        ))}
      </g>

      {/* Butt cap */}
      <rect
        x="82"
        y={faceBottom + 152}
        width="56"
        height="16"
        rx="5"
        fill={ink}
      />

      {/* Face */}
      <g clipPath={`url(#${p("clip")})`}>
        <rect
          x={face.x}
          y={face.y}
          width={face.w}
          height={face.h}
          fill={`url(#${p(art)})`}
        />
        {/* Sweet-spot ring — technical, not decorative */}
        <circle
          cx={face.x + face.w / 2}
          cy={face.y + face.h * 0.42}
          r={face.w * 0.3}
          stroke={ink}
          strokeWidth="1"
          opacity="0.22"
          strokeDasharray="3 5"
        />
      </g>

      {/* Edge guard */}
      <rect
        x={face.x}
        y={face.y}
        width={face.w}
        height={face.h}
        rx={face.r}
        stroke={ink}
        strokeWidth="2"
      />
      <rect
        x={face.x + 6}
        y={face.y + 6}
        width={face.w - 12}
        height={face.h - 12}
        rx={face.r - 6}
        stroke={ink}
        strokeWidth="0.75"
        opacity="0.4"
      />

      {/* Wordmark on the face */}
      <text
        x="110"
        y={face.y + face.h * 0.78}
        textAnchor="middle"
        fill={ink}
        fontFamily="var(--font-archivo), sans-serif"
        fontSize="21"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        GREATER4
      </text>
      <text
        x="110"
        y={face.y + 34}
        textAnchor="middle"
        fill={ink}
        opacity="0.5"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="8.5"
        letterSpacing="2.4"
      >
        USAP APPROVED
      </text>
    </svg>
  );
}
