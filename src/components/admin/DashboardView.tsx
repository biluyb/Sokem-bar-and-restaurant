"use client";

import React, { useState, useTransition } from "react";
import { Utensils, Calendar, Wine, Check, X, Shield, LogOut, UserCheck } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_MENU_ITEMS } from "@/lib/data";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { logoutAction } from "@/lib/auth/actions";

interface MockAdminReservation {
  id: string;
  name: string;
  guests: number;
  time: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
}

const INITIAL_RESERVATIONS: MockAdminReservation[] = [
  { id: "res-1", name: "Eleanor Vance", guests: 2, time: "7:00 PM Tonight", status: "CONFIRMED" },
  { id: "res-2", name: "Marcus Sterling", guests: 4, time: "8:00 PM Tonight", status: "PENDING" },
  { id: "res-3", name: "Claire Dupont", guests: 6, time: "8:30 PM Tonight", status: "CONFIRMED" },
];

interface DashboardViewProps {
  user: AuthSessionPayload;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
  const [reservations, setReservations] = useState<MockAdminReservation[]>(INITIAL_RESERVATIONS);
  const [isLoggingOut, startLogoutTransition] = useTransition();

  const toggleAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const updateReservationStatus = (id: string, newStatus: "CONFIRMED" | "CANCELLED") => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: newStatus } : res))
    );
  };

  const handleLogout = () => {
    startLogoutTransition(async () => {
      await logoutAction();
      window.location.href = "/admin/login";
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Management Console</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-tight">
            Operations & Control
          </h1>
        </div>

        {/* Authenticated User Profile & Sign Out */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.12] text-xs text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium text-white">{user.name}</span>
            <span className="text-slate-500">|</span>
            <span className="text-gold font-mono text-[11px]">{user.role}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="gap-1.5 text-xs text-rose-300 hover:text-rose-200 border-rose-500/30 hover:bg-rose-500/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Tonight&apos;s Covers
            </span>
            <Calendar className="w-5 h-5 text-gold" />
          </div>
          <div className="font-serif text-3xl font-bold text-white mt-2">12 Guests</div>
          <span className="text-xs text-emerald-400 mt-1 block">3 Tables Confirmed</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Menu Items Active
            </span>
            <Utensils className="w-5 h-5 text-gold" />
          </div>
          <div className="font-serif text-3xl font-bold text-white mt-2">
            {menuItems.filter((i) => i.isAvailable).length} / {menuItems.length}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">Real-time sync active</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Special Events
            </span>
            <Wine className="w-5 h-5 text-gold" />
          </div>
          <div className="font-serif text-3xl font-bold text-white mt-2">3 Scheduled</div>
          <span className="text-xs text-gold mt-1 block">Jazz Soirée this Thursday</span>
        </Card>
      </div>

      {/* Section 1: Live Menu Stock & Availability Manager */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
          <div>
            <h2 className="font-serif text-lg font-bold text-white">
              Menu Availability & Stock Status
            </h2>
            <p className="text-xs text-slate-400">
              Toggle items in/out of stock. Changes reflect immediately on public customer menu.
            </p>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Dish / Item</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Current Status</th>
                <th className="px-6 py-3 text-right">Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{item.categoryName}</td>
                  <td className="px-6 py-4 font-mono text-gold">
                    {formatPrice(item.price, item.currency)}
                  </td>
                  <td className="px-6 py-4">
                    {item.isAvailable ? (
                      <Badge variant="success">In Stock</Badge>
                    ) : (
                      <Badge variant="danger">Sold Out</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      size="sm"
                      variant={item.isAvailable ? "ghost" : "outline"}
                      onClick={() => toggleAvailability(item.id)}
                      className="text-xs"
                    >
                      {item.isAvailable ? "Mark Sold Out" : "Restore In Stock"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Section 2: Incoming Table Reservations */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-slate-800">
          <h2 className="font-serif text-lg font-bold text-white">
            Upcoming Seating Reservations
          </h2>
          <p className="text-xs text-slate-400">
            Review guest bookings, confirm seatings, or cancel reservations.
          </p>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Guest Name</th>
                <th className="px-6 py-3">Party Size</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{res.name}</td>
                  <td className="px-6 py-4 text-xs text-slate-300">{res.guests} Guests</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{res.time}</td>
                  <td className="px-6 py-4">
                    {res.status === "CONFIRMED" && <Badge variant="success">Confirmed</Badge>}
                    {res.status === "PENDING" && <Badge variant="gold">Pending</Badge>}
                    {res.status === "CANCELLED" && <Badge variant="danger">Cancelled</Badge>}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {res.status !== "CONFIRMED" && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => updateReservationStatus(res.id, "CONFIRMED")}
                        className="text-xs px-2.5 py-1"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Confirm
                      </Button>
                    )}
                    {res.status !== "CANCELLED" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateReservationStatus(res.id, "CANCELLED")}
                        className="text-xs text-rose-400 hover:text-rose-300 px-2.5 py-1"
                      >
                        <X className="w-3.5 h-3.5 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
