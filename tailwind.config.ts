import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f7f8",
          100: "#eceef0",
          200: "#d4d8dd",
          300: "#aeb5be",
          400: "#828c98",
          500: "#636e7b",
          600: "#4e5762",
          700: "#3f464f",
          800: "#363b43",
          900: "#1f2228",
          950: "#0f1115",
        },
        rocket: {
          50: "#fff4ed",
          100: "#ffe5d4",
          200: "#ffc6a9",
          300: "#ff9c72",
          400: "#ff663b",
          500: "#fb3f16",
          600: "#ec280c",
          700: "#c41a0c",
          800: "#9c1712",
          900: "#7e1813",
          950: "#440807",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
