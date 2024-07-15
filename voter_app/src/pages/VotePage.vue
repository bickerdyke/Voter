<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline v-if="isLoaded" />

      <!-- Voting description -->
      <div class="row" v-if="isLoaded">
        <ImageAndDescription
          :imgUrl="voting.imgUrl"
          :description="voting.description"
          :imageRight="true"
        ></ImageAndDescription>
      </div>

      <!-- Bereits Stimme abgegeben? -->
      <div class="row">
        <div class="col-12 text-center" v-if="vote">
          <div
            class="card-title display-6 m-3"
            v-html="
              voting.title
                ? $t('Voting.votedFor', { item: voting.title })
                : $t('Voting.voted')
            "
          />
          <div class="display-4 fw-bold">
            <VoteDisplay :votingId="votingId" :userId="userId" />
          </div>
        </div>
      </div>

      <!-- Abstimmen -->
      <div class="row">
        <div class="alert alert-danger col-12" v-if="errorMessage">
          <strong>{{ $t("Error") }}</strong>
          <br />
          {{ errorMessage }}
        </div>
      </div>

      <div class="row" v-if="isLoaded">
        <div class="text-center col-12" v-if="!vote">
          <div
            class="display-6 m-3"
            v-html="
              voting.title
                ? $t('Voting.pleaseVoteFor', { item: voting.title })
                : $t('Voting.pleaseVote')
            "
          />
          <SlideVoteSelect @voted="voted" />
        </div>
      </div>

      <!-- Footer-Features-->
      <div class="row my-3">
        <router-link
          :to="resultPageRoute"
          class="btn btn-primary"
          v-if="!$route.query.autoclose"
          >{{ $t("Voting.result") }}</router-link
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
      isLoaded: false,
      errorMessage: "",
    };
  },
  props: {
    votingId: String,
    userId: String,
  },
  computed: {
    voting() {
      return this.isSessionLoaded && this.isAuthenticated
        ? this.$store.getters.voting(this.votingId)
        : "";
    },
    vote() {
      return this.isSessionLoaded && this.isAuthenticated
        ? this.$store.getters.vote(this.votingId, this.userId)
        : "";
    },
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
    resultPageRoute() {
      if (this.$route.query.userfilter) {
        return this.$router.resolve({
          name: "uservoting",
          params: {
            sessionId: this.currentSessionId,
            userId: this.userId,
          },
        });
      } else {
        return this.$router.resolve({
          name: "showresult",
          params: {
            sessionId: this.currentSessionId,
          },
        });
      }
    },
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
        .then(() => {
          // @wontfix: #40 Auto-Close implementieren. (query-Parameter autoclose=true)
          // window.close-Funktion nicht mehr verfügbar
        })
        .catch((err) => {
          this.errorMessage = err;
          console.error(err);
        });
    },
    clearError() {
      this.errorMessage = "";
    },
  },
  watch: {
    isSessionLoaded: {
      handler() {
        this.isLoaded = this.isSessionLoaded;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
