<template>
  <div class="alert alert-danger shadow my-4 d-print-none">
    <h3>{{ $t("Achtung") }}</h3>
    <p>
      {{ $t("Legal.Disclaimer") }}
    </p>
    <hr />
    <p>
      Bug-Reports:
      <a href="https://github.com/bickerdyke/Voter/issues"
        >https://github.com/bickerdyke/Voter/issues</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "BetaVersionAlert",
  computed: {},
};
</script>

<style scoped></style>
