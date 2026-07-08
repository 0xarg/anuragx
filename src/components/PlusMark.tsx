/**
 * Technical crosshair "+" mark, centered on a single point via the caller's
 * positioning classes (e.g. `left-0 top-0`). Used to punctuate the rail /
 * divider intersections of the page frame. Structural decoration only.
 */
export function PlusMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-muted-strong" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-muted-strong" />
    </span>
  );
}
