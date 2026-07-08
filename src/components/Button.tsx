import Link from "next/link";

type Variant = "primary" | "secondary";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
  "aria-label"?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-lg)] px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-contrast hover:opacity-90",
  secondary: "border border-border text-foreground hover:bg-card-hover",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
  className = "",
  ...rest
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link href={href} className={cls} download={download || undefined} {...externalProps} {...rest}>
      {children}
    </Link>
  );
}
