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
      },
      letterSpacing: {
        tighter: "-0.04em",
        display: "-0.055em",
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
