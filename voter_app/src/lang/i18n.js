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

export default i18n;
