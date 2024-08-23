<template>
  <img :src="getProfilePicUrl" :class="imgClass" :style="imgSizeStyle" />
</template>

<script>
import sha256 from "js-sha256";

export default {
  name: "ProfilePicture",
  components: {},
  props: {
    emailHash: {
      type: String,
      required: false,
    },
    email: {
      // if hash needs to be created manually
      type: String,
      required: false,
    },
    size: {
      // 0 for automatic size with d-flex
      type: Number,
      default: 80,
    },
    fallback: {
      type: String,
      default: "mp",
      validator(value) {
        return [
          "404",
          "mp",
          "identicon",
          "monsterid",
          "wavatar",
          "retro",
          "robohash",
          "blank",
        ].includes(value);
      },
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  computed: {
    getProfilePicUrl() {
      return this.imageUrl ? this.imageUrl : this.getGravatarURL();
    },
    imgSizeStyle() {
      return this.size != 0
        ? `width: ${this.size.toString()}px; height: ${this.size.toString()}px; object-fit: cover;`
        : `width: 100%; object-fit: cover;`;
    },
    imgClass() {
      return this.size == 0
        ? "rounded-4 img-fluid d-block mx-auto d-fill"
        : "rounded-4";
    },
  },
  methods: {
    getGravatarURL() {
      // Trim leading and trailing whitespace from
      // an email address and force all characters
      // to lower case

      const fallbackOption =
        this.email || this.emailHash ? this.fallback : "mp"; //"Mystery Person" Profilbild wenn ganz ohne email

      let hash = this.emailHash;
      if (!hash) {
        const address = this.email
          ? String(this.email).trim().toLowerCase()
          : "forceFallbackOption";
        hash = sha256(address); // Create a SHA256 hash of the final string
      }

      // Grab the actual image URL https://docs.gravatar.com/api/avatars/images/
      return `https://www.gravatar.com/avatar/${hash}?s=${this.size}&d=${fallbackOption}`;
    },
  },
};
</script>

<style scoped></style>
