<template>
  <div class="accordion-item border-1 border-primary bg-light">
    <h2 class="accordion-header">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#' + htmlkey"
        aria-expanded="false"
        :aria-controls="htmlkey"
      >
        <img :src="imgUrl" :style="imgSizeStyle" v-if="imgUrl" />
        <div v-else :style="imgSizeStyle">&nbsp;</div>

        <div
          class="progress mx-3"
          style="width: 60px"
          role="progressbar"
          aria-label="Success striped example"
          :aria-valuenow="filledOutPct"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="progress-bar progress-bar-striped bg-success"
            :style="{ width: filledOutPct + '%' }"
          ></div>
        </div>

        <div>
          <b>{{ sessionData.title }}</b>
        </div>
        <div class="d-none d-md-block" v-if="sessionData.subtitle">
          &nbsp;&ndash;&nbsp;{{ sessionData.subtitle }}
        </div>
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
    imgSize: {
      // 0 for automatic size with d-flex
      type: Number,
      default: 50,
    },
  },
  computed: {
    htmlkey() {
      return "clps-" + this.sessionKey;
    },
    imgUrl() {
      return this.sessionData.imgUrl;
    },
    imgSizeStyle() {
      return this.imgSize != 0
        ? `width: ${this.imgSize.toString()}px; height: ${this.imgSize.toString()}px; object-fit: cover;`
        : `width: 100%; object-fit: cover;`;
    },
    filledOutPct() {
      var countVotes = 0;
      for (const [key, value] of Object.entries(this.sessionData.votings)) {
        if (value.votes && Object.keys(value.votes).length > 0) {
          countVotes += Object.keys(value.votes).length;
        }
      }
      const countUsers =
        Object.keys(this.sessionData.votings).length *
        Object.keys(this.sessionData.users).length; //Object.keys(this.currentSessionData.users).length;
      console.log(countVotes + " / " + countUsers);
      const turnout = (countVotes / countUsers) * 100;
      console.log(turnout + "%");
      return turnout;
    },
  },
};
</script>

<style scoped></style>
