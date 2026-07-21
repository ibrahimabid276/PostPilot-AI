import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps extends HTMLAttributes<HTMLElement> {}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "w-64 glass border-r border-white/20 h-screen fixed left-0 top-0 p-6",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";