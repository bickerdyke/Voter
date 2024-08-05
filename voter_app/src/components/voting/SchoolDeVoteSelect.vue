<template>
  <div class="mx-5 my-2 row">
    <div class="buttongroup">
      <button
        type="button"
        class="btn btn-primary m-3 shadow"
        @click="select(1)"
        :class="{ active: selection == 1 }"
      >
        {{ $t("Voting.grades.1") }}
      </button>
      <button
        type="button"
        class="btn btn-primary m-3 shadow"
        @click="select(2)"
        :class="{ active: selection == 2 }"
      >
        {{ $t("Voting.grades.2") }}
      </button>
      <button
        type="button"
        class="btn btn-primary m-3 shadow"
        @click="select(3)"
        :class="{ active: selection == 3 }"
      >
        {{ $t("Voting.grades.3") }}
      </button>
      <button
        type="button"
        class="btn btn-primary m-3 shadow"
        @click="select(4)"
        :class="{ active: selection == 4 }"
      >
        {{ $t("Voting.grades.4") }}
      </button>
      <button
        type="button"
        class="btn btn-primary m-3 shadow"
        @click="select(5)"
        :class="{ active: selection == 5 }"
      >
        {{ $t("Voting.grades.5") }}
      </button>
      <button
        type="button"
        class="btn btn-warning m-3 shadow"
        @click="select(6)"
        :class="{ active: selection == 6 }"
      >
        {{ $t("Voting.grades.6") }}
      </button>
    </div>
  </div>
  <div class="mx-5 my-2 row" v-if="selection == 1">
    <div>
      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('0.7')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 1+
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('1')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 1
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('1.3')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 1-
      </button>
    </div>
  </div>

  <div class="mx-5 my-2 row" v-if="selection == 2">
    <div>
      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('1.5')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 1&#8209;2
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('1.7')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 2+
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('2')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 2
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('2.3')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 2-
      </button>
    </div>
  </div>

  <div class="mx-5 my-2 row" v-if="selection == 3">
    <div>
      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('2.5')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 2&#8209;3
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('2.7')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 3+
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('3')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 3
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('3.3')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 3-
      </button>
    </div>
  </div>

  <div class="mx-5 my-2 row" v-if="selection == 4">
    <div>
      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('3.5')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 3&#8209;4
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('3.7')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 4+
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('4')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 4
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('4.3')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 4-
      </button>
    </div>
  </div>

  <div class="mx-5 my-2 row" v-if="selection == 5">
    <div>
      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('4.5')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 4&#8209;5
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('4.7')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 5+
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('5')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 5
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('5.3')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 5-
      </button>
    </div>
  </div>

  <div class="mx-5 my-2 row" v-if="selection == 6">
    <div>
      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('5.5')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 5&#8209;6
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        v-if="plusminus"
        @click="voted('5.7')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 6+
      </button>

      <button
        type="button"
        class="btn btn-primary shadow m-3"
        @click="voted('6')"
      >
        <font-awesome-icon icon="square-poll-vertical" /> 6
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SchoolDeVoteSelect",
  emits: {
    voted(payload) {
      return payload ? true : false;
    },
  },
  components: {},
  data() {
    return {
      selection: 0,
    };
  },
  props: {
    plusminus: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  methods: {
    voted(val) {
      this.$emit("voted", val);
    },
    select(val) {
      this.selection = val;
    },
  },
};
</script>

<style scoped>
button.active {
  background-color: var(--bs-success);
}
</style>
