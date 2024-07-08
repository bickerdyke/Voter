<template>
  <div class="col">
    <div class="card">
      <div class="row h-100 g-0">
        <div class="col-3 d-flex align-items-center" v-if="useImage">
          <img class="card-img-top w-100 m-1" :src="imgUrl" />
        </div>
        <div :class="useImage ? 'col-9' : 'col-12'">
          <div class="card-body">
            <h5 class="card-title">
              <slot name="title">Card title</slot>
            </h5>
            <div class="card-text">
              <!--<div class="position-absolute bottom-0 end-0">-->
              <div class="float-end">
                <ProfilePicture
                  class="m-2"
                  fallback="wavatar"
                  :email="currentSessionData.users[userId].email"
                  :imgUrl="currentSessionData.users[userId].imgUrl"
                  :size="50"
                  v-if="userId"
                /><br />

                <a :href="link" v-if="link">
                  <ProfilePicture fallback="wavatar" class="m-2" :size="60" />
                </a>
              </div>
              <div class="overflow-hidden">
                <slot
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                  obcaecati quis vero voluptate quam consectetur reiciendis!
                  Animi voluptates maiores ratione omnis, earum ab temporibus
                  consequatur facilis, eaque minima tempora iusto!
                </slot>
              </div>
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

export default {
  name: "LinkCard",
  components: {
    ProfilePicture,
  },
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
    useImage() {
      return this.imgUrl ? true : false;
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
