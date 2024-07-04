<template>
  <!-- <div>
    <button @click="setLanguage('en')" style="margin-right: 8px">
      English
    </button>
    <button @click="setLanguage('de')">Deutsch</button>
  </div> -->
  <form class="form-inline my-2 my-lg-0"></form>
  <div class="form-group" style="">
    <select class="" @change="setLanguage($event)">
      <option value="de">
        🇩🇪 &#x1F1E9;&#x1F1EA; {{ $t("i18n.langName_de") }}
      </option>
      <option value="en-uk">
        🇬🇧 &#x1F1EC;&#x1F1E7; {{ $t("i18n.langName_en-UK") }}
      </option>
      <option value="en-us">
        🇺🇸 &#x1F1FA;&#x1F1F8; {{ $t("i18n.langName_en-US") }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { watchEffect } from "vue";

const { locale } = useI18n();

const setLanguage = (event) => {
  locale.value = event.target.value;
  localStorage.setItem("lang", event.target.value);
};

watchEffect(() => {
  const storedLang = localStorage.getItem("lang");
  if (storedLang) {
    locale.value = storedLang;
  }
});
</script>
