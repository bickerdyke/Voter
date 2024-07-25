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
      {{ $t("Legal.Imprint.Email") }}&nbsp;{{ ImprintEmail1
      }}<font-awesome-icon icon="at" />{{ ImprintEmail2 }}
    </p>

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
    ImprintEmail1() {
      const mail = process.env.VUE_APP_IMPRINT_EMAIL;
      return mail.split(" (at) ")[0];
    },
    ImprintEmail2() {
      const mail = process.env.VUE_APP_IMPRINT_EMAIL;
      return mail.split(" (at) ")[1];
    },
  },
};
</script>

<style scoped></style>
