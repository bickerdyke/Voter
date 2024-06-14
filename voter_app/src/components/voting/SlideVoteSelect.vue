<template>
  <div class="mx-5 my-2">
    <div>
      <label for="pointVote" class="float-start">0</label>
      <label for="pointVote" class="float-end">10</label>
    </div>
    <input
      type="range"
      class="form-range mw-25"
      id="pointVote"
      min="0"
      max="10"
      v-model="points"
    />

    <p>
      <label for="pointVote" class="form-label"
        >Bitte ihre Wertung einstellen</label
      >
    </p>
  </div>
  <button class="btn btn-primary m-3" @click="voted">
    {{ points }} Punkte vergeben
  </button>
</template>

<script>
export default {
  name: "SlideVoteSelect",
  emits: {
    voted(payload) {
      return payload ? true : false;
    },
  },
  data() {
    return {
      points: 5,
    };
  },
  components: {},
  props: {},
  computed: {},
  methods: {
    voted() {
      this.$emit("voted", this.points);
    },
  },
};
</script>

<style scoped></style>
