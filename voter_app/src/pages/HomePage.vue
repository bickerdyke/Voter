<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <div class="row">
        <SessionHeadline>
          <template v-slot:headline>{{ $t("Voter-Service Title") }}</template>
          <template v-slot:subtitle>{{ $t("Voter-Service Tagline") }}</template>
        </SessionHeadline>
      </div>

      <div class="row">
        <div class="hero py-5 mt-2 mb-5">
          <div class="col-5 offset-1">
            <h3>{{ $t("Homepage.HeroBanner.Headline") }}</h3>
            <p>{{ $t("Homepage.HeroBanner.p1") }}</p>
            <p>{{ $t("Homepage.HeroBanner.p2") }}</p>
            <router-link :to="{ name: 'create' }" class="btn btn-secondary">{{
              $t("Homepage.HeroBanner.button")
            }}</router-link>
          </div>
        </div>
      </div>

      <div class="row my-4 d-flex align-items-center">
        <div class="col-md-9 col-sm-6 my-2">
          <h3>{{ $t("Homepage.CreateVoting.Headline") }}</h3>
          <p>{{ $t("Homepage.CreateVoting.p1") }}</p>
          <p>{{ $t("Homepage.CreateVoting.p2") }}</p>
          <p>{{ $t("Homepage.CreateVoting.p3") }}</p>
        </div>

        <div class="col-md-3 col-sm-6">
          <img
            src="@/assets/screenshots/create.png"
            class="border shadow rounded-3 w-100"
          />
        </div>
      </div>

      <div class="row my-4 d-flex align-items-center">
        <div class="col-md-3 col-sm-6">
          <img
            src="@/assets/screenshots/links.png"
            class="border shadow rounded-3 w-100"
          />
        </div>
        <div class="col-md-9 col-sm-6 my-4">
          <h3>{{ $t("Homepage.VotingLinks.Headline") }}</h3>
          <p>{{ $t("Homepage.VotingLinks.p1") }}</p>
          <p>{{ $t("Homepage.VotingLinks.p2") }}</p>
        </div>
      </div>

      <div class="row my-4 d-flex align-items-center">
        <div class="col-md-9 col-sm-6 my-4">
          <h3>{{ $t("Homepage.Vote.Headline") }}</h3>
          <p>{{ $t("Homepage.Vote.p1") }}</p>
        </div>

        <div class="col-md-3 col-sm-6">
          <img
            src="@/assets/screenshots/vote.png"
            class="border shadow rounded-3 w-100"
          />
        </div>
      </div>

      <div class="row my-4 d-flex align-items-center">
        <div class="col-md-3 col-sm-6">
          <img
            src="@/assets/screenshots/result.png"
            class="border shadow rounded-3 w-100"
          />
        </div>
        <div class="col-md-9 col-sm-6 my-4">
          <h3>{{ $t("Homepage.ShowResult.Headline") }}</h3>
          <p>{{ $t("Homepage.ShowResult.p1") }}</p>
          <p>{{ $t("Homepage.ShowResult.p2") }}</p>
          <p>
            <router-link to="/create" class="btn btn-secondary">{{
              $t("Homepage.ShowResult.button")
            }}</router-link>
          </p>
        </div>
      </div>

      <TestLinks v-if="$root.isDevMode" />
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import TestLinks from "@/components/TestLinks";

export default {
  name: "HomePage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    TestLinks,
  },
};
</script>

<style scoped>
.hero {
  width: 100vw;
  min-height: 30vh;
  height: auto;
  background-image: url("@/assets/ballot_lg.jpg");
  background-position: center;
  background-size: cover;
}
</style>
