<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline :sessionId="sessionId" />

      <!-- Voting description -->
      <ImageAndDescription
        :imgUrl="voting.imgUrl"
        :description="voting.description"
        :imageRight="true"
      ></ImageAndDescription>

      <!-- Bereits Stimme abgegeben? -->
      <div class="card text-center noborder" v-if="vote">
        <div class="card-title display-6 m-3">
          Sie haben für <i>{{ voting.title }}</i> abgestimmt:
        </div>
        <div class="card-body display-4 fw-bold">
          <VoteDisplay
            :sessionId="sessionId"
            :votingId="votingId"
            :userId="userId"
          />
        </div>
      </div>

      <!-- Abstimmen -->
      <div class="alert alert-danger" v-if="errorMessage">
        <strong>Fehler</strong>
        <br />
        {{ errorMessage }}
      </div>

      <div class="card text-center nobor" v-if="!vote">
        <div class="card-title display-6 m-3">
          Bitte ihre Meinung für <i>{{ voting.title }}</i> abgeben:
        </div>
        <SlideVoteSelect @voted="voted" />
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
      errorMessage: "",
    };
  },
  props: {
    sessionId: String,
    votingId: String,
    userId: String,
  },
  computed: {
    voting() {
      return this.$store.getters.voting(this.sessionId, this.votingId);
    },
    vote() {
      return this.$store.getters.vote(
        this.sessionId,
        this.votingId,
        this.userId
      );
    },
  },
  methods: {
    voted(vote) {
      this.clearError();
      const payload = {
        sId: this.sessionId,
        vId: this.votingId,
        uId: this.userId,
        vote: vote,
      };

      this.$store
        .dispatch("castVote", payload)
        .then((value) => {
          console.log(value);
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
};
</script>

<style scoped></style>
