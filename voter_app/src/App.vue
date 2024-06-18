<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters } from "vuex";

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

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
/* @import "~@fortawesome/fontawesome-free/css/all.min.css"; */
@import "~animate.css/animate.min.css";

.bg-vue {
  background-color: rgb(52, 73, 94);
  color: white;
}
.bg-vue2 {
  background-color: rgb(65, 184, 131);
  color: white;
}
.text-vue {
  color: rgb(52, 73, 94);
}
.text-vue2 {
  color: rgb(65, 184, 131);
}

.debuginfo {
  display: none; /* inline or none */
}
.card.noborder {
  border: none;
}
</style>
