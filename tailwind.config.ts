import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
};
export default config;
