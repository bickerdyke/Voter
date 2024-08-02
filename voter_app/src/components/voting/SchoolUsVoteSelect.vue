<template>
  <div class="mx-5 my-2 row">
    <div class="buttongroup">
      <button
        type="button"
        class="btn btn-primary btn-lg m-3"
        @click="voted('4')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> A
      </button>
      <button
        type="button"
        class="btn btn-primary btn-lg m-3"
        @click="voted('3')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> B
      </button>
      <button
        type="button"
        class="btn btn-primary btn-lg m-3"
        @click="voted('2')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> C
      </button>
      <button
        type="button"
        class="btn btn-primary btn-lg m-3"
        @click="voted('1')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> D
      </button>
      <button
        type="button"
        class="btn btn-primary btn-lg m-3"
        @click="voted('0')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> F
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SchoolUsVoteSelect",
  emits: {
    voted(payload) {
      return payload ? true : false;
    },
  },
  methods: {
    voted(val) {
      this.$emit("voted", val);
    },
  },
};
</script>

<style scoped></style>
