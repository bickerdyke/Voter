<template>
  <div class="row my-3">
    <h1 class="text-center display-2">
      <slot name="headline"
        ><template v-if="currentSessionData.title">{{
          currentSessionData.title
        }}</template></slot
      >
    </h1>
    <h2 class="text-center">
      <slot name="subtitle"
        ><template v-if="currentSessionData.subtitle">{{
          currentSessionData.subtitle
        }}</template></slot
      >
    </h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SessionHeadline",
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
  },
};
</script>

<style scoped></style>
