<template>
  <div>
    <div class="col-md-8 offset-md-2">
      <ImageAndDescription
        :description="$t('CreateSession.introduction')"
        :imgUrl="session.imgUrl ? session.imgUrl : placeholderImage"
        :imageRight="true"
      ></ImageAndDescription>
    </div>

    <div class="alert alert-danger col-md-8 offset-md-2" v-if="error">
      {{ errorDisplayText }}
    </div>

    <Form
      @submit="createSession"
      v-slot="{ errors }"
      :validation-schema="sessionValidationSchema"
    >
      <div class="col-md-8 offset-md-2">
        <div class="form-row">
          <div class="form-group">
            <label for="sessiontitle"> <strong>SessionTitle</strong></label>
            <Field
              as="input"
              name="sessiontitle"
              class="form-control"
              id="sessiontitle"
            ></Field>

            <small class="text-danger" v-if="errors.sessiontitle">{{
              errors.sessiontitle
            }}</small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="sessionsubtitle">
              <strong>SessionSubtitle</strong></label
            >
            <Field
              as="input"
              name="sessionsubtitle"
              class="form-control"
              id="sessionsubtitle"
            ></Field>

            <small class="text-danger" v-if="errors.sessionsubtitle">{{
              errors.sessionsubtitle
            }}</small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="sessiondescription">
              <strong>Description</strong></label
            >
            <Field
              as="textarea"
              name="sessiondescription"
              class="form-control"
              id="sessiondescription"
              rows="3"
            ></Field>

            <small class="text-danger" v-if="errors.sessiondescription">{{
              errors.sessiondescription
            }}</small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="sessionquorum"> <strong>Quorum</strong></label>
            <div class="form-row d-flex">
              <Field
                as="input"
                type="range"
                name="sessionquorum"
                class="form-range"
                id="sessionquorum"
                min="0"
                max="100"
                :value="sessionQuorum"
                v-model="sessionQuorum"
              ></Field>
              <div class="d-flex ms-3">{{ sessionQuorum }}%</div>
            </div>

            <small class="text-danger" v-if="errors.sessionquorum">{{
              errors.sessionquorum
            }}</small>

            <small
              class="form-row"
              v-t="'CreateSession.form.hint.quorum'"
            ></small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="sessionimgurl"> <strong>ImageUrl</strong></label>
            <Field
              as="input"
              name="sessionimgurl"
              class="form-control"
              id="sessionimgurl"
              v-model="sessionImage"
            ></Field>

            <small class="text-danger" v-if="errors.sessionimgurl">{{
              errors.sessionimgurl
            }}</small>
          </div>
        </div>

        <div class="form-row" v-show="showIds">
          <div class="form-group">
            <label for="sessionid"> <strong>SessionId</strong></label>
            <Field
              as="input"
              name="sessionid"
              class="form-control"
              id="sessionid"
              :value="sessionid"
              :disabled="!editIds"
            ></Field>

            <small class="text-danger" v-if="errors.sessionid">{{
              errors.sessionid
            }}</small>
          </div>
        </div>
      </div>

      <!-- Votings -->
      <hr class="form-group mt-5 col-md-8 offset-md-2" />

      <div class="d-flex flex-row col-md-8 offset-md-2">
        <h3 class="me-auto">{{ $t("CreateSession.Headline.Votings") }}</h3>
        <button class="btn btn-primary">{{ $t("Add") }}</button>
      </div>

      <div class="row py-3">
        <div
          class="offset-md-2 col-md-2 bg-light p-3 col-4 offset-4 text-center"
        >
          <img
            class="rounded-4 img-fluid d-block mx-auto d-fill"
            style="width: 100%; max-width: 100%; object-fit: cover"
            src="https://placeholder.com/300"
          />
          <button class="btn btn-danger mt-3">
            {{ $t("Remove") }}
          </button>
        </div>
        <div class="col-md-6 bg-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          dolore nulla reiciendis ex quos debitis consectetur facilis fuga
          exercitationem asperiores consequatur corporis quisquam, ducimus
          molestiae fugit saepe doloremque sint soluta.
        </div>
      </div>

      <!-- User -->

      <hr class="form-group mt-5 col-md-8 offset-md-2" />

      <div class="d-flex flex-row col-md-8 offset-md-2">
        <h3 class="me-auto">{{ $t("CreateSession.Headline.User") }}</h3>
        <button class="btn btn-primary">{{ $t("Add") }}</button>
      </div>

      <div class="row py-3">
        <div
          class="offset-md-2 col-md-2 bg-light p-3 col-4 offset-4 text-center"
        >
          <img
            class="rounded-4 img-fluid d-block mx-auto d-fill"
            style="width: 100%; max-width: 100%; object-fit: cover"
            src="https://placeholder.com/300"
          />
          <button class="btn btn-danger mt-3">
            {{ $t("Remove") }}
          </button>
        </div>
        <div class="col-md-6 bg-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          dolore nulla reiciendis ex quos debitis consectetur facilis fuga
          exercitationem asperiores consequatur corporis quisquam, ducimus
          molestiae fugit saepe doloremque sint soluta.
        </div>
      </div>

      <!-- Save-Button -->
      <div class="form-row mt-3">
        <div class="form-group">
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
</template>

<script>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import ImageAndDescription from "@/components/ImageAndDescription";

export default {
  name: "CreateSession",
  components: {
    Form,
    Field,
    ImageAndDescription,
  },
  data() {
    const sessionValidationSchema = yup.object().shape({
      sessiontitle: yup
        .string()
        .required("Titel wird benötigt.")
        .trim()
        .max(50, "Der Titel darf maximal 50 Zeichen lang sein"),
      sessionsubtitle: yup
        .string()
        .trim()
        .max(150, "Die Titelbeschreibung darf maximal 150 Zeichen lang sein"),
      sessiondescription: yup
        .string()
        .trim()
        .max(2500, "Maximallänge 2500 Zeichen"),
      sessionimgurl: yup.string().trim().url("Keine gültige Url"),
      sessionquorum: yup.number().truncate().min(0).max(100),
      sessionid: yup
        .string()
        .required("Session-ID ist eine Pflichtangabe")
        .trim()
        .min(5, "Minimallänge 5 Zeichen")
        .max(50, "Maximallänge 50 Zeichen"),

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
      placeholderImage: "https://placeholder.com/300",
      sessionQuorum: 50,
      sessionImage: "",
      sessionid: this.createGuid(),
      session: {
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
  props: {
    showIds: {
      type: Boolean,
      default: true,
    },
    editIds: {
      type: Boolean,
      default: false,
    },
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

      // make sure we are authenticated for DB access
      if (!this.isAuthenticated) {
        this.$store.dispatch("autoSignin");
      }

      const payload = {
        id: values.sessionid,
        title: values.sessiontitle,
        subtitle: values.sessionsubtitle,
        description: values.sessiondescription,
        imgUrl: values.sessionImage,
        quorum: values.sessionquorum,
      };
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

    createGuid() {
      return self.crypto.randomUUID();
    },
  },
};
</script>

<style scoped></style>
