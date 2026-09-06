"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Users,
  Search,
  Check,
  X,
  UserCheck,
  Phone,
  Mail,
  Plus,
  Filter,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { AdminHeader } from "@/components/admin/AdminHeader";

export type ReservationStatus = "CONFIRMED" | "PENDING" | "SEATED" | "CANCELLED";

export interface AdminReservation {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  status: ReservationStatus;
  specialNotes?: string;
  createdAt: string;
}

const INITIAL_RESERVATIONS: AdminReservation[] = [
  {
    id: "res-1",
    code: "SKM-819204",
    name: "Eleanor Vance",
    email: "eleanor.v@example.com",
    phone: "091 123 4567",
    guests: 2,
    date: "Tonight",
    time: "7:00 PM",
    status: "CONFIRMED",
    specialNotes: "Window table, anniversary celebration.",
    createdAt: "2026-09-06 14:20",
  },
  {
    id: "res-2",
    code: "SKM-492104",
    name: "Marcus Sterling",
    email: "m.sterling@example.com",
    phone: "092 334 8891",
    guests: 4,
    date: "Tonight",
    time: "8:00 PM",
    status: "PENDING",
    specialNotes: "First time dining at Sokem.",
    createdAt: "2026-09-06 16:05",
  },
  {
    id: "res-3",
    code: "SKM-319482",
    name: "Claire Dupont",
    email: "claire.dupont@example.com",
    phone: "094 551 2289",
    guests: 6,
    date: "Tonight",
    time: "8:30 PM",
    status: "CONFIRMED",
    specialNotes: "Birthday dinner, pre-ordered champagne.",
    createdAt: "2026-09-06 11:30",
  },
  {
    id: "res-4",
    code: "SKM-648291",
    name: "Dr. Henok Tadesse",
    email: "henok.t@example.com",
    phone: "091 990 1234",
    guests: 8,
    date: "Tomorrow",
    time: "7:30 PM",
    status: "CONFIRMED",
    specialNotes: "Business dinner in quiet section.",
    createdAt: "2026-09-06 09:15",
  },
  {
    id: "res-5",
    code: "SKM-102938",
    name: "Sara Al-Mansoor",
    email: "sara.m@example.com",
    phone: "093 445 6789",
    guests: 3,
    date: "Sep 10, 2026",
    time: "6:30 PM",
    status: "CANCELLED",
    specialNotes: "Flight delayed.",
    createdAt: "2026-09-05 18:40",
  },
];

interface ReservationManagerViewProps {
  user: AuthSessionPayload;
}

