"use client";

import { useState } from "react";
import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";

const API_URL = "https://qrguard.onrender.com";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------
     HANDLE FORGOT PASSWORD
  ------------------------------ */
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/auth/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to send reset email");
      }

      setMessage(
        "If this email exists, a reset link has been sent."
      );
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-2xl font-semibold mb-2">
          Reset your password
        </h1>

        <p className="text-sm text-zinc-400 mb-6">
          Enter your email to receive a password reset link.
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 rounded-lg bg-black/40
                     border border-zinc-700 px-4 py-3
                     text-zinc-200 placeholder:text-zinc-500
                     focus:outline-none focus:border-emerald-500"
        />

        {/* SUCCESS */}
        {message && (
          <p className="mb-3 text-sm text-emerald-400">
            {message}
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="mb-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="w-full rounded-lg bg-emerald-600
                     py-3 font-medium text-black
                     hover:bg-emerald-500 transition
                     disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        <div className="mt-4 text-xs text-zinc-400 text-center">
          <Link
            href="/auth/sign-in"
            className="hover:text-emerald-400"
          >
            Back to sign in
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
