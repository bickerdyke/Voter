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
            <h3>Einfache Gruppenbefragungen</h3>
            <p>
              Mit Easy-Vote schnell die Meinung einer Gruppe zu verschiedenen
              Punkten einholen - online oder vor Ort.
            </p>
            <p>Abstimmung anlegen - Links verteilen - abstimmen - Fertig!</p>
            <router-link to="{name: 'create'}" class="btn btn-success"
              >Gleich loslegen</router-link
            >
          </div>
        </div>
      </div>

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
