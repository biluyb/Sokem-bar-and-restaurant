"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Utensils,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { MOCK_MENU_ITEMS, MOCK_CATEGORIES } from "@/lib/data";
import { MenuItem, DietaryFlag } from "@/types";
import { formatPrice } from "@/lib/utils";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { AdminHeader } from "@/components/admin/AdminHeader";

interface MenuManagerViewProps {
  user: AuthSessionPayload;
}

const ALL_DIETARY_FLAGS: DietaryFlag[] = [
  "Chef Special",
  "Signature Cocktail",
  "Gluten-Free",
  "Vegetarian",
  "Vegan",
];

export const MenuManagerView: React.FC<MenuManagerViewProps> = ({ user }) => {
  const [items, setItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "sold_out">("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    categoryId: MOCK_CATEGORIES[0].id,
    price: 350,
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    dietaryFlags: [] as DietaryFlag[],
    isAvailable: true,
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategory !== "all" && item.categoryId !== selectedCategory) {
        return false;
      }
      if (statusFilter === "available" && !item.isAvailable) return false;
      if (statusFilter === "sold_out" && item.isAvailable) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [items, selectedCategory, statusFilter, searchQuery]);

  const toggleStock = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this dish from the menu?")) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingItemId(null);
    setFormData({
      title: "",
      categoryId: MOCK_CATEGORIES[0].id,
      price: 350,
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      dietaryFlags: [],
      isAvailable: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItemId(item.id);
    setFormData({
      title: item.title,
      categoryId: item.categoryId,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl || "",
      dietaryFlags: [...item.dietaryFlags],
      isAvailable: item.isAvailable,
    });
    setIsModalOpen(true);
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    const category = MOCK_CATEGORIES.find((c) => c.id === formData.categoryId);
    const categoryName = category ? category.name : "Specials";

    if (editingItemId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                ...formData,
                categoryName,
              }
            : item
        )
      );
    } else {
      const newItem: MenuItem = {
        id: `dish-${Date.now()}`,
        title: formData.title,
        categoryId: formData.categoryId,
        categoryName,
        price: Number(formData.price),
        currency: "ETB",
        description: formData.description,
        imageUrl: formData.imageUrl,
        dietaryFlags: formData.dietaryFlags,
        isAvailable: formData.isAvailable,
        isFeatured: false,
      };
      setItems((prev) => [newItem, ...prev]);
    }

    setIsModalOpen(false);
  };

  const toggleDietaryFlag = (flag: DietaryFlag) => {
    setFormData((prev) => ({
      ...prev,
      dietaryFlags: prev.dietaryFlags.includes(flag)
        ? prev.dietaryFlags.filter((f) => f !== flag)
        : [...prev.dietaryFlags, flag],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Unified Header */}
      <AdminHeader
        user={user}
        title="Menu & Stock Manager"
        subtitle="Live catalog control, dish pricing, availability switches, and culinary specials"
        actions={
          <Button
            onClick={openAddModal}
            variant="primary"
            size="sm"
            className="gap-2 shadow-glow font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish</span>
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search */}
        <div className="relative md:col-span-5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search dish name, description, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Select */}
        <div className="md:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
          >
            <option value="all">All Categories ({items.length})</option>
            {MOCK_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({items.filter((i) => i.categoryId === cat.id).length})
              </option>
            ))}
          </select>
        </div>

        {/* Stock Filter Tabs */}
        <div className="md:col-span-3 flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setStatusFilter("all")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === "all"
                ? "bg-gold text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("available")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === "available"
                ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            In Stock
          </button>
          <button
            onClick={() => setStatusFilter("sold_out")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === "sold_out"
                ? "bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sold Out
          </button>
        </div>
      </div>

      {/* Menu Table Card */}
      <Card className="overflow-hidden border-slate-800">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/50">
          <div>
            <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Utensils className="w-4 h-4 text-gold" />
              Dish Catalog ({filteredItems.length} items)
            </h2>
            <p className="text-xs text-slate-400">
              Instant toggles apply directly to customer ordering & menu views
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span>{items.filter((i) => i.isAvailable).length} Available</span>
            <span className="text-slate-600">|</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span>{items.filter((i) => !i.isAvailable).length} Sold Out</span>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Dish</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Price</th>
                <th className="px-6 py-3.5">Dietary Tags</th>
                <th className="px-6 py-3.5 text-center">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-white/[0.08]">
                        <Image
                          src={item.imageUrl || ""}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-gold transition-colors">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1 max-w-sm">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-300">
                    {item.categoryName}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-gold text-sm">
                    {formatPrice(item.price, item.currency)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {item.dietaryFlags.length > 0 ? (
                        item.dietaryFlags.map((flag) => (
                          <span
                            key={flag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 border border-white/[0.08] text-slate-300"
                          >
                            {flag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStock(item.id)}
                      className="cursor-pointer focus-visible:outline-none"
                    >
                      {item.isAvailable ? (
                        <Badge variant="success" className="cursor-pointer">
                          ● In Stock
                        </Badge>
                      ) : (
                        <Badge variant="danger" className="cursor-pointer">
                          ● Sold Out
                        </Badge>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditModal(item)}
                      className="text-xs text-slate-300 hover:text-white"
                      title="Edit dish"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                      title="Delete dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    No dishes found matching the active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Dish Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItemId ? "Edit Dish Details" : "Add New Dish to Menu"}
      >
        <form onSubmit={handleSaveDish} className="space-y-4">
          <Input
            label="Dish Title *"
            placeholder="e.g. Pan-Seared Wagyu Ribeye"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold"
              >
                {MOCK_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Price (ETB) *"
              type="number"
              placeholder="e.g. 950"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
            />
          </div>

          <Textarea
            label="Description *"
            placeholder="Describe the dish, preparation, ingredients, and garnish..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <Input
            label="Image URL *"
            placeholder="https://images.unsplash.com/..."
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Dietary Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_DIETARY_FLAGS.map((flag) => {
                const isSelected = formData.dietaryFlags.includes(flag);
                return (
                  <button
                    type="button"
                    key={flag}
                    onClick={() => toggleDietaryFlag(flag)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      isSelected
                        ? "bg-gold text-slate-950 font-bold border-gold shadow-glow"
                        : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
                    }`}
                  >
                    {flag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isAvailableCheckbox"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              className="w-4 h-4 rounded text-gold focus:ring-gold bg-slate-900 border-slate-700"
            />
            <label htmlFor="isAvailableCheckbox" className="text-xs font-medium text-slate-200">
              Immediately available in stock for customer orders
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingItemId ? "Save Changes" : "Create Dish"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
