<template>
  <div>
    <!-- Display existing voting -->
    <div class="row py-3 bg-light rounded-3 shadow my-3" v-if="!isEditing">
      <div class="p-3 col-4 col-md-3 text-center">
        <img
          :src="votingRecord.imgUrl"
          v-if="votingRecord.imgUrl"
          class="rounded-3 shadow img-fluid d-block mx-auto d-fill"
          style="width: 100%; max-width: 100%; object-fit: cover"
        />
      </div>
      <div class="col-8 col-md-9 p-3">
        <h4>{{ votingRecord.title }}</h4>
        <template v-if="votingRecord.description"
          ><p>
            {{ votingRecord.description }}
          </p>
        </template>
        <p v-if="showIds">
          {{ $t("CreateSession.form.Voting.Id") }}: {{ votingRecord.id }}
        </p>
        <button
          class="btn btn-primary me-2 mb-2 shadow"
          v-if="showIds"
          disabled
        >
          {{ $t("Edit") }}
        </button>
        <button class="btn btn-danger me-2 mb-2 shadow" v-if="showIds" disabled>
          {{ $t("Remove") }}
        </button>
      </div>
    </div>

    <!-- Edit User -->
    <vForm
      @submit="updateVoting"
      v-slot="{ errors }"
      :validation-schema="votingValidationSchema"
      v-if="isEditing"
      :initialValues="initialValues"
    >
      <div class="row py-3">
        <div class="p-3 col-4 col-md-3 text-center">
          <img
            class="rounded-3 shadow img-fluid d-block mx-auto d-fill"
            style="width: 100%; max-width: 100%; object-fit: cover"
            src="@/assets/placeholder.svg"
          />
        </div>
        <div class="col-8 col-md-9 py-3">
          <div class="form-row form-group mb-3">
            <label for="votingtitle">
              <strong>{{
                $t("CreateSession.form.Voting.Title")
              }}</strong></label
            >
            <Field
              as="input"
              name="votingtitle"
              class="form-control shadow"
              :class="{ 'is-invalid': errors.votingtitle }"
              id="votingTitle"
            ></Field>

            <ErrorMessage name="votingtitle" class="text-danger" as="p">{{
              $t(errors.votingtitle)
            }}</ErrorMessage>
          </div>

          <div class="form-row form-group mb-3">
            <label for="votingdescription">
              <strong>{{
                $t("CreateSession.form.Voting.Description")
              }}</strong></label
            >
            <Field
              as="textarea"
              name="votingdescription"
              class="form-control shadow"
              :class="{ 'is-invalid': errors.votingdescription }"
              id="votingDescription"
              rows="3"
            ></Field>

            <ErrorMessage name="votingdescription" class="text-danger" as="p">{{
              $t(errors.votingdescription)
            }}</ErrorMessage>
          </div>

          <div class="form-row form-group mb-3">
            <label for="votingimgurl">
              <strong>{{
                $t("CreateSession.form.Voting.Image")
              }}</strong></label
            >
            <Field
              as="input"
              name="votingimgurl"
              class="form-control shadow"
              :class="{ 'is-invalid': errors.votingimgurl }"
              id="votingImgurl"
            ></Field>

            <ErrorMessage name="votingimgurl" class="text-danger" as="p">{{
              $t(errors.votingimgurl)
            }}</ErrorMessage>
          </div>

          <div class="form-row form-group mb-3" v-show="showIds">
            <label for="votingid">
              <strong>{{ $t("CreateSession.form.Voting.Id") }}</strong></label
            >
            <Field
              as="input"
              name="votingid"
              class="form-control"
              :class="{ 'is-invalid': errors.votingid }"
              id="votingId"
              :disabled="!editIds"
            ></Field>

            <ErrorMessage name="votingid" class="text-danger" as="p">{{
              $t(errors.votingid)
            }}</ErrorMessage>
          </div>

          <div class="mt-3">
            <button class="btn btn-primary me-2 mb-2 shadow" type="submit">
              {{ $t("CreateSession.form.CreateVotingData") }}
            </button>
            <button class="btn btn-primary me-2 mb-2 shadow" type="reset">
              {{ $t("Reset") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Ende Form -->
    </vForm>
  </div>
</template>

<script>
import { Form as vForm, Field, ErrorMessage } from "vee-validate";
import { votingValidationSchema } from "./validations";

export default {
  name: "CreateVoting",
  components: {
    vForm,
    Field,
    ErrorMessage,
  },
  emits: {
    votingSubmit(payload) {
      return payload ? true : false;
    },
  },
  data() {
    return {
      votingValidationSchema,
    };
  },
  props: {
    showIds: {
      type: Boolean,
      default: false,
    },
    editIds: {
      type: Boolean,
      default: false,
    },
    votingRecord: {
      type: Object,
      default: null,
    },
  },
  computed: {
    initialValues() {
      return {
        votingid: this.makeid(6),
        votingimgurl: "",
      };
    },
    isEditing() {
      return this.votingRecord ? false : true;
    },
  },
  methods: {
    updateVoting(values) {
      const votingdata = {
        id: values.votingid,
        title: values.votingtitle,
        description: values.votingdescription,
        imgUrl: values.votingimgurl,
      };

      this.$emit("votingSubmit", votingdata);
    },
    makeid(length) {
      let result = "";
      const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
      }
      return result;
    },
  },
};
</script>

<style scoped></style>
