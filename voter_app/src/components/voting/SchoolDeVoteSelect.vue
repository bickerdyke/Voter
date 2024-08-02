<template>
  <div class="mx-5 my-2 row">
    <div class="col-md-6 offset-md-3">
      <table class="table table-bordered border-primary">
        <tbody>
          <tr>
            <th class="align-middle text-end">{{ $t("Voting.grades.1") }}</th>
            <td>&nbsp;</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('0.7')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 1+
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="voted('1')">
                <font-awesome-icon icon="square-poll-vertical" /> 1
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('1.3')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 1-
              </button>
            </td>
          </tr>
          <tr>
            <th class="align-middle text-end">{{ $t("Voting.grades.2") }}</th>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('1.5')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 1&#8209;2
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('1.7')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 2+
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="voted('2')">
                <font-awesome-icon icon="square-poll-vertical" /> 2
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('2.3')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 2-
              </button>
            </td>
          </tr>
          <tr>
            <th class="align-middle text-end">
              {{ $t("Voting.grades.3") }}
            </th>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('2.5')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 2&#8209;3
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('2.7')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 3+
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="voted('3')">
                <font-awesome-icon icon="square-poll-vertical" /> 3
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('3.3')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 3-
              </button>
            </td>
          </tr>
          <tr>
            <th class="align-middle text-end">
              {{ $t("Voting.grades.4") }}
            </th>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('3.5')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 3&#8209;4
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('3.7')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 4+
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="voted('4')">
                <font-awesome-icon icon="square-poll-vertical" /> 4
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('4.3')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 4-
              </button>
            </td>
          </tr>
          <tr>
            <th class="align-middle text-end">
              {{ $t("Voting.grades.5") }}
            </th>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('4.5')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 4&#8209;5
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('4.7')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 5+
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="voted('5')">
                <font-awesome-icon icon="square-poll-vertical" /> 5
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('5.3')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 5-
              </button>
            </td>
          </tr>
          <tr>
            <th class="align-middle text-end">
              {{ $t("Voting.grades.6") }}
            </th>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('5.5')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 5&#8209;6
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="voted('5.7')"
              >
                <font-awesome-icon icon="square-poll-vertical" /> 6+
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-primary" @click="voted('6')">
                <font-awesome-icon icon="square-poll-vertical" /> 6
              </button>
            </td>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
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
  props: {},
  computed: {},
  methods: {
    voted(val) {
      this.$emit("voted", val);
    },
  },
};
</script>

<style scoped>
td {
  text-align: center;
}
td button {
  width: 100%;
  height: 100%;
}
</style>
