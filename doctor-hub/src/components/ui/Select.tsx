"use client";

import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from "react";

// Root, Value, Group, Label
const SelectRoot = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

// Trigger
interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
}

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, label, error, helperText, leftIcon, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
    )}
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-sm",
        "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
        "border-slate-300 dark:border-slate-600",
        "transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[placeholder]:text-muted",
        error && "border-danger focus:ring-danger/30 focus:border-danger",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-2 flex-1 min-w-0">
        {leftIcon && <span className="text-muted shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
      </span>
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-muted shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    {error && <p className="text-xs text-danger">{error}</p>}
    {helperText && !error && <p className="text-xs text-muted">{helperText}</p>}
  </div>
));
SelectTrigger.displayName = "SelectTrigger";

// Scroll buttons
const SelectScrollUpButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex items-center justify-center py-1 text-muted", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex items-center justify-center py-1 text-muted", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

// Content
const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-60 min-w-[8rem] overflow-hidden rounded-xl border",
        "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100",
        "border-slate-200 dark:border-slate-700",
        "shadow-lg shadow-black/10",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        "duration-150",
        position === "popper" && "w-full translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

// Label
const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-semibold text-muted uppercase tracking-wide", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

// Item
const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none",
      "text-slate-700 dark:text-slate-200",
      "hover:bg-primary-50 dark:hover:bg-primary-500/10",
      "focus:bg-primary-50 dark:focus:bg-primary-500/10",
      "data-[state=checked]:text-primary data-[state=checked]:font-medium",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "transition-colors duration-100",
      className
    )}
    {...props}
  >
    <span className="flex-1">{children}</span>
    <SelectPrimitive.ItemIndicator>
      <Check className="h-3.5 w-3.5 text-primary" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

// Separator
const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-slate-100 dark:bg-slate-700", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

export {
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
