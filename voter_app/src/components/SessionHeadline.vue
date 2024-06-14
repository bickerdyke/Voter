<template>
  <div class="row my-3">
    <h1 class="text-center display-2">
      <slot name="headline">{{ session.title }}</slot>
    </h1>
    <h3 class="text-center">
      <slot name="subtitle">{{ session.subtitle }}</slot>
    </h3>
  </div>
</template>

<script>
export default {
  name: "SessionHeadline",
  components: {},
  props: {
    sessionId: String,
  },
  computed: {
    session() {
      return this.$store.getters.session;
    },
  },
};
</script>

<style scoped></style>
