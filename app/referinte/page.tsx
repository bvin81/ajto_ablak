"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

type GalleryCategory = "windows" | "doors" | "complex";

const CATEGORIES: { key: GalleryCategory; imageRo: string; imageHu: string; cover: string; count: number }[] = [
  {
    key: "windows",
    imageRo: "Ferestre",
    imageHu: "Ablakok",
    cover: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    count: 4,
  },
  {
    key: "doors",
    imageRo: "Uși",
    imageHu: "Ajtók",
    cover: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&h=600&fit=crop",
    count: 3,
  },
  {
    key: "complex",
    imageRo: "Proiecte complexe",
    imageHu: "Komplex projektek",
    cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    count: 5,
  },
];

const galleryItems: { src: string; category: GalleryCategory }[] = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop", category: "complex" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop", category: "windows" },
  { src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&h=500&fit=crop", category: "windows" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop", category: "windows" },
  { src: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=600&h=400&fit=crop", category: "doors" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=500&fit=crop", category: "doors" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=450&fit=crop", category: "complex" },
  { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&h=400&fit=crop", category: "complex" },
  { src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=500&fit=crop", category: "windows" },
  { src: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=600&h=450&fit=crop", category: "doors" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop", category: "complex" },
  { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=500&fit=crop", category: "complex" },
];

export default function ReferintePage() {
  const { lang, tr } = useLang();
  const [selected, setSelected] = useState<GalleryCategory | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = selected ? galleryItems.filter((g) => g.category === selected) : [];

  const prev = () => setLightbox((l) => (l !== null ? (l - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightbox((l) => (l !== null ? (l + 1) % filtered.length : null));

  const catLabel = (key: GalleryCategory) =>
    lang === "ro"
      ? CATEGORIES.find((c) => c.key === key)!.imageRo
      : CATEGORIES.find((c) => c.key === key)!.imageHu;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-16 px-4" style={{ background: "var(--clr-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-1">{tr.gallery_page.title}</h1>
          <p className="text-gray-400">{tr.gallery_page.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Category grid view ── */}
        {!selected && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelected(cat.key)}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 aspect-[4/3] cursor-pointer"
              >
                <Image
                  src={cat.cover}
                  alt={lang === "ro" ? cat.imageRo : cat.imageHu}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white text-xl font-bold">
                    {lang === "ro" ? cat.imageRo : cat.imageHu}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    {cat.count} {lang === "ro" ? "fotografii" : "fotó"} →
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Photos view ── */}
        {selected && (
          <>
            {/* Back button */}
            <button
              onClick={() => { setSelected(null); setLightbox(null); }}
              className="inline-flex items-center gap-2 text-sm font-medium mb-8 hover:underline"
              style={{ color: "var(--clr-accent)" }}
            >
              <ArrowLeft size={16} />
              {lang === "ro" ? "Înapoi la categorii" : "Vissza a kategóriákhoz"}
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-8">{catLabel(selected)}</h2>

            {/* Masonry grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((item, i) => (
                <div
                  key={i}
                  className="break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group"
                  onClick={() => setLightbox(i)}
                >
                  <Image
                    src={item.src}
                    alt={catLabel(selected)}
                    width={600}
                    height={450}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white text-xs font-semibold">
                      {lang === "ro" ? "Mărește" : "Nagyítás"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20" onClick={() => setLightbox(null)}>
            <X size={20} />
          </button>
          <button className="absolute left-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={22} />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] mx-16 flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <Image
              src={filtered[lightbox].src.replace(/w=600/, "w=1200").replace(/h=\d+/, "h=800")}
              alt="Gallery"
              width={1200}
              height={800}
              className="object-contain max-h-[78vh] rounded-xl"
              unoptimized
            />
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm backdrop-blur-sm">
              {selected && catLabel(selected)}
              <span className="text-white/40 ml-2">{lightbox + 1} / {filtered.length}</span>
            </div>
          </div>
          <button className="absolute right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
}
