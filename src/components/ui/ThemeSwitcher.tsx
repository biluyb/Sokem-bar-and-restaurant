"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

type ThemeMode = "dark" | "light" | "system";

export const ThemeSwitcher: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = (localStorage.getItem("sokem-theme") as ThemeMode) || "dark";
      setTheme(saved);
      applyTheme(saved);
    } catch {
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.remove("light", "dark");
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(mode);
    }
  };

  const cycleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem("sokem-theme", next);
    } catch {}
  };

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-lg bg-slate-900/80 border border-white/[0.12] ${className}`} />
    );
  }

  return (
    <button
      onClick={cycleTheme}
      className={`inline-flex items-center justify-center p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/[0.12] text-xs font-semibold text-gray-300 hover:text-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer ${className}`}
      aria-label={`Current theme: ${theme}. Click to switch theme.`}
      title={`Theme: ${theme.toUpperCase()} (Click to toggle Dark / Light / System)`}
    >
      {theme === "dark" && <Moon className="w-3.5 h-3.5 text-gold" />}
      {theme === "light" && <Sun className="w-3.5 h-3.5 text-amber-400" />}
      {theme === "system" && <Monitor className="w-3.5 h-3.5 text-sky-400" />}
    </button>
  );
};
