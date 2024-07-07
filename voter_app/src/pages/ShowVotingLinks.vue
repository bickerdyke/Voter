<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline v-if="isSessionLoaded" />

      <!-- Alert -->
      <div class="alert alert-danger">
        <h3>{{ $t("Achtung") }}</h3>
        <p>{{ $t("ShowLinks.Warningtext.p1") }}</p>
        <p>
          <a :href="currentUrl" class="user-select-all" id="showlinksUrl">{{
            currentUrl
          }}</a
          >&nbsp;&nbsp;

          <button
            class="btn btn-light btn-sm"
            @click="copyToClipboard('showlinksUrl')"
          >
            {{ $t("ClipboardCopy") }}
          </button>
        </p>
        <p>{{ $t("ShowLinks.Warningtext.p2") }}</p>
      </div>

      <!-- Footer -->
      <div class="d-grid mt-3">
        <router-link
          :to="'/showresult/' + currentSessionId"
          class="btn btn-primary"
          >{{ $t("ShowLinks.Go to Result Page") }}</router-link
        >
      </div>
    </div>
  </TheHomeLayout>
</template>

<script>
import { mapGetters } from "vuex";

import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";

export default {
  name: "ShowVotingLinks",
  components: {
    TheHomeLayout,
    SessionHeadline,
  },
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
    currentUrl() {
      const route = this.$router.resolve(
        "/showvotinglinks/" + this.currentSessionId
      );
      return new URL(
        route.href,
        window.location.origin // + window.location.pathname
      ).href;
      //@todo: Prüfen, wie sich diese Funktion mit einem gesetzten Base-Pfad verhält
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

<style scoped></style>
