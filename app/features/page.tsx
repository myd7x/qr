"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

/* ----------------------------------
   Motion Variants
----------------------------------- */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function FeaturesPage() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-3xl font-semibold mb-4">
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
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Feature 1 */}
          <motion.div
            variants={item}
            whileHover={{
              y: -8,
              boxShadow: "0px 20px 40px rgba(16, 185, 129, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card>
              <Badge label="Core" type="info" />
              <h2 className="text-lg font-medium mt-3 mb-2">
                QR & URL Extraction
              </h2>
              <p className="text-sm text-zinc-400">
                Safely extracts URLs from QR codes or direct input
                without executing any embedded content.
              </p>
            </Card>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={item}
            whileHover={{
              y: -8,
              boxShadow: "0px 20px 40px rgba(245, 158, 11, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card>
              <Badge label="Static Analysis" type="warning" />
              <h2 className="text-lg font-medium mt-3 mb-2">
                Static URL Inspection
              </h2>
              <p className="text-sm text-zinc-400">
                Detects suspicious patterns such as deceptive
                keywords, IP-based URLs, and abnormal domains.
              </p>
            </Card>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={item}
            whileHover={{
              y: -8,
              boxShadow: "0px 20px 40px rgba(239, 68, 68, 0.18)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card>
              <Badge label="Dynamic Analysis" type="danger" />
              <h2 className="text-lg font-medium mt-3 mb-2">
                Sandbox Execution
              </h2>
              <p className="text-sm text-zinc-400">
                Executes links in a controlled environment to
                observe redirects, scripts, and runtime behavior.
              </p>
            </Card>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            variants={item}
            whileHover={{
              y: -8,
              boxShadow: "0px 20px 40px rgba(56, 189, 248, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card>
              <Badge label="Intelligence" type="info" />
              <h2 className="text-lg font-medium mt-3 mb-2">
                Threat Intelligence
              </h2>
              <p className="text-sm text-zinc-400">
                Cross-checks URLs against threat databases and
                indicators of known malicious activity.
              </p>
            </Card>
          </motion.div>

          {/* Feature 5 */}
          <motion.div
            variants={item}
            whileHover={{
              y: -8,
              boxShadow: "0px 20px 40px rgba(16, 185, 129, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card>
              <Badge label="Transparency" type="safe" />
              <h2 className="text-lg font-medium mt-3 mb-2">
                Risk Scoring & Classification
              </h2>
              <p className="text-sm text-zinc-400">
                Produces a clear risk score and classification
                explaining why a link is safe or dangerous.
              </p>
            </Card>
          </motion.div>

          {/* Feature 6 */}
          <motion.div
            variants={item}
            whileHover={{
              y: -8,
              boxShadow: "0px 20px 40px rgba(56, 189, 248, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card>
              <Badge label="User Control" type="info" />
              <h2 className="text-lg font-medium mt-3 mb-2">
                Reports & History
              </h2>
              <p className="text-sm text-zinc-400">
                Allows users to review past scans and detailed
                reports for auditing and decision-making.
              </p>
            </Card>
          </motion.div>
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
