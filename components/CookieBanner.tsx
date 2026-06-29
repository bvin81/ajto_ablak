"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";

const TEXTS = {
  ro: {
    message: "Folosim cookie-uri pentru a îmbunătăți experiența dvs. pe site. Prin continuarea navigării, acceptați utilizarea cookie-urilor.",
    accept: "Accept toate",
    decline: "Doar necesare",
    more: "Aflați mai mult",
  },
  hu: {
    message: "Cookie-kat használunk a weboldal működéséhez és a felhasználói élmény javításához. A böngészés folytatásával elfogadja a cookie-k használatát.",
    accept: "Mindet elfogadom",
    decline: "Csak szükségesek",
    more: "Tudjon meg többet",
  },
};

export default function CookieBanner() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const tx = TEXTS[lang];

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "all");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1 leading-relaxed">
          🍪 {tx.message}{" "}
          <Link href="#" className="underline hover:text-gray-900" style={{ color: "var(--clr-accent)" }}>
            {tx.more}
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {tx.decline}
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors"
            style={{ background: "var(--clr-accent)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--clr-accent-dk)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clr-accent)")}
          >
            {tx.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
