import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./";

const resources = {
  "en-US": {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en-US",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
