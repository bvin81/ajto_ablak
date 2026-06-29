"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Star, Ruler, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { useRef } from "react";

const ALL_PRODUCTS = [
  { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=380&fit=crop", nameRo: "Ferestre PVC", nameHu: "PVC ablakok", href: "/produse" },
  { image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&h=380&fit=crop", nameRo: "Ferestre aluminiu", nameHu: "Alumínium ablakok", href: "/produse" },
  { image: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=500&h=380&fit=crop", nameRo: "Uși de intrare", nameHu: "Bejárati ajtók", href: "/produse" },
  { image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&h=380&fit=crop", nameRo: "Uși interioare", nameHu: "Belső ajtók", href: "/produse" },
  { image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&h=380&fit=crop", nameRo: "Rulouri exterioare", nameHu: "Kültéri redőnyök", href: "/produse" },
  { image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&h=380&fit=crop", nameRo: "Jaluzele & Umbrire", nameHu: "Zsaluziák & Árnyékolók", href: "/produse" },
  { image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=500&h=380&fit=crop", nameRo: "Plase insecte", nameHu: "Szúnyoghálók", href: "/produse" },
  { image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=500&h=380&fit=crop", nameRo: "Accesorii & Piese schimb", nameHu: "Kiegészítők & Alkatrészek", href: "/produse" },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=500&h=400&fit=crop",
];

const USP_ICONS = [CheckCircle2, Shield, Star, Ruler];

function ProductCarousel({ lang }: { lang: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector("[data-card]") as HTMLElement;
    const amount = card ? card.offsetWidth + 16 : 280;
    trackRef.current.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Desktop arrows */}
      <button
        onClick={() => scroll("prev")}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md border border-gray-100 items-center justify-center text-gray-600 hover:text-gray-900 transition-colors z-10"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => scroll("next")}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md border border-gray-100 items-center justify-center text-gray-600 hover:text-gray-900 transition-colors z-10"
      >
        <ChevronRight size={18} />
      </button>

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-3"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {ALL_PRODUCTS.map((p, i) => (
          <Link
            key={i}
            data-card
            href={p.href}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden shrink-0 flex flex-col"
            style={{ scrollSnapAlign: "start", width: "clamp(220px, 72vw, 280px)" }}
          >
            <div className="relative overflow-hidden" style={{ height: 180 }}>
              <Image
                src={p.image}
                alt={lang === "ro" ? p.nameRo : p.nameHu}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
            <div className="p-4 flex items-center justify-between flex-1">
              <h3 className="font-semibold text-gray-900 text-sm leading-snug">{lang === "ro" ? p.nameRo : p.nameHu}</h3>
              <ArrowRight size={14} style={{ color: "var(--clr-accent)" }} className="shrink-0 ml-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile hint */}
      <p className="md:hidden text-center text-xs text-gray-400 mt-2">
        {lang === "ro" ? "← Glisați pentru mai multe →" : "← Húzzon a további termékekért →"}
      </p>
    </div>
  );
}

export default function Home() {
  const { lang, tr } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&h=900&fit=crop"
            alt="Modern house"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "var(--clr-hero-overlay)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {tr.hero.title}
            </h1>
            <p className="text-lg text-gray-200 mb-10 leading-relaxed">{tr.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-colors text-base"
                style={{ background: "var(--clr-accent)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--clr-accent-dk)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clr-accent)")}
              >
                {tr.hero.cta_primary}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/produse"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-colors text-base"
              >
                {tr.hero.cta_secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            {tr.products_preview.title}
          </h2>
          <ProductCarousel lang={lang} />
          <div className="text-center mt-8">
            <Link
              href="/produse"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
              style={{ color: "var(--clr-accent)" }}
            >
              {lang === "ro" ? "Vezi toate produsele" : "Összes termék megtekintése"}
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* USP band */}
      <section className="py-20" style={{ background: "var(--clr-dark)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">{tr.usp.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tr.usp.items.map((item, i) => {
              const Icon = USP_ICONS[i];
              return (
                <div key={i} className="text-center">
                  <div
                    className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ background: "var(--clr-accent-subtle)", border: "1px solid var(--clr-accent-lt)" }}
                  >
                    <Icon size={26} style={{ color: "var(--clr-accent-lt)" }} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{tr.gallery_preview.title}</h2>
            <p className="text-gray-500">{tr.gallery_preview.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i} className="relative h-56 sm:h-72 rounded-2xl overflow-hidden group">
                <Image
                  src={src}
                  alt={`Reference ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/referinte" className="font-semibold hover:underline" style={{ color: "var(--clr-accent)" }}>
              {tr.gallery_preview.view_all}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16" style={{ background: "var(--clr-accent)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{tr.cta_band.title}</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">{tr.cta_band.subtitle}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            style={{ color: "var(--clr-accent)" }}
          >
            {tr.cta_band.button}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
