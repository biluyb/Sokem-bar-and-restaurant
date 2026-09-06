"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { MOCK_EVENTS } from "@/lib/data";
import { EventItem } from "@/types";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { AdminHeader } from "@/components/admin/AdminHeader";

interface EventManagerViewProps {
  user: AuthSessionPayload;
}

export const EventManagerView: React.FC<EventManagerViewProps> = ({ user }) => {
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    date: "Every Thursday",
    time: "7:00 PM – 11:30 PM",
    description: "",
    badge: "Special Night",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  });

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const q = searchQuery.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        (e.badge && e.badge.toLowerCase().includes(q))
    );
  }, [events, searchQuery]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingEventId(null);
    setFormData({
      title: "",
      date: "Upcoming Weekend",
      time: "8:00 PM – Late",
      description: "",
      badge: "Live Event",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (event: EventItem) => {
    setEditingEventId(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      badge: event.badge || "",
      imageUrl: event.imageUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEventId) {
      setEvents((prev) =>
        prev.map((item) =>
          item.id === editingEventId
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );
    } else {
      const newEvent: EventItem = {
        id: `event-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `event-${Date.now()}`,
        isPublished: true,
        ...formData,
      };
      setEvents((prev) => [newEvent, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Unified Header */}
      <AdminHeader
        user={user}
        title="Events & Theme Nights Manager"
        subtitle="Schedule live performances, cocktail masterclasses, DJ sets, and special evenings"
        actions={
          <Button
            onClick={openAddModal}
            variant="primary"
            size="sm"
            className="gap-2 shadow-glow font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Event</span>
          </Button>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 border-slate-800">
          <span className="text-xs uppercase font-bold text-slate-400 block">Total Scheduled</span>
          <span className="font-serif text-3xl font-bold text-white mt-2 block">
            {events.length} Events
          </span>
          <span className="text-xs text-emerald-400 mt-1 block">Visible on public events page</span>
        </Card>

        <Card className="p-6 border-slate-800">
          <span className="text-xs uppercase font-bold text-slate-400 block">Highlight Event</span>
          <span className="font-serif text-xl font-bold text-gold mt-2 block truncate">
            {events[0]?.title || "No Events"}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">
            {events[0]?.date} • {events[0]?.time}
          </span>
        </Card>

        <Card className="p-6 border-slate-800">
          <span className="text-xs uppercase font-bold text-slate-400 block">Thursday Special</span>
          <span className="font-serif text-xl font-bold text-white mt-2 block">
            Cand Night
          </span>
          <span className="text-xs text-gold mt-1 block">Every Thursday evening</span>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search event title, description, or badge..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Events Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden border-slate-800 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-800 border-b border-white/[0.08]">
                <Image
                  src={item.imageUrl || ""}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.badge && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="gold">{item.badge}</Badge>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gold font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {item.time}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/80 flex items-center justify-between mt-4">
              <span className="text-xs text-emerald-400 font-medium">● Published</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => openEditModal(item)}
                  className="text-xs text-slate-300 hover:text-white"
                >
                  <Edit2 className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            No events found matching your search.
          </div>
        )}
      </div>

      {/* Add / Edit Event Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEventId ? "Edit Event" : "Schedule New Event"}
      >
        <form onSubmit={handleSaveEvent} className="space-y-4">
          <Input
            label="Event Title *"
            placeholder="e.g. Sunset Live Jazz & Cocktails"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Date / Day *"
              placeholder="e.g. Every Thursday / Sep 18, 2026"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <Input
              label="Time Slot *"
              placeholder="e.g. 7:00 PM – 11:30 PM"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <Input
            label="Badge Tag (Optional)"
            placeholder="e.g. Live Music, Signature Night, DJ Set"
            value={formData.badge}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
          />

          <Textarea
            label="Event Description *"
            placeholder="Details about artists, music style, featured drinks, or entry notes..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <Input
            label="Cover Image URL *"
            placeholder="https://images.unsplash.com/..."
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            required
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingEventId ? "Save Changes" : "Publish Event"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
