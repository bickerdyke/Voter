<template>
  <div class="row">
    <div class="hero py-5 mt-2 mb-5 shadow rounded-3">
      <div class="col-5 offset-1">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroBanner",
  computed: {},
};
</script>

<style scoped>
.hero {
  width: 100vw;
  min-height: 30vh;
  height: auto;
  background-image: url("@/assets/ballot_lg.jpg");
  background-position: center;
  background-size: cover;
}
</style>
