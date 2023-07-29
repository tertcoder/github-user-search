/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  darkMode: "class",
  theme: {
    colors: {
      bg: {
        dm: "#141D2F",
        lm: "#F6F8FF",
      },
      "bg-content": {
        dm: "#1E2A47",
        lm: "#FEFEFE",
      },
      text: {
        dm: "#ffffff",
        lm: "#4B6A9B",
      },
      "text-alt": {
        dm: "#ffffff",
        lm: "#2B3442",
      },
      "dm-shadow": {
        dark: "rgba(70,88,109,0.15)",
        light: "rgba(70, 88, 109, 0.25)",
      },
    },
    extend: {
      fontFamily: {
        sans: "Space Mono",
        mono: "monospace",
      },
    },
  },
  plugins: [],
};
