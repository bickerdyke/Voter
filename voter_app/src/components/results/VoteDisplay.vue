<template>
  {{ voteFormatted }}
</template>

<script>
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
