<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <div class="row">
        <SessionHeadline>
          <template v-slot:headline>{{ $t("Voter-Service Title") }}</template>
          <template v-slot:subtitle>{{ $t("Pages.Legal") }}</template>
        </SessionHeadline>
      </div>

      <BetaVersionAlert v-if="$root.isTestMode" />

      <TheImprint />

      <div class="row my-4">
        <h3>{{ $t("Legal.Privacy.Headline") }}</h3>
        <p>{{ $t("Legal.Privacy.p1") }}</p>
        <p>{{ $t("Legal.Privacy.p2") }}</p>

        <h4>{{ $t("Legal.Privacy.UserGenerated.Name") }}</h4>
        <p>{{ $t("Legal.Privacy.UserGenerated.p1") }}</p>
        <p>{{ $t("Legal.Privacy.UserGenerated.p2") }}</p>
        <p>{{ $t("Legal.Privacy.UserGenerated.p3") }}</p>

        <h4>{{ $t("Legal.Privacy.ExternalServices") }}</h4>
        <h5>{{ $t("Legal.Privacy.Gravatar.Name") }}</h5>
        <p>{{ $t("Legal.Privacy.Gravatar.p1") }}</p>
        <p>
          {{ $t("Legal.MoreInformation") }}&nbsp;<a
            href="https://www.gravatar.com/"
            target="blank"
            >https://www.gravatar.com/</a
          >
        </p>
      </div>

      <HobbyAlert />
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import BetaVersionAlert from "@/components/BetaVersionAlert";
import HobbyAlert from "@/components/basics/HobbyAlert";
import TheImprint from "@/components/basics/TheImprint";

export default {
  name: "LegalPage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    BetaVersionAlert,
    HobbyAlert,
    TheImprint,
  },
};
</script>

<style scoped></style>
