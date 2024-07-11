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

        <!-- Create Session Block -->
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
        <CreateSession @sessionSubmit="createSession" v-if="!readyToShow" />

        <!-- Create votings -->

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

        <template v-for="voting in newVotings" :key="voting.id">
          <CreateVoting :votingRecord="voting"></CreateVoting>
        </template>
        <CreateVoting
          v-if="editingVoting"
          @votingSubmit="createVoting"
        ></CreateVoting>

        <!-- Create users -->

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
      <div class="alert alert-danger mt-3" v-if="error">
        {{ errorDisplayText }}
      </div>

      <div class="d-grid mt-3">
        <button
          class="btn btn-primary"
          :disabled="isLoading || !readyToShow"
          v-if="readyToShow"
          @click="saveSession"
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
import CreateVoting from "@/components/voting/CreateVoting";
import CreateUser from "@/components/voting/CreateUser";
import ImageAndDescription from "@/components/ImageAndDescription";

const sha256 = require("js-sha256");

export default {
  name: "CreateSesionPage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    CreateSession,
    CreateVoting,
    CreateUser,
    ImageAndDescription,
  },
  data() {
    return {
      error: "",
      isLoading: false,
      editingVoting: false,
      editingUser: false,
      showIds: false,
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
    createSession(values) {
      this.newSession.id = values.id;
      this.newSession.title = values.title;
      this.newSession.subtitle = values.subtitle;
      this.newSession.description = values.description;
      this.newSession.quorum = values.quorum;
      this.newSession.imgUrl = values.imgUrl;
    },
    addVotingButton() {
      this.editingVoting = true;
    },
    addUserButton() {
      this.editingUser = true;
    },
    createVoting(values) {
      const newVoting = {
        id: values.id,
        title: values.title,
        description: values.description,
        imgUrl: values.imgUrl,
      };
      this.newVotings.push(newVoting);
      this.editingVoting = false;
    },
    createUser(values) {
      const newUser = {
        id: values.id,
        name: values.name,
        email: values.email,
        imgUrl: values.imgUrl,
      };
      this.newUsers.push(newUser);
      this.editingUser = false;
    },
    saveSession() {
      this.isLoading = true;
      this.error = "";

      if (this.newUsers.length < 1 || this.newVotings.length < 1) {
        this.error = this.$t("CreateSession.errors.votings and users required");
        this.isLoading = false;
        return;
      }

      if (!this.newSession.votings) {
        this.newSession.votings = {};
      }

      if (!this.newSession.users) {
        this.newSession.users = {};
      }

      const payload = { ...this.newSession };

      this.newVotings.forEach((v) => {
        this.newSession.votings[v.id] = {
          title: v.title,
          description: v.description,
          imgUrl: v.imgUrl,
        };
      });
      this.newUsers.forEach((u) => {
        const emailHash = u.email ? sha256(u.email) : null;
        this.newSession.users[u.id] = {
          name: u.name,
          imgUrl: u.imgUrl,
          emailHash: emailHash,
        };
      });

      this.$store
        .dispatch("addSession", payload)
        .then(() => {
          this.isLoading = false;
          this.$router.push({
            name: "showlinks",
            params: {
              sessionId: this.newSession.id,
            },
            query: {
              created: true,
            },
          });
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
