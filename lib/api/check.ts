import { tokenStorage } from "@/lib/auth/token";
export async function checkUrl(url: string): Promise<ScanUIResult> {
   const token = tokenStorage.get();

  if (!token) {
    throw new Error("Unauthorized");
  }
  const res = await fetch("/api/check", {
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

  // 🔹 map verdict → color
  const verdict = data.qr_guard.status;
  const color =
    verdict === "safe"
      ? "green"
      : verdict === "suspicious"
      ? "yellow"
      : "red";

  const vtStats =
  json?.data?.virustotal?.full_report?.attributes?.stats ?? {
    harmless: 0,
    malicious: 0,
    suspicious: 0,
    undetected: 0,
  };

return {
  url: data.url,
  score: data.qr_guard.score,
  verdict: data.qr_guard.status,
  color:
    data.qr_guard.status === "safe"
      ? "green"
      : data.qr_guard.status === "suspicious"
      ? "yellow"
      : "red",
  flags: data.qr_guard.flags ?? [],
  sslValid: data.qr_guard.sslValid,
  redirects: data.qr_guard.redirects,
  vtStats: {
    harmless: vtStats.harmless ?? 0,
    malicious: vtStats.malicious ?? 0,
    suspicious: vtStats.suspicious ?? 0,
    undetected: vtStats.undetected ?? 0,
  },
};
}