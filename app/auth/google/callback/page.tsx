import { Suspense } from "react";
import GoogleCallbackClient from "./GoogleCallbackClient";

export const dynamic = "force-dynamic"; // ✅ VERY IMPORTANT

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<Loading />}>
      <GoogleCallbackClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-zinc-400 text-sm">Signing you in...</p>
    </div>
  );
}
