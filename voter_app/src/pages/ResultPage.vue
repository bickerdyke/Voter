<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline v-if="isSessionLoaded" />

      <!-- Results-->
      <div class="row my-3">
        <div class="col-12"><ResultTable v-if="isSessionLoaded" /></div>
      </div>

      <!-- Session description -->
      <ImageAndDescription
        :imgUrl="currentSessionData.imgUrl"
        :description="currentSessionData.description"
        v-if="isSessionLoaded && currentSessionData.description"
      ></ImageAndDescription>

      <!-- Footer-Features-->
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
