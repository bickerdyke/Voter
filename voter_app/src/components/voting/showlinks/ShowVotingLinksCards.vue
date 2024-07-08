<template>
  <!-- Links -->
  <h4>{{ $t("ShowLinks.Cards.Heading") }}</h4>
  <p>{{ $t("ShowLinks.Cards.Introduction") }}</p>
  <hr />

  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
    <LinkCard :imgUrl="currentSessionData.imgUrl" :link="linklink"
      ><template #title>{{ currentSessionData.title }}</template>
      <template #default>{{
        $t("ShowLinks.Cards.TitleAccessUrls")
      }}</template></LinkCard
    >
    <LinkCard :imgUrl="currentSessionData.imgUrl" :link="resultlink"
      ><template #title>{{ currentSessionData.title }}</template>
      <template #default>{{
        $t("ShowLinks.Cards.TitleResults")
      }}</template></LinkCard
    >
  </div>

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
        <template #title>{{ currentSessionData.title }}</template>
        <template #default
          >{{ voting.title }}<br />{{ $t("ShowLinks.Cards.CardFor") }}
          {{ user.name }}
        </template>
      </LinkCard>
    </div>
  </template>
</template>

<script>
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
      const route = this.$router.resolve({
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
      return new URL(route.href, window.location.origin).href;
    },
  },
};
</script>

<style scoped></style>
