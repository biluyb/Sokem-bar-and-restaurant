"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Lock, ExternalLink, Calendar } from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";
import { useLanguage } from "@/components/ui/LanguageContext";

export const Footer: React.FC = () => {
  const { t, locale } = useLanguage();

  const diningLinks = [
    { label: locale === "am" ? "የምግብ እና መጠጥ ሜኑ" : "Food & Cocktail Menu", href: "/menu" },
    { label: locale === "am" ? "የጠረጴዛ ቦታ ማስያዣ" : "Table Reservations", href: "/reservations" },
    { label: locale === "am" ? "የቀጥታ ሙዚቃ እና ዝግጅቶች" : "Live Music & Events", href: "/events" },
    { label: locale === "am" ? "የማዕከለ-ስዕላት ፎቶዎች" : "Atmosphere & Gallery", href: "/gallery" },
    { label: locale === "am" ? "የእንግዶች መስተንግዶ ክፍላችን" : "Guest Inquiries & Concierge", href: "/contact" },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-[#0B0D13] border-t border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-gray-300 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* 4-Column Professional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-200/70 dark:border-white/[0.08]">
          {/* Column 1: Brand & Dining Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-500/40 dark:border-gold/30 flex items-center justify-center bg-amber-500/10 dark:bg-gold/10 p-1 shadow-sm transition-transform group-hover:scale-105">
                <Image
                  src="/images/icon.png"
                  alt={SOKEM_CONFIG.name}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-slate-900 dark:text-white block group-hover:text-amber-600 dark:group-hover:text-gold transition-colors">
                  SOKEM
                </span>
                <span className="text-[10px] tracking-widest uppercase text-amber-700 dark:text-gold font-semibold block">
                  Bar & Restaurant • Addis
                </span>
              </div>
            </Link>

            <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed max-w-sm">
              {t.hero.subtitle}
            </p>

            <div className="pt-1">
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold text-slate-950 font-bold text-xs shadow-sm hover:bg-gold-hover hover:-translate-y-0.5 transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.nav.bookTable}</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Dining & Hospitality (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-serif text-slate-900 dark:text-white font-bold text-sm tracking-wide">
              {t.footer.explore}
            </h4>
            <ul className="space-y-2 text-xs">
              {diningLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-gray-400 hover:text-amber-700 dark:hover:text-gold transition-colors inline-flex items-center gap-1.5 font-medium"
                  >
                    <span className="text-amber-600 dark:text-gold text-[10px]">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours & Direct Assistance (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-serif text-slate-900 dark:text-white font-bold text-sm tracking-wide">
              {t.footer.locationContact}
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500 block flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600 dark:text-gold" />
                  {t.footer.hours}
                </span>
                <p className="text-slate-800 dark:text-gray-300 font-medium mt-0.5">
                  {SOKEM_CONFIG.hours.weekdays}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500 block flex items-center gap-1">
                  <Phone className="w-3 h-3 text-amber-600 dark:text-gold" />
                  {t.common.callUs}
                </span>
                <a
                  href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
                  className="text-slate-800 dark:text-gray-300 hover:text-amber-700 dark:hover:text-gold transition-colors font-mono font-medium block mt-0.5"
                >
                  {SOKEM_CONFIG.phone}
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-gray-500 block flex items-center gap-1">
                  <Mail className="w-3 h-3 text-amber-600 dark:text-gold" />
                  Email
                </span>
                <a
                  href={`mailto:${SOKEM_CONFIG.email}`}
                  className="text-slate-800 dark:text-gray-300 hover:text-amber-700 dark:hover:text-gold transition-colors font-medium block mt-0.5 truncate"
                >
                  {SOKEM_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Cropped Google Map Card (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-serif text-slate-900 dark:text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-600 dark:text-gold" />
              <span>{t.footer.findUs}</span>
            </h4>

            {/* Cropped Google Map Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-slate-900 shadow-sm space-y-0 group">
              <div className="relative h-36 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <iframe
                  title="Sokem Bar and Restaurant Location Map"
                  src="https://maps.google.com/maps?q=Legehar%2C%20Addis%20Ababa%2C%20Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 pointer-events-auto filter contrast-[1.05] grayscale-[20%]"
                  loading="lazy"
                />
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="truncate">
                  <span className="text-[11px] font-semibold text-slate-900 dark:text-white block truncate">
                    {SOKEM_CONFIG.address}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-gray-400 block">
                    {SOKEM_CONFIG.city}
                  </span>
                </div>

                {SOKEM_CONFIG.mapUrl && (
                  <a
                    href={SOKEM_CONFIG.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold/15 dark:bg-gold/20 text-amber-800 dark:text-gold text-[10px] font-bold hover:bg-gold hover:text-slate-950 transition-colors"
                  >
                    <span>Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Staff Sign-In Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {SOKEM_CONFIG.name}. {t.footer.rightsReserved}</p>

          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-slate-500 dark:text-gray-400 hover:text-amber-700 dark:hover:text-gold transition-colors inline-flex items-center gap-1 font-semibold"
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
