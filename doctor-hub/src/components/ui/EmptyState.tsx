import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes } from "react";
import { Button } from "./Button";

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  illustration?: ReactNode;
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
  };
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    wrapper: "py-8 px-4",
    iconSize: "h-12 w-12",
    iconContainer: "h-16 w-16 rounded-2xl",
    title: "text-base",
    description: "text-xs",
  },
  md: {
    wrapper: "py-12 px-6",
    iconSize: "h-14 w-14",
    iconContainer: "h-20 w-20 rounded-3xl",
    title: "text-lg",
    description: "text-sm",
  },
  lg: {
    wrapper: "py-16 px-8",
    iconSize: "h-16 w-16",
    iconContainer: "h-24 w-24 rounded-3xl",
    title: "text-xl",
    description: "text-sm",
  },
};

// Default SVG illustration
function DefaultIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="140" rx="70" ry="12" fill="currentColor" opacity="0.06" />
      <rect x="40" y="30" width="120" height="90" rx="12" fill="currentColor" opacity="0.08" />
      <rect x="55" y="46" width="90" height="8" rx="4" fill="currentColor" opacity="0.15" />
      <rect x="55" y="62" width="65" height="6" rx="3" fill="currentColor" opacity="0.10" />
      <rect x="55" y="76" width="80" height="6" rx="3" fill="currentColor" opacity="0.10" />
      <rect x="55" y="90" width="50" height="6" rx="3" fill="currentColor" opacity="0.10" />
      <circle cx="148" cy="46" r="22" fill="currentColor" opacity="0.12" />
      <path
        d="M141 46h14M148 39v14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

function EmptyState({
  illustration,
  icon,
  title,
  description,
  action,
  secondaryAction,
  size = "md",
  className,
  ...props
}: EmptyStateProps) {
  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        config.wrapper,
        className
      )}
      {...props}
    >
      {/* Illustration or icon */}
      {illustration ? (
        <div className="mb-4 w-48 text-slate-300 dark:text-slate-600">
          {illustration}
        </div>
      ) : icon ? (
        <div
          className={cn(
            "mb-5 flex items-center justify-center",
            "bg-slate-100 dark:bg-slate-800",
            config.iconContainer
          )}
        >
          <span className={cn("text-slate-300 dark:text-slate-600", config.iconSize)}>
            {icon}
          </span>
        </div>
      ) : (
        <div className="mb-4 w-40 text-slate-300 dark:text-slate-600">
          <DefaultIllustration className="w-full" />
        </div>
      )}

      {/* Text */}
      <h3
        className={cn(
          "font-semibold text-slate-700 dark:text-slate-200",
          config.title
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "mt-2 max-w-sm text-muted leading-relaxed",
            config.description
          )}
        >
          {description}
        </p>
      )}

      {/* Actions */}
      {(action ?? secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action && (
            <Button
              variant="primary"
              size="md"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="outline"
              size="md"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export { EmptyState };
export type { EmptyStateProps };
