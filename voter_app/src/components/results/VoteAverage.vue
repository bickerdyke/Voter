<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    mode="out-in"
    appear
    :key="$route.path"
  >
    <p v-if="isQuorumReached">{{ voteAverage }}</p>
  </transition>
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
      return this.format(
        votes.reduce((summe, wert) => summe + Number(wert), 0) / votes.length,
      );
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

<style scoped></style>
