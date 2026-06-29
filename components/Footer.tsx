"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function Footer() {
  const { tr } = useLang();

  const links = [
    { href: "/", label: tr.nav.home },
    { href: "/produse", label: tr.nav.products },
    { href: "/referinte", label: tr.nav.gallery },
    { href: "/despre-noi", label: tr.nav.about },
    { href: "/contact", label: tr.nav.contact },
    { href: "/blog", label: tr.nav.blog },
  ];

  return (
    <footer style={{ background: "var(--clr-dark)" }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center"
                style={{ background: "var(--clr-accent)" }}
              >
                <span className="text-white font-bold text-sm">FP</span>
              </div>
              <span className="font-bold text-lg text-white">FerestrăPro</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">{tr.footer.desc}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{tr.footer.links_title}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[var(--clr-accent-lt)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{tr.footer.contact_title}</h4>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: tr.footer.address },
                { icon: Phone, text: tr.footer.phone },
                { icon: Mail, text: tr.footer.email },
                { icon: Clock, text: tr.footer.hours },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <Icon size={16} className="mt-0.5 shrink-0" style={{ color: "var(--clr-accent-lt)" }} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-gray-500">
          {tr.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
