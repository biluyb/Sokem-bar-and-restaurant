"use client";

import { useEffect } from "react";

export function AdminThemeSync() {
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("sokem-theme");
      const root = document.documentElement;
      if (savedTheme === "dark") {
        root.classList.remove("light");
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    } catch {}
  }, []);

  return null;
}
