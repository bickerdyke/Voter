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
};
</script>

<style lang="scss">
@import "./scss/bootstrap.scss";
@import "~animate.css/animate.min.css";
</style>
