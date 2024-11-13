<template>
  <b>{{ sessionData.title }}</b
  ><template v-if="sessionData.subtitle"
    >&nbsp;&ndash;&nbsp;{{ sessionData.subtitle }}</template
  ><br />

  <div class="collapse" :id="htmlkey">
    <ul>
      <li v-for="(voting, key) in sessionData.votings" :key="key">
        {{ voting.title }} &dash; ({{
          voting.votes ? Object.keys(voting.votes).length : 0
        }}/{{ sessionData.users ? Object.keys(sessionData.users).length : 0 }}
        {{ $t("Search.Votes") }})
      </li>
    </ul>
  </div>

  <button
    type="button"
    class="btn btn-link"
    data-bs-toggle="collapse"
    :data-bs-target="'#' + htmlkey"
    aria-expanded="false"
    :aria-controls="'#' + htmlkey"
  >
    {{ $t("Search.MoreDetails") }}
  </button>
  <router-link
    class="btn btn-link"
    :to="{
      name: 'showlinks',
      params: { sessionId: this.sessionKey },
    }"
    >{{ $t("Search.Links") }} </router-link
  >&nbsp;&nbsp;<router-link
    class="btn btn-link"
    :to="{
      name: 'showresult',
      params: { sessionId: this.sessionKey },
    }"
    >{{ $t("Search.Results") }}</router-link
  >
</template>

<script>
export default {
  name: "SingleSession",
  props: {
    sessionKey: {
      type: String,
      required: true,
    },
    sessionData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    htmlkey() {
      return "clps-" + this.sessionKey;
    },
  },
};
</script>

<style scoped></style>
