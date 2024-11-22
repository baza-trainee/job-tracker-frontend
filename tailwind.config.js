/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
      smOnly: { max: "767.98px" },
      mdOnly: { min: "768px", max: "1279.98px" },
      notXl: { max: "1279.98px" },
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
        button_hover: "0px 0px 6px 0px rgba(198, 231, 255, 0.5)",
        form_shadow: " 0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        text: {
          primary: "#333333",
          gray: "rgba(51, 51, 51, 0.5)",
          link: "#288dd5",
          active: "#121212",
        },
        card: {
          blue: "#C6E7FF",
          red: "#FC8972",
          yellow: "#FEEE91",
          purple: "#CDC1FF",
          green: "#D0E8C5",
          gray: "#A6AEBF",
        },
        background: {
          page: "#F6F6F6",
          form: "rgba(255, 255, 255, 0.5)",
          sidebar: "#ECEFF6",
          login: "#f9ce69",
        },
        accent: "#C6E7FF",
        error: "#FC8972",
        successful: "#D0E8C5",
        modalWindowGreen: "#76925D",
        modalWindowRed: "#FC8972",
        modalWindowBlue: "#BFDEF5",
        blackTextColor: "#333333",
        iconHover: "#436B88",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
