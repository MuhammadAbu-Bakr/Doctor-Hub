"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, ClipboardList, CreditCard, LogOut, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const roleLabels: Record<string, string> = {
  patient: "Patient",
  doctor: "Doctor",
  assistant: "Assistant",
  admin: "Admin",
  "super-admin": "Super Admin",
};

const panels = [
  {
    title: "Appointments",
    value: "Ready",
    detail: "Booking workflows and schedule views are prepared for the next module.",
    icon: CalendarDays,
  },
  {
    title: "Medical Records",
    value: "Connected",
    detail: "History, diagnosis, prescription, and review models are available in Prisma.",
    icon: ClipboardList,
  },
  {
    title: "Payments",
    value: "Queued",
    detail: "Payment verification records can be attached to appointments.",
    icon: CreditCard,
  },
];

export default function DashboardPage({ params }: { params: { role: string } }) {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const roleName = roleLabels[params.role] || "Dashboard";

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm font-medium text-slate-500">Loading workspace...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-primary">Doctor Hub</p>
            <h1 className="text-xl font-bold text-slate-950">{roleName} Dashboard</h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            leftIcon={<LogOut className="h-4 w-4" aria-hidden />}
          >
            Sign out
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-lg border bg-white p-6 shadow-card">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary-50 text-primary">
                <UserRound className="h-7 w-7" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Signed in as</p>
                <h2 className="text-2xl font-bold text-slate-950">{user?.name || "Care team member"}</h2>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>
            <span className="w-fit rounded-lg bg-secondary-50 px-3 py-2 text-sm font-semibold text-secondary-700">
              {user?.role || roleName}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {panels.map((panel) => (
            <article key={panel.title} className="rounded-lg border bg-white p-5 shadow-card">
              <panel.icon className="h-6 w-6 text-primary" aria-hidden />
              <p className="mt-5 text-sm font-medium text-slate-500">{panel.title}</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-950">{panel.value}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{panel.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
