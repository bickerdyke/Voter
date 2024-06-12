<template>
  <p class="debuginfo">
    (Session: {{ sessionId }} - Voting: {{ votingId }} - User: {{ userId }})
  </p>
  <p>{{ vote }}</p>
</template>

<script>
export default {
  name: "SingleVote",
  props: {
    sessionId: String,
    votingId: String,
    userId: String,
  },
  computed: {
    vote() {
      return this.$store.getters.vote(
        this.sessionId,
        this.votingId,
        this.userId
      );
    },
  },
};
</script>

<style scoped></style>
