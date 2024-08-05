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
            <h3>{{ $t("NotFoundPage.pageNotFound") }}</h3>
          </div>
        </div>
        <router-link :to="{ name: 'home' }" class="btn btn-secondary">{{
          $t("NotFoundPage.backToHome")
        }}</router-link>
      </div>

      <BetaVersionAlert v-if="!$root.isDevMode" />
      <TestLinks v-if="$root.isDevMode" />
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import TestLinks from "@/components/banner/TestLinks";
import BetaVersionAlert from "@/components/banner/BetaVersionAlert";

export default {
  name: "NotFoundPage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    TestLinks,
    BetaVersionAlert,
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
