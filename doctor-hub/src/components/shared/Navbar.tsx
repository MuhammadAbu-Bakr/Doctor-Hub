"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  Bell,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
  Stethoscope,
  ChevronDown,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Find Doctors", href: "/doctors" },
  { label: "Appointments", href: "/appointments" },
  { label: "About", href: "/about" },
];

interface NavbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function Navbar({ onMenuClick, showMenuButton = false }: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dark mode
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const dashboardPath =
    user?.role === "DOCTOR"
      ? "/dashboard/doctor"
      : user?.role === "ADMIN"
      ? "/dashboard/admin"
      : user?.role === "SUPER_ADMIN"
      ? "/dashboard/super-admin"
      : user?.role === "ASSISTANT"
      ? "/dashboard/assistant"
      : "/dashboard/patient";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md",
        "border-b border-slate-200 dark:border-slate-800",
        "transition-shadow duration-150",
        scrolled && "shadow-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: menu + logo */}
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm group-hover:shadow-glow-primary transition-shadow duration-150">
              <Stethoscope className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Doctor<span className="text-primary">Hub</span>
            </span>
          </Link>
        </div>

        {/* Center: nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium",
                "text-slate-600 dark:text-slate-300",
                "hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
                "transition-all duration-150"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-warning-500" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {user ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon-sm" aria-label="Notifications">
                <div className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white dark:ring-slate-900" />
                </div>
              </Button>

              {/* Avatar dropdown */}
              <DropdownMenuPrimitive.Root>
                <DropdownMenuPrimitive.Trigger asChild>
                  <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <Avatar
                      name={user.name ?? "User"}
                      src={user.avatar}
                      size="sm"
                    />
                    <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-muted" />
                  </button>
                </DropdownMenuPrimitive.Trigger>

                <DropdownMenuPrimitive.Portal>
                  <DropdownMenuPrimitive.Content
                    align="end"
                    sideOffset={8}
                    className={cn(
                      "z-50 min-w-[200px] overflow-hidden rounded-xl border p-1.5",
                      "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
                      "shadow-lg shadow-black/10",
                      "data-[state=open]:animate-fade-in"
                    )}
                  >
                    {/* User info */}
                    <div className="px-3 py-2 mb-1 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted truncate">{user.email}</p>
                    </div>

                    <DropdownMenuPrimitive.Item asChild>
                      <Link
                        href={dashboardPath}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer outline-none transition-colors duration-100"
                      >
                        <User className="h-4 w-4 text-muted" />
                        Dashboard
                      </Link>
                    </DropdownMenuPrimitive.Item>

                    <DropdownMenuPrimitive.Item asChild>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer outline-none transition-colors duration-100"
                      >
                        <Settings className="h-4 w-4 text-muted" />
                        Settings
                      </Link>
                    </DropdownMenuPrimitive.Item>

                    <DropdownMenuPrimitive.Separator className="my-1 h-px bg-slate-100 dark:bg-slate-700" />

                    <DropdownMenuPrimitive.Item
                      onSelect={handleLogout}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-danger hover:bg-danger-50 dark:hover:bg-danger-500/10 cursor-pointer outline-none transition-colors duration-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </DropdownMenuPrimitive.Item>
                  </DropdownMenuPrimitive.Content>
                </DropdownMenuPrimitive.Portal>
              </DropdownMenuPrimitive.Root>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-lg bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md transition-all duration-150"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
