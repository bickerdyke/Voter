<template>
  <div class="alert alert-light shadow my-4">
    <h3>{{ $t("Legal.Imprint.Imprint") }}</h3>

    <p>
      <b>{{ $t("Legal.Imprint.Responsible") }}</b
      ><br />
      {{ ImprintName }}<br />
      {{ ImprintAddress }}<br />
      {{ ImprintAddress2 }}
    </p>

    <p>
      <b>{{ $t("Legal.Imprint.Contact") }}</b
      ><br />
      {{ $t("Legal.Imprint.Email") }}&nbsp;{{ ImprintEmail }}
    </p>

    <!-- Im Englischen ist die Bezeichnung. “Legal Information” oder “Legal notice” zu empfehlen -->

    <b>{{ $t("Legal.Imprint.UserGenerated.Headline") }}</b>
    <p>{{ $t("Legal.Imprint.UserGenerated.p1") }}</p>
  </div>
</template>

<script>
export default {
  name: "TheImprint",
  computed: {
    ImprintName() {
      return process.env.VUE_APP_IMPRINT_NAME;
    },
    ImprintAddress() {
      return process.env.VUE_APP_IMPRINT_ADDRESS;
    },
    ImprintAddress2() {
      return process.env.VUE_APP_IMPRINT_ADDRESS2;
    },
    ImprintEmail() {
      return process.env.VUE_APP_IMPRINT_EMAIL;
    },
  },
};
</script>

<style scoped></style>
