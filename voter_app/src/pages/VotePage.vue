<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline v-if="isSessionLoaded" />

      <!-- Voting description -->
      <ImageAndDescription
        :imgUrl="voting.imgUrl"
        :description="voting.description"
        :imageRight="true"
        v-if="isSessionLoaded"
      ></ImageAndDescription>

      <div class="row" v-if="isSessionLoaded">
        <!-- Bereits Stimme abgegeben? -->
        <div class="col-12 text-center" v-if="vote">
          <div class="card-title display-6 m-3">
            Sie haben für <i>{{ voting.title }}</i> abgestimmt:
          </div>
          <div class="display-4 fw-bold">
            <VoteDisplay :votingId="votingId" :userId="userId" />
          </div>
        </div>

        <!-- Abstimmen -->
        <div class="alert alert-danger col-12" v-if="errorMessage">
          <strong>Fehler</strong>
          <br />
          {{ errorMessage }}
        </div>

        <div class="text-center col-12" v-if="!vote">
          <div class="display-6 m-3">
            Bitte ihre Meinung für <i>{{ voting.title }}</i> abgeben:
          </div>
          <SlideVoteSelect @voted="voted" />
        </div>
      </div>

      <!-- Footer-Features-->
      <div class="row my-3">
        <router-link to="/" class="btn btn-primary"
          >Neue Abstimmung anlegen</router-link
        >
        <router-link to="/showresult/4711" class="btn btn-primary"
          >Ergebnis</router-link
        >
      </div>
    </div>
  </TheHomeLayout>
</template>

<script>
import { mapGetters } from "vuex";

import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import VoteDisplay from "@/components/results/VoteDisplay";
import SlideVoteSelect from "@/components/voting/SlideVoteSelect";
import ImageAndDescription from "@/components/ImageAndDescription";

export default {
  name: "VotePage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    VoteDisplay,
    SlideVoteSelect,
    ImageAndDescription,
  },
  data() {
    return {
      errorMessage: "test",
    };
  },
  props: {
    votingId: String,
    userId: String,
  },
  computed: {
    voting() {
      return this.isAuthenticated
        ? this.$store.getters.voting(this.votingId)
        : "";
    },
    vote() {
      return this.isAuthenticated
        ? this.$store.getters.vote(this.votingId, this.userId)
        : "";
    },
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
  },
  methods: {
    voted(vote) {
      this.clearError();
      const payload = {
        vId: this.votingId,
        uId: this.userId,
        vote: vote,
      };

      this.$store
        .dispatch("castVote", payload)
        .then(() => {})
        .catch((err) => {
          this.errorMessage = err;
          console.error(err);
        });
    },
    clearError() {
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped></style>
