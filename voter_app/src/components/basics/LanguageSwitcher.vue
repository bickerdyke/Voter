<template>
  <div class="btn-group dropup mx-3" id="languageSwitch">
    <button type="button" class="btn btn-light" v-html="currentFlag"></button>
    <button
      type="button"
      class="btn btn-light dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown"
    >
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <button class="dropdown-item" type="button" @click="setLanguage('de')">
          &#x1F1E9;&#x1F1EA; {{ $t("i18n.langName_de") }}
        </button>
      </li>
      <!--<li>
        <button
          class="dropdown-item"
          type="button"
          @click="setLanguage('en-UK')"
        >
          &#x1F1EC;&#x1F1E7; {{ $t("i18n.langName_en-UK") }}
        </button>
      </li>-->
      <li>
        <button
          class="dropdown-item"
          type="button"
          @click="setLanguage('en-US')"
        >
          &#x1F1FA;&#x1F1F8; {{ $t("i18n.langName_en-US") }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
polyfillCountryFlagEmojis();

export default {
  name: "LanguageSwitcher",
  props: {},
  computed: {
    storedlanguage() {
      return localStorage.getItem("lang");
    },
    currentFlag() {
      let flagcode;
      switch (this.$root.$i18n.locale.toLowerCase()) {
        case "de":
        case "de-de":
          flagcode = "&#x1F1E9;&#x1F1EA;";
          break;
        case "en":
        case "en-uk":
          flagcode = "&#x1F1EC;&#x1F1E7;";
          break;
        case "en-us":
          flagcode = "&#x1F1FA;&#x1F1F8;";
          break;
        default:
          flagcode = "&#x1F1EA;&#x1F1FA;";
          break;
      }
      return (
        "<span style='font-family: \"Twemoji Country Flags\"'>" +
        flagcode +
        "</span>"
      );
    },
  },
  methods: {
    setLanguage(lang) {
      this.$root.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
    },
  },
  watch: {
    storedlanguage: {
      handler() {
        console.Log("Language Store Watcher activated");
        const storedLang = localStorage.getItem("lang");
        if (storedLang) {
          this.$root.$i18n.locale = storedLang;
        }
      },
    },
  },
};
</script>

<style scoped>
#languageSwitch {
  font-family: "Twemoji Country Flags", "Inter";
}
</style>
