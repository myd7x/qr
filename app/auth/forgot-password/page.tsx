"use client";

import { useState } from "react";
import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";

const API_URL = "https://qrguard.onrender.com";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* -----------------------------
     HANDLE FORGOT PASSWORD
  ------------------------------ */
  const handleForgotPassword = async () => {
    setError(null);
    setSuccess(null);

    /* 1️⃣ Empty email */
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    /* 2️⃣ Invalid email format */
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      /* 3️⃣ Backend failure */
      if (!res.ok) {
        throw new Error(
          data?.message ||
            "Unable to send reset email. Please try again later."
        );
      }

      /* 4️⃣ Success (secure message) */
      setSuccess(
        " a password reset link has been sent."
      );
    } catch (err: any) {
      setError(
        err?.message ||
          "Something went wrong. Please check your connection and try again."
      );
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
          Enter your email address and we’ll send you a link to
          reset your password.
        </p>

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
            setSuccess(null);
          }}
          className="w-full mb-4 rounded-lg bg-black/40
                     border border-zinc-700 px-4 py-3
                     text-zinc-200 placeholder:text-zinc-500
                     focus:outline-none focus:border-emerald-500"
        />

        {/* SUCCESS MESSAGE */}
        {success && (
          <p className="mb-3 text-sm text-emerald-400">
            {success}
          </p>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <p className="mb-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="w-full rounded-lg bg-emerald-600
                     py-3 font-medium text-black
                     hover:bg-emerald-500 transition
                     disabled:opacity-50"
        >
          {loading ? "Sending reset link..." : "Send reset link"}
        </button>

        {/* BACK LINK */}
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
