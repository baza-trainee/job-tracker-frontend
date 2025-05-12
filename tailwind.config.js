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
        whiteColor: "#ffffff",
        blackColor: "#333333",
        // textBlack: "#333333", // перевела на дві теми в index.css
        textBlack: "var(--textBlack)",
        // textBlackLight: "rgba(51, 51, 51, 0.5)", // це колір #333333 з opacity // перевела на дві теми в index.css
        textBlackLight: "var(--textBlackLight)", // це колір #333333 з opacity
        // textWhite: "#ffffff", // усюди йшов як white від tailwind, перевела на нашу змінну і в index.css
        textWhite: "var(--textWhite)",
        // textMediumWhite: "#ECF0F6", // перевела на дві теми в index.css
        textMediumWhite: "var(--textMediumWhite)",
        textOther: "#288DD5", // перевела на дві теми в index.css
        // textOther: "var(--textOther)",
        // button: "#BFDEF5", // перевела на дві теми в index.css
        button: "var(--button)",
        // backgroundMain: "#FDFEFF", // перевела на дві теми в index.css
        backgroundMain: "var(--backgroundMain)",
        // backgroundSecondary: "#ECEFF6", // перевела на дві теми в index.css
        backgroundSecondary: "var(--backgroundSecondary)",
        // backgroundTertiary: "#F7F8FB", // перевела на дві теми в index.css
        backgroundTertiary: "var(--backgroundTertiary)",
        iconHover: "#436B88", // перевела на дві теми в index.css
        // iconHover: "var(--iconHover)",
        colorWhite: "#ffffff", // усюди йшов як white від tailwind, перевела на нашу змінну і в index.css
        // colorWhite: "var(--colorWhite)",
        // color1: {
        //   DEFAULT: "#C6E7FF", // blue
        //   transparent: "rgba(198, 231, 255, 0.40)",
        // }, // blue with opacity
        color1: {
          DEFAULT: "var(--color1)", // blue
          transparent: "var(--color1-transparent)", // blue with opacity
        },
        // color2: {
        //   DEFAULT: "#FC8972", // error red
        //   transparent: "rgba(252, 137, 114, 0.40)", // error red with opacity
        // },
        color2: {
          DEFAULT: "var(--color2)", // error red
          transparent: "var(--color2-transparent)", // error red with opacity
        },
        // color3: {
        //   DEFAULT: "#FEEE91", // yellow
        //   transparent: "rgba(254, 238, 145, 0.40)", // yellow with opacity
        // },
        color3: {
          DEFAULT: "var(--color3)", // yellow
          transparent: "var(--color3-transparent)", // yellow with opacity
        },
        // color4: {
        //   DEFAULT: "#CDC1FF", // purple
        //   transparent: "rgba(205, 193, 255, 0.40)", // purple with opacity
        // },
        color4: {
          DEFAULT: "var(--color4)", // purple
          transparent: "var(--color4-transparent)", // purple with opacity
        },
        // color5: {
        //   DEFAULT: "#D0E8C5", // green-light
        //   transparent: "rgba(208, 232, 197, 0.40)", // green-light with opacity
        // },
        color5: {
          DEFAULT: "var(--color5)", // green-light
          transparent: "var(--color5-transparent)", // green-light with opacity
        },
        // color6: {
        //   DEFAULT: "#A6AEBF", // grey
        //   transparent: "rgba(166, 174, 191, 0.40)", // grey with opacity
        // },
        color6: {
          DEFAULT: "var(--color6)", // grey
          transparent: "var(--color6-transparent)", // grey with opacity
        },
        // color7: {
        //   DEFAULT: "#B1D690", // green
        //   transparent: "rgba(177, 214, 144, 0.40)", // green with opacity 0.4
        // },
        color7: {
          DEFAULT: "var(--color7)", // green
          transparent: "var(--color7-transparent)", // green with opacity 0.4
        },
        color7Light: "rgba(177, 214, 144, 0.3)", // color7 green with opacity 0.3
        // color7Light: "var(--color7Light)", // color7 green with opacity 0.3
        color8: "#76925D", // green-dark
        // color8: "var(--color8)", // green-dark
        // color9: {
        //   DEFAULT: "#DBDCDD", // grey
        //   transparent: "rgba(219, 220, 221, 0.40)", // grey with opacity
        // },
        color9: {
          DEFAULT: "var(--color9)", // grey
          transparent: "var(--color9-transparent)", // grey with opacity
        },
        borderLight: "#CECECE", // немає в дизайні, додати // перевела на дві теми в index.css
        // borderLight: "var(--borderLight)",
        form: {
          background: "rgba(255, 255, 255, 0.5)", // немає в дизайні, це #ffffff з opacity
        },
        // form: {
        //   background: "var(--form-background)", // немає в дизайні, це #ffffff з opacity
        // },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
