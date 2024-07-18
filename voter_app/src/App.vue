<template>
  <router-view></router-view>
  <div
    class="toast position-fixed top-0 end-0 m-4 bg-success"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-bs-delay="2000"
    id="copytoast"
  >
    <!-- Debug: style="display: block" -->
    <div class="toast-header">
      <strong class="me-auto">{{ $t("ClipboardCopySuccess") }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Toast } from "bootstrap";

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
        const element = document.querySelector("#" + paragraphId); // blob: element.textContent
        const type = "text/plain";
        const blob = new Blob([element.textContent], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        await navigator.clipboard.write(data);

        const copytoastToast = Toast.getOrCreateInstance(
          document.getElementById("copytoast")
        );

        if (copytoastToast) {
          copytoastToast.show();
        } else {
          console.error("Toast-Message not loaded");
        }
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        // Optional: Handle and display the error to the user
      }
    },
  },
};
</script>

<style lang="scss">
@import "./scss/bootstrap.scss";
@import "./scss/print.scss";
@import "~animate.css/animate.min.css";
</style>
