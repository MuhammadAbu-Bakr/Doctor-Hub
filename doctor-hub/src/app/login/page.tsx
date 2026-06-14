"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { Lock, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.push(searchParams.get("callbackUrl") || "/dashboard/patient");
      router.refresh();
    } catch {
      setError("We could not sign you in with those credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <section className="w-full max-w-md rounded-lg border bg-white p-6 shadow-card">
        <Link href="/" className="text-sm font-semibold text-primary">
          Doctor Hub
        </Link>
        <h1 className="mt-6 text-2xl font-bold text-slate-950">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Access your care workspace and continue where you left off.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            leftIcon={<Lock className="h-4 w-4" aria-hidden />}
          />
          {error && <p className="rounded-lg bg-danger-50 p-3 text-sm text-danger-700">{error}</p>}
          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
            loadingText="Signing in"
            leftIcon={<LogIn className="h-4 w-4" aria-hidden />}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          New to Doctor Hub?{" "}
          <Link href="/register" className="font-semibold text-primary">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
          <p className="text-sm font-medium text-slate-500">Loading sign in...</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
