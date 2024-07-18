<template>
  <!-- Links -->
  <hr />

  <div class="row my-4 d-flex align-items-center">
    <div class="col-md-3" v-if="currentSessionData.imgUrl">
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
      class="btn btn-sm"
      @click="$root.copyToClipboard('invitationtext' + user.name)"
    >
      <font-awesome-icon icon="copy" />
    </button>
    <hr />
  </template>
</template>

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
