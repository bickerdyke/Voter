<template>
  <div>
    <Form
      @submit="submitSession"
      v-slot="{ errors }"
      :initialValues="initialValues"
      :validation-schema="sessionValidationSchema"
    >
      <div class="form-row form-group mb-3">
        <label for="sessiontitle">
          <strong>{{ $t("CreateSession.form.Session.Title") }}</strong></label
        >
        <Field
          as="input"
          name="sessiontitle"
          class="form-control"
          :class="{ 'is-invalid': errors.sessiontitle }"
          id="sessiontitle"
        ></Field>

        <ErrorMessage name="sessiontitle" class="text-danger" as="p">{{
          $t(errors.sessiontitle)
        }}</ErrorMessage>
      </div>

      <div class="form-row form-group mb-3">
        <label for="sessionsubtitle">
          <strong>{{
            $t("CreateSession.form.Session.Subtitle")
          }}</strong></label
        >
        <Field
          as="input"
          name="sessionsubtitle"
          class="form-control"
          :class="{ 'is-invalid': errors.sessionsubtitle }"
          id="sessionsubtitle"
        ></Field>

        <ErrorMessage name="sessionsubtitle" class="text-danger" as="p">{{
          $t(errors.sessionsubtitle)
        }}</ErrorMessage>
      </div>

      <div class="form-row form-group mb-3">
        <label for="sessiondescription">
          <strong>{{
            $t("CreateSession.form.Session.Description")
          }}</strong></label
        >
        <Field
          as="textarea"
          name="sessiondescription"
          class="form-control"
          :class="{ 'is-invalid': errors.sessiondescription }"
          id="sessiondescription"
          rows="3"
        ></Field>

        <ErrorMessage name="sessiondescription" class="text-danger" as="p">{{
          $t(errors.sessiondescription)
        }}</ErrorMessage>
      </div>

      <div class="form-row form-group mb-3">
        <label for="sessionquorum">
          <strong>{{ $t("CreateSession.form.Session.Quorum") }}</strong></label
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
          $t(errors.sessionquorum)
        }}</ErrorMessage>

        <p>
          <small class="form-row">{{
            $t("CreateSession.form.hint.quorum")
          }}</small>
        </p>
      </div>

      <!-- @todo: #44 Alternative Wertungsverfahren implementieren: Schulnoten mit und ohne plusminus -->
      <!-- @todo: #45 Alternatives Wertungsverfahren: Dafür, Dagegen, Enthaltung (Abstimmen mit Daumen hoch/runter-Icons) -->

      <div class="form-row form-group mb-3">
        <label for="sessionimgurl">
          <strong>{{ $t("CreateSession.form.Session.Image") }}</strong></label
        >
        <Field
          as="input"
          name="sessionimgurl"
          class="form-control"
          :class="{ 'is-invalid': errors.sessionimgurl }"
          id="sessionimgurl"
        ></Field>

        <ErrorMessage name="sessionimgurl" class="text-danger" as="p">{{
          $t(errors.sessionimgurl)
        }}</ErrorMessage>
      </div>

      <div class="form-row form-group mb-3" v-show="showIds">
        <label for="sessionid">
          <strong>{{ $t("CreateSession.form.Session.Id") }}</strong></label
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
          $t(errors.sessionid)
        }}</ErrorMessage>
      </div>

      <div class="mt-3">
        <button class="btn btn-primary me-2 mb-2" type="submit">
          {{ $t("CreateSession.form.CreateSessionData") }}
        </button>
        <button class="btn btn-primary me-2 mb-2" type="reset">
          {{ $t("Reset") }}
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { sessionValidationSchema, localErrorMessages } from "./validations";

export default {
  name: "CreateSession",
  components: {
    Form,
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
      localErrorMessages,
      sessionQuorum: 100,
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
    initialValues() {
      return {
        sessionquorum: 100,
        sessionid: this.createGuid(),
        sessionimgurl: "https://picsum.photos/200",
      };
    },
  },
  methods: {
    createGuid() {
      return self.crypto.randomUUID();
    },
    submitSession(values) {
      const sessiondata = {
        id: values.sessionid,
        title: values.sessiontitle,
        subtitle: values.sessionsubtitle,
        description: values.sessiondescription,
        quorum: values.sessionquorum,
        imgUrl: values.sessionimgurl,
      };
      this.$emit("sessionSubmit", sessiondata);
    },
  },
};
</script>

<style scoped></style>
