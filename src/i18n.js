import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./ressouces/translations/en.json";
import fr from "./ressouces/translations/fr.json";

const resources = {
  en,
  fr,
};

// init i18n

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr",
    initImmediate: false,
    saveMissing: true, // send not translated keys to endpoint
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      wait: true,
    },
  });
