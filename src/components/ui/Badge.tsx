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
    gold: "bg-gold/15 text-amber-900 dark:text-gold-light border border-amber-600/30 dark:border-gold/30 shadow-sm font-semibold",
    champagne: "bg-gold/15 text-amber-900 dark:text-gold-light border border-amber-600/30 dark:border-gold/30 shadow-sm font-semibold",
    subtle: "bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.1]",
    outline: "border border-amber-700/40 dark:border-gold/40 text-amber-900 dark:text-gold-light",
    success: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/40",
    danger: "bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-400 border border-rose-300 dark:border-rose-800/40",
    info: "bg-cyan-100 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-800/40",
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
