<template>
  <p>{{ voteAverage }}</p>
</template>

<script>
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
        votes.reduce((summe, wert) => summe + Number(wert), 0) / votes.length
      );
    },
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
