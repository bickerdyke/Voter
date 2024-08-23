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
import anonImg from "@/assets/profile/profile_anonymous.png";
import loggedoutImg from "@/assets/profile/profile_loggedout.png";

//@todo: #30 Pop-Up mit aktueller Pseudonym-ID hinzufügen
export default {
  name: "ProfileBadge",
  computed: {
    imgUrl() {
      // Im Moment sind nur anonyme Logins erlaubt.
      // Entsprechend ergänzen wenn "echte" Logins verwendet werden.
      return this.$store.getters.isAuthenticated ? anonImg : loggedoutImg;
    },
  },
};
</script>

<style scoped></style>
