<template>
  <p>{{ voteFormatted }}</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VoteDisplay",
  props: {
    votingId: String,
    userId: String,
    minDecimals: {
      type: Number,
      default: 0,
    },
    maxDecimals: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    vote() {
      return this.$store.getters.vote(this.votingId, this.userId);
    },
    voteFormatted() {
      return this.vote ? this.format(Number(this.vote)) : "";
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
      return num.toLocaleString("de-DE", {
        minimumFractionDigits: this.minDecimals,
        maximumFractionDigits: this.maxDecimals,
      });
    },
  },
};
</script>

<style scoped></style>
