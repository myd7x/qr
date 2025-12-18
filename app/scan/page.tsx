"use client";

import { useState } from "react";
import { motion } from "motion/react";
import QRUploadBox from "@/components/scan/QRUploadBox";
import ScanResult from "@/components/scan/ScanResult";
import { checkUrl } from "@/lib/api";

export default function ScanPage() {
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleScan = async () => {
    if (!inputUrl.startsWith("http")) {
      setError("Please enter a valid URL starting with http or https.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkUrl(inputUrl);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Scan failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl
                   rounded-2xl
                   border border-white/10
                   bg-black/50
                   backdrop-blur
                   p-6"
      >
        <h1 className="text-2xl font-semibold">
          Scan QR or URL
        </h1>

        <input
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https://example.com"
          className="mt-4 w-full rounded-lg
                     bg-black/60 border border-white/10
                     px-4 py-3 text-sm
                     outline-none focus:border-emerald-500"
        />

        <div className="mt-4">
          <QRUploadBox
            onQrExtracted={(url) => {
              setInputUrl(url);
              setError(null);
            }}
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          onClick={handleScan}
          disabled={loading}
          className="mt-5 w-full rounded-lg
                     bg-emerald-600 py-3
                     text-black font-medium
                     hover:bg-emerald-500
                     disabled:opacity-60"
        >
          {loading ? "Scanning..." : "Scan Now"}
        </button>

        {/* ✅ RESULT COMPONENT */}
        {result && <ScanResult result={result} />}
      </motion.div>
    </div>
  );
}
