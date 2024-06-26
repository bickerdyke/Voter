<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline>
        <template v-slot:headline>{{ $t("Voter-Service") }}</template>
        <template v-slot:subtitle>{{ $t("Create Session Headline") }}</template>
      </SessionHeadline>

      <p>{{ $t("createSession.introduction") }}</p>

      <div class="alert alert-danger col-md-8 offset-2" v-if="error">
        {{ errorDisplayText }}
      </div>

      <Form
        @submit="createSession"
        v-slot="{ errors }"
        :validation-schema="sessionValidationSchema"
      >
        <div class="form-row">
          <div class="form-group col-md-8 offset-2">
            <label for="sesstiontitle"> <strong>SessionTitle</strong></label>
            <Field
              as="input"
              name="sesstiontitle"
              class="form-control"
              id="sesstiontitle"
            ></Field>

            <small class="text-danger" v-if="errors.sesstiontitle">{{
              errors.sesstiontitle
            }}</small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-8 offset-2">
            <label for="sesstionid"> <strong>SessionId</strong></label>
            <Field
              as="input"
              name="sesstionid"
              class="form-control"
              id="sesstionid"
              :value="session.id"
              disabled
            ></Field>

            <small class="text-danger" v-if="errors.sesstionid">{{
              errors.sesstionid
            }}</small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-8 offset-2">
            <label for="sessiondescription">
              <strong>Description</strong></label
            >
            <Field
              as="textarea"
              name="sessiondescription"
              class="form-control"
              id="sessiondescription"
            ></Field>

            <small class="text-danger" v-if="errors.sessiondescription">{{
              errors.sessiondescription
            }}</small>
          </div>
        </div>

        <div class="form-row mt-3">
          <div class="form-group col-md-8 offset-2">
            <div class="d-grid">
              <button class="btn btn-primary" :disabled="isLoading">
                <span v-if="!isLoading">{{ $t("Create Session Button") }}</span>
                <span v-else class="spinner-border spinner-border-sm"></span>
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";

import { Form, Field } from "vee-validate";
import * as yup from "yup";

export default {
  name: "HomePage",
  components: {
    TheHomeLayout,
    SessionHeadline,
    Form,
    Field,
  },
  data() {
    const sessionValidationSchema = yup.object().shape({
      sesstiontitle: yup
        .string()
        .required("Titel wird benötigt.")
        .trim()
        .max(50, "Der Titel darf maximal 70 Zeichen lang sein"),
      sesstionid: yup
        .string()
        .required("Session-ID ist eine Pflichtangabe")
        .trim()
        .min(5, "Minimallänge 5 Zeichen")
        .max(50, "Maximallänge 50 Zeichen"),
      sessiondescription: yup
        .string()
        .trim()
        .max(2500, "Maximallänge 2500 Zeichen"),

      /* password: yup
        .string()
        .required("Ein Passwort wird benötigt.")
        .min(6, "Das Passwort muss mindestens sechs Zeichen lang sein."),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwörter stimmen nicht überein."),*/
    });
    return {
      sessionValidationSchema,
      error: "",
      isLoading: false,
      sessionid: "foobar",
      session: {
        id: this.createGuid(),
        title: "Frische Session",
        subtitle: "Alles neu macht der Mai",
        description: "Frische Session ohne Votes in der Standardeinstellung",
        imgUrl: "https://picsum.photos/200",
        votings: [
          {
            id: 1,
            title: "Test-Subjekt 1",
            description: "Test #1",
            imgUrl: "https://placeholder.com/50",
            votes: {},
          },
        ],
        users: [
          {
            id: "0815",
            name: "Heinz",
            email: "heinz@foobar.invalid",
          },
        ],
      },
    };
  },
  computed: {
    errorDisplayText() {
      if (this.error) {
        if (this.error.includes("EMAIL_EXISTS")) {
          return "Die E-Mail Adresse existiert bereits.";
        }
        return this.error; //"Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es noch einmal.";
      }
      return "";
    },
  },
  methods: {
    createSession(values) {
      this.isLoading = true;
      this.error = "";
      console.log(values);
      this.$store
        .dispatch("dummy", {
          //email: values.email,
          //password: values.password,
        })
        .then(() => {
          this.isLoading = false;
          console.log("Received Fake OK");
          // console.log(this.$store.state);
          // Weiter zu Bestätigungsseite/Zugangslinks anzeigen this.changeComponent("login");
        })
        .catch((error) => {
          console.log("Received Fake ERROR");
          this.error = error.message;
          this.isLoading = false;
        });
      //this.$store.dispatch("storeSession", this.session);
    },
    createGuid() {
      return self.crypto.randomUUID();
    },
  },
};
</script>

<style scoped></style>
