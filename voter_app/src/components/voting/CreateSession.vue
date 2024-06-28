<template>
  <div>
    <div class="col-md-8 offset-md-2">
      <ImageAndDescription
        :description="$t('CreateSession.introduction')"
        :imgUrl="session.imgUrl ? session.imgUrl : placeholderImage"
        imageRight="true"
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
      <div class="form-row">
        <div class="form-group col-md-8 offset-md-2">
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
        <div class="form-group col-md-8 offset-md-2">
          <label for="sessionsubtitle"> <strong>SessionSubtitle</strong></label>
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
        <div class="form-group col-md-8 offset-md-2">
          <label for="sessiondescription"> <strong>Description</strong></label>
          <Field
            as="textarea"
            name="sessiondescription"
            class="form-control"
            id="sessiondescription"
            rows="5"
          ></Field>

          <small class="text-danger" v-if="errors.sessiondescription">{{
            errors.sessiondescription
          }}</small>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-8 offset-md-2">
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

          <small class="form-row"
            >Legt das Minimum der abgegebenen Stimmen fest bis die ersten
            Ergebnisse angezeigt werden. Dabei bedeuten 0% alle Ergebnisse
            werden sofort angezeigt und 100% erst wenn alle Stimmen abgegeben
            wurden, werden Ergebnisse angezeigt</small
          >
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-8 offset-md-2">
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
        <div class="form-group col-md-8 offset-md-2">
          <label for="sessionid"> <strong>SessionId</strong></label>
          <Field
            as="input"
            name="sessionid"
            class="form-control"
            id="sessionid"
            :value="session.id"
            :disabled="!editIds"
          ></Field>

          <small class="text-danger" v-if="errors.sessionid">{{
            errors.sessionid
          }}</small>
        </div>
      </div>

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
      session: {
        id: this.createGuid(),
        title: "Frische Session",
        subtitle: "Alles neu macht der Mai",
        description: "Frische Session ohne Votes in der Standardeinstellung",
        imgUrl: "",
        quorum: 50,
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
