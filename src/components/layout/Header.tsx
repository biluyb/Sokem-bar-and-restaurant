"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Phone,
  MapPin,
  Menu as MenuIcon,
  X,
  ExternalLink,
  LogIn,
} from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLanguage } from "@/components/ui/LanguageContext";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.menu, href: "/menu" },
    { label: t.nav.reservations, href: "/reservations" },
    { label: t.nav.events, href: "/events" },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0E1117]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-lg dark:shadow-black/40 transition-colors duration-200">
      {/* Tier 1: Slender Hospitality & Utility Bar */}
      <div className="border-b border-slate-200/80 dark:border-white/[0.06] bg-slate-50/90 dark:bg-[#0A0C10]/95 px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] text-slate-600 dark:text-gray-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Status badge */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-700 dark:text-gray-300 font-medium tracking-wide">
              {t.nav.statusOpen}
            </span>
          </div>

          {/* Location, Phone, Controls & Sign In */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={SOKEM_CONFIG.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
            >
              <MapPin className="w-3 h-3 text-amber-600 dark:text-gold" />
              <span>{t.nav.addressShort}</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400 dark:text-gray-500" />
            </a>

            <a
              href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
            >
              <Phone className="w-3 h-3 text-amber-600 dark:text-gold" />
              <span className="font-mono">{SOKEM_CONFIG.phone}</span>
            </a>

            <div className="hidden sm:flex items-center gap-1.5">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>

            {/* Public Sign In Link */}
            <Link
              href="/sign-in"
              className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 dark:text-gold hover:text-amber-800 dark:hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded px-2 py-0.5"
            >
              <LogIn className="w-3 h-3 text-amber-700 dark:text-gold" />
              <span>{t.nav.signIn}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 2: Architectural Navigation Rail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Brand: Monogram Crest + Typographic Identity */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-1"
        >
          {/* Official Sokem Crest Monogram */}
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-500/40 dark:border-gold/30 flex items-center justify-center bg-amber-500/10 dark:bg-gold/10 p-1 group-hover:border-amber-500 dark:group-hover:border-gold group-hover:bg-amber-500/20 dark:group-hover:bg-gold/15 transition-all duration-300 shadow-sm">
            <Image
              src="/images/icon.png"
              alt="Sokem Monogram"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-[0.18em] text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-gold transition-colors">
              SOKEM
            </span>
            <span className="text-[9px] tracking-[0.25em] text-amber-700 dark:text-gold uppercase -mt-0.5 font-semibold">
              Bar & Restaurant • Addis
            </span>
          </div>
        </Link>

        {/* Desktop Directory Strip */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-[#141822] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08]"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  isActive
                    ? "bg-gold text-slate-950 font-bold shadow-sm"
                    : "text-slate-600 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Cluster */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
            aria-label={`Call Sokem at ${SOKEM_CONFIG.phone}`}
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#141822] text-slate-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-gold border border-slate-200 dark:border-white/[0.08] hover:border-amber-500/40 dark:hover:border-gold/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Phone className="w-4 h-4" />
          </a>

          <Link href="/reservations">
            <Button
              variant="primary"
              size="sm"
              className="gap-2 shadow-sm hover:shadow-md font-semibold text-xs tracking-wider"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.bookTable}</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Actions & Hamburger */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeSwitcher />
          <LanguageSwitcher />

          <Link href="/reservations">
            <Button variant="primary" size="sm" className="px-2.5 py-1 text-xs font-semibold">
              {t.nav.bookTable}
            </Button>
          </Link>

          <button
            ref={triggerRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#141822] text-slate-700 dark:text-gray-200 border border-slate-300 dark:border-white/[0.12] hover:text-amber-600 dark:hover:text-gold hover:border-amber-500/40 dark:hover:border-gold/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay & Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="md:hidden border-t border-slate-200 dark:border-white/[0.08] bg-white/98 dark:bg-[#0E1117]/98 backdrop-blur-2xl px-6 py-6 space-y-6 shadow-xl dark:shadow-2xl animate-in slide-in-from-top-2 duration-200 text-slate-900 dark:text-gray-100"
        >
          {/* Navigation Links */}
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-gold text-slate-950 font-bold shadow-sm"
                      : "text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-slate-950" />}
                </Link>
              );
            })}
          </nav>

          {/* Quick Info & Direct Phone CTA */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] space-y-3 text-xs text-slate-600 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <span>Location:</span>
              <span className="text-slate-900 dark:text-gray-200 font-medium">{t.nav.addressShort}</span>
            </div>

            <a
              href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
              className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/[0.12] text-amber-800 dark:text-gold font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{t.common.callUs}: {SOKEM_CONFIG.phone}</span>
            </a>

            {/* Public Sign In */}
            <div className="pt-2 text-center">
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-amber-700 dark:text-gold hover:text-amber-800 dark:hover:text-gold-light transition-colors inline-flex items-center gap-1 font-semibold"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.nav.signIn}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
