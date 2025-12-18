"use client";

import { motion } from "motion/react";

export default function QRDangerSection() {
  const points = [
    {
      title: "Hidden Destinations",
      desc: "QR codes hide the actual URL, so users cannot preview where the link leads before scanning.",
    },
    {
      title: "Easy to Manipulate",
      desc: "Attackers can replace or overlay legitimate QR codes in public places with malicious ones.",
    },
    {
      title: "High User Trust",
      desc: "People trust QR codes by default, which makes them a powerful vector for phishing attacks.",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0
                   bg-gradient-to-br
                   from-zinc-950 via-zinc-900 to-emerald-950"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-6"
        >
          QR Codes Are Not Always Safe
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl text-zinc-400 mb-16"
        >
          QR codes are widely used for payments, menus, and access links,
          but they can silently redirect users to malicious websites
          without any visible warning.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {points.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                boxShadow: "0px 20px 40px rgba(16, 185, 129, 0.15)",
              }}
              className="p-6 rounded-2xl border border-zinc-800
                         bg-zinc-900/70 backdrop-blur"
            >
              <h3 className="text-lg font-medium mb-2 text-emerald-400">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
