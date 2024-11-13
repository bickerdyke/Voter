<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#' + htmlkey"
        aria-expanded="false"
        :aria-controls="htmlkey"
      >
        <b>{{ sessionData.title }}</b
        ><template v-if="sessionData.subtitle"
          >&nbsp;&ndash;&nbsp;{{ sessionData.subtitle }}</template
        >
      </button>
    </h2>
    <div
      :id="htmlkey"
      class="accordion-collapse collapse"
      :data-bs-parent="'#' + parentId"
    >
      <div class="accordion-body">
        <ul>
          <li v-for="(voting, key) in sessionData.votings" :key="key">
            {{ voting.title }} &dash; ({{
              voting.votes ? Object.keys(voting.votes).length : 0
            }}/{{
              sessionData.users ? Object.keys(sessionData.users).length : 0
            }}
            {{ $t("Search.Votes") }})
          </li>
        </ul>

        <router-link
          class="btn btn-primary"
          :to="{
            name: 'showlinks',
            params: { sessionId: this.sessionKey },
          }"
          >{{ $t("Search.Links") }} </router-link
        >&nbsp;&nbsp;<router-link
          class="btn btn-primary"
          :to="{
            name: 'showresult',
            params: { sessionId: this.sessionKey },
          }"
          >{{ $t("Search.Results") }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleSessionAccordionElement",
  props: {
    sessionKey: {
      type: String,
      required: true,
    },
    sessionData: {
      type: Object,
      required: true,
    },
    parentId: {
      type: String,
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
