/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      fontFamily: {
        sans: "Space Mono",
        mono: "monospace",
      },
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
        "shadow-xl": {
          dark: "rgba(70,88,109,0.15)",
          light: "rgba(70, 88, 109, 0.25)",
        },
        btn: {
          simple: "#0079ff",
          hover: "#60abff",
        },
      },
      boxShadow: {
        "shadow-simple": "0px 16px 30px -10px rgba(70,96,187,0.2)",
        "shadow-inactive": "0px 16px 30px -10px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
