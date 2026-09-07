"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  createGalleryItemAction,
  deleteGalleryItemAction,
  updateGalleryItemAction,
} from "@/lib/actions/gallery";

export interface GalleryItemView {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
  displayOrder?: number;
  isActive?: boolean;
}

interface GalleryManagerViewProps {
  user: AuthSessionPayload;
  initialItems?: GalleryItemView[];
}

const CATEGORIES = ["All", "Culinary", "Cocktails", "Ambience", "Events"];

export const GalleryManagerView: React.FC<GalleryManagerViewProps> = ({
  user,
  initialItems = [],
}) => {
  const [items, setItems] = useState<GalleryItemView[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Ambience",
    imageUrl: "",
    alt: "",
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.alt.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (res.ok && json.url) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: json.url,
          alt: prev.alt || prev.title || file.name,
        }));
      } else {
        alert(json.error || "Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl || !formData.title) return;

    setIsSubmitting(true);
    try {
      const result = await createGalleryItemAction({
        title: formData.title,
        category: formData.category,
        imageUrl: formData.imageUrl,
        alt: formData.alt || formData.title,
      });

      if (result.success && result.data) {
        setItems((prev) => [result.data as GalleryItemView, ...prev]);
        setIsModalOpen(false);
        setFormData({ title: "", category: "Ambience", imageUrl: "", alt: "" });
      } else {
        alert(result.error || "Failed to create gallery item");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this photo from the gallery?")) return;

    try {
      const res = await deleteGalleryItemAction(id);
      if (res.success) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert(res.error || "Failed to delete item");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting item");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <AdminHeader
        user={user}
        title="Gallery Manager"
        subtitle="Manage photo assets, ambience showcases, food plating, and venue highlights"
        actions={
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            size="sm"
            className="gap-2 shadow-glow font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Photo</span>
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <Card className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gallery photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gold text-slate-950 font-bold"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Grid of photos */}
      {filteredItems.length === 0 ? (
        <Card className="p-12 text-center text-slate-400 space-y-3">
          <ImageIcon className="w-12 h-12 mx-auto text-slate-600" />
          <p className="text-lg font-medium text-white">No gallery items found</p>
          <p className="text-sm text-slate-500">Add a new photo to showcase in the public gallery.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group p-0 border-slate-800">
              <div className="relative h-48 w-full bg-slate-950">
                <Image
                  src={item.imageUrl}
                  alt={item.alt || item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="gold">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-serif text-base font-bold text-white line-clamp-1">
                  {item.title}
                </h4>
                {item.alt && (
                  <p className="text-xs text-slate-400 line-clamp-1">{item.alt}</p>
                )}

                <div className="pt-2 flex items-center justify-end border-t border-slate-800/80">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 gap-1 text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Gallery Photo"
      >
        <form onSubmit={handleSaveItem} className="space-y-4">
          <Input
            label="Photo Title *"
            placeholder="e.g. Signature Smoked Mezcal"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold"
            >
              {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Photo Source (Upload or URL) *
            </label>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="gap-1.5 shrink-0"
              >
                <Upload className="w-3.5 h-3.5 text-gold" />
                <span>{isUploading ? "Uploading..." : "Upload File"}</span>
              </Button>
              <Input
                placeholder="https://images.unsplash.com/... or /uploads/..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
                className="flex-1"
              />
            </div>
          </div>

          <Input
            label="Alt Description"
            placeholder="Brief description for accessibility and SEO"
            value={formData.alt}
            onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
          />

          {formData.imageUrl && (
            <div className="relative h-40 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
              <Image
                src={formData.imageUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isUploading}
            >
              Add Photo
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
