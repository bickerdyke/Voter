<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline v-if="isSessionLoaded" />

      
      <!-- Session description -->
      <ImageAndDescription
        :imgUrl="currentSessionData.imgUrl"
        :description="currentSessionData.description"
        v-if="isSessionLoaded"
      ></ImageAndDescription>

      <!-- Footer-Features-->
      <div class="row my-3">
        <router-link to="/" class="btn btn-primary"
          >Neue Abstimmung anlegen</router-link
        >
      </div>
    </div>
  </TheHomeLayout>
</template>

<script>
import { mapGetters } from "vuex";

import TheHomeLayout from "@/layouts/TheHomeLayout";
import SessionHeadline from "@/components/SessionHeadline";

export default {
  name: "ResultPage",
  components: {
    TheHomeLayout,
    SessionHeadline,
  },
  computed: {
    ...mapGetters([
      "currentSessionId",
      "currentSessionData",
      "isAuthenticated",
      "isSessionLoaded",
    ]),
  },
};
</script>

<style scoped></style>
