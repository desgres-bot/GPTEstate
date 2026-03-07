import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        display: "-0.055em",
      },
      boxShadow: {
        btn: "0 1px 2px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.1)",
        "btn-hover": "0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)",
        "btn-press": "0 0px 1px rgba(0,0,0,0.1), inset 0 2px 4px rgba(0,0,0,0.15), inset 0 1px 2px rgba(0,0,0,0.1)",
        "terra-glow": "0 0 20px rgba(212,101,75,0.3), 0 0 60px rgba(212,101,75,0.1)",
        "btn-light": "0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.04)",
        "btn-light-hover": "0 2px 6px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.04)",
        "nav-glass": "0 -1px 20px rgba(0,0,0,0.08)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 1px 3px rgba(212,101,75,0.3), 0 4px 12px rgba(212,101,75,0.15), 0 0 20px rgba(212,101,75,0.1), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.15)",
          },
          "50%": {
            boxShadow: "0 1px 3px rgba(212,101,75,0.3), 0 4px 12px rgba(212,101,75,0.15), 0 0 30px rgba(212,101,75,0.25), 0 0 60px rgba(212,101,75,0.08), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.15)",
          },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      colors: {
        beige: "#CCCAC7",
        terra: {
          50: "#FEF6F3",
          100: "#FDEBE4",
          200: "#FACEC0",
          300: "#F5A98F",
          400: "#E8795A",
          500: "#D4654B",
          600: "#C05540",
          700: "#A04535",
          800: "#843A2F",
          900: "#6D332B",
        },
        navy: {
          50: "#f0f3ff",
          100: "#dde3ff",
          200: "#c2cbff",
          300: "#96a3ff",
          400: "#6470ff",
          500: "#3b41ff",
          600: "#2420ff",
          700: "#1a14eb",
          800: "#1610c5",
          900: "#0f1a5c",
          950: "#0a0f3a",
        },
        accent: {
          50: "#fff8ed",
          100: "#ffeed4",
          200: "#ffd9a8",
          300: "#ffbd71",
          400: "#ff9633",
          500: "#ff7a0d",
          600: "#f06006",
          700: "#c74607",
          800: "#9e380e",
          900: "#7f300f",
        },
        warm: {
          50: "#fbf9f6",
          100: "#f5f0eb",
          200: "#ebe4db",
        },
      },
    },
  },
  plugins: [],
};
export default config;
