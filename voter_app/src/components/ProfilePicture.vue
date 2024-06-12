<template>
  <img :src="getProfilePicUrl" />
</template>

<script>
const sha256 = require("js-sha256");
export default {
  name: "ProfilePicture",
  components: {},
  props: {
    email: {
      type: String,
      required: true,
    },
    size: {
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
    imageUrl: String,
  },
  computed: {
    getProfilePicUrl() {
      return this.imageUrl ? this.imageUrl : this.getGravatarURL();
    },
  },
  methods: {
    getGravatarURL() {
      // Trim leading and trailing whitespace from
      // an email address and force all characters
      // to lower case
      const address = String(this.email).trim().toLowerCase();

      // Create a SHA256 hash of the final string
      const hash = sha256(address);

      // Grab the actual image URL https://docs.gravatar.com/api/avatars/images/
      return `https://www.gravatar.com/avatar/${hash}?s=${this.size}&d=${this.fallback}`;
    },
  },
};
</script>

<style scoped></style>
