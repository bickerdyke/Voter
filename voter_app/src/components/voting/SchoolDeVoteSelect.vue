<template>
  <div class="mx-5 my-2">
    <p>Schulnotenbuttons</p>
  </div>
  <button class="btn btn-primary m-3" @click="voted">
    <font-awesome-icon icon="square-poll-vertical" /> &nbsp;
    {{ $t("Voting.voteSliderPoints", { pts: points }) }}
  </button>
</template>

<script>
export default {
  name: "SchoolDeVoteSelect",
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
