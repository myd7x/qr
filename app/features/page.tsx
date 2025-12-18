"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

/* ----------------------------------
   Data (Prevents JSX repetition)
----------------------------------- */
const FEATURES = [
  {
    badge: "Core",
    type: "info",
    title: "QR & URL Extraction",
    desc: "Safely extracts URLs from QR codes or direct input without executing any embedded content.",
    shadow: "rgba(16, 185, 129, 0.15)",
  },
  {
    badge: "Static Analysis",
    type: "warning",
    title: "Static URL Inspection",
    desc: "Detects suspicious patterns such as deceptive keywords, IP-based URLs, and abnormal domains.",
    shadow: "rgba(245, 158, 11, 0.15)",
  },
  {
    badge: "Dynamic Analysis",
    type: "danger",
    title: "Sandbox Execution",
    desc: "Executes links in a controlled environment to observe redirects, scripts, and runtime behavior.",
    shadow: "rgba(239, 68, 68, 0.18)",
  },
  {
    badge: "Intelligence",
    type: "info",
    title: "Threat Intelligence",
    desc: "Cross-checks URLs against threat databases and indicators of known malicious activity.",
    shadow: "rgba(56, 189, 248, 0.15)",
  },
  {
    badge: "Transparency",
    type: "safe",
    title: "Risk Scoring & Classification",
    desc: "Produces a clear risk score and classification explaining why a link is safe or dangerous.",
    shadow: "rgba(16, 185, 129, 0.15)",
  },
  {
    badge: "User Control",
    type: "info",
    title: "Reports & History",
    desc: "Allows users to review past scans and detailed reports for auditing and decision-making.",
    shadow: "rgba(56, 189, 248, 0.15)",
  },
];

/* ----------------------------------
   Motion Variants (Typed to fix build error)
----------------------------------- */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut", // Now correctly typed
    },
  },
};

export default function FeaturesPage() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-3xl font-semibold mb-4 text-white">
            Security Features
          </h1>
          <p className="text-sm text-zinc-400">
            QRGuard applies a layered security approach to analyze
            QR codes and links, combining static inspection, dynamic
            behavior analysis, and threat intelligence.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: `0px 20px 40px ${feature.shadow}`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card>
                <Badge label={feature.badge} type={feature.type as any} />
                <h2 className="text-lg font-medium mt-3 mb-2 text-white">
                  {feature.title}
                </h2>
                <p className="text-sm text-zinc-400">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <Link href="/scan">
            <Button>
              Start Scanning
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}