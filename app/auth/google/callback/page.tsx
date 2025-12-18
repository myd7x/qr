"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      login(token);
      router.replace("/scan");
    } else {
      router.replace("/auth/sign-in");
    }
  }, [params, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-zinc-400 text-sm">
        Signing you in with Google…
      </p>
    </div>
  );
}
