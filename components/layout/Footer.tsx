import Link from "next/link";

export default function Footer() {
  const linkClass =
    "group relative inline-block text-sm text-zinc-400 hover:text-emerald-400 transition";

  const underline =
    "absolute left-0 -bottom-1 h-[1px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full";

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Top */}
        <div className="grid gap-14 md:grid-cols-4">
          {/* Brand (spans 2 columns) */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight
                         text-zinc-100 hover:text-emerald-400 transition"
            >
              QR<span className="text-emerald-400">Guard</span>
            </Link>

            <p className="mt-4 text-sm text-zinc-400 max-w-sm">
              QRGuard helps users analyze QR codes and links using
              layered security analysis to prevent phishing and
              malicious redirects.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-medium text-zinc-200 mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "How it Works", href: "/how-it-works" },
                { label: "Features", href: "/features" },
                { label: "Scan", href: "/scan" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                    <span className={underline} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-sm font-medium text-zinc-200 mb-4">
              Trust & Security
            </h4>
            <ul className="space-y-3">
              {[
                "Privacy-first",
                "No link execution",
                "Sandboxed analysis",
              ].map((item) => (
                <li key={item} className={linkClass}>
                  {item}
                  <span className={underline} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-zinc-800
                        text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} QRGuard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
