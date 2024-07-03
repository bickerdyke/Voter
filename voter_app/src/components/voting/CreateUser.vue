<template>
  <div>
    <div class="row py-3" v-if="!isEditing">
      <div class="bg-light p-3 col-4 text-center">
        <ProfilePicture
          fallback="wavatar"
          :email="userRecord.email"
          :imageUrl="userRecord.imgUrl"
          :size="0"
        />
      </div>
      <div class="col-8 bg-light">
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
        <button class="btn btn-primary m-1" v-if="showIds" disabled>
          {{ $t("Edit") }}
        </button>
        <button class="btn btn-danger m-1" v-if="showIds" disabled>
          {{ $t("Remove") }}
        </button>
      </div>
    </div>

    <Form
      @submit="updateUser"
      v-slot="{ errors }"
      :validation-schema="userValidationSchema"
      v-if="isEditing"
      :initialValues="initialValues"
    >
      <div class="row py-3">
        <div class="bg-light p-3 col-4 text-center">
          <ProfilePicture fallback="wavatar" email="" imageUrl="" :size="0" />
          <div v-if="!isEditing">
            <button class="btn btn-primary m-3">
              {{ $t("Edit") }}
            </button>
            <button class="btn btn-danger m-3">
              {{ $t("Remove") }}
            </button>
          </div>
        </div>
        <div class="col-8 bg-light">
          <div class="form-row form-group">
            <label for="username">
              <strong>{{ $t("CreateSession.form.User.Name") }}</strong></label
            >
            <Field
              as="input"
              name="username"
              class="form-control"
              id="userName"
            ></Field>

            <small class="text-danger" v-if="errors.username">{{
              $t(errors.username)
            }}</small>
          </div>

          <div class="form-row form-group">
            <label for="useremail">
              <strong>{{ $t("CreateSession.form.User.Email") }}</strong></label
            >
            <Field
              as="input"
              name="useremail"
              class="form-control"
              id="userEmail"
            ></Field>

            <small class="text-danger" v-if="errors.useremail">{{
              $t(errors.useremail)
            }}</small>

            <p>
              <small
                class="form-row"
                v-t="'CreateSession.form.hint.useremail'"
              ></small>
            </p>
          </div>

          <div class="form-row form-group">
            <label for="userimgurl">
              <strong>{{ $t("CreateSession.form.User.Image") }}</strong></label
            >
            <Field
              as="input"
              name="userimgurl"
              class="form-control"
              id="userImgurl"
            ></Field>

            <small class="text-danger" v-if="errors.userimgurl">{{
              $t(errors.userimgurl)
            }}</small>
          </div>

          <div class="form-row form-group" v-show="showIds">
            <label for="userid">
              <strong>{{ $t("CreateSession.form.User.Id") }}</strong></label
            >
            <Field
              as="input"
              name="userid"
              class="form-control"
              id="userId"
              :disabled="!editIds"
            ></Field>

            <small class="text-danger" v-if="errors.userid">{{
              $t(errors.userid)
            }}</small>
          </div>
          <button class="btn btn-primary" type="submit">
            {{ $t("CreateSession.form.CreateUserData") }}
          </button>
        </div>
      </div>

      <!-- Ende Form -->
    </Form>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import ProfilePicture from "@/components/ProfilePicture.vue";
import { userValidationSchema } from "./validations";

export default {
  name: "CreateUser",
  components: {
    Form,
    Field,
    ProfilePicture,
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
      default: true,
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
