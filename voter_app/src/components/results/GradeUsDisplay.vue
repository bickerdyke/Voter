<template>
  {{ voteFormatted }}
</template>

<script>
export default {
  name: "GradeUsDisplay",
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
      if (this.vote == null) {
        return "";
      }

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
