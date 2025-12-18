export type ScanUIResult = {
  url: string;
  score: number;
  verdict: "safe" | "suspicious" | "malicious";
  color: "green" | "yellow" | "red";
  flags: string[];
  sslValid: boolean;
  redirects: number;
  vtStats: {
    harmless: number;
    malicious: number;
    suspicious: number;
    undetected: number;
  };
};
