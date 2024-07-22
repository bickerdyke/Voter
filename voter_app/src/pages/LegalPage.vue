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

      <TheImprint />

      <div class="row my-4">
        <h3>{{ $t("Legal.Privacy.Headline") }}</h3>
        <p>{{ $t("Legal.Privacy.p1") }}</p>
        <p>{{ $t("Legal.Privacy.p2") }}</p>
        <p>{{ $t("Legal.Privacy.p3") }}</p>
      </div>

      <BetaVersionAlert />
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import BetaVersionAlert from "@/components/BetaVersionAlert";
import TheImprint from "@/components/basics/TheImprint";

export default {
  name: "LegalPage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    BetaVersionAlert,
    TheImprint,
  },
};
</script>

<style scoped></style>
