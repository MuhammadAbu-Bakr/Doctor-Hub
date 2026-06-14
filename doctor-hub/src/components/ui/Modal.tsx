"use client";

import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from "react";

// Root
const Modal = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalPortal = DialogPrimitive.Portal;
const ModalClose = DialogPrimitive.Close;

// Overlay
const ModalOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "transition-all duration-150",
      className
    )}
    {...props}
  />
));
ModalOverlay.displayName = "ModalOverlay";

// Sizes
type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
const modalSizes: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-5xl",
};

// Content
interface ModalContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: ModalSize;
  showClose?: boolean;
}

const ModalContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, size = "md", showClose = true, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2",
        "bg-white dark:bg-slate-800 rounded-2xl shadow-2xl",
        "border border-slate-200 dark:border-slate-700",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:-translate-x-1/2 data-[state=open]:-translate-x-1/2",
        "duration-150 mx-4",
        modalSizes[size],
        className
      )}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close
          className={cn(
            "absolute right-4 top-4 rounded-lg p-1.5",
            "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200",
            "hover:bg-slate-100 dark:hover:bg-slate-700",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-primary/50"
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
));
ModalContent.displayName = "ModalContent";

// Header
const ModalHeader = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-700",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
ModalHeader.displayName = "ModalHeader";

// Body
const ModalBody = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-6 py-5", className)} {...props}>
    {children}
  </div>
);
ModalBody.displayName = "ModalBody";

// Footer
const ModalFooter = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "px-6 py-4 border-t border-slate-100 dark:border-slate-700",
      "bg-slate-50 dark:bg-slate-800/60 rounded-b-2xl",
      "flex items-center justify-end gap-3",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
ModalFooter.displayName = "ModalFooter";

// Title + Description
const ModalTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-slate-900 dark:text-slate-100", className)}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

const ModalDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("mt-1 text-sm text-muted", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

export {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
};
