import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "secondary" | "white";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
  /** Show the circular arrow badge (reference "Get Started ↗"). */
  arrow?: boolean;
  "aria-label"?: string;
};

const base =
  "group relative inline-flex items-center rounded-[var(--radius-pill)] text-sm font-medium transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-out will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const withArrow = "gap-3 pl-6 pr-1.5 py-1.5";
const plain = "gap-2 px-6 py-3";

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-[0_8px_30px_rgba(255,91,38,0.25)] hover:shadow-[0_14px_44px_rgba(255,91,38,0.45)] [background:var(--gradient-accent)]",
  white:
    "bg-white text-bg hover:bg-white/90 shadow-[0_8px_30px_rgba(255,255,255,0.12)]",
  secondary:
    "glass text-text hover:border-accent hover:text-accent",
};

const badge: Record<Variant, string> = {
  primary: "bg-white/20 text-white group-hover:bg-white group-hover:text-accent",
  white: "bg-bg text-white group-hover:bg-accent",
  secondary: "bg-surface-2 text-text group-hover:bg-accent group-hover:text-white",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
  className = "",
  arrow = true,
  ...rest
}: ButtonProps) {
  const cls = `${base} ${arrow ? withArrow : plain} ${variants[variant]} ${className}`;
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      className={cls}
      download={download || undefined}
      {...externalProps}
      {...rest}
    >
      <span className="pl-0.5">{children}</span>
      {arrow && (
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${badge[variant]}`}
        >
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      )}
    </Link>
  );
}
