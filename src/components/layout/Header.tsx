"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X, Calendar, Wine } from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pb-2 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 pointer-events-auto",
          isScrolled
            ? "bg-[#161922]/90 backdrop-blur-xl border border-white/[0.15] shadow-2xl shadow-black/60"
            : "bg-[#161922]/70 backdrop-blur-md border border-white/[0.08]"
        )}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-slate-950 transition-all duration-300">
            <Wine className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base tracking-wider text-white group-hover:text-gold transition-colors">
              SOKEM
            </span>
            <span className="text-[10px] tracking-widest text-gold-light uppercase -mt-0.5 font-medium">
              Bar & Restaurant
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {SOKEM_CONFIG.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-1",
                  isActive ? "text-gold font-semibold" : "text-gray-300 hover:text-white"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="headerActiveIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/reservations">
            <Button variant="primary" size="sm" className="gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Book a Table
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/reservations">
            <Button variant="primary" size="sm" className="px-3 py-1.5 text-xs">
              Book
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-full text-gray-200 hover:text-gold transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 max-w-sm mx-auto bg-[#161922]/95 backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-6 space-y-4 pointer-events-auto shadow-2xl"
          >
            <nav className="flex flex-col space-y-2">
              {SOKEM_CONFIG.navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium py-2 px-3 rounded-xl transition-colors",
                      isActive ? "bg-gold/15 text-gold font-semibold" : "text-gray-300 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-white/[0.08]">
              <Link href="/reservations" className="block w-full">
                <Button variant="primary" className="w-full justify-center">
                  Book a Table
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
