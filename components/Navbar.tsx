"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Features", href: "/features" },
    { label: "Scan", href: "/scan" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur border-b border-zinc-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500 text-emerald-400 flex items-center justify-center font-bold">
            Q
          </div>
          <span className="font-semibold text-lg tracking-wide">
            QRGuard
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.href}
              label={link.label}
              href={link.href}
            />
          ))}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-zinc-300 hover:text-zinc-100 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-medium shadow-lg shadow-emerald-500/20"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-zinc-100 text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-zinc-950 border-t border-zinc-800"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-zinc-300 hover:text-emerald-400 transition"
                >
                  {l.label}
                </Link>
              ))}

              <div className="border-t border-zinc-800 my-2" />

              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-zinc-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-center rounded-lg bg-emerald-500 text-zinc-950 font-medium"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ---------------------------------- */
/* Nav Link Component */
/* ---------------------------------- */
function NavLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <motion.div whileHover="hover" className="relative">
      <Link
        href={href}
        className="text-zinc-300 hover:text-zinc-100 transition"
      >
        {label}
      </Link>
      <motion.span
        variants={{ hover: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        className="absolute left-0 -bottom-1 w-full h-[2px] bg-emerald-400 origin-left"
      />
    </motion.div>
  );
}
