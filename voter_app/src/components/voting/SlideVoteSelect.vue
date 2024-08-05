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
      <label for="pointVote" class="form-label">{{
        $t("Voting.votingSlider")
      }}</label>
    </p>
  </div>
  <button class="btn btn-primary shadow m-3" @click="voted">
    <font-awesome-icon icon="square-poll-vertical" /> &nbsp;
    {{ $t("Voting.voteSliderPoints", { pts: points }) }}
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
