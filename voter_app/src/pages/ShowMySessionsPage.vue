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

      <!-- Array for sorting only and splitted in key + object again -->
      <!--<ul>
        <li v-for="session in sessionList" :key="session.sId">
          <SingleSession :sessionData="session" :sessionKey="session.sId" />
        </li>
      </ul>-->

      <div class="accordion accordion" :id="accordionId">
        <template v-for="session in sessionList" :key="session.sId">
          <SingleSession
            :sessionData="session"
            :sessionKey="session.sId"
            :parentId="accordionId"
          />
        </template>
      </div>

      <div class="mt-5 small text-body-secondary">
        {{ $t("Search.DataNote") }}
      </div>

      <!-- <div>{{ sessionList }}</div> -->

      <!-- Footer-Features-->
    </div>
  </TheHomeLayout>
</template>

<script>
import { mapGetters } from "vuex";

import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import SingleSession from "@/components/search/SingleSessionAccordionElement.vue";

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
      accordionId: "accordionSearchList",
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
        console.log("Lade Session-Liste...");
        this.clearError();

        const payload = {
          uId: this.$store.getters.userId,
        };

        this.$store
          .dispatch("loadSessions", payload)
          .then((result) => {
            // Convert to sorted Array
            this.sessionListData = Object.keys(result)
              .map((key) => ({
                sId: key,
                ...result[key],
              }))
              .sort((a, b) => a.timestamp - b.timestamp);
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
