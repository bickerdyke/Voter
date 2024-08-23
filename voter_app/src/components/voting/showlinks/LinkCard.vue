<template>
  <div class="col col-print-6">
    <div class="card">
      <div class="row h-100 g-0">
        <div
          class="col-3 d-flex flex-column align-items-center"
          v-if="useImage"
        >
          <img class="w-100 m-1" :src="imgUrl" v-if="imgUrl" />
          <ProfilePicture
            class="m-1"
            fallback="wavatar"
            :email="currentSessionData.users[userId].email"
            :emailHash="currentSessionData.users[userId].emailHash"
            :imageUrl="currentSessionData.users[userId].imgUrl"
            :size="70"
            v-if="userId"
          />
        </div>
        <div :class="useImage ? 'col-9' : 'col-12'">
          <div class="card-body">
            <h5 class="card-title">
              <slot name="title">Card title</slot>
            </h5>
            <div class="card-text">
              <div class="float-end ms-1 mb-1">
                <a :href="link" v-if="link">
                  <qrcode-vue
                    :value="link"
                    :size="70"
                    level="M"
                    render-as="svg"
                    :margin="0"
                    class="m-1"
                  />
                </a>
              </div>
              <slot
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                obcaecati quis vero voluptate quam consectetur reiciendis! Animi
                voluptates maiores ratione omnis, earum ab temporibus
                consequatur facilis, eaque minima tempora iusto!
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfilePicture from "@/components/ProfilePicture";
import QrcodeVue from "qrcode.vue";

export default {
  name: "LinkCard",
  components: {
    ProfilePicture,
    QrcodeVue,
  },
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
    useImage() {
      // #88 kein Profilbild ohne Sessionbild
      return true;
      //return this.imgUrl ? true : false;
    },
  },
  props: {
    imgUrl: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    userId: {
      type: String,
      default: null,
    },
  },
  methods: {},
};
</script>

<style scoped></style>
