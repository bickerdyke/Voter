<template>
  <div>
    <!-- Display existing user -->
    <div class="row py-3 bg-light rounded-3 shadow my-3" v-if="!isEditing">
      <div class="p-3 col-4 col-md-3 text-center">
        <ProfilePicture
          fallback="wavatar"
          :email="userRecord.email"
          :imageUrl="userRecord.imgUrl"
          :size="0"
          class="rounded-3 shadow img-fluid d-block mx-auto d-fill"
        />
      </div>
      <div class="col-8 col-md-9 p-3">
        <h4>{{ userRecord.name }}</h4>
        <template v-if="userRecord.email && !userRecord.imgUrl"
          ><p>
            {{ $t("CreateSession.form.User.Email") }}: {{ userRecord.email }}
          </p>
          <!-- <p>{{ $t("CreateSession.form.hint.useremail") }}</p> -->
        </template>
        <p v-if="showIds">
          {{ $t("CreateSession.form.User.Id") }}: {{ userRecord.id }}
        </p>
        <button
          class="btn btn-primary shadow me-2 mb-2"
          v-if="showIds"
          disabled
        >
          {{ $t("Edit") }}
        </button>
        <button class="btn btn-danger shadow me-2 mb-2" v-if="showIds" disabled>
          {{ $t("Remove") }}
        </button>
      </div>
    </div>

    <!-- Edit user -->
    <vForm
      @submit="updateUser"
      v-slot="{ errors }"
      :validation-schema="userValidationSchema"
      v-if="isEditing"
      :initialValues="initialValues"
    >
      <div class="row py-3">
        <div class="p-3 col-4 col-md-3 text-center">
          <ProfilePicture
            fallback="wavatar"
            email=""
            imageUrl=""
            :size="0"
            class="rounded-3 shadow"
          />
        </div>
        <div class="col-8 col-md-9 p-3">
          <div class="form-row form-group mb-3">
            <label for="username">
              <strong>{{ $t("CreateSession.form.User.Name") }}</strong></label
            >
            <Field
              as="input"
              name="username"
              class="form-control shadow"
              :class="{ 'is-invalid': errors.username }"
              id="userName"
            ></Field>

            <ErrorMessage name="username" class="text-danger" as="p">{{
              $t(errors.username)
            }}</ErrorMessage>
          </div>

          <div class="form-row form-group mb-3">
            <label for="useremail">
              <strong>{{ $t("CreateSession.form.User.Email") }}</strong></label
            >
            <Field
              as="input"
              name="useremail"
              class="form-control shadow"
              :class="{ 'is-invalid': errors.useremail }"
              id="userEmail"
            ></Field>

            <ErrorMessage name="useremail" class="text-danger" as="p">{{
              $t(errors.useremail)
            }}</ErrorMessage>

            <p class="form-text" v-t="'CreateSession.form.hint.useremail'" />
          </div>

          <div class="form-row form-group mb-3">
            <label for="userimgurl">
              <strong>{{ $t("CreateSession.form.User.Image") }}</strong></label
            >
            <Field
              as="input"
              name="userimgurl"
              class="form-control shadow"
              :class="{ 'is-invalid': errors.userimgurl }"
              id="userImgurl"
            ></Field>

            <ErrorMessage name="userimgurl" class="text-danger" as="p">{{
              $t(errors.userimgurl)
            }}</ErrorMessage>
          </div>

          <div class="form-row form-group mb-3" v-show="showIds">
            <label for="userid">
              <strong>{{ $t("CreateSession.form.User.Id") }}</strong></label
            >
            <Field
              as="input"
              name="userid"
              class="form-control shadow"
              :class="{ 'is-invalid': errors.userid }"
              id="userId"
              :disabled="!editIds"
            ></Field>

            <ErrorMessage name="userid" class="text-danger" as="p">{{
              $t(errors.userid)
            }}</ErrorMessage>
          </div>

          <div class="mt-3">
            <button class="btn btn-primary shadow me-2 mb-2" type="submit">
              {{ $t("CreateSession.form.CreateUserData") }}
            </button>
            <button class="btn btn-primary shadow me-2 mb-2" type="reset">
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
import ProfilePicture from "@/components/ProfilePicture";
import { userValidationSchema } from "./validations";

export default {
  name: "CreateUser",
  components: {
    vForm,
    Field,
    ProfilePicture,
    ErrorMessage,
  },
  emits: {
    userSubmit(payload) {
      return payload ? true : false;
    },
  },
  data() {
    return {
      userValidationSchema,
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
    userRecord: {
      type: Object,
      default: null,
    },
  },
  computed: {
    initialValues() {
      return {
        userid: this.makeid(5),
      };
    },
    isEditing() {
      return this.userRecord ? false : true;
    },
  },
  methods: {
    updateUser(values) {
      const userdata = {
        id: values.userid,
        name: values.username,
        email: values.useremail,
        imgUrl: values.userimgurl,
      };
      this.$emit("userSubmit", userdata);
    },
    makeid(length) {
      let result = "";
      const characters = "abcdefghijkmnpqrstuvwxyz123456789";
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
