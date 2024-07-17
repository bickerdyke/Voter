<template>
  <!-- Links -->
  <hr />

  <div class="row my-4 d-flex align-items-center">
    <div class="col-md-3">
      <img
        :src="currentSessionData.imgUrl"
        class="border shadow rounded-3 w-100"
        v-if="currentSessionData.imgUrl"
      />
    </div>

    <div class="col-md-9 my-2">
      <h3 class="mb-4">{{ currentSessionData.title }}</h3>

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

  <template v-for="(user, uId) in currentSessionData.users" :key="uId">
    <div :id="'invitationtext' + user.name">
      <p>{{ $t("ShowLinks.Text.salutation", { name: user.name }) }}<br /></p>

      <template v-if="singlevotinglinks">
        <p>
          {{
            $t("ShowLinks.Text.introductionSinglelinks", {
              name: currentSessionData.title,
            })
          }}<br />
        </p>
        <ul>
          <li v-for="(voting, vId) in currentSessionData.votings" :key="vId">
            <b v-if="currentSessionData.votings[vId].title"
              >{{ currentSessionData.votings[vId].title }}:&nbsp;</b
            ><a :href="getVotingLink(currentSessionId, vId, uId)">{{
              getVotingLink(currentSessionId, vId, uId)
            }}</a>
            <br />
          </li>
        </ul>
      </template>
      <template v-else>
        <p>
          {{
            $t("ShowLinks.Text.introductionUservoting", {
              name: currentSessionData.title,
            })
          }}
          <br />
        </p>
        <p>
          <a :href="getVotingLink(currentSessionId, null, uId)">{{
            getVotingLink(currentSessionId, null, uId)
          }}</a>
          <br />
        </p>
        <br />
      </template>
      <p>{{ $t("ShowLinks.Text.sendoff") }}</p>
    </div>

    <button
      class="btn btn-sm"
      @click="$root.copyToClipboard('invitationtext' + user.name, true)"
    >
      <font-awesome-icon icon="copy" />
    </button>
    <hr />
  </template>
  <!--

  <template v-if="singlevotinglinks">
    <template v-for="(user, uId) in currentSessionData.users" :key="uId">
      <hr style="page-break-after: always" />
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        <LinkCard
          v-for="(voting, vId) in currentSessionData.votings"
          :key="vId"
          :imgUrl="voting.imgUrl"
          :userId="uId"
          :link="getVotingLink(currentSessionId, vId, uId)"
        >
          <template #title
            ><p>{{ currentSessionData.title }}</p></template
          >
          <template #default
            ><p>{{ voting.title }}</p>
            <p>{{ $t("ShowLinks.Cards.CardFor") }} {{ user.name }}</p>
          </template>
        </LinkCard>
      </div>
    </template>
  </template>
  <template v-else>
    <hr style="page-break-after: always" />
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      <LinkCard
        :imgUrl="currentSessionData.imgUrl"
        :userId="uId"
        :link="getVotingLink(currentSessionId, null, uId)"
        v-for="(user, uId) in currentSessionData.users"
        :key="uId"
      >
        <template #title>{{ currentSessionData.title }}</template>
        <template #default
          ><p>{{ currentSessionData.subtitle }}</p>
          <p>{{ $t("ShowLinks.Cards.CardFor") }} {{ user.name }}</p>
        </template>
      </LinkCard>
    </div>
  </template>
--></template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShowVotingLinksText",
  components: {},
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
          query: {
            autoclose: true,
          },
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
