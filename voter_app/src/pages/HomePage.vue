<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline>
        <template v-slot:headline>{{ $t("Voter-Service Title") }}</template>
        <template v-slot:subtitle>{{ $t("Voter-Service Tagline") }}</template>
      </SessionHeadline>

      <BetaVersionAlert />

      <!-- @todo: #46 Startseite schreiben -->
      <div class="row my-3">
        <div class="col-md-9 col-sm-6">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ea
            aliquam deserunt, dolore incidunt reiciendis modi doloremque labore
            error soluta! Animi tenetur itaque illum. Earum mollitia nostrum
            enim assumenda asperiores.
          </p>
        </div>

        <div class="col-md-3 col-sm-6">
          <img
            src="@/assets/ballot.jpg"
            class="border shadow rounded-3 w-100"
          />
        </div>
      </div>

      <div class="row">
        <router-link to="/create" class="btn btn-success"
          >Session anlegen</router-link
        >
      </div>

      <TestLinks />
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import BetaVersionAlert from "@/components/BetaVersionAlert";
import TestLinks from "@/components/TestLinks";

export default {
  name: "HomePage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    BetaVersionAlert,
    TestLinks,
  },
};
</script>

<style scoped></style>
