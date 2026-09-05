"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Utensils, X, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS } from "@/lib/data";
import { MenuItem, DietaryFlag } from "@/types";
import { formatPrice } from "@/lib/utils";

const DIETARY_FILTERS: DietaryFlag[] = [
  "Chef Special",
  "Signature Cocktail",
  "Gluten-Free",
  "Vegetarian",
  "Vegan",
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDietary, setSelectedDietary] = useState<DietaryFlag | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    return MOCK_MENU_ITEMS.filter((item) => {
      if (selectedCategory !== "all" && item.categoryId !== selectedCategory) {
        return false;
      }
      if (selectedDietary && !item.dietaryFlags.includes(selectedDietary)) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-24 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <span className="text-xs uppercase font-bold text-gold tracking-widest bg-gold/10 border border-gold/30 px-3.5 py-1 rounded-full">
          Our Full Selection
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Food & Cocktail Menu
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          From wood-fired prime steaks to handcrafted artisanal mixology, explore our fresh daily dishes in Addis Ababa.
        </p>
      </motion.div>

      {/* Search & Category Tabs */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search dishes, ingredients, drinks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-full bg-canvas-lighter border border-white/[0.12] text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Animated Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
              selectedCategory === "all" ? "text-slate-950 font-bold" : "text-gray-300 hover:text-white"
            }`}
          >
            {selectedCategory === "all" && (
              <motion.span
                layoutId="menuActivePill"
                className="absolute inset-0 bg-gold rounded-full shadow-glow"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">All</span>
          </button>

          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id ? "text-slate-950 font-bold" : "text-gray-300 hover:text-white"
              }`}
            >
              {selectedCategory === cat.id && (
                <motion.span
                  layoutId="menuActivePill"
                  className="absolute inset-0 bg-gold rounded-full shadow-glow"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
          {DIETARY_FILTERS.map((flag) => {
            const isSelected = selectedDietary === flag;
            return (
              <button
                key={flag}
                onClick={() => setSelectedDietary(isSelected ? null : flag)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? "bg-gold text-slate-950 font-bold border-gold shadow-glow"
                    : "border-white/[0.1] text-gray-300 hover:border-gold/40 hover:text-white"
                }`}
              >
                {flag}
              </button>
            );
          })}
          {selectedDietary && (
            <button
              onClick={() => setSelectedDietary(null)}
              className="text-xs text-gold hover:underline ml-2"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Menu Grid with Animated Transitions */}
      {filteredItems.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="group flex flex-col justify-between h-full cursor-pointer"
                  onClick={() => setActiveItemModal(item)}
                >
                  <div>
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={item.imageUrl || ""}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-950 font-bold bg-gold px-3 py-1 rounded-full shadow-glow">
                          <Eye className="w-3.5 h-3.5" />
                          View Details
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
                        {item.dietaryFlags.map((flag) => (
                          <Badge key={flag} variant="gold">
                            {flag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors">
                          {item.title}
                        </h3>
                        <span className="font-serif text-lg font-bold text-gold shrink-0">
                          {formatPrice(item.price, item.currency)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </CardContent>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-gray-400">
                    <span>{item.categoryName}</span>
                    <span className="text-emerald-400 font-medium">Available</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 luminous-card rounded-2xl p-8 space-y-4 max-w-md mx-auto">
          <Utensils className="w-8 h-8 text-gold mx-auto" />
          <h3 className="font-serif text-xl font-bold text-white">No items found</h3>
          <p className="text-sm text-gray-300">
            No dishes matched your search criteria.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory("all");
              setSelectedDietary(null);
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Item Detail Modal */}
      <Modal
        isOpen={!!activeItemModal}
        onClose={() => setActiveItemModal(null)}
        title={activeItemModal?.title}
      >
        {activeItemModal && (
          <div className="space-y-6">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-white/[0.1]">
              <Image
                src={activeItemModal.imageUrl || ""}
                alt={activeItemModal.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-3">
              <span className="text-xs uppercase font-bold text-gold tracking-wider">
                {activeItemModal.categoryName}
              </span>
              <span className="font-serif text-2xl font-bold text-gold">
                {formatPrice(activeItemModal.price, activeItemModal.currency)}
              </span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              {activeItemModal.description}
            </p>
            <div className="space-y-2">
              <span className="text-xs text-gray-400 font-medium block">
                Dietary & Allergen Information:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeItemModal.dietaryFlags.map((flag) => (
                  <Badge key={flag} variant="gold">
                    {flag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
