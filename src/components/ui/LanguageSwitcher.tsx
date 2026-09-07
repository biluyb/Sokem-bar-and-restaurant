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
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-white/[0.12] text-xs font-semibold text-slate-300 hover:text-white transition-colors hover:border-gold/40 ${className}`}
      title={locale === "en" ? "Switch to Amharic (አማርኛ)" : "Switch to English"}
      aria-label="Toggle language"
    >
      <Languages className="w-3.5 h-3.5 text-gold" />
      <span className="tracking-wide">{locale === "en" ? "EN" : "አማ"}</span>
    </button>
  );
};
