<template>
  <b>{{ sessionData.title }}</b
  >&nbsp; Autor:{{ sessionData.author }}
</template>

<script>
export default {
  name: "SingleSession",
  props: {
    sessionData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
