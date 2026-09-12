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
import { useLanguage } from "@/components/ui/LanguageContext";

const DIETARY_FILTERS: DietaryFlag[] = [
  "Chef Special",
  "Signature Cocktail",
  "Gluten-Free",
  "Vegetarian",
  "Vegan",
];

export default function MenuPage() {
  const { t, locale } = useLanguage();
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [menuItems, setMenuItems] = useState(MOCK_MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDietary, setSelectedDietary] = useState<DietaryFlag | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);

  React.useEffect(() => {
    fetch("/api/menu")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.items && Array.isArray(data.items) && data.items.length > 0) {
          setMenuItems(data.items);
        }
        if (data?.categories && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
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
  }, [menuItems, selectedCategory, selectedDietary, searchQuery]);

  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodMenu",
    name: "Sokem Bar & Restaurant Food & Cocktail Menu",
    description: "Dry-aged steaks, artisan appetizers, signature cocktails, and curated beverages in Addis Ababa.",
    hasMenuSection: MOCK_CATEGORIES.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name,
      hasMenuItem: MOCK_MENU_ITEMS.filter((i) => i.categoryId === cat.id).map((item) => ({
        "@type": "MenuItem",
        name: item.title,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: item.currency,
        },
      })),
    })),
  };

  const getDietaryLabel = (flag: DietaryFlag) => {
    switch (flag) {
      case "Chef Special":
        return t.menu.dietary.chefSpecial;
      case "Signature Cocktail":
        return t.menu.dietary.signatureCocktail;
      case "Gluten-Free":
        return t.menu.dietary.glutenFree;
      case "Vegetarian":
        return t.menu.dietary.vegetarian;
      case "Vegan":
        return t.menu.dietary.vegan;
      default:
        return flag;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-24 space-y-12">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <span className="text-xs uppercase font-bold text-amber-700 dark:text-gold tracking-widest bg-gold/10 border border-amber-600/30 dark:border-gold/30 px-3.5 py-1 rounded-full">
          {t.menu.badge}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t.menu.title}
        </h1>
        <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {t.menu.subtitle}
        </p>
      </motion.div>

      {/* Search & Category Tabs */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder={t.menu.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-full bg-white dark:bg-canvas-lighter border border-slate-300 dark:border-white/[0.12] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-amber-500 dark:focus:border-gold focus:ring-1 focus:ring-amber-500 dark:focus:ring-gold transition-colors shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Animated Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "text-slate-950 font-bold"
                : "text-slate-600 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            {selectedCategory === "all" && (
              <motion.span
                layoutId="menuActivePill"
                className="absolute inset-0 bg-gold rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t.menu.allCategory}</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? "text-slate-950 font-bold"
                  : "text-slate-600 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              {selectedCategory === cat.id && (
                <motion.span
                  layoutId="menuActivePill"
                  className="absolute inset-0 bg-gold rounded-full shadow-sm"
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
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gold text-slate-950 font-bold border-gold shadow-sm"
                    : "border-slate-300 dark:border-white/[0.1] text-slate-600 dark:text-gray-300 hover:border-amber-500/40 dark:hover:border-gold/40 hover:text-slate-950 dark:hover:text-white bg-white/60 dark:bg-transparent"
                }`}
              >
                {getDietaryLabel(flag)}
              </button>
            );
          })}
          {selectedDietary && (
            <button
              onClick={() => setSelectedDietary(null)}
              className="text-xs text-amber-700 dark:text-gold font-semibold hover:underline ml-2 cursor-pointer"
            >
              {t.menu.clearFilter}
            </button>
          )}
        </div>
      </div>

      {/* Menu Grid */}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-950 font-bold bg-gold px-3 py-1 rounded-full shadow-sm">
                          <Eye className="w-3.5 h-3.5" />
                          {t.common.viewDetails}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
                        {item.dietaryFlags.map((flag) => (
                          <Badge key={flag} variant="gold">
                            {getDietaryLabel(flag)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-gold transition-colors">
                          {item.title}
                        </h3>
                        <span className="font-serif text-lg font-bold text-amber-700 dark:text-gold shrink-0">
                          {formatPrice(item.price, item.currency)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </CardContent>
                  </div>

                  <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
                    <span className="font-medium">{item.categoryName}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveItemModal(item);
                      }}
                      className="text-amber-700 dark:text-gold font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {t.common.viewDetails} →
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <Utensils className="w-12 h-12 text-slate-400 dark:text-gray-500 mx-auto" />
          <p className="text-slate-600 dark:text-gray-400 text-sm">
            {t.menu.noItemsFound}
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
            {locale === "am" ? "ማጣሪያዎችን ዳግም አስጀምር" : "Reset Filters"}
          </Button>
        </div>
      )}

      {/* Item Details Lightbox Modal */}
      {activeItemModal && (
        <Modal
          isOpen={!!activeItemModal}
          onClose={() => setActiveItemModal(null)}
          title={activeItemModal.title}
        >
          <div className="space-y-4">
            <div className="relative h-64 w-full rounded-xl overflow-hidden">
              <Image
                src={activeItemModal.imageUrl || ""}
                alt={activeItemModal.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-amber-700 dark:text-gold tracking-wider">
                {activeItemModal.categoryName}
              </span>
              <span className="font-serif text-xl font-bold text-amber-700 dark:text-gold">
                {formatPrice(activeItemModal.price, activeItemModal.currency)}
              </span>
            </div>

            <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
              {activeItemModal.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {activeItemModal.dietaryFlags.map((flag) => (
                <Badge key={flag} variant="gold">
                  {getDietaryLabel(flag)}
                </Badge>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveItemModal(null)}
              >
                {t.common.close}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
