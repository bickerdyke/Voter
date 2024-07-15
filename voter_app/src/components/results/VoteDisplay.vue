<template>
  <p v-if="isQuorumReached || userfilter">{{ voteFormatted }}</p>
  <p v-else-if="vote">
    <font-awesome-icon :icon="['far', 'circle-check']" />
  </p>
  <p v-else>&nbsp;</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VoteDisplay",
  props: {
    votingId: String,
    userId: String,
    userfilter: {
      type: String,
      default: null,
    },
    minDecimals: {
      type: Number,
      default: 0,
    },
    maxDecimals: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    vote() {
      return this.$store.getters.vote(this.votingId, this.userId);
    },
    voteFormatted() {
      return this.vote ? this.format(Number(this.vote)) : "";
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

    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
  },
  methods: {
    format(num) {
      return num.toLocaleString(this.$i18n.locale, {
        minimumFractionDigits: this.minDecimals,
        maximumFractionDigits: this.maxDecimals,
      });
    },
  },
};
</script>

<style scoped></style>
