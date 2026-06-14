import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

type TrendDirection = "up" | "down" | "neutral";

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconClassName?: string;
  trend?: number; // e.g. 12.5 means +12.5%
  trendDirection?: TrendDirection;
  trendLabel?: string;
  description?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const variantConfig: Record<
  NonNullable<StatCardProps["variant"]>,
  { iconBg: string; iconColor: string; gradient: string }
> = {
  default: {
    iconBg: "bg-slate-100 dark:bg-slate-700",
    iconColor: "text-slate-500 dark:text-slate-300",
    gradient: "",
  },
  primary: {
    iconBg: "bg-primary-50 dark:bg-primary-500/10",
    iconColor: "text-primary-500",
    gradient: "border-l-4 border-l-primary-500",
  },
  success: {
    iconBg: "bg-secondary-50 dark:bg-secondary-500/10",
    iconColor: "text-secondary-500",
    gradient: "border-l-4 border-l-secondary-500",
  },
  warning: {
    iconBg: "bg-warning-50 dark:bg-warning-500/10",
    iconColor: "text-warning-500",
    gradient: "border-l-4 border-l-warning-500",
  },
  danger: {
    iconBg: "bg-danger-50 dark:bg-danger-500/10",
    iconColor: "text-danger-500",
    gradient: "border-l-4 border-l-danger-500",
  },
};

function StatCard({
  title,
  value,
  icon,
  iconClassName,
  trend,
  trendDirection,
  trendLabel = "vs last month",
  description,
  variant = "default",
  className,
  ...props
}: StatCardProps) {
  const config = variantConfig[variant];

  const resolvedDirection: TrendDirection =
    trendDirection ?? (trend !== undefined ? (trend >= 0 ? "up" : "down") : "neutral");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-white dark:bg-slate-800 p-5 shadow-card",
        "border-slate-200 dark:border-slate-700",
        "transition-all duration-150 hover:shadow-card-hover",
        config.gradient,
        className
      )}
      {...props}
    >
      {/* Icon */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            config.iconBg,
            iconClassName
          )}
        >
          <span className={cn("h-5 w-5", config.iconColor)}>{icon}</span>
        </div>

        {/* Trend badge */}
        {trend !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              resolvedDirection === "up" &&
                "bg-secondary-50 text-secondary-700 dark:bg-secondary-500/10 dark:text-secondary-400",
              resolvedDirection === "down" &&
                "bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-400",
              resolvedDirection === "neutral" &&
                "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
            )}
          >
            {resolvedDirection === "up" && (
              <TrendingUp className="h-3 w-3" />
            )}
            {resolvedDirection === "down" && (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-sm font-medium text-muted">{title}</p>
        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
          {value}
        </p>
        {(description ?? trend !== undefined) && (
          <p className="mt-1.5 text-xs text-muted">
            {description ?? (trend !== undefined && trendLabel)}
          </p>
        )}
      </div>

      {/* Subtle background decoration */}
      <div
        className={cn(
          "absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-5",
          config.iconColor.replace("text-", "bg-")
        )}
      />
    </div>
  );
}

export { StatCard };
export type { StatCardProps, TrendDirection };
