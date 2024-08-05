<template>
  {{ voteFormatted }}
</template>

<script>
export default {
  name: "GradeDisplay",
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
