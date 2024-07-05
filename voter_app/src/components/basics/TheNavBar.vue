<template>
  <nav
    class="navbar navbar-expand-lg fixed-bottom navbar-dark bg-dark"
    id="navbar"
  >
    <router-link class="navbar-brand mx-3" to="/home">{{
      $t("Voter-Service Title")
    }}</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">{{
            $t("Pages.Home")
          }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/create">{{
            $t("Pages.Create")
          }}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link disabled" to="/legal">{{
            $t("Pages.Legal")
          }}</router-link>
        </li>
      </ul>
    </div>

    <LanguageSwitcher />
    <ProfileBadge />
  </nav>
</template>

<script>
import ProfileBadge from "@/components/basics/ProfileBadge";
import LanguageSwitcher from "@/components/basics/LanguageSwitcher";
export default {
  name: "TheNavBar",
  components: {
    ProfileBadge,
    LanguageSwitcher,
  },
};
</script>

<style scoped></style>
