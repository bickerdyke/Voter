<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <SessionHeadline :sessionId="sessionId" />

      <!-- Results-->
      <div class="row my-3"><ResultTable :sessionId="sessionId" /></div>

      <!-- Session description -->
      <ImageAndDescription
        :imgUrl="session.imgUrl"
        :description="session.description"
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
  props: {
    sessionId: String,
  },
  computed: {
    session() {
      return this.$store.getters.session;
    },
  },
};
</script>

<style scoped></style>
