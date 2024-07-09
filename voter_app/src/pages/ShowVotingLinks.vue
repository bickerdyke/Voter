<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline class="d-print-none" v-if="isLoaded" />

      <!-- Alert -->
      <div
        class="alert alert-danger shadow mb-5 d-print-none"
        v-if="$route.query.created"
      >
        <h3>{{ $t("Achtung") }}</h3>
        <p>{{ $t("ShowLinks.Warningtext.p1") }}</p>
        <p>
          <a :href="linkPageUrl" class="user-select-all" id="showlinksUrl">{{
            linkPageUrl
          }}</a
          >&nbsp;&nbsp;

          <!-- @todo: Use icon instead of text-button -->
          <button
            class="btn btn-light btn-sm"
            @click="$root.copyToClipboard('showlinksUrl')"
          >
            {{ $t("ClipboardCopy") }}
          </button>
        </p>
        <p>{{ $t("ShowLinks.Warningtext.p2") }}</p>
        <p>
          <button class="btn btn-light btn-sm" @click="printpage">
            {{ $t("PrintPage") }}
          </button>
        </p>
      </div>

      <!-- Links -->
      <!--
      @todo: Alternative Linkanzeige: Text für Emails/IM mit Clipboard-Copy
      @todo: Alternative Linkanzeige: Cheatsheet für Moderator zum Drucken mit Beschreibung und Links
      @todo: Alternative Linkanzeige: Karten mit Link zu vollständiger Voting-Liste
      @todo: Alternative Linkanzeige: Auto-Close ein-und ausschalten
      -->
      <ShowVotingLinksCards
        v-if="isLoaded"
        :linklink="linkPageUrl"
        :resultlink="resultPageUrl"
      ></ShowVotingLinksCards>

      <!-- Footer -->
      <div class="d-grid mt-3 d-print-none">
        <router-link :to="resultPageRoute" class="btn btn-primary">{{
          $t("ShowLinks.Go to Result Page")
        }}</router-link>
      </div>
    </div>
  </TheHomeLayout>
</template>

<script>
import { mapGetters } from "vuex";

import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import ShowVotingLinksCards from "@/components/voting/showlinks/ShowVotingLinksCards";

export default {
  name: "ShowVotingLinks",
  components: {
    TheHomeLayout,
    SessionHeadline,
    ShowVotingLinksCards,
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
    linkPageUrl() {
      const route = this.$router.resolve({
        name: "showlinks",
        params: {
          sessionId: this.currentSessionId,
        },
      });
      return new URL(route.href, window.location.origin).href;
    },
    resultPageRoute() {
      return this.$router.resolve({
        name: "showresult",
        params: {
          sessionId: this.currentSessionId,
        },
      });
    },
    resultPageUrl() {
      return new URL(this.resultPageRoute.href, window.location.origin).href;
    },
  },
  methods: {
    printpage() {
      window.print();
    },
  },
  watch: {
    isSessionLoaded: {
      handler() {
        this.isLoaded = this.isSessionLoaded;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
