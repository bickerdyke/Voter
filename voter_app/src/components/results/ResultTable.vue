<template>
  <table class="table table-bordered border-primary">
    <thead>
      <tr class="text-center align-top">
        <th></th>
        <th v-for="(user, userId) in filteredUsers" :key="userId">
          <div class="my-1">
            <ProfilePicture
              :email="user.email"
              :emailHash="user.emailHash"
              :imageUrl="user.imgUrl"
              :size="70"
              fallback="wavatar"
            />
          </div>
          <div class="my-1">
            <span v-if="showIds">({{ userId }})</span> {{ user.name }}
          </div>
        </th>
        <th v-if="!userfilter" class="align-bottom">
          <div class="my-1">{{ $t("Showresult.Result") }}</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(voting, votingId) in currentSessionData.votings"
        :key="votingId"
        class="align-middle"
      >
        <td>
          <img
            :src="voting.imgUrl"
            class="float-start me-2 rounded-4"
            style="width: 60px; height: 60px; object-fit: cover"
            v-if="voting.imgUrl"
          />
          <div class="m-3 text-left">
            <p class="fw-bolder d-none d-sm-block">
              <span v-if="showIds">({{ votingId }})</span>
              {{ voting.title }}
            </p>
            <p class="d-none d-md-block" v-if="showDescriptions">
              {{ voting.description }}
            </p>
          </div>
        </td>
        <td
          v-for="(user, userId) in filteredUsers"
          :key="userId"
          class="text-center"
        >
          <template v-if="userfilter">
            <!-- Display for single-User view -->
            <div class="display-6">
              <component
                :is="displaycomponent"
                :votingId="votingId"
                :userId="userId"
                :userfilter="true"
                v-if="vote(votingId, userId)"
              />
              <router-link
                :to="getVotingRoute(votingId, userId)"
                class="btn btn-primary"
                v-else
                ><font-awesome-icon
                  icon="square-poll-vertical"
                  class="text-light"
                  size="2xl"
                />
                &nbsp; {{ $t("Showresult.vote") }}</router-link
              >
            </div>
          </template>
          <template v-else>
            <div class="display-6">
              <component
                :is="displaycomponent"
                :votingId="votingId"
                :userId="userId"
                :userfilter="false"
              />
            </div>
          </template>
        </td>
        <td class="display-6 fw-bold text-center" v-if="!userfilter">
          <VoteAverage :votingId="votingId" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
import { VOTINGMODES } from "@/config/misc";

import ProfilePicture from "@/components/ProfilePicture";
import VoteDisplay from "@/components/results/VoteDisplay";
import GradeDisplay from "@/components/results/GradeDisplay.vue";
import GradeUsDisplay from "@/components/results/GradeUsDisplay.vue";
import VoteAverage from "@/components/results/VoteAverage";

export default {
  name: "ResultTable",
  components: {
    ProfilePicture,
    VoteDisplay,
    GradeDisplay,
    GradeUsDisplay,
    VoteAverage,
  },
  data() {
    return {
      votingmodes: VOTINGMODES,
    };
  },
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
    filteredUsers() {
      return !this.userfilter
        ? this.currentSessionData.users
        : { [this.userfilter]: this.currentSessionData.users[this.userfilter] };
    },
    displaycomponent() {
      return this.votingmodes[this.currentSessionData.votingmode]
        .displaycomponent;
    },
  },
  props: {
    showIds: {
      type: Boolean,
      default: false,
    },
    showDescriptions: {
      type: Boolean,
      default: false,
    },
    userfilter: {
      type: String,
      default: null,
    },
  },
  methods: {
    voteLink(sId, vId, uId) {
      return `/vote/${sId}/${uId}/${vId}`;
    },
    vote(vId, uId) {
      return this.$store.getters.vote(vId, uId) != null;
    },
    getVotingRoute(vId, uId) {
      return this.$router.resolve({
        name: "vote",
        params: {
          sessionId: this.currentSessionId,
          userId: uId,
          votingId: vId,
        },
        query: {
          userfilter: this.userfilter ? true : false,
        },
      });
    },
  },
};
</script>

<style scoped></style>
