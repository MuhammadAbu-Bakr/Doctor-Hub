"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Mail, Phone, UserRound, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

type Role = "PATIENT" | "DOCTOR";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("PATIENT");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register({ name, email, phone, password, role });
      router.push(role === "DOCTOR" ? "/dashboard/doctor" : "/dashboard/patient");
      router.refresh();
    } catch {
      setError("We could not create the account. Check the details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <section className="w-full max-w-lg rounded-lg border bg-white p-6 shadow-card">
        <Link href="/" className="text-sm font-semibold text-primary">
          Doctor Hub
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-slate-950">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">
          Start as a patient or doctor. Doctor profiles can be completed after signup.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Full name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            leftIcon={<UserRound className="h-4 w-4" aria-hidden />}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            leftIcon={<Mail className="h-4 w-4" aria-hidden />}
          />
          <Input
            label="Phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            leftIcon={<Phone className="h-4 w-4" aria-hidden />}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div>
            <p className="text-sm font-medium text-slate-700">Account type</p>
            <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
              {(["PATIENT", "DOCTOR"] as Role[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRole(option)}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                    role === option
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {option === "PATIENT" ? "Patient" : "Doctor"}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="rounded-lg bg-danger-50 p-3 text-sm text-danger-700">{error}</p>}
          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            loadingText="Creating account"
            leftIcon={<UserPlus className="h-4 w-4" aria-hidden />}
          >
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
