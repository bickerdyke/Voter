<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters } from "vuex";
import "bootstrap";

export default {
  name: "App",
  /* data() {
    return {
    };
  }, */
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
  },
  watch: {
    currentSessionId: {
      handler() {
        // SessionId in Store has been updated. Reload Session Data from Database
        if (!this.currentSessionId) {
          // Session-ID hat sich auf null geändert
          return;
        }

        if (!this.isAuthenticated) {
          this.$store.dispatch("autoSignin").then(() => {
            this.$store.dispatch("loadSession");
          });
        } else {
          this.$store.dispatch("loadSession");
        }
      },
      immediate: false,
    },
  },
  methods: {
    async copyToClipboard(paragraphId) {
      try {
        console.log("copy");
        const element = document.querySelector("#" + paragraphId);
        await navigator.clipboard.writeText(element.textContent);
        console.log("copy done");
        // Optional: Provide feedback or perform additional actions upon successful copy
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        // Optional: Handle and display the error to the user
      }
      console.log("function done");
    },
  },
};
</script>

<style lang="scss">
@import "./scss/bootstrap.scss";
@import "./scss/print.scss";
@import "~animate.css/animate.min.css";
</style>
