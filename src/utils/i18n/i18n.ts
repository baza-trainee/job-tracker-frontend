import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./locales/en/en.json";
import ukLang from "./locales/uk/uk.json";
import LanguageDetector from "i18next-browser-languagedetector";
import { LOCALS } from "./constns";
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

export default i18n;
