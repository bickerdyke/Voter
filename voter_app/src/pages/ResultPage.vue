<template>
  <TheHomeLayout>
    <div>
      <!-- Header -->
      <div class="row my-3">
        <h1 class="text-center display-2">{{ session.title }}</h1>
        <h3 class="text-center">{{ session.subtitle }}</h3>
      </div>

      <!-- Results-->
      <div class="row my-3"><ResultTable :sessionId="sessionId" /></div>

      <!-- Session description -->
      <div class="row my-3 card">
        <div class="card-body">
          <img
            :src="session.imgUrl"
            v-if="session.imgUrl"
            class="rounded-4 float-start me-3 img-fluid"
            style="width: 200px; height: 200px; object-fit: cover"
          />
          <div class="m-5 mw-25">{{ session.description }}</div>
        </div>
      </div>

      <!-- Footer-Features-->
      <div class="row my-3">
        <a href="/" class="btn btn-primary">Neue Abstimmung anlegen</a>
      </div>
    </div>
  </TheHomeLayout>
</template>

<script>
import TheHomeLayout from "@/layouts/TheHomeLayout";
import ResultTable from "@/components/results/ResultTable";

export default {
  name: "ResultPage",
  components: {
    TheHomeLayout,
    ResultTable,
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
