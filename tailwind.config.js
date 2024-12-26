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
          "2xl": "1.25rem",
          "3xl": "1.25rem",
        },
      },
      boxShadow: {
        button_hover: "0px 0px 6px 0px rgba(198, 231, 255, 0.5)",
        form_shadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        section_shadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.20)",
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
        color1: {
          DEFAULT: "#C6E7FF", // blue
          transparent: "rgba(198, 231, 255, 0.40)",
        }, // blue with opacity
        color2: {
          DEFAULT: "#FC8972", // error red
          transparent: "rgba(252, 137, 114, 0.40)",
        }, // error red with opacity
        color3: {
          DEFAULT: "#FEEE91", // yellow
          transparent: "rgba(254, 238, 145, 0.40)",
        }, // yellow with opacity
        color4: {
          DEFAULT: "#CDC1FF", // purple
          transparent: "rgba(205, 193, 255, 0.40)",
        }, // purple with opacity
        color5: {
          DEFAULT: "#D0E8C5", // green-light
          transparent: "rgba(208, 232, 197, 0.40)",
        }, // green-light with opacity
        color6: {
          DEFAULT: "#A6AEBF", // grey
          transparent: "rgba(166, 174, 191, 0.40)",
        }, // grey with opacity
        color7: {
          DEFAULT: "#B1D690", // green
          transparent: "rgba(177, 214, 144, 0.40)",
        }, // green with opacity 0.4
        color7Light: "rgba(177, 214, 144, 0.3)", // color7 green with opacity 0.3
        color8: "#76925D", // green-dark
        color9: {
          DEFAULT: "#DBDCDD", // grey
          transparent: "rgba(219, 220, 221, 0.40)",
        }, // grey with opacity
        borderLight: "#CECECE", // немає в дизайні, додати
        // scrollbarThumb: "#C2C2C2", // Колір повзунка, немає в дизайні, додати
        // scrollbarTrack: "#EAEEF2", // Колір треку, немає в дизайні, додати

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
      // borderRadius: {
      //   scrollbar: "4px", // Border-radius для скролу
      // },
    },
  },
  // plugins: [
  //   require("tailwind-scrollbar"),
  // ],
};
