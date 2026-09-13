"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Utensils, Calendar, Wine, Check, X, ArrowRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_MENU_ITEMS, MOCK_EVENTS } from "@/lib/data";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useLanguage } from "@/components/ui/LanguageContext";

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
  const { t } = useLanguage();

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Admin Unified Header */}
      <AdminHeader
        user={user}
        title={t.admin.dashboard.title}
        subtitle={t.admin.dashboard.subtitle}
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link href="/admin/reservations" className="block group">
          <Card className="p-6 transition-colors group-hover:border-amber-500/50 dark:group-hover:border-gold/50">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                {t.admin.dashboard.tonightCovers}
              </span>
              <Calendar className="w-5 h-5 text-amber-600 dark:text-gold" />
            </div>
            <div className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-2">
              12 {t.admin.dashboard.guests}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium block">
                3 {t.admin.dashboard.tablesConfirmed}
              </span>
              <span className="text-xs text-amber-700 dark:text-gold font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                {t.admin.dashboard.manage} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Card>
        </Link>

        <Link href="/admin/menu" className="block group">
          <Card className="p-6 transition-colors group-hover:border-amber-500/50 dark:group-hover:border-gold/50">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                {t.admin.dashboard.menuItemsActive}
              </span>
              <Utensils className="w-5 h-5 text-amber-600 dark:text-gold" />
            </div>
            <div className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {menuItems.filter((i) => i.isAvailable).length} / {menuItems.length}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">
                {t.admin.dashboard.realtimeSync}
              </span>
              <span className="text-xs text-amber-700 dark:text-gold font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                {t.admin.dashboard.manage} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Card>
        </Link>

        <Link href="/admin/events" className="block group">
          <Card className="p-6 transition-colors group-hover:border-amber-500/50 dark:group-hover:border-gold/50">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                {t.admin.dashboard.specialEvents}
              </span>
              <Wine className="w-5 h-5 text-amber-600 dark:text-gold" />
            </div>
            <div className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-2">
              {MOCK_EVENTS.length} {t.admin.dashboard.scheduled}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-amber-700 dark:text-gold block font-medium">
                Candlelight Night
              </span>
              <span className="text-xs text-amber-700 dark:text-gold font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                {t.admin.dashboard.manage} <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Card>
        </Link>
      </div>

      {/* Section 1: Live Menu Stock & Availability Manager */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              {t.admin.dashboard.menuAvailability}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.admin.dashboard.menuAvailabilitySubtitle}
            </p>
          </div>
          <Link href="/admin/menu">
            <Button size="sm" variant="outline" className="text-xs gap-1.5">
              <Utensils className="w-3.5 h-3.5" />
              {t.admin.nav.menuManager}
            </Button>
          </Link>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-900/90 text-xs uppercase text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3">{t.admin.dashboard.guestName}</th>
                <th className="px-6 py-3">{t.admin.nav.menuManager}</th>
                <th className="px-6 py-3">ETB</th>
                <th className="px-6 py-3">{t.admin.dashboard.status}</th>
                <th className="px-6 py-3 text-right">{t.admin.users.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {menuItems.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{item.title}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{item.categoryName}</td>
                  <td className="px-6 py-4 font-mono font-semibold text-amber-700 dark:text-gold">
                    {formatPrice(item.price, item.currency)}
                  </td>
                  <td className="px-6 py-4">
                    {item.isAvailable ? (
                      <Badge variant="success">{t.admin.dashboard.available}</Badge>
                    ) : (
                      <Badge variant="danger">{t.admin.dashboard.unavailable}</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      size="sm"
                      variant={item.isAvailable ? "ghost" : "outline"}
                      onClick={() => toggleAvailability(item.id)}
                      className="text-xs"
                    >
                      {item.isAvailable ? t.admin.dashboard.markUnavailable : t.admin.dashboard.markAvailable}
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
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
              {t.admin.dashboard.recentReservations}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.admin.reservationsPage.subtitle}
            </p>
          </div>
          <Link href="/admin/reservations">
            <Button size="sm" variant="outline" className="text-xs gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {t.admin.nav.reservations}
            </Button>
          </Link>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-900/90 text-xs uppercase text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3">{t.admin.dashboard.guestName}</th>
                <th className="px-6 py-3">{t.admin.dashboard.guests}</th>
                <th className="px-6 py-3">{t.admin.dashboard.time}</th>
                <th className="px-6 py-3">{t.admin.dashboard.status}</th>
                <th className="px-6 py-3 text-right">{t.admin.users.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{res.name}</td>
                  <td className="px-6 py-4 text-xs text-slate-700 dark:text-slate-300">
                    {res.guests} {t.admin.dashboard.guests}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{res.time}</td>
                  <td className="px-6 py-4">
                    {res.status === "CONFIRMED" && <Badge variant="success">{t.admin.dashboard.confirmed}</Badge>}
                    {res.status === "PENDING" && <Badge variant="gold">{t.admin.dashboard.pending}</Badge>}
                    {res.status === "CANCELLED" && <Badge variant="danger">{t.admin.dashboard.cancelled}</Badge>}
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
                        {t.admin.dashboard.confirm}
                      </Button>
                    )}
                    {res.status !== "CANCELLED" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateReservationStatus(res.id, "CANCELLED")}
                        className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 px-2.5 py-1"
                      >
                        <X className="w-3.5 h-3.5 mr-1" />
                        {t.admin.dashboard.cancel}
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
