"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GoogleSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      login(token);
      router.push("/scan");
    } else {
      router.push("/auth/sign-in");
    }
  }, []);

  return null;
}
