"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ ADD
import { signUp } from "@/lib/api/auth2";

export default function SignUpPage() {
  const router = useRouter(); // ✅ ADD

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

 const submit = async () => {
  setError(null);

  if (password !== passwordConfirm) {
    setError("Passwords do not match");
    return;
  }

  try {
    await signUp(username, email, password, passwordConfirm);

    setSuccess(true);

    // ✅ SAVE FOR AUTO-FILL
    sessionStorage.setItem(
      "signup_autofill",
      JSON.stringify({ email, password })
    );

    // ✅ REDIRECT
    setTimeout(() => {
      router.replace("/auth/sign-in");
    }, 1200);

  } catch (e: any) {
    setError(e.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-black/50 rounded-2xl border border-white/10">
        <h1 className="text-xl font-semibold mb-4">
          Create Account
        </h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-lg bg-black/60 border border-white/10"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-lg bg-black/60 border border-white/10"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-lg bg-black/60 border border-white/10"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-lg bg-black/60 border border-white/10"
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {success && (
          <p className="text-emerald-400 text-sm">
            Account created successfully. Redirecting to sign in…
          </p>
        )}

        <button
          onClick={submit}
          className="w-full mt-4 py-3 rounded-lg bg-emerald-600 text-black"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
