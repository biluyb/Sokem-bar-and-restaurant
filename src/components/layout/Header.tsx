"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Phone,
  MapPin,
  Menu as MenuIcon,
  X,
  ExternalLink,
  Shield,
} from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0E1117] border-b border-white/[0.08] shadow-lg shadow-black/40">
      {/* Tier 1: Slender Hospitality & Utility Bar */}
      <div className="border-b border-white/[0.06] bg-[#0A0C10]/95 px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] text-gray-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Status badge */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-gray-300 tracking-wider uppercase text-[10px]">
              Lounge & Dining Open
            </span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="hidden sm:inline text-gray-400">12:00 PM – 11:30 PM</span>
          </div>

          {/* Location, Phone & Portal Links */}
          <div className="flex items-center gap-5">
            <a
              href={SOKEM_CONFIG.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
            >
              <MapPin className="w-3 h-3 text-gold" />
              <span>Legehar, Addis ababa</span>
              <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
            </a>

            <a
              href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
            >
              <Phone className="w-3 h-3 text-gold" />
              <span className="font-mono">{SOKEM_CONFIG.phone}</span>
            </a>

            <Link
              href="/admin/dashboard"
              className="hidden lg:flex items-center gap-1 text-[10px] uppercase font-semibold text-gray-500 hover:text-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded"
            >
              <Shield className="w-3 h-3" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 2: Asymmetric Architectural Command Rail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Brand: Monogram Crest + Typographic Identity */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-1"
        >
          {/* Architectural Crest Monogram */}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/25 via-gold/10 to-transparent border border-gold/40 flex items-center justify-center text-gold shadow-sm group-hover:border-gold transition-all duration-300">
            <span className="font-serif font-bold text-sm tracking-wider text-gold">SK</span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-[0.18em] text-white group-hover:text-gold transition-colors">
              SOKEM
            </span>
            <span className="text-[9px] tracking-[0.25em] text-gold-light uppercase -mt-0.5 font-medium">
              Bar & Restaurant • Addis
            </span>
          </div>
        </Link>

        {/* Desktop Directory Strip */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 bg-[#141822] px-3 py-1.5 rounded-xl border border-white/[0.08]"
        >
          {SOKEM_CONFIG.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  isActive
                    ? "bg-gold/15 text-gold font-semibold shadow-inner border border-gold/30"
                    : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
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
            className="p-2 rounded-lg bg-[#141822] text-gray-300 hover:text-gold border border-white/[0.08] hover:border-gold/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Phone className="w-4 h-4" />
          </a>

          <Link href="/reservations">
            <Button
              variant="primary"
              size="sm"
              className="gap-2 shadow-md hover:shadow-gold/20 font-semibold text-xs tracking-wider"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Table</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Actions & Hamburger */}
        <div className="flex md:hidden items-center gap-2.5">
          <Link href="/reservations">
            <Button variant="primary" size="sm" className="px-3 py-1.5 text-xs font-semibold">
              Book
            </Button>
          </Link>

          <button
            ref={triggerRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            className="p-2 rounded-lg bg-[#141822] text-gray-200 border border-white/[0.12] hover:text-gold hover:border-gold/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
          className="md:hidden border-t border-white/[0.08] bg-[#0E1117]/98 backdrop-blur-2xl px-6 py-6 space-y-6 shadow-2xl animate-in slide-in-from-top-2 duration-200"
        >
          {/* Navigation Links */}
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {SOKEM_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-gold/15 text-gold font-semibold border border-gold/30"
                      : "text-gray-300 hover:text-white hover:bg-white/[0.05]"
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                </Link>
              );
            })}
          </nav>

          {/* Quick Info & Direct Phone CTA */}
          <div className="pt-4 border-t border-white/[0.08] space-y-3 text-xs text-gray-400">
            <div className="flex items-center justify-between">
              <span>Location:</span>
              <span className="text-gray-200">Legehar, Addis ababa</span>
            </div>

            <a
              href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
              className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 border border-white/[0.12] text-gold font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Concierge: {SOKEM_CONFIG.phone}</span>
            </a>

            <div className="pt-2 text-center">
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1"
              >
                <Shield className="w-3 h-3" />
                <span>Staff Management Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
