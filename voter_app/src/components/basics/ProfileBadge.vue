<template>
  <div class="mx-3">
    <img
      :src="imgUrl"
      height="40"
      width="40"
      style=""
      alt=""
      class="rounded-circle"
    />
  </div>
</template>

<script>
//todo: Pop-Up mit aktueller Pseudonym-ID hinzufügen
export default {
  name: "ProfileBadge",
  computed: {
    imgUrl() {
      // Im Moment sind nur anonyme Logins erlaubt.
      // Entsprechend ergänzen wenn "echte" Logins verwendet werden.
      return this.$store.getters.isAuthenticated
        ? require("@/assets/profile/profile_anonymous.png")
        : require("@/assets/profile/profile_loggedout.png");
    },
  },
};
</script>

<style scoped></style>
