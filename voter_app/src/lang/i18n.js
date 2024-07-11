import { createI18n } from "vue-i18n";
import axios from "axios";
import en from "@/lang/en/en.json";
import de from "@/lang/de/de.json";

// @todo: #35 lazy loading of language files

console.log("Applying locale settings");
console.log("Preferred languages: " + navigator.languages);

const i18n = createI18n({
  legacy: false,
  locale:
    localStorage.getItem("lang") ||
    (navigator.languages ? navigator.languages[0] : "en"),
  fallbackLocale: "en",
  messages: {
    en,
    de,
  },
});

const loadedLanguages = ["en"]; // our default language that is preloaded

function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common["Accept-Language"] = lang;
  document.querySelector("html").setAttribute("lang", lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language hasn't been loaded yet
  return import(
    /* webpackChunkName: "lang-[request]" */ `@/lang/${lang}.js`
  ).then((messages) => {
    i18n.setLocaleMessage(lang, messages.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  });
}

export default i18n;
