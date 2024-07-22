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

      <div class="row my-4 d-flex align-items-center">
        <div class="col-md-9 col-sm-6 my-2">
          <h3>{{ $t("Homepage.CreateVoting.Headline") }}</h3>
          <p>{{ $t("Homepage.CreateVoting.p1") }}</p>
          <p>{{ $t("Homepage.CreateVoting.p2") }}</p>
          <p>{{ $t("Homepage.CreateVoting.p3") }}</p>
        </div>
      </div>

      <BetaVersionAlert />
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import BetaVersionAlert from "@/components/BetaVersionAlert";

export default {
  name: "LegalPage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    BetaVersionAlert,
  },
};
</script>

<style scoped></style>
