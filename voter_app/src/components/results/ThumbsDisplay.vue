<template>
  <p>Thumb</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ThumbsDisplay",
  props: {
    votingId: String,
    userId: String,
  },
  computed: {
    vote() {
      return this.$store.getters.vote(this.votingId, this.userId);
    },
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
  },
  methods: {},
};
</script>

<style scoped></style>
