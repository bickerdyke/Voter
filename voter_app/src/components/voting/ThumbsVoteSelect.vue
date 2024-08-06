<template>
  <div class="mx-5 my-2 row">
    <div>
      <button
        type="button"
        class="btn btn-primary shadow btn-lg m-3"
        @click="voted('aye')"
      >
        <font-awesome-icon icon="square-poll-vertical" class="m-2" size="2xl" />
        <font-awesome-icon
          :icon="['far', 'thumbs-up']"
          class="m-2 text-success"
          size="2xl"
        />{{ $t("Voting.thumbs.aye") }}
      </button>
      <button
        type="button"
        class="btn btn-primary shadow btn-lg m-3"
        @click="voted('nay')"
      >
        <font-awesome-icon icon="square-poll-vertical" class="m-2" size="2xl" />
        <font-awesome-icon
          :icon="['far', 'thumbs-down']"
          class="m-2 text-warning"
          size="2xl"
        />{{ $t("Voting.thumbs.nay") }}
      </button>
      <button
        type="button"
        class="btn btn-primary shadow btn-lg m-3 align-middle"
        @click="voted('meh')"
      >
        <font-awesome-icon icon="square-poll-vertical" class="m-2" size="2xl" />
        <font-awesome-icon :icon="['far', 'face-meh']" class="m-2" size="2xl" />
        {{ $t("Voting.thumbs.meh") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThumbsVoteSelect",
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
