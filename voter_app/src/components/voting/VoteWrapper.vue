<!-- Selects the voting component for voting page.
 New Voting Modes do not need to be included in Voting Page-->

<template>
  <component :is="ballotcomponent" @voted="votedWrapper" />
</template>

<script>
import { mapGetters } from "vuex";
import { VOTINGMODES } from "@/config/misc";
import SlideVoteSelect from "@/components/voting/SlideVoteSelect";
import SchoolDeVoteSelect from "@/components/voting/SchoolDeVoteSelect";
import SchoolDeNoPlusminusVoteSelect from "@/components/voting/SchoolDeNoPlusminusVoteSelect";
import SchoolUsVoteSelect from "@/components/voting/SchoolUsVoteSelect";
import ThumbsVoteSelect from "@/components/voting/ThumbsVoteSelect";

export default {
  name: "VoteWrapper",
  emits: {
    voted(payload) {
      return payload ? true : false;
    },
  },
  components: {
    SlideVoteSelect,
    SchoolDeVoteSelect,
    SchoolDeNoPlusminusVoteSelect,
    SchoolUsVoteSelect,
    ThumbsVoteSelect,
  },
  data() {
    return {
      votingmodes: VOTINGMODES,
    };
  },
  computed: {
    ballotcomponent() {
      return this.votingmodes[this.currentSessionData.votingmode]
        .ballotcomponent;
    },
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
  },
  methods: {
    votedWrapper(val) {
      console.log("Votetwrapper");
      this.$emit("voted", val);
    },
  },
};
</script>

<style scoped></style>
