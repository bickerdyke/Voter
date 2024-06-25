<template>
  <div>
    <button @click="setLanguage('en')" style="margin-right: 8px">
      English
    </button>
    <button @click="setLanguage('de')">Deutsch</button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { watchEffect } from "vue";

const { locale } = useI18n();

const setLanguage = (newLang) => {
  locale.value = newLang;
  localStorage.setItem("lang", newLang);
};

watchEffect(() => {
  const storedLang = localStorage.getItem("lang");
  if (storedLang) {
    locale.value = storedLang;
  }
});
</script>
