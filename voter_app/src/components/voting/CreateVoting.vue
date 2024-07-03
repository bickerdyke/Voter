<template>
  <div>
    <!-- Display existing voting -->
    <div class="row py-3" v-if="!isEditing">
      <div class="bg-light p-3 col-4 text-center">
        <img
          :src="votingRecord.imgUrl"
          v-if="votingRecord.imgUrl"
          class="rounded-4 img-fluid d-block mx-auto d-fill"
          style="width: 100%; max-width: 100%; object-fit: cover"
        />
      </div>
      <div class="col-8 bg-light">
        <h4>{{ votingRecord.title }}</h4>
        <template v-if="votingRecord.description"
          ><p>
            {{ votingRecord.description }}
          </p>
        </template>
        <p v-if="showIds">
          {{ $t("CreateSession.form.Voting.Id") }}: {{ votingRecord.id }}
        </p>
        <button class="btn btn-primary m-1" v-if="showIds" disabled>
          {{ $t("Edit") }}
        </button>
        <button class="btn btn-danger m-1" v-if="showIds" disabled>
          {{ $t("Remove") }}
        </button>
      </div>
    </div>

    <!-- Edit User -->
    <Form
      @submit="updateVoting"
      v-slot="{ errors }"
      :validation-schema="votingValidationSchema"
      v-if="isEditing"
      :initialValues="initialValues"
    >
      <div class="row py-3">
        <div class="bg-light p-3 col-4 text-center">
          <img
            class="rounded-4 img-fluid d-block mx-auto d-fill"
            style="width: 100%; max-width: 100%; object-fit: cover"
            src="https://placeholder.com/150"
          />
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
              :disabled="!editIds"
            ></Field>

            <small class="text-danger" v-if="errors.votingid">{{
              $t(errors.votingid)
            }}</small>
          </div>
          <button class="btn btn-primary" type="submit">
            {{ $t("CreateSession.form.CreateVotingData") }}
          </button>
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
      default: true,
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
        votingimgurl: "https://picsum.photos/100",
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
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    },
  },
};
</script>

<style scoped></style>
