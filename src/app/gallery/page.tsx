"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { MOCK_GALLERY } from "@/lib/data";
import { GalleryCategory, GalleryItem } from "@/types";

const CATEGORIES: GalleryCategory[] = ["All", "Culinary", "Cocktails", "Ambience", "Events"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return MOCK_GALLERY;
    return MOCK_GALLERY.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const activeItem: GalleryItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
    );
  }, [activeLightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
    );
  }, [activeLightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") setActiveLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, handleNext, handlePrev]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-24 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Photos & Ambience</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Visual Atmosphere
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          A vibrant look into our kitchen craft, cocktail bar, and candlelit rooms in Addis Ababa.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveLightboxIndex(null);
            }}
            className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              selectedCategory === cat
                ? "text-slate-950 font-bold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {selectedCategory === cat && (
              <motion.span
                layoutId="galleryActivePill"
                className="absolute inset-0 bg-gold rounded-full shadow-glow"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer border border-white/[0.1] hover:border-gold/50 transition-all duration-300 shadow-lg"
              onClick={() => setActiveLightboxIndex(index)}
            >
              <Image
                src={item.imageUrl}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                <div>
                  <span className="text-xs uppercase font-bold text-gold tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold text-slate-950 flex items-center justify-center shadow-glow">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      {activeItem && activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-canvas border border-white/[0.1] text-gray-300 hover:text-white z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-canvas/80 border border-white/[0.1] text-gray-300 hover:text-gold z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-canvas/80 border border-white/[0.1] text-gray-300 hover:text-gold z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden border border-white/[0.15]">
              <Image
                src={activeItem.imageUrl}
                alt={activeItem.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center mt-4">
              <span className="text-xs uppercase font-bold text-gold tracking-wider block">
                {activeItem.category}
              </span>
              <h3 className="font-serif text-xl font-bold text-white mt-1">
                {activeItem.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
