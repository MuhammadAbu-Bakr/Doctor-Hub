import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary shadow-sm hover:shadow-md",
        secondary:
          "bg-secondary text-white hover:bg-secondary-600 focus-visible:ring-secondary shadow-sm hover:shadow-md",
        outline:
          "border border-slate-300 dark:border-slate-600 bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:ring-primary",
        ghost:
          "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-primary",
        danger:
          "bg-danger text-white hover:bg-danger-600 focus-visible:ring-danger shadow-sm hover:shadow-md",
        "danger-outline":
          "border border-danger-500 text-danger bg-transparent hover:bg-danger-50 dark:hover:bg-danger-500/10 focus-visible:ring-danger",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText ?? children}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
