<template>
  <font-awesome-icon
    :icon="['far', 'thumbs-up']"
    class="m-2 text-success"
    v-if="vote == 'aye'"
  />
  <font-awesome-icon
    :icon="['far', 'thumbs-down']"
    class="m-2 text-warning"
    v-else-if="vote == 'nay'"
  />
  <font-awesome-icon
    :icon="['far', 'face-meh']"
    class="m-2"
    v-else-if="vote == 'meh'"
  />
  <span v-else>{{ vote }}</span>
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
