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
        textBlack: "#333333",
        textBlackLight: "rgba(51, 51, 51, 0.5)", // немає в дизайні, це колір #333333 з opacity
        textWhite: "#ECF0F6",
        textOther: "#288DD5",
        button: "#BFDEF5",
        backgroundMain: "#FDFEFF",
        backgroundSecondary: "#ECEFF6",
        backgroundTertiary: "#F7F8FB",
        iconHover: "#436B88",
        color1: "#C6E7FF", // blue
        color2: "#FC8972", // error red
        color3: "#FEEE91", // yellow  
        color4: "#CDC1FF", // purple
        color5: "#D0E8C5", // green-light
        color6: "#A6AEBF", // grey
        color7: "#B1D690", // green
        color7Light: "rgba(177, 214, 144, 0.3)", // color7 green з opacity  
        color8: "#76925D", // green-dark
        borderLight: "#CECECE", // немає в дизайні, додати
   
        // text: {
          // primary: "#333333",  // дубль
          // gray: "rgba(51, 51, 51, 0.5)", // немає в дизайні, це колір #333333 з opacity
          // link: "#288dd5",  // дубль
          // active: "#121212",  // не використовується
        // },
        // card: {
          // blue: "#C6E7FF", // дубль
          // red: "#FC8972", // дубль
          // yellow: "#FEEE91", // дубль
          // purple: "#CDC1FF", // дубль
          // green: "#D0E8C5", // дубль
          // gray: "#A6AEBF", // дубль
        // },
        background: {
          // page: "#F6F6F6", // замінила на backgroundMain
          form: "rgba(255, 255, 255, 0.5)", // немає в дизайні, це #ffffff з opacity
          // sidebar: "#ECEFF6", // дубль
          // login: "#f9ce69", // не використовується
        },
        // accent: "#C6E7FF", // дубль
        // error: "#FC8972", // дубль
        // successful: "#D0E8C5", // дубль
        // modalWindowGreen: "#76925D", // дубль
        // modalWindowRed: "#FC8972", // дубль
        // modalWindowBlue: "#BFDEF5", // дубль
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
