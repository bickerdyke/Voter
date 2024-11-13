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
        <img
          class="m-1"
          :src="imgUrl"
          :class="imgClass"
          :style="imgSizeStyle"
          v-if="imgUrl"
        />
        <b>{{ sessionData.title }}</b
        ><span class="d-none d-md-block" v-if="sessionData.subtitle"
          >&nbsp;&ndash;&nbsp;{{ sessionData.subtitle }}</span
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
      return this.size != 0
        ? `width: ${this.imgSize.toString()}px; height: ${this.imgSize.toString()}px; object-fit: cover;`
        : `width: 100%; object-fit: cover;`;
    },
    imgClass() {
      return this.size == 0
        ? "rounded-4 img-fluid d-block mx-auto d-fill"
        : "rounded-4 me-4";
    },
  },
};
</script>

<style scoped></style>
