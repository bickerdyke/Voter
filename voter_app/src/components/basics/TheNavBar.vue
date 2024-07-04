<template>
  <nav class="navbar navbar-expand-lg static-bottom" id="navbar">
    <a class="navbar-brand" href="#">Navbar</a>
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
          <a class="nav-link" href="#"
            >Home <span class="sr-only">(current)</span></a
          >
        </li>
        <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
      <LanguageSwitcher />
      <ProfileBadge />
    </div>
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
