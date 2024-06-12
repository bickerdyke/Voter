<template>
  <img :src="getProfilePicUrl" class="rounded-4" :style="imgSizeStyle" />
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
      return `width: ${this.size.toString()}px; height: ${this.size.toString()}px; object-fit: cover;`;
      //return `width: 75%; height: auto; object-fit: cover;`;
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
