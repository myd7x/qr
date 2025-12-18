"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/auth/token";

export default function GoogleCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/auth/sign-in?error=google");
      return;
    }

    tokenStorage.set(token);
    router.replace("/scan");
  }, [searchParams, router]);

  return null;
}
