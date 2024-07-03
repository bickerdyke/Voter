<template>
  <div>
    <Form
      @submit="createSession"
      v-slot="{ errors }"
      :validation-schema="sessionValidationSchema"
      class="col-md-8 offset-md-2"
    >
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
            <label for="votingtitle">
              <strong>{{
                $t("CreateSession.form.Voting.Title")
              }}</strong></label
            >
            <Field
              as="input"
              name="votingtitle"
              class="form-control"
              id="votingTitle"
              :value="votingtitle"
            ></Field>

            <small class="text-danger" v-if="errors.votingtitle">{{
              $t(errors.votingtitle)
            }}</small>
          </div>

          <div class="form-row form-group">
            <label for="votingdescription">
              <strong>{{
                $t("CreateSession.form.Voting.Description")
              }}</strong></label
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
              $t(errors.votingdescription)
            }}</small>
          </div>

          <div class="form-row form-group">
            <label for="votingimgurl">
              <strong>{{
                $t("CreateSession.form.Voting.Image")
              }}</strong></label
            >
            <Field
              as="input"
              name="votingimgurl"
              class="form-control"
              id="votingImgurl"
              :value="votingimgurl"
            ></Field>

            <small class="text-danger" v-if="errors.votingimgurl">{{
              $t(errors.votingimgurl)
            }}</small>
          </div>

          <div class="form-row form-group" v-show="showIds">
            <label for="votingid">
              <strong>{{ $t("CreateSession.form.Voting.Id") }}</strong></label
            >
            <Field
              as="input"
              name="votingid"
              class="form-control"
              id="votingId"
              :value="votingid"
              :disabled="!editIds"
            ></Field>

            <small class="text-danger" v-if="errors.votingid">{{
              $t(errors.votingid)
            }}</small>
          </div>
        </div>
      </div>

      <!-- Ende Form -->
    </Form>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import { votingValidationSchema } from "./validations";

export default {
  name: "CreateVoting",
  components: {
    Form,
    Field,
  },
  emits: {
    sessionSubmit(payload) {
      return payload ? true : false;
    },
  },
  data() {
    return {
      votingValidationSchema,
      placeholderImage: "https://placeholder.com/150",
      sessionQuorum: 50,
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
  computed: {},
  methods: {
    voted() {
      const sessiondata = {};
      this.$emit("sessionSubmit", sessiondata);
    },
  },
};
</script>

<style scoped></style>
