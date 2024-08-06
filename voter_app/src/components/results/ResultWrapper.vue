<!-- Selects the voting component for voting page.
 New Voting Modes do not need to be included in Voting Page-->

<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    mode="out-in"
    appear
    :key="$route.path"
  >
    <p v-if="isQuorumReached">
      <component :is="resultcomponent" :votingId="votingId" />
    </p>
    <p v-else>&nbsp;</p></transition
  >
</template>

<script>
import { mapGetters } from "vuex";
import { VOTINGMODES } from "@/config/misc";

import VoteAverage from "@/components/results/VoteAverage";
import ThumbsResult from "@/components/results/ThumbsResult";

export default {
  name: "ResultWrapper",
  components: {
    VoteAverage,
    ThumbsResult,
  },
  data() {
    return {
      votingmodes: VOTINGMODES,
    };
  },
  props: {
    votingId: String,
  },
  computed: {
    resultcomponent() {
      return this.votingmodes[this.currentSessionData.votingmode]
        .resultcomponent;
    },
    turnout() {
      const votes = this.$store.getters.votes(this.votingId);
      if (!votes) return 0;

      const countVotes = votes.length;
      const countUsers = Object.keys(this.currentSessionData.users).length;
      const turnout = (countVotes / countUsers) * 100;

      return turnout;
    },
    isQuorumReached() {
      const quorum = this.currentSessionData.quorum
        ? Number(this.currentSessionData.quorum)
        : 100;

      return this.turnout >= quorum;
    },
    ...mapGetters(["currentSessionData"]),
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
</style>
