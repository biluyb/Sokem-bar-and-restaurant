"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

export const LanguageSwitcher: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`inline-flex items-center rounded-lg border border-slate-300 dark:border-white/[0.12] bg-slate-100 dark:bg-slate-900/90 p-0.5 text-xs font-semibold ${className}`}
    >
      <button
        type="button"
        onClick={() => setLocale("am")}
        aria-pressed={locale === "am"}
        className={`px-2 py-1 rounded-md transition-all duration-200 cursor-pointer ${
          locale === "am"
            ? "bg-gold text-slate-950 font-bold shadow-sm"
            : "text-slate-600 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white"
        }`}
      >
        አማ
      </button>
      <span className="text-slate-300 dark:text-white/20 select-none">|</span>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`px-2 py-1 rounded-md transition-all duration-200 cursor-pointer font-mono ${
          locale === "en"
            ? "bg-gold text-slate-950 font-bold shadow-sm"
            : "text-slate-600 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
};
