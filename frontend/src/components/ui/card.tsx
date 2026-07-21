import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("glass rounded-2xl shadow-soft", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";