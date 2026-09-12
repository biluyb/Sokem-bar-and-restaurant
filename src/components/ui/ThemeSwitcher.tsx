"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "dark" | "light";

export const ThemeSwitcher: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("sokem-theme");
      const resolved: ThemeMode = saved === "light" ? "light" : "dark";
      setTheme(resolved);
      applyTheme(resolved);
    } catch {
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  };

  const toggleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem("sokem-theme", next);
    } catch {}
  };

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.12] ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 border border-slate-300 dark:border-white/[0.12] text-xs font-semibold text-slate-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer ${className}`}
      aria-label={theme === "dark" ? "Switch to Light mode" : "Switch to Dark mode"}
      title={theme === "dark" ? "Switch to Light mode" : "Switch to Dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="w-3.5 h-3.5 text-amber-400" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-slate-700" />
      )}
    </button>
  );
};

