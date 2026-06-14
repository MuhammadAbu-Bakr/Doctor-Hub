import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      type = "text",
      ...props
    },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-slate-700 dark:text-slate-200",
              labelClassName
            )}
          >
            {label}
            {props.required && (
              <span className="ml-1 text-danger">*</span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              "w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-muted",
              "border-slate-300 dark:border-slate-600",
              "transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900",
              error && "border-danger focus:ring-danger/30 focus:border-danger",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs text-danger flex items-center gap-1 animate-in">
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-xs text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
