"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Shield,
  LogOut,
  UserCheck,
  ExternalLink,
  LayoutDashboard,
  Utensils,
  CalendarCheck2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { logoutAction } from "@/lib/auth/actions";
import { SOKEM_CONFIG } from "@/config/site";

interface AdminHeaderProps {
  user: AuthSessionPayload;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  user,
  title,
  subtitle,
  actions,
}) => {
  const pathname = usePathname();
  const [isLoggingOut, startLogoutTransition] = useTransition();

  const handleLogout = () => {
    startLogoutTransition(async () => {
      await logoutAction();
      window.location.href = "/admin/login";
    });
  };

  const navItems = [
    {
      label: "Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/admin/dashboard",
    },
    {
      label: "Menu Manager",
      href: "/admin/menu",
      icon: Utensils,
      isActive: pathname.startsWith("/admin/menu"),
    },
    {
      label: "Reservations",
      href: "/admin/reservations",
      icon: CalendarCheck2,
      isActive: pathname.startsWith("/admin/reservations"),
    },
    {
      label: "Events",
      href: "/admin/events",
      icon: Sparkles,
      isActive: pathname.startsWith("/admin/events"),
    },
  ];

  return (
    <div className="space-y-6 border-b border-slate-800 pb-6">
      {/* Top Bar: Brand, Session, and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gold/40 flex items-center justify-center bg-gold/10 p-1 shadow-glow">
            <Image
              src="/images/icon.png"
              alt={SOKEM_CONFIG.name}
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Sokem Management Console</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* User Session Info & Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/[0.1] text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold" />
            <span>View Public Site</span>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.12] text-xs text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium text-white">{user.name}</span>
            <span className="text-slate-600">|</span>
            <span className="text-gold font-mono text-[11px] uppercase tracking-wider">
              {user.role}
            </span>
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

      {/* Navigation Tabs & Page Level Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  item.isActive
                    ? "bg-gold text-slate-950 font-bold shadow-glow"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent hover:border-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${item.isActive ? "text-slate-950" : "text-gold"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
};
