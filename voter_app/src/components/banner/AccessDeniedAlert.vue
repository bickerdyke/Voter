<template>
  <div class="alert alert-danger shadow my-4 d-print-none">
    <h3>{{ $t("Achtung") }}</h3>
    <p>
      {{ $t("AccessDenied") }}
    </p>
  </div>
</template>

<script>
export default {
  name: "AccessDeniedAlert",
  computed: {},
};
</script>

<style scoped></style>
