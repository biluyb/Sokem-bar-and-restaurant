import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gold" | "champagne" | "brass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

    const sizeStyles = {
      sm: "text-xs px-4 py-2 min-h-[38px]",
      md: "text-sm px-6 py-2.5 min-h-[44px]",
      lg: "text-base px-8 py-3.5 min-h-[50px]",
    };

    const variantStyles = {
      primary:
        "bg-gold text-slate-950 font-semibold hover:bg-gold-hover shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5",
      gold:
        "bg-gold text-slate-950 font-semibold hover:bg-gold-hover shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5",
      champagne:
        "bg-gold text-slate-950 font-semibold hover:bg-gold-hover shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5",
      outline:
        "border border-gold/60 text-gold-light hover:bg-gold hover:text-slate-950 hover:border-gold hover:-translate-y-0.5 transition-colors",
      brass:
        "border border-gold/60 text-gold-light hover:bg-gold hover:text-slate-950 hover:border-gold hover:-translate-y-0.5 transition-colors",
      ghost:
        "text-slate-300 hover:text-gold hover:bg-white/[0.05]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
