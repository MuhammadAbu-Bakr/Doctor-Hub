import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium border transition-colors duration-150 select-none",
  {
    variants: {
      variant: {
        // Appointment status variants
        PENDING:
          "bg-warning-50 text-warning-600 border-warning-200 dark:bg-warning-500/10 dark:text-warning-400 dark:border-warning-500/20",
        CONFIRMED:
          "bg-secondary-50 text-secondary-700 border-secondary-200 dark:bg-secondary-500/10 dark:text-secondary-400 dark:border-secondary-500/20",
        CANCELLED:
          "bg-danger-50 text-danger-600 border-danger-200 dark:bg-danger-500/10 dark:text-danger-400 dark:border-danger-500/20",
        COMPLETED:
          "bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-400 dark:border-primary-500/20",
        NO_SHOW:
          "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600",
        // General purpose variants
        default:
          "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600",
        primary:
          "bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-500/10 dark:text-primary-400 dark:border-primary-500/20",
        secondary:
          "bg-secondary-50 text-secondary-700 border-secondary-200 dark:bg-secondary-500/10 dark:text-secondary-400 dark:border-secondary-500/20",
        accent:
          "bg-accent-50 text-accent-700 border-accent-100 dark:bg-accent-500/10 dark:text-accent-400 dark:border-accent-500/20",
        danger:
          "bg-danger-50 text-danger-600 border-danger-200 dark:bg-danger-500/10 dark:text-danger-400 dark:border-danger-500/20",
        success:
          "bg-secondary-50 text-secondary-700 border-secondary-200 dark:bg-secondary-500/10 dark:text-secondary-400 dark:border-secondary-500/20",
        warning:
          "bg-warning-50 text-warning-600 border-warning-200 dark:bg-warning-500/10 dark:text-warning-400 dark:border-warning-500/20",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      dot: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      dot: false,
    },
  }
);

// Dot color map
const dotColors: Record<string, string> = {
  PENDING: "bg-warning-500",
  CONFIRMED: "bg-secondary-500",
  CANCELLED: "bg-danger-500",
  COMPLETED: "bg-primary-500",
  NO_SHOW: "bg-slate-400",
  default: "bg-slate-400",
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  accent: "bg-accent-500",
  danger: "bg-danger-500",
  success: "bg-secondary-500",
  warning: "bg-warning-500",
};

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  const variantKey = variant ?? "default";
  return (
    <span
      className={cn(badgeVariants({ variant, size, dot }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotColors[variantKey as string] ?? "bg-slate-400"
          )}
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
