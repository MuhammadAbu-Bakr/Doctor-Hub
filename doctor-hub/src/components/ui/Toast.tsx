"use client";

import { cn } from "@/lib/utils";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

// ── Primitives ────────────────────────────────────────────────────────────────
const ToastProvider = ToastPrimitive.Provider;

const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col gap-3 p-2",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

// ── Toast types ───────────────────────────────────────────────────────────────
type ToastType = "success" | "error" | "info" | "warning";

const toastTypeConfig: Record<
  ToastType,
  { icon: ReactNode; className: string; iconClass: string }
> = {
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    className:
      "border-secondary-200 bg-secondary-50 dark:border-secondary-800 dark:bg-secondary-950",
    iconClass: "text-secondary-500",
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" />,
    className:
      "border-danger-200 bg-danger-50 dark:border-danger-800 dark:bg-danger-950",
    iconClass: "text-danger-500",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    className:
      "border-warning-200 bg-warning-50 dark:border-warning-800 dark:bg-warning-950",
    iconClass: "text-warning-500",
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    className:
      "border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-950",
    iconClass: "text-primary-500",
  },
};

// ── Toast Root ────────────────────────────────────────────────────────────────
interface ToastProps
  extends Omit<ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, "type"> {
  type?: ToastType;
  title?: string;
  description?: string;
}

const Toast = forwardRef<ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, type = "info", title, description, children, ...props }, ref) => {
    const config = toastTypeConfig[type];

    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-xl border p-4 shadow-lg",
          "data-[state=open]:animate-slide-up",
          "data-[state=closed]:fade-out-80 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full",
          "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
          "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
          "transition-all duration-150",
          config.className,
          className
        )}
        {...props}
      >
        <span className={cn("mt-0.5 shrink-0", config.iconClass)}>
          {config.icon}
        </span>

        <div className="flex-1 min-w-0">
          {title && (
            <ToastPrimitive.Title className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </ToastPrimitive.Title>
          )}
          {description && (
            <ToastPrimitive.Description className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
              {description}
            </ToastPrimitive.Description>
          )}
          {children}
        </div>

        <ToastPrimitive.Close
          className={cn(
            "shrink-0 rounded-md p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
            "transition-colors duration-150",
            "opacity-0 group-hover:opacity-100",
            "focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50"
          )}
        >
          <X className="h-4 w-4" />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  }
);
Toast.displayName = "Toast";

// ── Toast Context ─────────────────────────────────────────────────────────────
interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (opts: Omit<ToastItem, "id">) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastContextProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((opts: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...opts, id }]);
  }, []);

  const success = useCallback(
    (title: string, description?: string) =>
      toast({ type: "success", title, description }),
    [toast]
  );
  const error = useCallback(
    (title: string, description?: string) =>
      toast({ type: "error", title, description }),
    [toast]
  );
  const info = useCallback(
    (title: string, description?: string) =>
      toast({ type: "info", title, description }),
    [toast]
  );
  const warning = useCallback(
    (title: string, description?: string) =>
      toast({ type: "warning", title, description }),
    [toast]
  );

  return (
    <ToastContext.Provider value={{ toast, success, error, info, warning }}>
      <ToastProvider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            type={t.type}
            title={t.title}
            description={t.description}
            duration={t.duration ?? 4000}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id);
            }}
            open
          />
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastContextProvider");
  return ctx;
}

export { Toast, ToastProvider, ToastViewport };
