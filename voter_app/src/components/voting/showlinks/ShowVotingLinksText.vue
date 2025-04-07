<template>
  <!-- Links -->
  <hr />

  <div class="row my-4 d-flex align-items-center">
    <div class="col-md-3 col-print-3" v-if="currentSessionData.imgUrl">
      <img
        :src="currentSessionData.imgUrl"
        class="border shadow rounded-3 w-100"
        v-if="currentSessionData.imgUrl"
      />
    </div>

    <!-- Hidden pre-formatted text to copy&paste -->
    <pre v-show="false" id="mainlinks"
      >{{ currentSessionData.title }}

{{ $t("ShowLinks.TitleAccessUrls") }}: {{ linklink }}
{{ $t("ShowLinks.TitleResults") }}: {{ resultlink }}
    </pre>

    <div class="col-md-9 col-print-9 my-2">
      <h3 class="mb-4">{{ currentSessionData.title }}</h3>

      <p>
        <b>{{ $t("ShowLinks.TitleAccessUrls") }}: &nbsp;</b>
        <a :href="linklink">{{ linklink }}</a>
      </p>
      <p>
        <b>{{ $t("ShowLinks.TitleResults") }}: &nbsp;</b>
        <a :href="resultlink">{{ resultlink }}</a>
      </p>
      <button
        class="btn btn-sm d-print-none"
        @click="$root.copyToClipboard('mainlinks')"
      >
        <font-awesome-icon icon="copy" />&nbsp; {{ $t("ClipboardCopy") }}
      </button>
    </div>
  </div>

  <hr style="page-break-after: always" />

  <template v-for="(user, uId) in currentSessionData.users" :key="uId">
    <!-- Hidden pre-formatted text to copy&paste -->
    <pre :id="'invitationtext' + user.name" v-show="false">
{{ $t("ShowLinks.Text.salutation", { name: user.name }) }}
<template v-if="singlevotinglinks">
{{$t("ShowLinks.Text.introductionSinglelinks", {name: currentSessionData.title,})}}
<template v-for="(voting, vId) in currentSessionData.votings" :key="vId">
{{ currentSessionData.votings[vId].title }}:&nbsp;{{ getVotingLink(currentSessionId, vId, uId) }}</template>
</template>
<template v-else>
{{$t("ShowLinks.Text.introductionUservoting", {name: currentSessionData.title,})}}

{{ getVotingLink(currentSessionId, null, uId) }}
</template>
{{ $t("ShowLinks.Text.sendoff") }}
    </pre>
    <!-- End Hidden pre-formatted text to copy&paste -->

    <div>
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
      class="btn btn-sm d-print-none"
      @click="$root.copyToClipboard('invitationtext' + user.name)"
    >
      <font-awesome-icon icon="copy" />&nbsp; {{ $t("ClipboardCopy") }}
    </button>
    <hr style="page-break-after: always" />
  </template>
</template>

<script>
/* global window */
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
