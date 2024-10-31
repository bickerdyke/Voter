<template>
  Hello
  {{ session.title }}
  <br />>{{ session }}
</template>

<script>
export default {
  name: "SingleSession",
  props: {
    session: object,
  },
  computed: {},
};
</script>

<style scoped></style>
