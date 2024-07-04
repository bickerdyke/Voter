<template>
  <div>
    <img
      :src="imgUrl"
      height="70"
      width="70"
      style=""
      alt=""
      class="rounded-circle"
    />
    <img src="@/assets/profile/profile_anonymous.png" width="300" />
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
        ? "@/assets/profile/profile_anonymous.png"
        : "@/assets/profile/profile_loggedout.png";
    },
  },
};
</script>

<style scoped></style>
