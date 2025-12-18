"use client";

import { motion, Variants } from "motion/react";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // ✅ FIXED
    },
  },
};

export default function FeaturesPage() {
  return (
    <section className="py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div
          variants={item}
          whileHover={{
            y: -8,
            boxShadow: "0px 20px 40px rgba(16, 185, 129, 0.15)",
          }}
          className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
        >
          Feature 1
        </motion.div>

        <motion.div variants={item}>Feature 2</motion.div>
        <motion.div variants={item}>Feature 3</motion.div>
      </motion.div>
    </section>
  );
}
