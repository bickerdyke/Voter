import { createI18n } from "vue-i18n";
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

export default i18n;
