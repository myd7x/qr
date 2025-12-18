"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  // ✅ Detect touch devices (mobile / tablet)
  useEffect(() => {
    const isTouch = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;

    setEnabled(!isTouch);
  }, []);

  // ⛔ Do not render cursor on mobile
  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    const targets = document.querySelectorAll("a, button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => setHover(true));
      el.addEventListener("mouseleave", () => setHover(false));
    });

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", () => setHover(true));
        el.removeEventListener("mouseleave", () => setHover(false));
      });
    };
  }, [enabled]);

  if (!enabled) return null; // ✅ mobile safe

  return (
    <motion.div
      animate={{
        x: pos.x - 12,
        y: pos.y - 12,
        scale: hover ? 1.8 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 900,
        damping: 30,
        mass: 0.3,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999]
                 w-6 h-6 rounded-full border
                 border-emerald-400 mix-blend-difference"
    />
  );
}
