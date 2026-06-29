"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
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

  const filtered = selected ? galleryItems.filter((g) => g.category === selected) : [];

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
              onClick={() => setSelected(null)}
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
                <div key={i} className="break-inside-avoid relative overflow-hidden rounded-2xl">
                  <Image
                    src={item.src}
                    alt={catLabel(selected)}
                    width={600}
                    height={450}
                    className="w-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
