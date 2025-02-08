import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import { zodI18nMap } from "zod-i18n-map";
import enLang from "./locales/en/en.json";
import ukLang from "./locales/uk/uk.json";
import LanguageDetector from "i18next-browser-languagedetector";
import { LOCALS } from "./constns";
// import { z } from "zod";
const resources = {
  [LOCALS.EN]: {
    translation: enLang,
  },
  [LOCALS.UA]: {
    translation: ukLang,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: LOCALS.EN,
    interpolation: {
      escapeValue: false,
    },
  });

// z.setErrorMap(zodI18nMap);

// export { z };
export default i18n;
