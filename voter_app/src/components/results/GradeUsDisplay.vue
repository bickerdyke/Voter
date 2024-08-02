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
  name: "GradeUsDisplay",
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
        case 4:
          return "A";
        case 3:
          return "B";
        case 2:
          return "C";
        case 1:
          return "D";
        case 0:
          return "F";
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
