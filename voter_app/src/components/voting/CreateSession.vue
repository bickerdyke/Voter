<template>
  <div>
    <vForm
      @submit="submitSession"
      v-slot="{ errors }"
      :initialValues="initialValues"
      :validation-schema="sessionValidationSchema"
    >
      <div class="form-row form-group mb-3">
        <label for="sessiontitle">
          <strong>{{
            $t("CreateSession.form.Session.sessiontitle")
          }}</strong></label
        >
        <Field
          as="input"
          name="sessiontitle"
          class="form-control shadow"
          :class="{ 'is-invalid': errors.sessiontitle }"
          id="sessiontitle"
        ></Field>

        <ErrorMessage name="sessiontitle" class="text-danger" as="p">{{
          $root.translateError(errors.sessiontitle)
        }}</ErrorMessage>
      </div>

      <div class="form-row form-group mb-3">
        <label for="sessionsubtitle">
          <strong>{{
            $t("CreateSession.form.Session.sessionsubtitle")
          }}</strong></label
        >
        <Field
          as="input"
          name="sessionsubtitle"
          class="form-control shadow"
          :class="{ 'is-invalid': errors.sessionsubtitle }"
          id="sessionsubtitle"
        ></Field>

        <ErrorMessage name="sessionsubtitle" class="text-danger" as="p">{{
          $root.translateError(errors.sessionsubtitle)
        }}</ErrorMessage>
      </div>

      <div class="form-row form-group mb-3">
        <label for="sessiondescription">
          <strong>{{
            $t("CreateSession.form.Session.sessiondescription")
          }}</strong></label
        >
        <Field
          as="textarea"
          name="sessiondescription"
          class="form-control shadow"
          :class="{ 'is-invalid': errors.sessiondescription }"
          id="sessiondescription"
          rows="3"
        ></Field>

        <ErrorMessage name="sessiondescription" class="text-danger" as="p">{{
          $root.translateError(errors.sessiondescription)
        }}</ErrorMessage>
      </div>

      <div class="form-row form-group mb-3">
        <label for="sessionquorum">
          <strong>{{
            $t("CreateSession.form.Session.sessionquorum")
          }}</strong></label
        >
        <div class="form-row d-flex">
          <Field
            as="input"
            type="range"
            name="sessionquorum"
            class="form-range"
            :class="{ 'is-invalid': errors.sessionquorum }"
            id="sessionquorum"
            min="0"
            max="100"
            v-model="sessionQuorum"
          ></Field>
          <div class="d-flex ms-3">{{ sessionQuorum }}%</div>
        </div>

        <ErrorMessage name="sessionquorum" class="text-danger" as="p">{{
          $root.translateError(errors.sessionquorum)
        }}</ErrorMessage>

        <p class="form-text" v-t="'CreateSession.form.hint.quorum'" />
      </div>

      <div class="form-row form-group mb-3">
        <label for="sessionvotingmode">
          <strong>{{
            $t("CreateSession.form.Session.sessionvotingmode")
          }}</strong></label
        >
        <div class="form-row d-flex">
          <Field
            as="select"
            name="sessionvotingmode"
            class="form-select shadow"
            :class="{ 'is-invalid': errors.sessionvotingmode }"
            id="sessionvotingmode"
            :value="Object.keys(votingmodes)[0]"
          >
            <option v-for="(mode, key) in votingmodes" :key="key" :value="key">
              {{ $t(`Votingmode.${key}`) }}
            </option>
          </Field>
        </div>

        <ErrorMessage name="sessionvotingmode" class="text-danger" as="p">{{
          $root.translateError(errors.sessionvotingmode)
        }}</ErrorMessage>

        <p class="form-text" v-t="'CreateSession.form.hint.votingmode'" />
      </div>

      <div class="form-row form-group mb-3">
        <label for="sessionimgurl">
          <strong>{{
            $t("CreateSession.form.Session.sessionimgurl")
          }}</strong></label
        >
        <Field
          as="input"
          name="sessionimgurl"
          class="form-control shadow"
          :class="{ 'is-invalid': errors.sessionimgurl }"
          id="sessionimgurl"
        ></Field>

        <ErrorMessage name="sessionimgurl" class="text-danger" as="p">{{
          $root.translateError(errors.sessionimgurl)
        }}</ErrorMessage>
      </div>

      <div class="form-row form-group mb-3" v-show="showIds">
        <label for="sessionid">
          <strong>{{
            $t("CreateSession.form.Session.sessionid")
          }}</strong></label
        >
        <Field
          as="input"
          name="sessionid"
          class="form-control"
          :class="{ 'is-invalid': errors.sessionid }"
          id="sessionid"
          :disabled="!editIds"
        ></Field>

        <ErrorMessage name="sessionid" class="text-danger" as="p">{{
          $root.translateError(errors.sessionid)
        }}</ErrorMessage>
      </div>

      <div class="mt-3">
        <button class="btn btn-primary shadow me-2 mb-2" type="submit">
          {{ $t("CreateSession.form.CreateSessionData") }}
        </button>
        <button class="btn btn-primary shadow me-2 mb-2" type="reset">
          {{ $t("Reset") }}
        </button>
      </div>
    </vForm>
  </div>
</template>

<script>
/* global self */
import { Form as vForm, Field, ErrorMessage } from "vee-validate";
import { sessionValidationSchema } from "./validations";
import { VOTINGMODES } from "@/config/misc";

export default {
  name: "CreateSession",
  components: {
    vForm,
    Field,
    ErrorMessage,
  },
  emits: {
    sessionSubmit(payload) {
      return payload ? true : false;
    },
  },
  data() {
    return {
      sessionValidationSchema,
      sessionQuorum: 100,
      votingmodes: VOTINGMODES,
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
  },
  computed: {
    initialValues() {
      return {
        sessionquorum: 100,
        sessionid: this.createGuid(),
        sessionimgurl: "",
      };
    },
  },
  methods: {
    createGuid() {
      let prefix = this.$root.isDevMode ? "test-" : "";
      return prefix + self.crypto.randomUUID();
    },
    submitSession(values) {
      const sessiondata = {
        id: values.sessionid,
        title: values.sessiontitle,
        subtitle: values.sessionsubtitle,
        description: values.sessiondescription,
        quorum: values.sessionquorum,
        votingmode: values.sessionvotingmode,
        imgUrl: values.sessionimgurl,
        token: this.createToken(),
      };
      this.$emit("sessionSubmit", sessiondata);
    },
    createToken() {
      const length = 5;
      let result = "";
      const characters = "abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
      const len = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * len));
        counter += 1;
      }
      return result;
    },
  },
};
</script>

<style scoped></style>
