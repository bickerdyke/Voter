<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <!-- Header -->
      <div class="row">
        <SessionHeadline>
          <template v-slot:headline>{{ $t("Search.Headline") }}</template>
          <template v-slot:subtitle>&nbsp;</template>
        </SessionHeadline>
      </div>

      <!-- if this.$store.getters.isAuthenticated -->

      <div class="row">
        <div class="alert alert-danger col-12" v-if="errorMessage">
          <strong>{{ $t("Error") }}</strong>
          <br />
          {{ errorMessage }}
        </div>
      </div>

      <div
        class="alert alert-warning shadow my-4"
        v-if="!sessionList || Object.keys(sessionList).length === 0"
      >
        <h3>{{ $t("Search.NoResults") }}</h3>
        <p>
          {{ $t("Search.NoResultsDetails") }}
        </p>
      </div>

      <ul>
        <li v-for="(session, sId) in sessionList" :key="sId">
          <SingleSession :sessionData="session" />
        </li>
      </ul>

      <!-- Footer-Features-->
    </div>
  </TheHomeLayout>
</template>

<script>
import { mapGetters } from "vuex";

import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import SingleSession from "@/components/search/SingleSession";

export default {
  name: "ShowMySessionsPage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    SingleSession,
  },
  data() {
    return {
      errorMessage: "",
      sessionListData: null,
    };
  },
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
    sessionList() {
      console.log("Zugriff Session-Liste");
      if (!this.sessionListData) {
        // Load SessionList
        this.clearError();
        const payload = {
          uId: this.$store.getters.userId,
        };

        this.$store
          .dispatch("loadSessions", payload)
          .then((result) => {
            this.sessionListData = result;
          })
          .catch((err) => {
            this.errorMessage = err;
            console.error(err);
          });
      }
      return this.sessionListData;
    },
  },
  methods: {
    clearError() {
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped></style>
