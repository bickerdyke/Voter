<template>
  <table class="table table-bordered">
    <thead>
      <tr class="text-center">
        <th>
          <span class="debuginfo">SessionId (Prop): {{ sessionId }}</span
          ><br />
          <span class="debuginfo">SessionId (Store): {{ sessionIdStore }}</span>
        </th>
        <th v-for="user in session.users" :key="user.id">
          <div class="my-1">
            <ProfilePicture
              :email="user.email"
              :imageUrl="user.imgUrl"
              fallback="wavatar"
            />
            <!-- size 50 hat Platz für ca. 12 Spalten. Default ist 80px. Das passt für 8 Spalten -->
          </div>
          <div class="my-1">
            <span class="debuginfo">({{ user.id }})</span> {{ user.name }}
          </div>
        </th>
        <th>
          <div class="my-1">Ergebnis</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="voting in session.votings" :key="voting.id">
        <td>
          <img
            :src="voting.imgUrl"
            class="float-start m-3 rounded-4"
            style="width: 70px; height: 70px; object-fit: cover"
            v-if="voting.imgUrl"
          />
          <div class="m-3">
            <p class="fw-bolder d-none d-sm-block">
              <span class="debuginfo">({{ voting.id }})</span>
              {{ voting.title }}
            </p>
            <p class="d-none d-md-block">{{ voting.description }}</p>
          </div>
        </td>
        <td v-for="user in session.users" :key="user.id">
          <div class="text-right align-bottom">
            <a :href="voteLink(sessionId, voting.id, user.id)"
              ><font-awesome-icon icon="circle-arrow-right" class="fa-2xs"
            /></a>
          </div>
          <div class="text-center align-middle display-6">
            <VoteDisplay
              :sessionId="sessionId"
              :votingId="voting.id"
              :userId="user.id"
            />
          </div>
        </td>
        <td class="text-center align-middle display-6 fw-bold">
          <VoteAverage :sessionId="sessionId" :votingId="voting.id" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
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
  props: {
    sessionId: String,
  },
  computed: {
    session() {
      return this.$store.getters.session;
    },
    sessionIdStore() {
      return this.$store.getters.sessionIdStoreCurrent;
    },
  },
  methods: {
    voteLink(sId, vId, uId) {
      return `/vote/${sId}/${uId}/${vId}`;
    },
  },
};
</script>

<style scoped></style>
