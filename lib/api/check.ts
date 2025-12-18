import { tokenStorage } from "@/lib/auth/token";
import type { ScanUIResult } from "@/lib/types/check"; // ✅ IMPORTANT

export async function checkUrl(
  url: string
): Promise<ScanUIResult> {
  const token = tokenStorage.get();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch("/api/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error || "Scan failed");
  }

  const data = json.data;

  const vt =
    data?.virustotal?.full_report?.attributes?.stats ?? {
      harmless: 0,
      malicious: 0,
      suspicious: 0,
      undetected: 0,
    };

  const verdict = data.qr_guard.status;

  return {
    url: data.url,
    score: data.qr_guard.score,
    verdict,
    color:
      verdict === "safe"
        ? "green"
        : verdict === "suspicious"
        ? "yellow"
        : "red",
    flags: data.qr_guard.flags ?? [],
    sslValid: data.qr_guard.sslValid,
    redirects: data.qr_guard.redirects,
    vtStats: vt,
  };
}
