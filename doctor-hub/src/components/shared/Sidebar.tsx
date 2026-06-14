"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/Avatar";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Pill,
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  CreditCard,
  UserCheck,
  BarChart3,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const roleNavConfig: Record<string, NavSection[]> = {
  PATIENT: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard/patient", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Book Appointment", href: "/dashboard/patient/book", icon: <Calendar className="h-4 w-4" /> },
        { label: "My Appointments", href: "/dashboard/patient/appointments", icon: <Calendar className="h-4 w-4" /> },
        { label: "Medical History", href: "/dashboard/patient/history", icon: <FileText className="h-4 w-4" /> },
        { label: "Prescriptions", href: "/dashboard/patient/prescriptions", icon: <Pill className="h-4 w-4" /> },
        { label: "Payments", href: "/dashboard/patient/payments", icon: <CreditCard className="h-4 w-4" /> },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Settings", href: "/dashboard/patient/settings", icon: <Settings className="h-4 w-4" /> },
      ],
    },
  ],
  DOCTOR: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard/doctor", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Appointments", href: "/dashboard/doctor/appointments", icon: <Calendar className="h-4 w-4" /> },
        { label: "Patients", href: "/dashboard/doctor/patients", icon: <Users className="h-4 w-4" /> },
        { label: "Medical Records", href: "/dashboard/doctor/records", icon: <FileText className="h-4 w-4" /> },
        { label: "Prescriptions", href: "/dashboard/doctor/prescriptions", icon: <Pill className="h-4 w-4" /> },
        { label: "Schedule", href: "/dashboard/doctor/schedule", icon: <Calendar className="h-4 w-4" /> },
        { label: "Earnings", href: "/dashboard/doctor/earnings", icon: <BarChart3 className="h-4 w-4" /> },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Profile", href: "/dashboard/doctor/profile", icon: <Settings className="h-4 w-4" /> },
      ],
    },
  ],
  ASSISTANT: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard/assistant", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Appointments", href: "/dashboard/assistant/appointments", icon: <Calendar className="h-4 w-4" /> },
        { label: "Patients", href: "/dashboard/assistant/patients", icon: <Users className="h-4 w-4" /> },
        { label: "Payments", href: "/dashboard/assistant/payments", icon: <CreditCard className="h-4 w-4" /> },
      ],
    },
  ],
  ADMIN: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Doctors", href: "/dashboard/admin/doctors", icon: <Stethoscope className="h-4 w-4" /> },
        { label: "Patients", href: "/dashboard/admin/patients", icon: <Users className="h-4 w-4" /> },
        { label: "Appointments", href: "/dashboard/admin/appointments", icon: <Calendar className="h-4 w-4" /> },
        { label: "Payments", href: "/dashboard/admin/payments", icon: <CreditCard className="h-4 w-4" /> },
        { label: "Verifications", href: "/dashboard/admin/verify", icon: <UserCheck className="h-4 w-4" /> },
      ],
    },
  ],
  SUPER_ADMIN: [
    {
      items: [
        { label: "Dashboard", href: "/dashboard/super-admin", icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: "Analytics", href: "/dashboard/super-admin/analytics", icon: <BarChart3 className="h-4 w-4" /> },
        { label: "All Doctors", href: "/dashboard/super-admin/doctors", icon: <Stethoscope className="h-4 w-4" /> },
        { label: "All Patients", href: "/dashboard/super-admin/patients", icon: <Users className="h-4 w-4" /> },
        { label: "Admins", href: "/dashboard/super-admin/admins", icon: <ShieldCheck className="h-4 w-4" /> },
        { label: "Settings", href: "/dashboard/super-admin/settings", icon: <Settings className="h-4 w-4" /> },
      ],
    },
  ],
};

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  const sections = roleNavConfig[user?.role ?? "PATIENT"] ?? roleNavConfig.PATIENT;

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  const sidebarContent = (
    <div
      className={cn(
        "flex h-full flex-col bg-white dark:bg-slate-900",
        "border-r border-slate-200 dark:border-slate-800",
        "transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-slate-200 dark:border-slate-800",
          collapsed ? "justify-center px-4" : "justify-between px-5"
        )}
      >
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
              <Stethoscope className="h-3.5 w-3.5" />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white">
              Doctor<span className="text-primary">Hub</span>
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
            <Stethoscope className="h-3.5 w-3.5" />
          </div>
        )}
        {/* Desktop collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "hidden lg:flex items-center justify-center h-6 w-6 rounded-md",
            "text-muted hover:text-slate-700 dark:hover:text-slate-200",
            "hover:bg-slate-100 dark:hover:bg-slate-800",
            "transition-all duration-150",
            collapsed && "absolute right-[-13px] z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm"
          )}
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && !collapsed && (
              <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                      "transition-all duration-150",
                      active
                        ? "bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <span className={cn("shrink-0", active && "text-primary-500")}>
                      {item.icon}
                    </span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold px-1">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      {user && (
        <div
          className={cn(
            "border-t border-slate-200 dark:border-slate-800 p-3",
            collapsed ? "flex justify-center" : "flex items-center gap-3"
          )}
        >
          <Avatar name={user.name ?? "User"} src={user.avatar} size="sm" />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                {user.name}
              </p>
              <p className="text-xs text-muted truncate">{user.role}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="relative hidden lg:flex h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onMobileClose}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex lg:hidden">
            {sidebarContent}
            <button
              onClick={onMobileClose}
              className="absolute right-2 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </aside>
        </>
      )}
    </>
  );
}
