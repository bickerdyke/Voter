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
    <p v-if="isQuorumReached || userfilter">
      <component :is="displaycomponent" :votingId="votingId" :userId="userId" />
    </p>
    <p v-else-if="vote">
      <font-awesome-icon :icon="['far', 'circle-check']" />
    </p>
    <p v-else>&nbsp;</p></transition
  >
</template>

<script>
import { mapGetters } from "vuex";
import { VOTINGMODES } from "@/config/misc";

import VoteDisplay from "@/components/results/VoteDisplay";
import GradeDisplay from "@/components/results/GradeDisplay";
import GradeUsDisplay from "@/components/results/GradeUsDisplay";
import ThumbsDisplay from "@/components/results/ThumbsDisplay";

export default {
  name: "DisplayWrapper",
  components: {
    VoteDisplay,
    GradeDisplay,
    GradeUsDisplay,
    ThumbsDisplay,
  },
  data() {
    return {
      votingmodes: VOTINGMODES,
    };
  },
  props: {
    votingId: String,
    userId: String,
    userfilter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    vote() {
      return this.$store.getters.vote(this.votingId, this.userId);
    },
    displaycomponent() {
      return this.votingmodes[this.currentSessionData.votingmode]
        .displaycomponent;
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
      let quorum = this.currentSessionData.quorum
        ? Number(this.currentSessionData.quorum)
        : 100;

      // #80 Quorum Fehler. Quorum von "0" wird als "false" und gibt 100% als Default
      if (this.currentSessionData.quorum == "0") {
        quorum = 0;
      }

      return this.turnout >= quorum;
    },
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
</style>
