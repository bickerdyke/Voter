<template>
  <!-- Links -->
  <hr />

  <div class="row my-4 d-flex align-items-center">
    <div class="col-md-3 col-print-3" v-if="currentSessionData.imgUrl">
      <img
        :src="currentSessionData.imgUrl"
        class="border shadow rounded-3 my-3 w-100"
        v-if="currentSessionData.imgUrl"
      />
      <qrcode-vue
        :value="linklink"
        level="M"
        render-as="svg"
        class="my-3 w-100"
      />
    </div>

    <div class="col-md-9 col-print-9 my-2">
      <p>{{ currentSessionData.description }}</p>
      <p>
        <b>{{ $t("ShowLinks.TitleAccessUrls") }}: &nbsp;</b>
        <a :href="linklink">{{ linklink }}</a>
      </p>
      <p>
        <b>{{ $t("ShowLinks.TitleResults") }}: &nbsp;</b>
        <a :href="resultlink">{{ resultlink }}</a>
      </p>
    </div>
  </div>

  <hr />

  <div
    class="row my-4 d-flex align-items-center"
    v-for="(voting, vId) in currentSessionData.votings"
    :key="vId"
  >
    <div class="col-md-3 col-print-3" v-if="voting.imgUrl">
      <img
        :src="voting.imgUrl"
        class="border shadow rounded-3 my-3 w-100"
        v-if="voting.imgUrl"
      />
    </div>

    <div class="col-md-9 col-print-9 my-2">
      <h3>{{ voting.title }}</h3>
      <p>{{ voting.description }}</p>
    </div>
  </div>

  <hr />
</template>

<script>
/* global window */
import { mapGetters } from "vuex";
import QrcodeVue from "qrcode.vue";

export default {
  name: "ShowVotingLinksAgenda",
  components: {
    QrcodeVue,
  },
  props: {
    linklink: {
      type: String,
      required: true,
    },
    resultlink: {
      type: String,
      required: true,
    },
    singlevotinglinks: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
  },
  methods: {
    getVotingLink(sId, vId, uId) {
      let route;
      if (vId) {
        route = this.$router.resolve({
          name: "vote",
          params: {
            sessionId: sId,
            userId: uId,
            votingId: vId,
          },
          /*query: {
            ac: 1,
          },*/
        });
      } else {
        route = this.$router.resolve({
          name: "uservoting",
          params: {
            sessionId: sId,
            userId: uId,
          },
        });
      }
      return new URL(route.href, window.location.origin).href;
    },
  },
};
</script>

<style scoped></style>
