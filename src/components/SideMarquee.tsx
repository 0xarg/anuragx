/**
 * Slow vertical catchline ribbon pinned in a page gutter (the empty space
 * outside the framed column). Pure CSS: the phrase is repeated twice inside a
 * `vertical-rl` / `nowrap` track so it forms one tall column, then translated
 * up by half its height for a seamless loop. Only shown once the gutters are
 * wide enough (lg+); decorative and non-interactive. Honors reduced-motion via
 * `.animate-marquee-y` in globals.css.
 */
export function SideMarquee({
  text,
  side,
}: {
  text: string;
  side: "left" | "right";
}) {
  // Gutter width = (100% - column) / 2, where the column is max-w-2xl (42rem).
  const position = side === "left" ? "left-0" : "right-0";

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed top-0 bottom-0 z-0 hidden w-[calc(50%-21rem)] items-center justify-center overflow-hidden lg:flex ${position} [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]`}
    >
      <div
        style={{
          writingMode: "vertical-rl",
          animationDirection: side === "left" ? "reverse" : "normal",
        }}
        className="animate-marquee-y whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.35em] text-muted/50"
      >
        {text}
        {text}
      </div>
    </div>
  );
}
