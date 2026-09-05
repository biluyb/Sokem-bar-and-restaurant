import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverEffect = true,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "luminous-card rounded-2xl overflow-hidden",
        hoverEffect && "hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow/20 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("p-6 sm:p-8 pb-3", className)} {...props}>
    {children}
  </div>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("p-6 sm:p-8 pt-0", className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn("p-6 sm:p-8 pt-3 border-t border-white/[0.08] flex items-center", className)} {...props}>
    {children}
  </div>
);
