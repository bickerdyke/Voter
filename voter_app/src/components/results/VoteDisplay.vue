<template>
  <p class="debuginfo">
    (Session: {{ sessionId }} - Voting: {{ votingId }} - User: {{ userId }})
  </p>
  <p>{{ voteFormatted }}</p>
</template>

<script>
export default {
  name: "VoteDisplay",
  props: {
    sessionId: String,
    votingId: String,
    userId: String,
    minDecimals: {
      type: Number,
      default: 0,
    },
    maxDecimals: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    vote() {
      return this.$store.getters.vote(
        this.sessionId,
        this.votingId,
        this.userId
      );
    },
    voteFormatted() {
      return this.vote ? this.format(Number(this.vote)) : "";
    },
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
