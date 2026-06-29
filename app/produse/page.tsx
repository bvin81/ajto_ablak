"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

type Category = "all" | "windows" | "doors" | "shutters" | "mosquito";

const products = [
  { category: "windows" as Category, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop", detail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", nameRo: "Ferestre PVC", nameHu: "PVC ablakok", detailsRo: "Ferestre PVC cu geam termoizolant dublu sau triplu strat. Profile cu 5 sau 6 camere, feronerie premium inclusă.", detailsHu: "PVC ablakok kétrétegű vagy háromrétegű hőszigetelő üveggel. 5–6 kamrás profilok, prémium vasalattal." },
  { category: "windows" as Category, image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&h=400&fit=crop", detail: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop", nameRo: "Ferestre aluminiu", nameHu: "Alumínium ablakok", detailsRo: "Ferestre din aluminiu cu rupere de punte termică. Rezistente la coroziune, ideale pentru construcții moderne.", detailsHu: "Hőhídmentes alumínium ablakok. Korrózióálló, modern épületekhez ideális." },
  { category: "doors" as Category, image: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=500&h=400&fit=crop", detail: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&h=600&fit=crop", nameRo: "Uși de intrare", nameHu: "Bejárati ajtók", detailsRo: "Uși de intrare din aluminiu sau PVC cu sistem antiefracție certificat. Umplutură termoizolantă.", detailsHu: "Alumínium vagy PVC bejárati ajtók tanúsított betörésálló rendszerrel. Hőszigetelő töltéssel." },
  { category: "doors" as Category, image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&h=400&fit=crop", detail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop", nameRo: "Uși interioare", nameHu: "Belső ajtók", detailsRo: "Uși interioare din MDF sau lemn masiv, bătante, glisante sau pliante. Gamă largă de culori.", detailsHu: "MDF vagy tömörfa belső ajtók, nyíló, toló vagy harmonika kivitelben. Széles szín- és mintaválaszték." },
  { category: "shutters" as Category, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&h=400&fit=crop", detail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", nameRo: "Rulouri exterioare", nameHu: "Kültéri redőnyök", detailsRo: "Rulouri exterioare din aluminiu cu acționare manuală sau automată. Compatibile cu sisteme smart home.", detailsHu: "Kültéri alumínium redőnyök kézi vagy motoros működtetéssel. Okosotthon rendszerekkel kompatibilis." },
  { category: "shutters" as Category, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&h=400&fit=crop", detail: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop", nameRo: "Jaluzele & Sisteme umbrire", nameHu: "Zsaluziák & Árnyékolók", detailsRo: "Jaluzele interioare și exterioare din lemn, aluminiu sau material textil. Sisteme personalizabile.", detailsHu: "Bel- és kültéri fa, alumínium vagy textil zsaluziák. Testre szabható árnyékolórendszerek." },
  { category: "mosquito" as Category, image: "https://images.unsplash.com/photo-1531390658687-6eba4bf70cc0?w=500&h=400&fit=crop", detail: "https://images.unsplash.com/photo-1531390658687-6eba4bf70cc0?w=800&h=600&fit=crop", nameRo: "Plase insecte", nameHu: "Szúnyoghálók", detailsRo: "Plase de insecte fixe, rulante sau pliante. Cadre din aluminiu ușor, montaj rapid.", detailsHu: "Fix, feltekerhető vagy összehajtható szúnyoghálók. Könnyű alumínium keret, gyors szerelés." },
  { category: "mosquito" as Category, image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=500&h=400&fit=crop", detail: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop", nameRo: "Accesorii & Piese schimb", nameHu: "Kiegészítők & Alkatrészek", detailsRo: "Accesorii și piese de schimb: mânere, balamale, garnituri. Service și înlocuire rapidă.", detailsHu: "Kiegészítők és cserealkatrészek: kilincsek, zsanérok, tömítések. Gyors szerviz és csere." },
];

export default function ProducePage() {
  const { lang, tr } = useLang();
  const [filter, setFilter] = useState<Category>("all");
  const [selected, setSelected] = useState<(typeof products)[0] | null>(null);

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  const filters: { key: Category; label: string }[] = [
    { key: "all", label: tr.products_page.filter_all },
    { key: "windows", label: tr.products_page.filter_windows },
    { key: "doors", label: tr.products_page.filter_doors },
    { key: "shutters", label: tr.products_page.filter_shutters },
    { key: "mosquito", label: tr.products_page.filter_mosquito },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 px-4" style={{ background: "var(--clr-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">{tr.products_page.title}</h1>
          <nav className="text-sm text-gray-400">
            <a href="/" className="hover:text-white">Home</a>
            <span className="mx-2">/</span>
            <span className="text-gray-200">{tr.products_page.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-colors border"
              style={
                filter === f.key
                  ? { background: "var(--clr-accent)", color: "#fff", borderColor: "var(--clr-accent)" }
                  : { background: "#fff", color: "#4b5563", borderColor: "#e5e7eb" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden cursor-pointer"
              onClick={() => setSelected(p)}
            >
              <div className="relative h-44 overflow-hidden">
                <Image src={p.image} alt={lang === "ro" ? p.nameRo : p.nameHu} fill className="object-cover hover:scale-105 transition-transform duration-300" unoptimized />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{lang === "ro" ? p.nameRo : p.nameHu}</h3>
                <button className="text-sm font-medium mt-2 hover:underline" style={{ color: "var(--clr-accent)" }}>
                  {tr.products_page.details_btn} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64">
              <Image src={selected.detail} alt={lang === "ro" ? selected.nameRo : selected.nameHu} fill className="object-cover" unoptimized />
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100" onClick={() => setSelected(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{lang === "ro" ? selected.nameRo : selected.nameHu}</h2>
              <p className="text-gray-600 leading-relaxed">{lang === "ro" ? selected.detailsRo : selected.detailsHu}</p>
              <div className="mt-6 flex gap-3">
                <a href="/contact" className="px-6 py-2.5 text-white rounded-lg font-medium text-sm transition-colors" style={{ background: "var(--clr-accent)" }}>
                  {tr.nav.quote}
                </a>
                <button className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors" onClick={() => setSelected(null)}>
                  {tr.products_page.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
