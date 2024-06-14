<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline :sessionId="sessionId" />

      <!-- Voting description -->
      <ImageAndDescription
        :imgUrl="voting.imgUrl"
        :description="voting.description"
        floatStyle="float-end"
      ></ImageAndDescription>

      <!-- Bereits Stimme abgegeben? -->
      <div class="card text-center noborder" v-if="vote">
        <div class="card-title display-6 m-3">
          Sie haben bereits für <i>{{ voting.title }}</i> abgestimmt:
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
      <div class="card text-center nobor" v-if="!vote">
        <div class="card-title display-6 m-3">
          Bitte ihre Meinung für <i>{{ voting.title }}</i> abgeben:
        </div>
        <SlideVoteSelect @voted="voted" />
      </div>

      <!-- Footer-Features-->
      <div class="row my-3">
        <a href="/" class="btn btn-primary">Neue Abstimmung anlegen</a>
        <a href="/showresult/4711" class="btn btn-primary">Ergebnis</a>
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
      const payload = {
        sId: this.sessionId,
        vId: this.votingId,
        uId: this.userId,
        vote: vote,
      };
      // @todo: von mutation auf action umstellen
      this.$store.commit("castVote", payload);
    },
  },
};
</script>

<style scoped></style>
