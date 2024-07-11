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
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ea
          aliquam deserunt, dolore incidunt reiciendis modi doloremque labore
          error soluta! Animi tenetur itaque illum. Earum mollitia nostrum enim
          assumenda asperiores.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis
          unde quidem, odit recusandae nostrum asperiores velit totam debitis
          voluptate? Eum corporis ut voluptatum, dolore esse consequatur
          eveniet? Officiis, perspiciatis?
        </p>
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
