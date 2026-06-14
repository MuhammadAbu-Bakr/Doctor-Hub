import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  HeartPulse,
  ShieldCheck,
  Users,
} from "lucide-react";

const capabilities = [
  {
    title: "Appointments",
    description: "Coordinate clinic schedules, booking status, and patient notes from one workspace.",
    icon: CalendarCheck,
  },
  {
    title: "Patient Records",
    description: "Keep diagnoses, medical history, prescriptions, and reviews connected to each visit.",
    icon: ClipboardList,
  },
  {
    title: "Role-Based Access",
    description: "Separate patient, doctor, assistant, admin, and super admin workflows with protected routes.",
    icon: ShieldCheck,
  },
];

const metrics = [
  ["5", "care roles"],
  ["24/7", "patient access"],
  ["1", "shared source of truth"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <HeartPulse className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-lg font-semibold tracking-tight">Doctor Hub</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark"
            >
              Get started
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-slate-600">
            <Activity className="h-4 w-4 text-secondary" aria-hidden />
            Clinic operations, connected
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Doctor Hub
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A practical healthcare portal for appointments, patient profiles, doctor schedules,
            treatment records, payments, and care team coordination.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-white transition hover:bg-primary-dark"
            >
              Create account
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5 shadow-card">
          <div className="grid gap-3">
            {[
              ["Today", "18 appointments", "6 pending confirmations"],
              ["Doctors", "12 active profiles", "3 awaiting verification"],
              ["Payments", "9 screenshots queued", "2 require review"],
            ].map(([label, value, detail]) => (
              <div key={label} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <span className="rounded-md bg-secondary-50 px-2 py-1 text-xs font-semibold text-secondary-700">
                    Live
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-950">{value}</p>
                <p className="mt-1 text-sm text-slate-500">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 sm:grid-cols-3">
          {metrics.map(([value, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold text-slate-950">{value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {capabilities.map((item) => (
            <article key={item.title} className="rounded-lg border bg-white p-6 shadow-card">
              <item.icon className="h-6 w-6 text-primary" aria-hidden />
              <h2 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3 rounded-lg border bg-slate-950 p-5 text-white">
          <Users className="h-6 w-6 shrink-0 text-secondary-500" aria-hidden />
          <p className="text-sm leading-6">
            Ready for teams that need a deployable foundation first, then deeper scheduling,
            payments, notifications, and reporting modules next.
          </p>
        </div>
      </section>
    </main>
  );
}
