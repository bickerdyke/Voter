<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    mode="out-in"
    appear
    :key="$route.path"
  >
    <p v-if="isQuorumReached || userfilter">{{ voteFormatted }}</p>
    <p v-else-if="vote">
      <font-awesome-icon :icon="['far', 'circle-check']" />
    </p>
    <p v-else>&nbsp;</p></transition
  >
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GradeDisplay",
  props: {
    votingId: String,
    userId: String,
    userfilter: {
      type: Boolean,
      default: false,
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
      const result = Number(this.vote);
      switch (result) {
        case 0.7:
          return "1+";
        case 1.3:
          return "1-";
        case 1.5:
          return "1-2";
        case 1.7:
          return "2+";
        case 2.3:
          return "2-";
        case 2.5:
          return "2-3";
        case 2.7:
          return "3+";
        case 3.3:
          return "3-";
        case 3.5:
          return "3-4";
        case 3.7:
          return "4+";
        case 4.3:
          return "4-";
        case 4.5:
          return "4-5";
        case 4.7:
          return "5+";
        case 5.3:
          return "5-";
        case 5.5:
          return "5-6";
        case 5.7:
          return "5+";
      }
      return this.vote ? this.format(result) : "";
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

<style scoped>
p {
  margin-bottom: 0;
}
</style>
