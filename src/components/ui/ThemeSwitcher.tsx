"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

export const ThemeSwitcher: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem("sokem-theme") as Theme) || "dark";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (t === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(t);
    }
  };

  const handleSelect = (nextTheme: Theme) => {
    setTheme(nextTheme);
    localStorage.setItem("sokem-theme", nextTheme);
    applyTheme(nextTheme);
  };

  if (!mounted) {
    return <div className="w-20 h-7" />;
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-slate-900/90 border border-white/[0.12] backdrop-blur-md shadow-inner ${className}`}
      role="radiogroup"
      aria-label="Theme selection"
    >
      <button
        type="button"
        onClick={() => handleSelect("dark")}
        className={`p-1.5 rounded-full transition-all ${
          theme === "dark"
            ? "bg-gold text-slate-950 shadow-glow"
            : "text-slate-400 hover:text-white"
        }`}
        title="Dark Theme"
        aria-label="Dark Theme"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => handleSelect("light")}
        className={`p-1.5 rounded-full transition-all ${
          theme === "light"
            ? "bg-gold text-slate-950 shadow-glow"
            : "text-slate-400 hover:text-white"
        }`}
        title="Light Theme"
        aria-label="Light Theme"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => handleSelect("system")}
        className={`p-1.5 rounded-full transition-all ${
          theme === "system"
            ? "bg-gold text-slate-950 shadow-glow"
            : "text-slate-400 hover:text-white"
        }`}
        title="System Preference"
        aria-label="System Theme"
      >
        <Monitor className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
