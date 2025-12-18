"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/lib/api";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save JWT
      login(data.token);

      // ✅ Redirect after login
      router.push("/scan");
    } catch (err: any) {
      setError(err.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur p-8 shadow-xl">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-white">
          Sign in to QRGuard
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Access your scan results and security reports.
        </p>

        {/* Google */}
        <a
          href="https://qrguard.onrender.com/auth/google"
          className="mt-6 flex items-center justify-center gap-3 rounded-lg
                     border border-zinc-700 py-3 text-sm
                     hover:border-emerald-500 transition"
        >
          <image
            href="https://www.svgrepo.com/show/475656/google-color.svg"
          
            className="w-5 h-5"
          />
          Continue with Google
        </a>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs text-zinc-500">OR</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-zinc-900
                       border border-zinc-800
                       px-4 py-3 text-sm
                       focus:border-emerald-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-zinc-900
                       border border-zinc-800
                       px-4 py-3 text-sm
                       focus:border-emerald-500 outline-none"
          />

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600
                       py-3 text-black font-medium
                       hover:bg-emerald-500 transition
                       disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 flex justify-between text-sm text-zinc-400">
          <Link href="/auth/forgot-password" className="hover:text-white">
            Forgot password?
          </Link>

          <Link href="/auth/sign-up" className="hover:text-white">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
