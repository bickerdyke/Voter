<template>
  <!-- Links -->
  <hr />

  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
    <LinkCard :imgUrl="currentSessionData.imgUrl" :link="linklink"
      ><template #title>{{ currentSessionData.title }}</template>
      <template #default>{{
        $t("ShowLinks.TitleAccessUrls")
      }}</template></LinkCard
    >
    <LinkCard :imgUrl="currentSessionData.imgUrl" :link="resultlink"
      ><template #title>{{ currentSessionData.title }}</template>
      <template #default>{{ $t("ShowLinks.TitleResults") }}</template></LinkCard
    >
  </div>

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
</template>

<script>
/* global window */
import { mapGetters } from "vuex";
import LinkCard from "@/components/voting/showlinks/LinkCard";

export default {
  name: "ShowVotingLinksCards",
  components: {
    LinkCard,
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
