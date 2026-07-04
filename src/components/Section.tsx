import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  /** Numeric label like "01" — rendered as "/01". */
  index?: string;
  /** Section heading (kicker) shown next to the label. */
  label?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Standard section shell with the reference's numeric "/01" label + kicker
 * pattern and consistent vertical rhythm.
 */
export function Section({
  id,
  index,
  label,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-24 md:py-32 ${className}`}
    >
      {(index || label) && (
        <Reveal className="mb-12 flex items-center gap-4 border-b border-line pb-5">
          {index && (
            <span className="eyebrow text-sm font-medium tabular-nums">
              /{index}
            </span>
          )}
          {label && (
            <span className="eyebrow text-sm font-medium uppercase tracking-wide">
              {label}
            </span>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
