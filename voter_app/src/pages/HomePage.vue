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
            <p>Abstimmung anlegen - Links verteilen - Abstimmen - Fertig!</p>
            <router-link :to="{ name: 'create' }" class="btn btn-success"
              >Abstimmung anlegen und loslegen</router-link
            >
          </div>
        </div>
      </div>

      <div class="row my-4">
        <div class="col-md-9 col-sm-6">
          <h3>Abstimmung anlegen</h3>
          <p>
            Alles beginnt mit dem Anlegen der Abstimmung. Für jede Abstimmung
            können mehrere einzelne Punkte angelegt werden, für die Bewertungen
            eingesammelt werden sollen.
          </p>
          <p>
            Hier kann zwischen verschiedenen Optionen entschieden werden, z.B.
            Schulnoten oder eine Skala von 1 bis 10 Punkten.
          </p>
          <p>Ebenfalls werden hier die gewünschten Teilnehmer hinzugefügt.</p>
        </div>

        <div class="col-md-3 col-sm-6">
          <img
            src="@/assets/screenshots/create.png"
            class="border shadow rounded-3 w-100"
          />
        </div>
      </div>

      <div class="row my-4">
        <div class="col-md-3 col-sm-6">
          <img
            src="@/assets/screenshots/links.png"
            class="border shadow rounded-3 w-100"
          />
        </div>
        <div class="col-md-9 col-sm-6">
          <h3>Links verteilen</h3>
          <p>
            Für jeden Teilnehmer werden personalisierte Links erstellt, über die
            an der Abstimmung teilgenommen werden kann.
          </p>
          <p>
            Sie können als QR-Codes ausgedruckt oder als Text versendet werden.
          </p>
        </div>
      </div>

      <div class="row my-4">
        <router-link to="/create" class="btn btn-success"
          >Session anlegen</router-link
        >
      </div>

      <BetaVersionAlert />
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
