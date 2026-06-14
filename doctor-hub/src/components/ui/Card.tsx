import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

// ── Card Root ─────────────────────────────────────────────────────────────────
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, glass, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-white dark:bg-slate-800 shadow-card",
        "border-slate-200 dark:border-slate-700",
        "transition-all duration-150",
        hover &&
          "hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer",
        glass && "glass",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

// ── Card Header ───────────────────────────────────────────────────────────────
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, action, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-start justify-between px-5 pt-5 pb-4",
        "border-b border-slate-100 dark:border-slate-700/60",
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

// ── Card Body ─────────────────────────────────────────────────────────────────
const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("px-5 py-4", className)} {...props}>
      {children}
    </div>
  )
);
CardBody.displayName = "CardBody";

// ── Card Footer ───────────────────────────────────────────────────────────────
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-5 py-4 border-t border-slate-100 dark:border-slate-700/60",
        "bg-slate-50/50 dark:bg-slate-800/50 rounded-b-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

// ── Card Title ────────────────────────────────────────────────────────────────
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

// ── Card Description ──────────────────────────────────────────────────────────
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("mt-0.5 text-sm text-muted", className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

export { Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription };
