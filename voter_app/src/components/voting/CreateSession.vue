<template>
  <div>
    <div class="col-md-8 offset-md-2">
      <ImageAndDescription
        :description="$t('CreateSession.introduction')"
        :imgUrl="sessionImage ? sessionImage : placeholderImage"
        :imageRight="true"
      ></ImageAndDescription>
    </div>

    <div class="alert alert-danger col-md-8 offset-md-2" v-if="error">
      {{ errorDisplayText }}
    </div>

    <div class="col-md-8 offset-md-2">
      <Form
        @submit="createSession"
        v-slot="{ errors }"
        :validation-schema="sessionValidationSchema"
      >
        <!-- Session -->

        <div class="form-row form-group">
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

        <div class="form-row form-group">
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

        <div class="form-row form-group">
          <label for="sessiondescription"> <strong>Description</strong></label>
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

        <div class="form-row form-group">
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

        <div class="form-row form-group">
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

        <div class="form-row form-group" v-show="showIds">
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

        <!-- Votings -->
        <hr class="form-group mt-5" />

        <div class="d-flex flex-row">
          <h3 class="me-auto">{{ $t("CreateSession.Headline.Votings") }}</h3>
          <button class="btn btn-primary">{{ $t("Add") }}</button>
        </div>

        <div class="row py-3">
          <div class="bg-light p-3 col-4 text-center">
            <img
              class="rounded-4 img-fluid d-block mx-auto d-fill"
              style="width: 100%; max-width: 100%; object-fit: cover"
              src="https://placeholder.com/150"
            />
            <button class="btn btn-danger mt-3">
              {{ $t("Remove") }}
            </button>
          </div>
          <div class="col-8 bg-light">
            <div class="form-row form-group">
              <label for="votingtitle"> <strong>VotingTitle</strong></label>
              <Field
                as="input"
                name="votingtitle"
                class="form-control"
                id="votingTitle"
                :value="votingtitle"
              ></Field>

              <small class="text-danger" v-if="errors.votingtitle">{{
                errors.votingtitle
              }}</small>
            </div>

            <div class="form-row form-group">
              <label for="votingdescription">
                <strong>VotingDescription</strong></label
              >
              <Field
                as="textarea"
                name="votingdescription"
                class="form-control"
                id="votingDescription"
                :value="votingdescription"
                rows="3"
              ></Field>

              <small class="text-danger" v-if="errors.votingdescription">{{
                errors.votingdescription
              }}</small>
            </div>

            <div class="form-row form-group">
              <label for="votingimgurl"> <strong>Voting Image</strong></label>
              <Field
                as="input"
                name="votingimgurl"
                class="form-control"
                id="votingImgurl"
                :value="votingimgurl"
              ></Field>

              <small class="text-danger" v-if="errors.votingimgurl">{{
                errors.votingimgurl
              }}</small>
            </div>

            <div class="form-row form-group" v-show="showIds">
              <label for="votingid"> <strong>VotingId</strong></label>
              <Field
                as="input"
                name="votingid"
                class="form-control"
                id="votingId"
                :value="votingid"
                :disabled="!editIds"
              ></Field>

              <small class="text-danger" v-if="errors.votingid">{{
                errors.votingid
              }}</small>
            </div>
          </div>
        </div>

        <!-- User -->

        <hr class="form-group mt-5" />

        <div class="d-flex flex-row">
          <h3 class="me-auto">{{ $t("CreateSession.Headline.User") }}</h3>
          <button class="btn btn-primary">{{ $t("Add") }}</button>
        </div>

        <div class="row py-3">
          <div class="bg-light p-3 col-4 text-center">
            <ProfilePicture fallback="wavatar" email="" imageUrl="" size="0" />
            <button class="btn btn-danger mt-3">
              {{ $t("Remove") }}
            </button>
          </div>
          <div class="col-8 bg-light">
            <div class="form-row form-group">
              <label for="username"> <strong>UserName</strong></label>
              <Field
                as="input"
                name="username"
                class="form-control"
                id="userName"
                :value="username"
              ></Field>

              <small class="text-danger" v-if="errors.username">{{
                errors.username
              }}</small>
            </div>

            <div class="form-row form-group">
              <label for="useremail"> <strong>UserEmail</strong></label>
              <Field
                as="input"
                name="useremail"
                class="form-control"
                id="userEmail"
                :value="useremail"
              ></Field>

              <small class="text-danger" v-if="errors.useremail">{{
                errors.useremail
              }}</small>

              <small
                class="form-row"
                v-t="'CreateSession.form.hint.useremail'"
              ></small>
            </div>

            <div class="form-row form-group">
              <label for="userimgurl"> <strong>UserImage</strong></label>
              <Field
                as="input"
                name="userimgurl"
                class="form-control"
                id="userImgurl"
                :value="userimgurl"
              ></Field>

              <small class="text-danger" v-if="errors.userimgurl">{{
                errors.userimgurl
              }}</small>
            </div>

            <div class="form-row form-group" v-show="showIds">
              <label for="userid"> <strong>UserId</strong></label>
              <Field
                as="input"
                name="userid"
                class="form-control"
                id="userId"
                :value="userid"
                :disabled="!editIds"
              ></Field>

              <small class="text-danger" v-if="errors.userid">{{
                errors.userid
              }}</small>
            </div>
          </div>
        </div>

        <!-- Save-Button -->
        <div class="form-row mt-3">
          <div class="form-group">
            <div class="d-grid">
              <button class="btn btn-primary" :disabled="isLoading">
                <span v-if="!isLoading">{{
                  $t("CreateSession.form.Create Session Button")
                }}</span>
                <span v-else class="spinner-border spinner-border-sm"></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Ende Form -->
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import ImageAndDescription from "@/components/ImageAndDescription";
import ProfilePicture from "../ProfilePicture.vue";

export default {
  name: "CreateSession",
  components: {
    Form,
    Field,
    ImageAndDescription,
    ProfilePicture,
  },
  data() {
    const sessionValidationSchema = yup.object().shape({
      sessiontitle: yup
        .string()
        .required("Ein Titel für die Session wird benötigt.")
        .trim()
        .max(50, "Der Titel darf maximal 50 Zeichen lang sein"),
      sessionsubtitle: yup
        .string()
        .trim()
        .max(150, "Die Titelbeschreibung darf maximal 150 Zeichen lang sein"),
      sessiondescription: yup
        .string()
        .trim()
        .max(2000, "Maximallänge 2000 Zeichen"),
      sessionimgurl: yup.string().trim().url("Keine gültige Url"),
      sessionquorum: yup.number().truncate().min(0).max(100),
      sessionid: yup
        .string()
        .required("Session-ID ist eine Pflichtangabe")
        .trim()
        .min(5, "Minimallänge 5 Zeichen")
        .max(50, "Maximallänge 50 Zeichen"),
      votingtitle: yup.string().trim().max(50, "Maximallänge 50 Zeichen"),
      votingimgurl: yup.string().trim().url("Keine gültige Url"),
      votingdescription: yup
        .string()
        .trim()
        .max(2000, "Maximallänge 2000 Zeichen"),
      votingid: yup
        .string()
        .required("Die ID ist eine Pflichtangabe")
        .trim()
        .min(5, "Minimallänge 5 Zeichen")
        .max(50, "Maximallänge 50 Zeichen"),
      username: yup.string().trim().max(50, "Maximallänge 50 Zeichen"),
      useremail: yup.string().trim().email("Keine gültige Email"),
      userimgurl: yup.string().trim().url("Keine gültige Url"),
      userid: yup
        .string()
        .required("Die ID ist eine Pflichtangabe")
        .trim()
        .min(5, "Minimallänge 5 Zeichen")
        .max(50, "Maximallänge 50 Zeichen"),
    });
    return {
      sessionValidationSchema,
      error: "",
      isLoading: false,
      placeholderImage: "https://placeholder.com/150",
      sessionQuorum: 50,
      sessionImage: "",
      sessionid: this.createGuid(),
      imgUrl: "",
      users: [],
      votings: [],
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
