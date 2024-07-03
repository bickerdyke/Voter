<template>
  <div>
    <Form
      @submit="submitSession"
      v-slot="{ errors }"
      :initialValues="initialValues"
      :validation-schema="sessionValidationSchema"
    >
      <div class="form-row form-group">
        <label for="sessiontitle">
          <strong>{{ $t("CreateSession.form.Session.Title") }}</strong></label
        >
        <Field
          as="input"
          name="sessiontitle"
          class="form-control"
          id="sessiontitle"
        ></Field>

        <small class="text-danger" v-if="errors.sessiontitle">{{
          $t(errors.sessiontitle)
        }}</small>
      </div>

      <div class="form-row form-group">
        <label for="sessionsubtitle">
          <strong>{{
            $t("CreateSession.form.Session.Subtitle")
          }}</strong></label
        >
        <Field
          as="input"
          name="sessionsubtitle"
          class="form-control"
          id="sessionsubtitle"
        ></Field>

        <small class="text-danger" v-if="errors.sessionsubtitle">{{
          $t(errors.sessionsubtitle)
        }}</small>
      </div>

      <div class="form-row form-group">
        <label for="sessiondescription">
          <strong>{{
            $t("CreateSession.form.Session.Description")
          }}</strong></label
        >
        <Field
          as="textarea"
          name="sessiondescription"
          class="form-control"
          id="sessiondescription"
          rows="3"
        ></Field>

        <small class="text-danger" v-if="errors.sessiondescription">{{
          $t(errors.sessiondescription)
        }}</small>
      </div>

      <div class="form-row form-group">
        <label for="sessionquorum">
          <strong>{{ $t("CreateSession.form.Session.Quorum") }}</strong></label
        >
        <div class="form-row d-flex">
          <Field
            as="input"
            type="range"
            name="sessionquorum"
            class="form-range"
            id="sessionquorum"
            min="0"
            max="100"
            v-model="sessionQuorum"
          ></Field>
          <div class="d-flex ms-3">{{ sessionQuorum }}%</div>
        </div>

        <small class="text-danger" v-if="errors.sessionquorum">{{
          $t(errors.sessionquorum)
        }}</small>

        <small class="form-row">{{
          $t("CreateSession.form.hint.quorum")
        }}</small>
      </div>

      <div class="form-row form-group">
        <label for="sessionimgurl">
          <strong>{{ $t("CreateSession.form.Session.Image") }}</strong></label
        >
        <Field
          as="input"
          name="sessionimgurl"
          class="form-control"
          id="sessionimgurl"
        ></Field>

        <small class="text-danger" v-if="errors.sessionimgurl">{{
          $t(errors.sessionimgurl)
        }}</small>
      </div>

      <div class="form-row form-group" v-show="showIds">
        <label for="sessionid">
          <strong>{{ $t("CreateSession.form.Session.Id") }}</strong></label
        >
        <Field
          as="input"
          name="sessionid"
          class="form-control"
          id="sessionid"
          :disabled="!editIds"
        ></Field>

        <small class="text-danger" v-if="errors.sessionid">{{
          $t(errors.sessionid)
        }}</small>
      </div>

      <button class="btn btn-primary" type="submit">
        {{ $t("CreateSession.form.CreateSessionData") }}
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import { sessionValidationSchema, localErrorMessages } from "./validations";

export default {
  name: "CreateSession",
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
