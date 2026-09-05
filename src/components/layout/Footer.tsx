import React from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, Wine, Lock } from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12141C] border-t border-white/[0.1] text-gray-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                <Wine className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-lg text-white">
                SOKEM
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              {SOKEM_CONFIG.tagline}. An inviting culinary destination in Addis Ababa for dry-aged steaks, ocean delicacies, and craft cocktails.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SOKEM_CONFIG.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gold transition-colors text-gray-400 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Schedule */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              Hours
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>{SOKEM_CONFIG.hours.weekday}</li>
              <li>{SOKEM_CONFIG.hours.weekend}</li>
              <li>{SOKEM_CONFIG.hours.sunday}</li>
            </ul>
          </div>

          {/* Contact & Map */}
          <div>
            <h4 className="font-serif text-white font-bold text-sm mb-4">
              Location & Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">
                    {SOKEM_CONFIG.address}
                  </span>
                  <span className="text-gray-400 block">{SOKEM_CONFIG.city}</span>
                  {SOKEM_CONFIG.mapUrl && (
                    <a
                      href={SOKEM_CONFIG.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:underline inline-flex items-center gap-1 mt-1 font-medium"
                    >
                      View on Google Maps →
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
                  className="text-white hover:text-gold transition-colors font-mono font-medium"
                >
                  {SOKEM_CONFIG.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {SOKEM_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1.5 text-gray-400 hover:text-gold transition-colors"
            >
              <Lock className="w-3 h-3" />
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
