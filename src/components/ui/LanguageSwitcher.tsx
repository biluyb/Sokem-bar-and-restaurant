"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { Languages } from "lucide-react";

export const LanguageSwitcher: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "am" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/[0.12] text-xs font-semibold text-gray-300 hover:text-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer ${className}`}
      aria-label="Toggle language between English and Amharic"
      title={locale === "en" ? "Switch to Amharic (አማርኛ)" : "Switch to English"}
    >
      <Languages className="w-3.5 h-3.5 text-gold" />
      <span className="font-mono tracking-wider">{locale === "en" ? "አማ" : "EN"}</span>
    </button>
  );
};
