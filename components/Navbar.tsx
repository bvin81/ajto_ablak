"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function Navbar() {
  const { lang, setLang, tr } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: tr.nav.home },
    { href: "/produse", label: tr.nav.products },
    { href: "/referinte", label: tr.nav.gallery },
    { href: "/despre-noi", label: tr.nav.about },
    { href: "/blog", label: tr.nav.blog },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center"
              style={{ background: "var(--clr-accent)" }}
            >
              <span className="text-white font-bold text-sm">FP</span>
            </div>
            <span className="font-bold text-lg text-gray-900">FerestrăPro</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-[var(--clr-accent)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "ro" ? "hu" : "ro")}
              className="text-xs font-semibold px-2 py-1 rounded border border-gray-200 text-gray-500 hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)] transition-colors"
            >
              {lang === "ro" ? "HU" : "RO"}
            </button>
            <Link
              href="/contact"
              className="text-sm font-semibold px-4 py-2 text-white rounded-lg transition-colors"
              style={{ background: "var(--clr-accent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--clr-accent-dk)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clr-accent)")}
            >
              {tr.nav.quote}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm font-medium text-gray-700"
              style={{ ["--hover-color" as string]: "var(--clr-accent)" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <button
              onClick={() => setLang(lang === "ro" ? "hu" : "ro")}
              className="text-xs font-semibold px-2 py-1 rounded border border-gray-200 text-gray-500"
            >
              {lang === "ro" ? "HU" : "RO"}
            </button>
            <Link
              href="/contact"
              className="text-sm font-semibold px-4 py-2 text-white rounded-lg"
              style={{ background: "var(--clr-accent)" }}
              onClick={() => setMenuOpen(false)}
            >
              {tr.nav.quote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
