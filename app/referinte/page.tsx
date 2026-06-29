"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

type GalleryCategory = "all" | "windows" | "doors" | "complex";

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop", category: "complex" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop", category: "windows" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&h=500&fit=crop", category: "windows" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop", category: "windows" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=600&h=400&fit=crop", category: "doors" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=500&fit=crop", category: "doors" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=450&fit=crop", category: "complex" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&h=400&fit=crop", category: "complex" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=500&fit=crop", category: "windows" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=600&h=450&fit=crop", category: "doors" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1531390658687-6eba4bf70cc0?w=600&h=400&fit=crop", category: "complex" as GalleryCategory },
  { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=500&fit=crop", category: "complex" as GalleryCategory },
];

export default function ReferintePage() {
  const { tr } = useLang();
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  const filters = [
    { key: "all" as GalleryCategory, label: tr.gallery_page.filter_all },
    { key: "windows" as GalleryCategory, label: tr.gallery_page.filter_windows },
    { key: "doors" as GalleryCategory, label: tr.gallery_page.filter_doors },
    { key: "complex" as GalleryCategory, label: tr.gallery_page.filter_complex },
  ];

  const prev = () => setLightbox((l) => (l !== null ? (l - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightbox((l) => (l !== null ? (l + 1) % filtered.length : null));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-16 px-4" style={{ background: "var(--clr-dark)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-1">{tr.gallery_page.title}</h1>
          <p className="text-gray-400">{tr.gallery_page.subtitle}</p>
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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div key={i} className="break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group" onClick={() => setLightbox(i)}>
              <Image src={item.src} alt={`Reference ${i + 1}`} width={600} height={450} className="w-full object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                <span className="text-white text-2xl font-light opacity-0 group-hover:opacity-100 transition-opacity">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20" onClick={() => setLightbox(null)}>
            <X size={20} />
          </button>
          <button className="absolute left-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={22} />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] mx-12" onClick={(e) => e.stopPropagation()}>
            <Image src={filtered[lightbox].src.replace(/w=600/, "w=1200").replace(/h=\d+/, "h=800")} alt="Gallery" width={1200} height={800} className="object-contain max-h-[85vh] rounded-xl" unoptimized />
          </div>
          <button className="absolute right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
}
