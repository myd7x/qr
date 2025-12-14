"use client";

import { motion } from "motion/react";
import Card from "@/components/ui/Card";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Scan QR or Import Link",
      desc: "Upload a QR code image or paste a URL. QRGuard safely extracts the destination without executing it.",
    },
    {
      title: "Static Analysis",
      desc: "The link is inspected for suspicious patterns, misleading domains, and known phishing indicators.",
    },
    {
      title: "Dynamic Analysis",
      desc: "The URL is executed in a sandboxed environment to observe redirects and runtime behavior safely.",
    },
    {
      title: "Risk Assessment",
      desc: "QRGuard generates a clear risk score and explanation before the user interacts with the link.",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* ================= BACKGROUND ================= */}

      {/* Technical Grid */}
      <div
        className="absolute inset-0 bg-zinc-950
                   [background-image:
                   linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),
                   linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)]
                   [background-size:40px_40px]"
      />

      {/* Emerald Accent Glows */}
      <div
        className="absolute -top-32 left-24
                   w-[420px] h-[420px]
                   bg-emerald-500/15 blur-[140px]"
      />
      <div
        className="absolute bottom-0 right-24
                   w-[320px] h-[320px]
                   bg-emerald-400/10 blur-[120px]"
      />

      {/* ================= CONTENT ================= */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold mb-6"
          >
            How It Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-zinc-400"
          >
            QRGuard follows a structured security pipeline that analyzes
            QR codes and links through multiple layers before the user
            interacts with them.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                boxShadow: "0px 20px 40px rgba(16, 185, 129, 0.12)",
              }}
            >
              <Card>
                <span className="text-xs text-emerald-400 font-medium">
                  STEP {index + 1}
                </span>
                <h3 className="text-lg font-medium mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400">
                  {step.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
