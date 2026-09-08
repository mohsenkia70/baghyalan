import { cn } from "@/lib/utils/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] bg-paper border border-stone/60 shadow-[var(--shadow-sm)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-wide text-gold-deep">
      <span className="h-px w-5 bg-gold-deep/60" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center")}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <h2
        className={cn(
          "font-display text-balance leading-tight text-[28px] sm:text-[34px]",
          tone === "dark" ? "text-on-night" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-md text-[14.5px] leading-7",
            tone === "dark" ? "text-on-night-soft" : "text-ink-soft"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
