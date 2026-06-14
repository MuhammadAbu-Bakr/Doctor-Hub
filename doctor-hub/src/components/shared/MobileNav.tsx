"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  User,
  Plus,
  Users,
  CreditCard,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const roleNavItems: Record<string, MobileNavItem[]> = {
  PATIENT: [
    { label: "Home", href: "/dashboard/patient", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Book", href: "/dashboard/patient/book", icon: <Plus className="h-5 w-5" /> },
    { label: "Appointments", href: "/dashboard/patient/appointments", icon: <Calendar className="h-5 w-5" /> },
    { label: "Records", href: "/dashboard/patient/history", icon: <FileText className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/patient/settings", icon: <User className="h-5 w-5" /> },
  ],
  DOCTOR: [
    { label: "Home", href: "/dashboard/doctor", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Appointments", href: "/dashboard/doctor/appointments", icon: <Calendar className="h-5 w-5" /> },
    { label: "Patients", href: "/dashboard/doctor/patients", icon: <Users className="h-5 w-5" /> },
    { label: "Earnings", href: "/dashboard/doctor/earnings", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/doctor/profile", icon: <User className="h-5 w-5" /> },
  ],
  ASSISTANT: [
    { label: "Home", href: "/dashboard/assistant", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Appointments", href: "/dashboard/assistant/appointments", icon: <Calendar className="h-5 w-5" /> },
    { label: "Patients", href: "/dashboard/assistant/patients", icon: <Users className="h-5 w-5" /> },
    { label: "Payments", href: "/dashboard/assistant/payments", icon: <CreditCard className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/assistant/settings", icon: <User className="h-5 w-5" /> },
  ],
  ADMIN: [
    { label: "Home", href: "/dashboard/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Doctors", href: "/dashboard/admin/doctors", icon: <Users className="h-5 w-5" /> },
    { label: "Appointments", href: "/dashboard/admin/appointments", icon: <Calendar className="h-5 w-5" /> },
    { label: "Payments", href: "/dashboard/admin/payments", icon: <CreditCard className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/admin/settings", icon: <User className="h-5 w-5" /> },
  ],
  SUPER_ADMIN: [
    { label: "Home", href: "/dashboard/super-admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Analytics", href: "/dashboard/super-admin/analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Doctors", href: "/dashboard/super-admin/doctors", icon: <Users className="h-5 w-5" /> },
    { label: "Patients", href: "/dashboard/super-admin/patients", icon: <Users className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/super-admin/settings", icon: <User className="h-5 w-5" /> },
  ],
};

export function MobileNav() {
  const { user } = useAuth();
  const pathname = usePathname();
  const items = roleNavItems[user?.role ?? "PATIENT"] ?? roleNavItems.PATIENT;

  const isActive = (href: string) =>
    pathname === href || (href.split("/").length > 3 && pathname.startsWith(href));

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
        "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md",
        "border-t border-slate-200 dark:border-slate-800",
        "safe-area-pb"
      )}
    >
      <div className="flex h-16 items-stretch">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 text-center",
                "transition-all duration-150",
                "active:scale-95",
                active
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              {/* Icon with active indicator */}
              <div className="relative">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-150",
                    active && "bg-primary-50 dark:bg-primary-500/10"
                  )}
                >
                  {item.icon}
                </span>
                {active && (
                  <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full bg-primary" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium leading-none",
                  active
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-slate-400 dark:text-slate-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
