"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import QRUploadBox from "@/components/scan/QRUploadBox";
import ScanButton from "@/components/scan/ScanButton";
import ScanProgress from "@/components/scan/ScanProgress";

export default function ScanPage() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const startScan = () => {
    setScanning(true);
    setDone(false);
    setProgress(0);
  };

  useEffect(() => {
    if (!scanning) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setScanning(false);
          setDone(true);
          return 100;
        }
        return p + 4;
      });
    }, 160);

    return () => clearInterval(interval);
  }, [scanning]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950">
      {/* ================= ANIMATED BACKGROUND ================= */}

      {/* Base */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* Aurora Layer 1 */}
      <motion.div
        animate={{
          x: ["-30%", "30%", "-30%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-0
                   w-[140%] h-[300px]
                   bg-gradient-to-r
                   from-transparent via-emerald-500/20 to-transparent
                   blur-[120px]"
      />

      {/* Aurora Layer 2 */}
      <motion.div
        animate={{
          x: ["30%", "-30%", "30%"],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-0
                   w-[140%] h-[260px]
                   bg-gradient-to-r
                   from-transparent via-emerald-400/15 to-transparent
                   blur-[140px]"
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex items-center justify-center px-6 py-32">
        <div
          className="w-full max-w-xl rounded-2xl
                     border border-white/10
                     bg-white/5 backdrop-blur-xl
                     p-8 shadow-2xl"
        >
          <h1 className="text-3xl font-semibold mb-2">
            Scan QR or Link
          </h1>

          <p className="text-zinc-400 mb-6">
            Upload a QR code image or paste a link to analyze
            potential security threats.
          </p>

          {/* URL Input */}
          <input
            type="text"
            placeholder="https://example.com"
            className="w-full mb-4 rounded-lg bg-black/40
                       border border-zinc-700 px-4 py-3
                       text-zinc-200 placeholder:text-zinc-500
                       focus:outline-none focus:border-emerald-500"
          />

          {/* QR Upload */}
          <QRUploadBox />

          {/* Scan Button */}
          <div className="mt-6">
            <ScanButton scanning={scanning} onClick={startScan} />
          </div>

          {/* Progress */}
          <AnimatePresence>
            {scanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ScanProgress progress={progress} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Locked Result */}
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl
                           border border-white/10
                           bg-black/40"
              >
                <p className="text-sm text-zinc-300 mb-1">
                  🔒 Scan completed
                </p>
                <p className="text-xs text-zinc-400">
                  Login is required to view the full security report.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
