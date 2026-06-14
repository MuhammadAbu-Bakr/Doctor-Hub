import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0EA5E9",
          dark: "#0369A1",
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          900: "#0C4A6E",
        },
        secondary: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        accent: {
          DEFAULT: "#6366F1",
          50: "#EEF2FF",
          100: "#E0E7FF",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
        },
        warning: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
          600: "#D97706",
        },
        danger: {
          DEFAULT: "#EF4444",
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },
        muted: "#94A3B8",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "glow-primary": "0 0 0 3px rgb(14 165 233 / 0.25)",
        "glow-danger": "0 0 0 3px rgb(239 68 68 / 0.25)",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.15s ease-out",
        "slide-up": "slideUp 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
