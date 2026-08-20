/** @type {import('tailwindcss').Config} */
// NOTE: Tailwind v4 (@tailwindcss/vite) does NOT read this file automatically —
// it only reads the @theme block in src/index.css. This file is kept only
// as a reference / in case you switch back to a v3-style setup or add an
// `@config "../tailwind.config.js";` line to index.css. If you add a new
// color, add it to the @theme block in src/index.css, not here.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#102A43",
        secondary: "#1E3A5F",
        accent: "#3B82F6",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        navy: "#0F172A",
        royal: "#2563EB",
        teal: "#14B8A6",
        brandgreen: "#22C55E",
        amber: "#F59E0B",
        danger: "#EF4444",
      },
      borderRadius: {
        xl2: "20px",
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,.06)",
      },
    },
  },
  plugins: [],
};
