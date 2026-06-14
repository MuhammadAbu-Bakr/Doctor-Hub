import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

// ── Base skeleton ──────────────────────────────────────────────────────────────
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: "sm" | "md" | "lg" | "full";
}

function Skeleton({ className, rounded = "md", ...props }: SkeletonProps) {
  const roundedClass = {
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200 dark:bg-slate-700",
        roundedClass,
        className
      )}
      {...props}
    />
  );
}

// ── Card Skeleton ──────────────────────────────────────────────────────────────
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-card",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Skeleton className="h-10 w-10 shrink-0" rounded="full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-8 w-20" rounded="lg" />
        <Skeleton className="h-8 w-16" rounded="lg" />
      </div>
    </div>
  );
}

// ── Stat Card Skeleton ─────────────────────────────────────────────────────────
function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10" rounded="lg" />
        <Skeleton className="h-5 w-16" rounded="full" />
      </div>
      <div className="mt-4 space-y-1.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-20" />
      </div>
    </div>
  );
}

// ── List Skeleton ──────────────────────────────────────────────────────────────
interface SkeletonListProps {
  rows?: number;
  avatar?: boolean;
  className?: string;
}

function SkeletonList({ rows = 4, avatar = true, className }: SkeletonListProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
        >
          {avatar && <Skeleton className="h-10 w-10 shrink-0" rounded="full" />}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5" style={{ width: `${60 + (i % 3) * 10}%` }} />
            <Skeleton className="h-3" style={{ width: `${40 + (i % 2) * 15}%` }} />
          </div>
          <Skeleton className="h-6 w-16" rounded="full" />
        </div>
      ))}
    </div>
  );
}

// ── Table Skeleton ─────────────────────────────────────────────────────────────
function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3" style={{ flex: i === 0 ? 2 : 1 }} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 border-b last:border-0 border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800 px-4 py-4"
        >
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-4" style={{ flex: j === 0 ? 2 : 1 }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Text Skeleton ──────────────────────────────────────────────────────────────
function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: i === lines - 1 ? "60%" : `${85 + (i % 2) * 10}%` }}
        />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonStatCard, SkeletonList, SkeletonTable, SkeletonText };
