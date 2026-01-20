/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // provide a small, consistent palette for light/dark modes
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          500: "#6366f1",
          600: "#4f46e5",
        },
      },
    },
  },
  plugins: [],
};
