<template>
  <div>
    <span :class="{ 'fw-bold': aye == max }"
      ><font-awesome-icon
        :icon="['far', 'thumbs-up']"
        class="text-success"
        :class="{ 'fw-bold': aye == max }"
        size="xl"
      />:&nbsp;{{ aye }}&nbsp;{{ $t("Voting.thumbs.aye") }}</span
    ><br />
    <span :class="{ 'fw-bold': nay == max }"
      ><font-awesome-icon
        :icon="['far', 'thumbs-down']"
        class="text-warning"
        size="xl"
      />:&nbsp;{{ nay }}&nbsp;{{ $t("Voting.thumbs.nay") }}</span
    ><br />
    <span :class="{ 'fw-bold': meh == max }"
      ><font-awesome-icon
        :icon="['far', 'face-meh']"
        :class="{ 'fw-bold': meh == max }"
        size="xl"
      />:&nbsp;{{ meh }}&nbsp;{{ $t("Voting.thumbs.meh") }}</span
    >

    <!-- max icon: 
    <font-awesome-icon
      :icon="['far', 'thumbs-up']"
      class="text-success"
      size="xl"
      v-if="aye == max"
    />
    <font-awesome-icon
      :icon="['far', 'thumbs-down']"
      class="text-warning"
      size="xl"
      v-if="nay == max"
    />
    <font-awesome-icon
      :icon="['far', 'face-meh']"
      size="xl"
      v-if="meh == max"
    />
  --></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ThumbsResult",
  props: {
    votingId: String,
  },
  computed: {
    votes() {
      return this.$store.getters.votes(this.votingId);
    },
    aye() {
      return this.count("aye");
    },
    nay() {
      return this.count("nay");
    },
    meh() {
      return this.count("meh");
    },
    max() {
      return [this.aye, this.nay, this.meh].sort(function (a, b) {
        return b - a;
      })[0];
    },
    ...mapGetters(["currentSessionId", "currentSessionData"]),
  },
  methods: {
    count(token) {
      return this.votes.filter((el) => el == token).length;
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
</style>
