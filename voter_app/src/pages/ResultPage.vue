<template>
  <TheHomeLayout>
    <div>
      <h1 class="text-center display-2">{{ session.title }}</h1>
      <h3 class="text-center">{{ session.subtitle }}</h3>
      <div class="col-12"><ResultTable :sessionId="sessionId" /></div>
      <div>
        <img
          :src="session.imgUrl"
          v-if="session.imgUrl"
          class="rounded-4 float-start me-3 img-fluid"
        />
        <div class="m-5 mw-25">{{ session.description }}</div>
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
