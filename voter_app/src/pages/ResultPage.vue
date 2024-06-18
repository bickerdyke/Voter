<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline v-if="isSessionLoaded" />

      <!-- Results-->
      <div class="row my-3"><ResultTable v-if="isSessionLoaded" /></div>

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
      <div class="row my-3">
        <router-link to="/showresult/4711" class="btn btn-primary"
          >4711</router-link
        >
        <router-link to="/showresult/4712" class="btn btn-primary"
          >4712</router-link
        >
        <router-link to="/showresult/4713" class="btn btn-primary"
          >4713</router-link
        >
      </div>
    </div>
  </TheHomeLayout>
</template>

<script>
import { mapGetters } from "vuex";

import TheHomeLayout from "@/layouts/TheHomeLayout";
import ResultTable from "@/components/results/ResultTable";
import SessionHeadline from "@/components/SessionHeadline";
import ImageAndDescription from "@/components/ImageAndDescription";

export default {
  name: "ResultPage",
  components: {
    TheHomeLayout,
    ResultTable,
    SessionHeadline,
    ImageAndDescription,
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
