<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline>
        <template v-slot:headline>{{ $t("Voter-Service Title") }}</template>
        <template v-slot:subtitle>{{
          $t("CreateSession.Headline.Page Sub-Headline")
        }}</template>
      </SessionHeadline>

      <div class="col-md-8 offset-md-2">
        <p>
          {{ $t("CreateSession.introduction") }}
        </p>

        <div>
          <ImageAndDescription
            :description="newSession.description"
            :imgUrl="newSession.imgUrl"
            :imageRight="true"
            v-if="readyToShow"
          >
            <template #headline>{{
              newSession.title
            }}</template></ImageAndDescription
          >
        </div>

        <!-- Create Session Block -->
        <CreateSession @sessionSubmit="updateSession" v-if="!readyToShow" />

        <!-- Create votings and users -->

        <div v-if="readyToShow">
          <hr class="form-group mt-5" />

          <div class="d-flex flex-row">
            <h3 class="me-auto">{{ $t("CreateSession.Headline.Votings") }}</h3>
            <button
              class="btn btn-primary"
              @click="addVotingButton"
              :disabled="editingVoting"
            >
              {{ $t("Add") }}
            </button>
          </div>
        </div>

        <CreateVoting v-if="editingVoting"></CreateVoting>

        <div v-if="readyToShow">
          <hr class="form-group mt-5" />

          <div class="d-flex flex-row">
            <h3 class="me-auto">{{ $t("CreateSession.Headline.User") }}</h3>
            <button
              class="btn btn-primary"
              @click="addUserButton"
              :disabled="editingUser"
            >
              {{ $t("Add") }}
            </button>
          </div>
        </div>

        <template v-for="user in newUsers" :key="user.id">
          <CreateUser :userRecord="user"></CreateUser>
        </template>
        <CreateUser v-if="editingUser" @userSubmit="createUser"></CreateUser>
      </div>

      <!-- Footer -->
      <div class="alert alert-danger col-md-8 offset-md-2" v-if="error">
        {{ errorDisplayText }}
      </div>

      <div class="d-grid mt-3">
        <button
          class="btn btn-primary"
          :disabled="isLoading || !readyToShow"
          v-if="readyToShow"
        >
          <span v-if="!isLoading">{{
            $t("CreateSession.form.Create Session Button")
          }}</span>
          <span v-else class="spinner-border spinner-border-sm"></span>
        </button>
      </div>
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";
import CreateSession from "@/components/voting/CreateSession";
import CreateUser from "@/components/voting/CreateUser";
import ImageAndDescription from "@/components/ImageAndDescription";

export default {
  name: "CreateSesionPage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    CreateSession,
    CreateUser,
    ImageAndDescription,
  },
  data() {
    return {
      error: "",
      isLoading: false,
      editingVoting: false,
      editingUser: false,
      showIds: true,
      editIds: false,
      newSession: {},
      newVotings: [],
      newUsers: [],
    };
  },
  computed: {
    errorDisplayText() {
      if (this.error) {
        return this.error; //"Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es noch einmal.";
      }
      return "";
    },
    readyToShow() {
      return this.newSession && this.newSession.id;
    },
    readyToSave() {
      return (
        this.newSession &&
        this.newSession.id &&
        Object.keys(this.newSession.votings).length > 0 &&
        Object.keys(this.newSession.users).length > 0
      );
    },
  },
  methods: {
    updateSession(values) {
      this.newSession.id = values.id;
      this.newSession.title = values.title;
      this.newSession.subtitle = values.subtitle;
      this.newSession.description = values.description;
      this.newSession.quorum = values.quorum;
      this.newSession.imgUrl = values.imgUrl;
    },
    addVotingButton() {
      this.editingVoting = !this.editingVoting;
    },
    addUserButton() {
      this.editingUser = true;
    },
    createUser(values) {
      console.log(values);
      const newUser = {
        id: values.id,
        name: values.name,
        email: values.email,
        imgUrl: values.imgUrl,
      };
      console.log(newUser);
      this.newUsers.push(newUser);
      this.editingUser = false;
    },
    createSession() {
      this.isLoading = true;
      this.error = "";

      // make sure we are authenticated for DB access
      if (!this.isAuthenticated) {
        this.$store.dispatch("autoSignin");
      }

      const payload = {}; // use "newSession"
      this.$store
        .dispatch("addSession", payload)
        .then(() => {
          this.isLoading = false;
          // Weiter zu Bestätigungsseite/Zugangslinks anzeigen this.changeComponent("login");
        })
        .catch((error) => {
          this.error = error.message;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