export const ReservationManagerView: React.FC<ReservationManagerViewProps> = ({
  user,
}) => {
  const [reservations, setReservations] = useState<AdminReservation[]>(INITIAL_RESERVATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ReservationStatus>("ALL");
  const [selectedReservation, setSelectedReservation] = useState<AdminReservation | null>(null);

  // Manual Reservation Modal State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: new Date().toISOString().split("T")[0],
    time: "7:00 PM",
    specialNotes: "",
  });

  const filteredReservations = useMemo(() => {
    return reservations.filter((res) => {
      if (statusFilter !== "ALL" && res.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          res.name.toLowerCase().includes(q) ||
          res.code.toLowerCase().includes(q) ||
          res.phone.toLowerCase().includes(q) ||
          res.email.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [reservations, statusFilter, searchQuery]);

  const updateStatus = (id: string, newStatus: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedReservation?.id === id) {
      setSelectedReservation((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes: AdminReservation = {
      id: `res-${Date.now()}`,
      code: `SKM-${Math.floor(100000 + Math.random() * 900000)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      guests: Number(formData.guests),
      date: formData.date,
      time: formData.time,
      status: "CONFIRMED",
      specialNotes: formData.specialNotes,
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    };

    setReservations((prev) => [newRes, ...prev]);
    setIsNewModalOpen(false);
  };

  const totalGuestsConfirmed = reservations
    .filter((r) => r.status === "CONFIRMED" || r.status === "SEATED")
    .reduce((sum, r) => sum + r.guests, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Unified Header */}
      <AdminHeader
        user={user}
        title="Table Reservations Manager"
        subtitle="Manage upcoming customer seatings, confirm bookings, seat guests, and handle VIP requests"
        actions={
          <Button
            onClick={() => setIsNewModalOpen(true)}
            variant="primary"
            size="sm"
            className="gap-2 shadow-glow font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>New Reservation</span>
          </Button>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-800">
          <span className="text-xs uppercase font-bold text-slate-400 block">Total Bookings</span>
          <span className="font-serif text-2xl font-bold text-white mt-1 block">
            {reservations.length}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">All records</span>
        </Card>

        <Card className="p-4 border-slate-800">
          <span className="text-xs uppercase font-bold text-emerald-400 block">Confirmed Covers</span>
          <span className="font-serif text-2xl font-bold text-emerald-300 mt-1 block">
            {totalGuestsConfirmed} Guests
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            {reservations.filter((r) => r.status === "CONFIRMED").length} parties
          </span>
        </Card>

        <Card className="p-4 border-slate-800">
          <span className="text-xs uppercase font-bold text-amber-400 block">Pending Review</span>
          <span className="font-serif text-2xl font-bold text-gold mt-1 block">
            {reservations.filter((r) => r.status === "PENDING").length}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Requires action</span>
        </Card>

        <Card className="p-4 border-slate-800">
          <span className="text-xs uppercase font-bold text-slate-400 block">Seated / Completed</span>
          <span className="font-serif text-2xl font-bold text-cyan-300 mt-1 block">
            {reservations.filter((r) => r.status === "SEATED").length}
          </span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Currently dining</span>
        </Card>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by guest name, phone, code..."
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

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {(["ALL", "CONFIRMED", "PENDING", "SEATED", "CANCELLED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === st
                  ? "bg-gold text-slate-950 font-bold shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <Card className="overflow-hidden border-slate-800">
        <CardHeader className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50">
          <div>
            <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold" />
              Reservation Requests ({filteredReservations.length})
            </h2>
            <p className="text-xs text-slate-400">
              Click on a reservation row to inspect full notes or update seating status
            </p>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Code</th>
                <th className="px-6 py-3.5">Guest & Contact</th>
                <th className="px-6 py-3.5">Party</th>
                <th className="px-6 py-3.5">Date & Time</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredReservations.map((res) => (
                <tr
                  key={res.id}
                  onClick={() => setSelectedReservation(res)}
                  className="hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 font-mono text-xs font-bold text-gold">
                    {res.code}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{res.name}</div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gold" />
                        {res.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-xs font-medium text-slate-200">
                      <Users className="w-3 h-3 text-gold" />
                      {res.guests} Guests
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div className="font-medium text-white">{res.date}</div>
                    <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-gold" />
                      {res.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {res.status === "CONFIRMED" && <Badge variant="success">Confirmed</Badge>}
                    {res.status === "PENDING" && <Badge variant="gold">Pending</Badge>}
                    {res.status === "SEATED" && <Badge variant="info">Seated</Badge>}
                    {res.status === "CANCELLED" && <Badge variant="danger">Cancelled</Badge>}
                  </td>
                  <td className="px-6 py-4 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                    {res.status !== "CONFIRMED" && res.status !== "SEATED" && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => updateStatus(res.id, "CONFIRMED")}
                        className="text-xs px-2.5 py-1"
                        title="Confirm reservation"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Confirm
                      </Button>
                    )}
                    {res.status === "CONFIRMED" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(res.id, "SEATED")}
                        className="text-xs px-2.5 py-1 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10"
                        title="Seat guest"
                      >
                        Seat Guest
                      </Button>
                    )}
                    {res.status !== "CANCELLED" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateStatus(res.id, "CANCELLED")}
                        className="text-xs text-rose-400 hover:text-rose-300 px-2.5 py-1 hover:bg-rose-500/10"
                        title="Cancel reservation"
                      >
                        <X className="w-3.5 h-3.5 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredReservations.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    No reservations found matching the current search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Reservation Details Modal */}
      <Modal
        isOpen={!!selectedReservation}
        onClose={() => setSelectedReservation(null)}
        title={selectedReservation ? `Reservation ${selectedReservation.code}` : ""}
      >
        {selectedReservation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 block">Guest Name</span>
                <span className="text-xl font-bold text-white">{selectedReservation.name}</span>
              </div>
              <div>
                {selectedReservation.status === "CONFIRMED" && <Badge variant="success">Confirmed</Badge>}
                {selectedReservation.status === "PENDING" && <Badge variant="gold">Pending</Badge>}
                {selectedReservation.status === "SEATED" && <Badge variant="info">Seated</Badge>}
                {selectedReservation.status === "CANCELLED" && <Badge variant="danger">Cancelled</Badge>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 block">Phone Number</span>
                <a
                  href={`tel:${selectedReservation.phone}`}
                  className="text-white font-medium hover:text-gold transition-colors mt-0.5 block"
                >
                  {selectedReservation.phone}
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 block">Email Address</span>
                <span className="text-white font-medium mt-0.5 block truncate">
                  {selectedReservation.email}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 block">Party Size</span>
                <span className="text-white font-bold mt-0.5 block">
                  {selectedReservation.guests} Guests
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-xs text-slate-400 block">Scheduled Time</span>
                <span className="text-white font-bold mt-0.5 block">
                  {selectedReservation.date} at {selectedReservation.time}
                </span>
              </div>
            </div>

            {selectedReservation.specialNotes && (
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs uppercase font-bold text-gold block mb-1">
                  Special Requests / Guest Notes
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedReservation.specialNotes}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-500">
                Booked on: {selectedReservation.createdAt}
              </div>
              <div className="flex items-center gap-2">
                {selectedReservation.status !== "CONFIRMED" && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => updateStatus(selectedReservation.id, "CONFIRMED")}
                  >
                    Set Confirmed
                  </Button>
                )}
                {selectedReservation.status !== "SEATED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(selectedReservation.id, "SEATED")}
                  >
                    Seat Guest
                  </Button>
                )}
                {selectedReservation.status !== "CANCELLED" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateStatus(selectedReservation.id, "CANCELLED")}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Manual Booking Creation Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Record Phone / Walk-in Reservation"
      >
        <form onSubmit={handleCreateReservation} className="space-y-4">
          <Input
            label="Guest Name *"
            placeholder="e.g. Dawit Bekele"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Contact Phone *"
              type="tel"
              placeholder="091 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="dawit@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Party Size *"
              type="number"
              min="1"
              max="25"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
              required
            />
            <Input
              label="Date *"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
            <Input
              label="Time *"
              type="text"
              placeholder="7:30 PM"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <Textarea
            label="Special Requests / Table Notes"
            placeholder="e.g. VIP booth, anniversary flowers, dietary restrictions..."
            value={formData.specialNotes}
            onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsNewModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Confirm Reservation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
