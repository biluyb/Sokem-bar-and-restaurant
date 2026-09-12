"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Lock, ExternalLink } from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";
import { useLanguage } from "@/components/ui/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.menu, href: "/menu" },
    { label: t.nav.reservations, href: "/reservations" },
    { label: t.nav.events, href: "/events" },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-[#0B0D13] border-t border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-gray-400 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        {/* Main Tier: Brand & Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-white/[0.06]">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-amber-500/40 dark:border-gold/30 flex items-center justify-center bg-amber-500/10 dark:bg-gold/10 p-1 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/images/icon.png"
                alt={SOKEM_CONFIG.name}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-base font-bold tracking-wider text-slate-900 dark:text-white block group-hover:text-amber-600 dark:group-hover:text-gold transition-colors">
                SOKEM
              </span>
              <span className="text-[10px] tracking-widest uppercase text-amber-700 dark:text-gold font-semibold block">
                Bar & Restaurant • {SOKEM_CONFIG.city}
              </span>
            </div>
          </Link>

          {/* Clean Horizontal Navigation */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-slate-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Secondary Tier: Location, Contact & Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-gray-400">
          {/* Location & Direct Phone Quick Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-gray-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-gold shrink-0" />
              <span>{SOKEM_CONFIG.address}, {SOKEM_CONFIG.city}</span>
            </span>

            <a
              href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 text-slate-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-gold transition-colors font-mono font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-gold shrink-0" />
              <span>{SOKEM_CONFIG.phone}</span>
            </a>

            {SOKEM_CONFIG.mapUrl && (
              <a
                href={SOKEM_CONFIG.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 dark:text-gold hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>

          {/* Copyright & Discreet Staff Sign In */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            <p>© {new Date().getFullYear()} {SOKEM_CONFIG.name}. {t.footer.rightsReserved}</p>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <Link
              href="/sign-in"
              className="text-slate-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-gold transition-colors inline-flex items-center gap-1 font-semibold"
            >
              <Lock className="w-3 h-3" />
              <span>{t.nav.signIn}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
