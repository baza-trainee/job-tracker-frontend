/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "320px",
      smPlus: "576px",
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
        screens: true,
        center: true,
      },
      boxShadow: {
        button_hover: "0px 0px 6px 0px rgba(198, 231, 255, 0.5)",
        form_shadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        section_shadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.20)",
      },
      colors: {
        textBlack: "#333333",
        textBlackLight: "rgba(51, 51, 51, 0.5)", // це колір #333333 з opacity
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
        background: {
          form: "rgba(255, 255, 255, 0.5)", // немає в дизайні, це #ffffff з opacity
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
};
