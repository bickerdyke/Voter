<template>
  <nav
    class="navbar navbar-expand-lg fixed-bottom navbar-dark bg-primary"
    id="navbar"
  >
    <button
      class="navbar-toggler mx-3"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <router-link class="navbar-brand mx-3" to="/home"
      ><font-awesome-icon
        icon="square-poll-vertical"
        class="text-light me-2"
        size="2xl"
      ></font-awesome-icon
      >&nbsp;{{ $t("Voter-Service Title") }}</router-link
    >

    <div class="collapse navbar-collapse mx-3" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto">
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

    <LanguageSwitcher class="ms-auto me-1" />
    <ProfileBadge class="ms-1" />
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
