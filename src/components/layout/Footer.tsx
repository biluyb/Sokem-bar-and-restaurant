"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Lock } from "lucide-react";
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
    <footer className="bg-slate-100 dark:bg-[#12141C] border-t border-slate-200 dark:border-white/[0.1] text-slate-600 dark:text-gray-300 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-500/40 dark:border-gold/30 flex items-center justify-center bg-amber-500/10 dark:bg-gold/10 p-1 shadow-sm">
                <Image
                  src="/images/icon.png"
                  alt="Sokem Bar & Restaurant"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                SOKEM
              </span>
            </div>
            <p className="text-slate-500 dark:text-gray-400 text-xs leading-relaxed">
              {t.footer.tagline}. {t.hero.subtitle}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-slate-900 dark:text-white font-bold text-sm mb-4">
              {t.footer.explore}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Map */}
          <div>
            <h4 className="font-serif text-slate-900 dark:text-white font-bold text-sm mb-4">
              {t.footer.locationContact}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 dark:text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-900 dark:text-white block font-medium">
                    {SOKEM_CONFIG.address}
                  </span>
                  <span className="text-slate-500 dark:text-gray-400 block">{SOKEM_CONFIG.city}</span>
                  {SOKEM_CONFIG.mapUrl && (
                    <a
                      href={SOKEM_CONFIG.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 dark:text-gold hover:underline inline-flex items-center gap-1 mt-1 font-medium"
                    >
                      {t.footer.viewMap}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-600 dark:text-gold shrink-0" />
                <a
                  href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
                  className="text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-gold transition-colors font-mono font-medium"
                >
                  {SOKEM_CONFIG.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {SOKEM_CONFIG.name}. {t.footer.rightsReserved}</p>
          <div className="flex items-center gap-6">
            <Link
              href="/sign-in"
              className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-gold transition-colors font-medium"
            >
              <Lock className="w-3 h-3" />
              {t.nav.signIn}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
