<template>
  <div class="alert alert-danger shadow my-4 d-print-none">
    <h3>{{ $t("Achtung") }}</h3>
    <p>
      Dies ist die Testversion einer privaten Hobby-Webseite. Eingegebene Daten
      werden regelmässig gelöscht. Die Nutzung erfolgt ohne Garantie oder
      Zusicherung jeglicher Art.
    </p>
    <hr />
    <p>
      This is a test-version of a personal webservice. Data entered will be
      deleted regularly. Use at your own risk.
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
