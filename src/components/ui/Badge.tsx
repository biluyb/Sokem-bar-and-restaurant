import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "subtle" | "success" | "danger" | "champagne" | "outline" | "info";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "gold",
  children,
  ...props
}) => {
  const variantStyles = {
    gold: "bg-gold/15 text-gold-light border border-gold/30 shadow-sm",
    champagne: "bg-gold/15 text-gold-light border border-gold/30 shadow-sm",
    subtle: "bg-white/[0.06] text-slate-300 border border-white/[0.1]",
    outline: "border border-gold/40 text-gold-light",
    success: "bg-emerald-950/50 text-emerald-400 border border-emerald-800/40",
    danger: "bg-rose-950/50 text-rose-400 border border-rose-800/40",
    info: "bg-cyan-950/50 text-cyan-400 border border-cyan-800/40",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
