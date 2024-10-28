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

      colors: {
        accent: {
          primary: "#0D36C9",
          hover: "#1A48ED",
          pressed: "#0C31B4",
        },
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
