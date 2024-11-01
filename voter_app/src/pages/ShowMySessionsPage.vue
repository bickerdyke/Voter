<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <!-- Header -->
      <div class="row">
        <SessionHeadline>
          <template v-slot:headline>{{
            $t("Voter-Service MyVotings")
          }}</template>
          <template v-slot:subtitle>&nbsp;</template>
        </SessionHeadline>
      </div>

      <p>Show my votings from Database</p>

      <div class="row">
        <div class="alert alert-danger col-12" v-if="errorMessage">
          <strong>{{ $t("Error") }}</strong>
          <br />
          {{ errorMessage }}
        </div>
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
//import ImageAndDescription from "@/components/ImageAndDescription";

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
  props: {
    userId: String,
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
          uId: this.userId,
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
