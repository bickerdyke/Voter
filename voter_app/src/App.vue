<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  /* data() {
    return {
    };
  }, */
  computed: {
    token() {
      return this.$store.getters.token;
    },
  },
  created() {
    this.$store.dispatch("autoSignin");
  },
  watch: {
    token: {
      handler() {
        //@todo: brauchen wir das am Ende noch?
        if (this.token) {
          //this.$store.dispatch("fetchProducts");
        }
      },
      immediate: true,
    },
  },
};
</script>
<!-- @todo: Reste vom auth-System ausbauen (watcher, store, token, autosignin...) -->

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";
/* @import "~@fortawesome/fontawesome-free/css/all.min.css"; */
@import "~animate.css/animate.min.css";

.bg-vue {
  background-color: rgb(52, 73, 94);
  color: white;
}
.bg-vue2 {
  background-color: rgb(65, 184, 131);
  color: white;
}
.text-vue {
  color: rgb(52, 73, 94);
}
.text-vue2 {
  color: rgb(65, 184, 131);
}

.debuginfo {
  display: none; /* inline or none */
}
.card.noborder {
  border: none;
}
</style>
