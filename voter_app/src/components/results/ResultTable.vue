<template>
  <table class="table table-bordered">
    <thead>
      <tr class="text-center">
        <th></th>
        <th v-for="(user, userId) in currentSessionData.users" :key="userId">
          <div class="my-1">
            <ProfilePicture
              :email="user.email"
              :imageUrl="user.imgUrl"
              fallback="wavatar"
            />
          </div>
          <div class="my-1">
            <span class="debuginfo">({{ userId }})</span> {{ user.name }}
          </div>
        </th>
        <th>
          <div class="my-1">Ergebnis</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(voting, votingId) in currentSessionData.votings"
        :key="votingId"
      >
        <td>
          <img
            :src="voting.imgUrl"
            class="float-start m-3 rounded-4"
            style="width: 70px; height: 70px; object-fit: cover"
            v-if="voting.imgUrl"
          />
          <div class="m-3">
            <p class="fw-bolder d-none d-sm-block">
              <span class="debuginfo">({{ votingId }})</span>
              {{ voting.title }}
            </p>
            <p class="d-none d-md-block">{{ voting.description }}</p>
          </div>
        </td>
        <td v-for="(user, userId) in currentSessionData.users" :key="userId">
          <div class="text-right align-bottom">
            <router-link :to="voteLink(currentSessionId, votingId, userId)"
              ><font-awesome-icon icon="circle-arrow-right" class="fa-2xs"
            /></router-link>
          </div>
          <div class="text-center align-middle display-6">
            <VoteDisplay :votingId="votingId" :userId="userId" />
          </div>
        </td>
        <td class="text-center align-middle display-6 fw-bold">
          <VoteAverage :votingId="votingId" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

import ProfilePicture from "@/components/ProfilePicture";
import VoteDisplay from "@/components/results/VoteDisplay";
import VoteAverage from "@/components/results/VoteAverage";

export default {
  name: "ResultTable",
  components: {
    ProfilePicture,
    VoteDisplay,
    VoteAverage,
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
    voteLink(sId, vId, uId) {
      return `/vote/${sId}/${uId}/${vId}`;
    },
  },
};
</script>

<style scoped></style>
