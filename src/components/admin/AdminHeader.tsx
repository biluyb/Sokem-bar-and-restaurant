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
  Image as ImageIcon,
  Users,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { logoutAction } from "@/lib/auth/actions";
import { SOKEM_CONFIG } from "@/config/site";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/ui/LanguageContext";

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
  const { t } = useLanguage();

  const handleLogout = () => {
    startLogoutTransition(async () => {
      await logoutAction();
      window.location.href = "/sign-in";
    });
  };

  const isStaffSection = pathname.startsWith("/staff");
  const basePath = isStaffSection ? "/staff" : "/admin";

  const navItems = [
    {
      label: t.admin.nav.overview,
      href: `${basePath}/dashboard`,
      icon: LayoutDashboard,
      isActive: pathname === `${basePath}/dashboard`,
    },
    {
      label: t.admin.nav.menuManager,
      href: `${basePath}/menu`,
      icon: Utensils,
      isActive: pathname.startsWith(`${basePath}/menu`),
    },
    {
      label: t.admin.nav.gallery,
      href: `${basePath}/gallery`,
      icon: ImageIcon,
      isActive: pathname.startsWith(`${basePath}/gallery`),
    },
    {
      label: t.admin.nav.events,
      href: `${basePath}/events`,
      icon: Sparkles,
      isActive: pathname.startsWith(`${basePath}/events`),
    },
    ...(user.role === "ADMIN" && !isStaffSection
      ? [
          {
            label: t.admin.nav.reservations,
            href: "/admin/reservations",
            icon: CalendarCheck2,
            isActive: pathname.startsWith("/admin/reservations"),
          },
          {
            label: t.admin.nav.users,
            href: "/admin/users",
            icon: Users,
            isActive: pathname.startsWith("/admin/users"),
          },
          {
            label: t.admin.nav.auditLogs,
            href: "/admin/audit",
            icon: FileText,
            isActive: pathname.startsWith("/admin/audit"),
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-6 border-b border-slate-200 dark:border-slate-800 pb-6">
      {/* Top Bar: Brand, Controls, Session, Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-500/40 dark:border-gold/40 flex items-center justify-center bg-gold/10 p-1 shadow-sm">
            <Image
              src="/images/icon.png"
              alt={SOKEM_CONFIG.name}
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-amber-700 dark:text-gold text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>{isStaffSection ? t.admin.staffPortalTitle : t.admin.consoleTitle}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Controls: Theme, Language, Public Site, User Info, Sign Out */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Theme & Language toggles */}
          <ThemeSwitcher showLabel={true} />
          <LanguageSwitcher />

          {/* View public site */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 border border-slate-300 dark:border-white/[0.1] text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-600 dark:text-gold" />
            <span>{t.admin.viewPublicSite}</span>
          </Link>

          {/* User session badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/[0.12] text-xs text-slate-700 dark:text-slate-300">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-medium text-slate-900 dark:text-white">{user.name}</span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="text-amber-700 dark:text-gold font-mono text-[11px] uppercase tracking-wider font-semibold">
              {user.role}
            </span>
          </div>

          {/* Sign out */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="gap-1.5 text-xs text-rose-700 dark:text-rose-300 hover:text-rose-800 dark:hover:text-rose-200 border-rose-400/40 dark:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-500/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isLoggingOut ? t.admin.signingOut : t.admin.signOut}</span>
          </Button>
        </div>
      </div>

      {/* Navigation Tabs & Page-Level Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  item.isActive
                    ? "bg-gold text-slate-950 font-bold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${item.isActive ? "text-slate-950" : "text-amber-600 dark:text-gold"}`} />
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
