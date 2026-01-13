"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/api/auth2";
import { useAuth } from "@/context/AuthContext";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError(null);

    if (!username || !email || !password || !passwordConfirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await signUp(
        username,
        email,
        password,
        passwordConfirm
      );

      // ✅ AUTO LOGIN
      if (data?.token) {
        login(data.token);
        router.push("/scan");
        return;
      }

      throw new Error("Signup succeeded but no token returned.");
    } catch (e: any) {
      setError(e?.message || "Sign up failed.");
    } finally {
      setLoading(false);
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

        <button
          onClick={submit}
          disabled={loading}
          className="w-full mt-4 py-3 rounded-lg bg-emerald-600 text-black disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
