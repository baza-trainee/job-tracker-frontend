/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "420px",
      md: "768px",
      xl: "1240px",
      smOnly: { max: "767.98px" },
      mdOnly: { min: "768px", max: "1239.98px" },
      notXl: { max: "1239.98px" },
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          sm: "1.25rem",
          md: "1.25rem",
          xl: "1.25rem",
        },
      },
      boxShadow: {
        button_hover: " 0px 0px 10px 0px rgba(15, 120, 241, 0.50)",
      },
      colors: {
        accent: {
          primary: "#1976D2",
        },
        grey: { 100: "#888888", 80: "#424242", 70: "#525252" },

        orang: " #FF551A",
        error: "#FF3B30",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
