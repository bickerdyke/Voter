<template>
  <div class="display-6 fw-bold text-center">
    {{ voteAverage }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VoteAverage",
  props: {
    votingId: String,
    minDecimals: {
      type: Number,
      default: 2,
    },
    maxDecimals: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    voteAverage() {
      const votes = this.$store.getters.votes(this.votingId);
      if (!votes || votes.length == 0) {
        return "";
      }
      const avg = votes.reduce((s, w) => s + Number(w), 0) / votes.length;
      return this.format(avg);
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
    ...mapGetters(["currentSessionId", "currentSessionData"]),
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

<style scoped>
p {
  margin-bottom: 0;
}
</style>
