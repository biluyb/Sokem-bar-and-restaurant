"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/components/ui/LanguageContext";

type ThemeMode = "dark" | "light";

export const ThemeSwitcher: React.FC<{ className?: string; showLabel?: boolean }> = ({
  className = "",
  showLabel = false,
}) => {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("sokem-theme");
      const resolved: ThemeMode = saved === "dark" ? "dark" : "light";
      setTheme(resolved);
      applyTheme(resolved);
    } catch {
      applyTheme("light");
    }
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  };

  const toggleTheme = () => {
    const next: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem("sokem-theme", next);
    } catch {}
  };

  if (!mounted) {
    return (
      <div className={`h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.12] ${className}`} />
    );
  }

  const isLight = theme === "light";
  const label = isLight ? (t.admin?.themeDark || "Night") : (t.admin?.themeLight || "Light");
  const actionTitle = isLight
    ? (t.admin?.nightMode || "Switch to Night Mode")
    : (t.admin?.lightMode || "Switch to Light Mode");

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 p-1.5 sm:px-2 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-slate-300 dark:border-white/[0.12] text-xs font-semibold text-slate-800 dark:text-gray-200 hover:text-amber-600 dark:hover:text-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer shadow-sm ${className}`}
      aria-label={actionTitle}
      title={actionTitle}
    >
      {isLight ? (
        <>
          <Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
          {showLabel && <span className="text-[11px] font-medium">{label}</span>}
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          {showLabel && <span className="text-[11px] font-medium">{label}</span>}
        </>
      )}
    </button>
  );
};
