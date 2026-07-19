/**
 * Text logo. The numeral is set in the editorial serif against the grotesque
 * wordmark — the brand's whole argument is that the 4 is the important part.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline leading-none select-none ${className}`}
      aria-label="Greater4"
    >
      <span className="font-[800] uppercase tracking-[-0.05em]">Greater</span>
      <span
        className="editorial ml-[0.06em] italic"
        style={{ fontSize: "1.18em", lineHeight: 0.8 }}
      >
        4
      </span>
    </span>
  );
}
