import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "var(--bg-main)",
          lighter: "var(--card-bg)",
          card: "var(--card-bg)",
          border: "var(--card-border)",
        },
        gold: {
          DEFAULT: "#F59E0B",
          light: "#FDE68A",
          hover: "#D97706",
          dark: "#B45309",
          glow: "rgba(245, 158, 11, 0.25)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(245, 158, 11, 0.3)",
        "glow-lg": "0 0 50px -5px rgba(245, 158, 11, 0.4)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
