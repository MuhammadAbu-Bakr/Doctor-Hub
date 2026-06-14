"use client";

import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const TabsRoot = TabsPrimitive.Root;

// Tabs List
const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex gap-0 border-b border-slate-200 dark:border-slate-700",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

// Tabs Trigger — animated underline via pseudo element
const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative flex items-center gap-2 px-4 py-3 text-sm font-medium",
      "text-slate-500 dark:text-slate-400 select-none",
      "hover:text-slate-700 dark:hover:text-slate-200",
      "transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      // Active underline indicator
      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full",
      "after:bg-primary after:scale-x-0 after:transition-transform after:duration-200 after:ease-out",
      "data-[state=active]:text-primary dark:data-[state=active]:text-primary-500",
      "data-[state=active]:after:scale-x-100",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

// Tabs Content
const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-5 focus-visible:outline-none",
      "data-[state=active]:animate-fade-in",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

// Pill-style tabs list variant
const TabsListPill = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 gap-1",
      className
    )}
    {...props}
  />
));
TabsListPill.displayName = "TabsListPill";

const TabsTriggerPill = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium",
      "text-slate-500 dark:text-slate-400",
      "transition-all duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700",
      "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100",
      "data-[state=active]:shadow-sm",
      "hover:text-slate-700 dark:hover:text-slate-200",
      className
    )}
    {...props}
  />
));
TabsTriggerPill.displayName = "TabsTriggerPill";

export { TabsRoot, TabsList, TabsTrigger, TabsContent, TabsListPill, TabsTriggerPill };
