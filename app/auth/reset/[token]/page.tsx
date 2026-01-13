"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";

const API_URL = "https://qrguard.onrender.com/";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();
  const token = params.token;

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleResetPassword = async () => {
    setError(null);
    setSuccess(null);

    /* Validation */
    if (!password || !passwordConfirm) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/resetPassword/${token}`,
        {
          method: "POST", // ⬅️ POST as you requested
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            passwordConfirm,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            "Reset link is invalid or expired."
        );
      }

      setSuccess(
        "Your password has been reset successfully. Redirecting to sign in..."
      );

      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 2000);
    } catch (err: any) {
      setError(
        err?.message ||
          "Something went wrong. Please request a new reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-2xl font-semibold mb-2">
          Set a new password
        </h1>

        <p className="text-sm text-zinc-400 mb-6">
          Enter a new password for your account.
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 rounded-lg bg-black/40
                     border border-zinc-700 px-4 py-3
                     focus:outline-none focus:border-emerald-500"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full mb-4 rounded-lg bg-black/40
                     border border-zinc-700 px-4 py-3
                     focus:outline-none focus:border-emerald-500"
        />

        {success && (
          <p className="mb-3 text-sm text-emerald-400">
            {success}
          </p>
        )}

        {error && (
          <p className="mb-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full rounded-lg bg-emerald-600
                     py-3 font-medium text-black
                     disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset password"}
        </button>

        <div className="mt-4 text-xs text-center text-zinc-400">
          <Link href="/auth/sign-in">Back to sign in</Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
