<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline v-if="isLoaded" />

      <!-- Alert bei neuer Session -->
      <div
        class="alert alert-danger shadow my-4 d-print-none"
        v-if="$route.query.created && $root.isSessionAdmin"
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
            @click="$root.copyToClipboard('showlinksUrl')"
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

      <!-- Invalid access -->
      <AccessDeniedAlert v-if="!$root.isSessionAdmin" />

      <!-- Introduction -->
      <h4 class="d-print-none">{{ $t("ShowLinks.Heading") }}</h4>
      <p class="d-print-none">{{ $t("ShowLinks.Introduction") }}</p>

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
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="linkOutputStyleOptions"
              id="optionagenda"
              value="agenda"
              v-model="linkstyle"
            />
            <label class="form-check-label" for="optiontext">{{
              $t("ShowLinks.options.agenda")
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

      <div v-if="isLoaded && $root.isSessionAdmin">
        <component
          :is="showlinkcomponent"
          :linklink="linkPageUrl"
          :resultlink="resultPageUrl"
          :singlevotinglinks="singlevote"
        ></component>
      </div>
      <div class="mt-3 d-print-none">
        <button class="btn btn-light btn-sm shadow" @click="printpage">
          <font-awesome-icon icon="print" /> &nbsp;{{ $t("PrintPage") }}
        </button>
      </div>

      <!-- Footer -->
      <div class="d-grid mt-3 d-print-none">
        <router-link :to="resultPageRoute" class="btn btn-primary shadow">{{
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
import AccessDeniedAlert from "@/components/banner/AccessDeniedAlert";
import ShowVotingLinksCards from "@/components/voting/showlinks/ShowVotingLinksCards";
import ShowVotingLinksText from "@/components/voting/showlinks/ShowVotingLinksText";
import ShowVotingLinksAgenda from "@/components/voting/showlinks/ShowVotingLinksAgenda";

export default {
  name: "ShowVotingLinks",
  components: {
    TheHomeLayout,
    SessionHeadline,
    AccessDeniedAlert,
    ShowVotingLinksCards,
    ShowVotingLinksText,
    ShowVotingLinksAgenda,
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
    showlinkcomponent() {
      switch (this.linkstyle) {
        case "agenda":
          return ShowVotingLinksAgenda;
        case "text":
          return ShowVotingLinksText;
        case "cards":
        default:
          return ShowVotingLinksCards;
      }
    },
    linkPageUrl() {
      const route = this.$router.resolve({
        name: "showlinks",
        params: {
          sessionId: this.currentSessionId,
        },
        query: {
          t: this.currentSessionData.token,
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
