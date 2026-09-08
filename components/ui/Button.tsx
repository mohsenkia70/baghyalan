"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "gold" | "outline" | "ghost" | "night";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest text-paper hover:bg-forest-2 shadow-[var(--shadow-md)] active:scale-[0.98]",
  gold: "bg-gold text-paper hover:bg-gold-deep shadow-[var(--shadow-gold)] active:scale-[0.98]",
  outline:
    "border border-forest/25 text-forest hover:bg-forest/5 active:scale-[0.98]",
  ghost: "text-forest hover:bg-forest/5 active:scale-[0.98]",
  night:
    "bg-on-night/10 text-on-night border border-on-night/20 hover:bg-on-night/15 active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-12 px-6 text-[15px] gap-2",
  lg: "h-14 px-8 text-[16px] gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--radius-pill)] font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-soft)] disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
