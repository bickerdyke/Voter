<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline v-if="isLoaded" />

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

          <button
            class="btn btn-sm"
            @click="$root.copyToClipboard('showlinksUrl', false)"
          >
            <font-awesome-icon icon="copy" /></button
          ><!-- &nbsp;{{ $t("ClipboardCopy") }} -->
        </p>
        <p>{{ $t("ShowLinks.Warningtext.p2") }}</p>
        <p>
          <button class="btn btn-light btn-sm" @click="printpage">
            <font-awesome-icon icon="print" /> &nbsp;{{ $t("PrintPage") }}
          </button>
        </p>
      </div>

      <h4>{{ $t("ShowLinks.Heading") }}</h4>
      <p>{{ $t("ShowLinks.Introduction") }}</p>

      <!-- Optionen -->
      <div class="d-print-none">
        <form>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="linkOutputStyleOptions"
              id="optioncards"
              value="cards"
              v-model="linkstyle"
            />
            <label class="form-check-label" for="optioncards">{{
              $t("ShowLinks.options.cards")
            }}</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="linkOutputStyleOptions"
              id="optiontext"
              value="text"
              v-model="linkstyle"
            />
            <label class="form-check-label" for="optiontext">{{
              $t("ShowLinks.options.text")
            }}</label>
          </div>
          <div class="form-check form-switch form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="optionsinglevote"
              v-model="singlevote"
            />
            <label class="form-check-label" for="optionsinglevote">{{
              $t("ShowLinks.options.singlevotes")
            }}</label>
          </div>
        </form>
      </div>

      <!-- Links -->
      <!--
      @todo: #39 Alternative Linkanzeige: Cheatsheet für Moderator zum Drucken mit Beschreibung und Links
      -->

      <div v-if="isLoaded">
        <ShowVotingLinksCards
          v-if="linkstyle === 'cards'"
          :linklink="linkPageUrl"
          :resultlink="resultPageUrl"
          :singlevotinglinks="singlevote"
        ></ShowVotingLinksCards>
        <ShowVotingLinksText
          v-else-if="linkstyle === 'text'"
          :linklink="linkPageUrl"
          :resultlink="resultPageUrl"
          :singlevotinglinks="singlevote"
        ></ShowVotingLinksText>
      </div>

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
import ShowVotingLinksText from "@/components/voting/showlinks/ShowVotingLinksText";

export default {
  name: "ShowVotingLinks",
  components: {
    TheHomeLayout,
    SessionHeadline,
    ShowVotingLinksCards,
    ShowVotingLinksText,
  },
  data() {
    return {
      isLoaded: false,
      linkstyle: "cards",
      singlevote: true,
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
